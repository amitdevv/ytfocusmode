import React, { useState, useEffect } from 'react';
import { BookOpen, Loader2, AlertCircle, Copy, Check, Settings } from 'lucide-react';
import { generateVideoSummary } from '../utils/gemini';
import { fetchVideoTranscript } from '../utils/youtube';
import { setupApiKey, manageApiKey } from './SimpleApiKeyPopup';

interface VideoSummaryProps {
  videoId: string;
  onComplete?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

export const VideoSummary: React.FC<VideoSummaryProps> = ({ videoId, onComplete, onNext, hasNext }) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const loadVideoInfo = async () => {
      if (!videoId) return;
      
      try {
        const info = await fetchVideoTranscript(videoId);
        setVideoInfo(info);
        setError('');
      } catch (err) {
        console.error('Error loading video transcript:', err);
        setError(err instanceof Error ? err.message : 'Failed to load video information');
        setVideoInfo('');
      }
    };

    loadVideoInfo();
  }, [videoId]);

  useEffect(() => {
    // Check if user has an API key
    const apiKey = localStorage.getItem('gemini_api_key');
    setHasApiKey(!!apiKey);
  }, []);

  const cleanText = (text: string) => {
    return text.replace(/[*_`~]/g, '').trim();
  };

  const handleGenerateSummary = async () => {
    if (!hasApiKey) {
      setupApiKey(setHasApiKey);
      return;
    }

    if (!videoInfo) {
      setError('No video information available. Please try refreshing the page.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let generatedSummary = await generateVideoSummary(videoInfo);
      let cleanedSummary = cleanText(generatedSummary);
      
      if (!cleanedSummary.includes('•')) {
        let lines = cleanedSummary.split('\n').filter(line => line.trim() !== '');
        let pointwiseSummary = lines.map(line => {
          if (line.length < 50 && (line.endsWith(':') || line.toUpperCase() === line)) {
            return line;
          }
          return `• ${line}`;
        }).join('\n');
        setSummary(pointwiseSummary);
      } else {
        setSummary(cleanedSummary);
      }
    } catch (err) {
      console.error('Summary generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
      if (err instanceof Error && err.message.includes('API key')) {
        setHasApiKey(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="mt-6 p-6 backdrop-blur rounded-xl shadow-lg" style={{ backgroundColor: '#232323' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#E5E5E5' }}>
          <BookOpen className="w-5 h-5" style={{ color: '#1E874B' }} />
          Smart Notes
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => manageApiKey(setHasApiKey)}
            className="flex items-center gap-2 px-3 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: '#171717', border: '1px solid #2E2E2E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2E2E2E'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
            title="API Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          {summary && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: '#171717', border: '1px solid #2E2E2E' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2E2E2E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
              title={copied ? 'Copied!' : 'Copy notes'}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
          <button
            onClick={handleGenerateSummary}
            disabled={loading || !videoInfo}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-md"
            style={{ backgroundColor: hasApiKey ? '#1E874B' : '#F59E0B' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = hasApiKey ? '#16A34A' : '#D97706')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = hasApiKey ? '#1E874B' : '#F59E0B')}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Notes...
              </>
            ) : hasApiKey ? (
              'Generate Notes'
            ) : (
              'Setup API Key'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: '#171717', border: '1px solid #EF4444', color: '#EF4444' }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {summary && (
        <div className="prose max-w-none">
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#171717' }}>
            {summary.split('\n').map((line, index) => (
              <p key={index} className="mb-2" style={{ color: '#E5E5E5' }}>{line}</p>
            ))}
          </div>
          {onComplete && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  onComplete();
                  if (hasNext && onNext) {
                    onNext();
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#1E874B' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E874B'}
              >
                <Check className="w-5 h-5" />
                Mark as Complete & Continue
              </button>
            </div>
          )}
        </div>
      )}

      {!summary && !error && !loading && (
        <div className="text-center py-4">
          {hasApiKey ? (
            <p style={{ color: '#A3A3A3' }}>
              Click "Generate Notes" to get AI-powered study notes for this video
            </p>
          ) : (
            <div className="space-y-3">
              <p style={{ color: '#A3A3A3' }}>
                Set up your free Gemini API key to generate AI-powered study notes
              </p>
              <button
                onClick={() => setupApiKey(setHasApiKey)}
                className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                style={{ backgroundColor: '#1E874B' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E874B'}
              >
                <Settings className="w-4 h-4" />
                Setup API Key
              </button>
            </div>
          )}
        </div>
      )}


    </div>
  );
};