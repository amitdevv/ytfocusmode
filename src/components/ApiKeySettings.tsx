import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, ExternalLink, Save, Key } from 'lucide-react';

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (apiKey.trim()) {
        localStorage.setItem('gemini_api_key', apiKey.trim());
      } else {
        localStorage.removeItem('gemini_api_key');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGetApiKey = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-xl shadow-2xl" style={{ backgroundColor: '#232323' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6" style={{ color: '#22C55E' }} />
              <h2 className="text-xl font-bold" style={{ color: '#E5E5E5' }}>
                API Key Settings
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#171717' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2E2E2E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
            >
              <Settings className="w-5 h-5" style={{ color: '#A3A3A3' }} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#E5E5E5' }}>
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 shadow-lg outline-none transition-all duration-300"
                  style={{
                    backgroundColor: '#171717',
                    borderColor: '#2E2E2E',
                    color: '#E5E5E5'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#22C55E';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#2E2E2E';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: '#A3A3A3' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#22C55E'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#A3A3A3'}
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: '#171717', border: '1px solid #2E2E2E' }}>
              <p className="text-sm mb-3" style={{ color: '#A3A3A3' }}>
                <strong style={{ color: '#E5E5E5' }}>How to get your free Gemini API key:</strong>
              </p>
              <ol className="text-sm space-y-2" style={{ color: '#A3A3A3' }}>
                <li>1. Visit Google AI Studio</li>
                <li>2. Sign in with your Google account</li>
                <li>3. Click "Get API Key"</li>
                <li>4. Copy and paste it above</li>
              </ol>
              <button
                onClick={handleGetApiKey}
                className="mt-3 flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
                style={{ backgroundColor: '#22C55E', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
              >
                <ExternalLink className="w-4 h-4" />
                Get API Key
              </button>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: '#171717', border: '1px solid #F59E0B' }}>
              <p className="text-sm" style={{ color: '#F59E0B' }}>
                <strong>Note:</strong> Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: '#171717', border: '1px solid #2E2E2E', color: '#E5E5E5' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2E2E2E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#22C55E', color: 'white' }}
              onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = '#16A34A')}
              onMouseLeave={(e) => !isSaving && (e.currentTarget.style.backgroundColor = '#22C55E')}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Save className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 