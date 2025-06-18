import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Settings, ChevronUp, ChevronDown, Maximize, Minimize } from 'lucide-react';
import { Video } from '../types';
import { VideoSummary } from './VideoSummary';

interface VideoPlayerProps {
  video: Video;
  onComplete: () => void;
  onSkip: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  isFullscreen: boolean;
  onFullscreenChange: (isFullscreen: boolean) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onComplete,
  onSkip,
  onPrevious,
  onNext,
  hasNext,
  hasPrevious,
  playbackSpeed,
  onSpeedChange,
  isFullscreen,
  onFullscreenChange,
}) => {
  const [player, setPlayer] = React.useState<any>(null);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = document.fullscreenElement !== null;
      onFullscreenChange(isFullscreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onFullscreenChange]);

  useEffect(() => {
    if (containerRef.current && isFullscreen) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else if (document.fullscreenElement && !isFullscreen) {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  }, [isFullscreen]);

  const handleVideoEnd = () => {
    onComplete();
    if (hasNext) {
      onNext();
    }
  };

  const handleReady = (event: any) => {
    setPlayer(event.target);
    event.target.setPlaybackRate(playbackSpeed);
  };

  const handleSpeedChange = (speed: number) => {
    if (player) {
      player.setPlaybackRate(speed);
    }
    onSpeedChange(speed);
    setShowSpeedMenu(false);
  };

  const currentSpeedIndex = SPEED_OPTIONS.indexOf(playbackSpeed);
  const handleSpeedIncrement = () => {
    const nextIndex = currentSpeedIndex < SPEED_OPTIONS.length - 1 ? currentSpeedIndex + 1 : currentSpeedIndex;
    handleSpeedChange(SPEED_OPTIONS[nextIndex]);
  };

  const handleSpeedDecrement = () => {
    const prevIndex = currentSpeedIndex > 0 ? currentSpeedIndex - 1 : currentSpeedIndex;
    handleSpeedChange(SPEED_OPTIONS[prevIndex]);
  };

  const toggleFullscreen = () => {
    onFullscreenChange(!isFullscreen);
  };

  return (
    <div ref={containerRef} className={`w-full space-y-4 ${isFullscreen ? 'fixed inset-0 bg-black z-50 p-4' : ''}`}>
      <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-xl group">
        <YouTube
          videoId={video.id}
          className="w-full h-full"
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
              controls: 1,
            },
          }}
          onEnd={handleVideoEnd}
          onReady={handleReady}
        />
        {/* Custom fullscreen toggle button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all z-50 opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize size={24} />
          ) : (
            <Maximize size={24} />
          )}
        </button>
      </div>
      
      <div className={`p-6 backdrop-blur rounded-xl shadow-lg ${isFullscreen ? 'mt-4' : ''}`} style={{ backgroundColor: '#232323' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold" style={{ color: '#E5E5E5' }}>
            {video.title}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex items-center gap-1">
                <button
                  onClick={handleSpeedDecrement}
                  disabled={currentSpeedIndex === 0}
                  className="p-1 rounded-lg transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#171717' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2E2E2E')}
                  onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#171717')}
                >
                  <ChevronDown size={16} style={{ color: '#A3A3A3' }} />
                </button>
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors !w-[80px] !h-[32px]"
                  style={{ backgroundColor: '#171717' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2E2E2E'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
                >
                  <Settings size={16} style={{ color: '#A3A3A3' }} />
                  <span className="text-sm font-medium" style={{ color: '#A3A3A3' }}>{playbackSpeed}x</span>
                </button>
                <button
                  onClick={handleSpeedIncrement}
                  disabled={currentSpeedIndex === SPEED_OPTIONS.length - 1}
                  className="p-1 rounded-lg transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#171717' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2E2E2E')}
                  onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#171717')}
                >
                  <ChevronUp size={16} style={{ color: '#A3A3A3' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:hover:shadow-lg disabled:cursor-not-allowed"
            style={{ backgroundColor: '#171717', border: '1px solid #2E2E2E' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2E2E2E')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#171717')}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#22C55E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16A34A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
          >
            <CheckCircle size={20} />
            Mark as Complete
          </button>
          
          <button
            onClick={onSkip}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#F59E0B' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D97706'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F59E0B'}
          >
            <XCircle size={20} />
            Skip Video
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:hover:shadow-lg disabled:cursor-not-allowed"
            style={{ backgroundColor: '#171717', border: '1px solid #2E2E2E' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2E2E2E')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#171717')}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {!isFullscreen && <VideoSummary videoId={video.id} />}
    </div>
  );
};