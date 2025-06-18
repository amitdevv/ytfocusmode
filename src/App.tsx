import React, { useState, useEffect } from 'react';
import { Laptop2, Github, Trash2 } from 'lucide-react';
import { PlaylistInput } from './components/PlaylistInput';
import { VideoPlayer } from './components/VideoPlayer';
import { PlaylistProgress } from './components/PlaylistProgress';
import { PlaylistSidebar } from './components/PlaylistSidebar';
import { PlaylistData, Video } from './types';
import { saveToStorage, loadFromStorage, clearStorage } from './utils/storage';
import { fetchPlaylistVideos } from './utils/youtube';

function App() {
  const [playlistData, setPlaylistData] = useState<PlaylistData>({
    videos: [],
    currentIndex: 0,
    darkMode: true,
    playbackSpeed: 1,
    isFullscreen: false, // Initialize fullscreen state
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData) {
      setPlaylistData(savedData);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (playlistData.videos.length > 0) {
      saveToStorage(playlistData);
    }
  }, [playlistData]);

  const handlePlaylistSubmit = async (url: string) => {
    setError('');
    setLoading(true);
    try {
      const videos = await fetchPlaylistVideos(url);
      setPlaylistData(prev => ({
        ...prev,
        videos,
        currentIndex: 0,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoComplete = () => {
    setPlaylistData(prev => {
      const updatedVideos = [...prev.videos];
      updatedVideos[prev.currentIndex] = {
        ...updatedVideos[prev.currentIndex],
        completed: true
      };
      return {
        ...prev,
        videos: updatedVideos,
      };
    });
  };

  const handleVideoSelect = (index: number) => {
    setPlaylistData(prev => {
      const updatedVideos = [...prev.videos];
      if (prev.currentIndex < index) {
        updatedVideos[prev.currentIndex] = {
          ...updatedVideos[prev.currentIndex],
          completed: true
        };
      }
      return {
        ...prev,
        videos: updatedVideos,
        currentIndex: index,
      };
    });
  };

  const handleVideoSkip = () => {
    setPlaylistData(prev => {
      const updatedVideos = [...prev.videos];
      updatedVideos[prev.currentIndex] = {
        ...updatedVideos[prev.currentIndex],
        completed: true
      };
      return {
        ...prev,
        videos: updatedVideos,
        currentIndex: Math.min(prev.currentIndex + 1, prev.videos.length - 1),
      };
    });
  };

  const handleSpeedChange = (speed: number) => {
    setPlaylistData(prev => ({
      ...prev,
      playbackSpeed: speed,
    }));
  };

  const handleFullscreenChange = (isFullscreen: boolean) => {
    setPlaylistData(prev => ({
      ...prev,
      isFullscreen,
    }));
  };

  const handleClearData = () => {
    clearStorage();
    setPlaylistData({
      videos: [],
      currentIndex: 0,
      darkMode: true,
      playbackSpeed: 1,
      isFullscreen: false,
    });
    setError('');
  };

  const currentVideo = playlistData.videos[playlistData.currentIndex];

  return (
    <div className="min-h-screen transition-colors" style={{ backgroundColor: '#171717' }}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8 animate-slide-in">
          <div className="flex items-center gap-3">
            <Laptop2 className="w-8 h-8" style={{ color: '#22C55E' }} />
            <h1 className="text-3xl font-bold" style={{ color: '#E5E5E5' }}>
              YouTube Focus Learner
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClearData}
              className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#EF4444' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
              title="Clear all data"
            >
              <Trash2 className="w-4 h-4" />
              Clear Data
            </button>
          </div>
        </div>

        <PlaylistInput onSubmit={handlePlaylistSubmit} loading={loading} />

        {error && (
          <div className="w-full max-w-4xl mx-auto mb-8 p-4 backdrop-blur rounded-xl shadow-lg animate-slide-in" style={{ backgroundColor: '#232323', border: '1px solid #EF4444', color: '#EF4444' }}>
            {error}
          </div>
        )}

        {playlistData.videos.length > 0 ? (
          <div className="space-y-6 animate-slide-in">
            <PlaylistProgress 
              videos={playlistData.videos} 
              currentIndex={playlistData.currentIndex}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VideoPlayer
                  video={currentVideo}
                  onComplete={handleVideoComplete}
                  onSkip={handleVideoSkip}
                  onPrevious={() => handleVideoSelect(Math.max(0, playlistData.currentIndex - 1))}
                  onNext={() => handleVideoSelect(Math.min(playlistData.videos.length - 1, playlistData.currentIndex + 1))}
                  hasPrevious={playlistData.currentIndex > 0}
                  hasNext={playlistData.currentIndex < playlistData.videos.length - 1}
                  playbackSpeed={playlistData.playbackSpeed}
                  onSpeedChange={handleSpeedChange}
                  isFullscreen={playlistData.isFullscreen}
                  onFullscreenChange={handleFullscreenChange}
                />
              </div>
              <div>
                <PlaylistSidebar
                  videos={playlistData.videos}
                  currentIndex={playlistData.currentIndex}
                  onVideoSelect={handleVideoSelect}
                />
              </div>
            </div>
          </div>
        ) : !loading && !error && (
          <div className="text-center mt-16 space-y-4 animate-slide-in">
            <div className="inline-block p-6 rounded-2xl backdrop-blur shadow-xl" style={{ backgroundColor: '#232323' }}>
              <p className="text-2xl font-semibold mb-3" style={{ color: '#E5E5E5' }}>
                Ready to Start Learning?
              </p>
              <p style={{ color: '#A3A3A3' }}>
                Paste a YouTube playlist URL to begin your focused learning journey
              </p>
            </div>
          </div>
        )}

        <footer className="mt-12 py-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur shadow-lg" style={{ backgroundColor: '#232323' }}>
            <span style={{ color: '#A3A3A3' }}>Made with ❤️ by Amit</span>
            <a
              href="https://github.com/amitdevv/ytfocusmode"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"
              style={{ backgroundColor: '#171717' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
            >
              <Github className="w-5 h-5" style={{ color: '#A3A3A3' }} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;