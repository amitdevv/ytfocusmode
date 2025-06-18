import React from 'react';
import { Video } from '../types';

interface PlaylistProgressProps {
  videos: Video[];
  currentIndex: number;
}

export const PlaylistProgress: React.FC<PlaylistProgressProps> = ({ videos, currentIndex }) => {
  const completedCount = videos.filter(v => v.completed).length;
  const progress = (completedCount / videos.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 p-4 backdrop-blur rounded-xl shadow-lg" style={{ backgroundColor: '#232323' }}>
      <div className="flex justify-between mb-3 text-sm font-medium">
        <span style={{ color: '#22C55E' }}>
          Progress: {completedCount}/{videos.length} videos
        </span>
        <span style={{ color: '#A3A3A3' }}>
          Video {currentIndex + 1} of {videos.length}
        </span>
        <span style={{ color: '#22C55E' }}>
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: '#171717' }}>
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: '#22C55E' }}
        />
      </div>
    </div>
  );
};