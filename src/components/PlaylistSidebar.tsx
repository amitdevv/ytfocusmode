import React from 'react';
import { Video } from '../types';
import { CheckCircle, PlayCircle } from 'lucide-react';

interface PlaylistSidebarProps {
  videos: Video[];
  currentIndex: number;
  onVideoSelect: (index: number) => void;
}

export const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  videos,
  currentIndex,
  onVideoSelect,
}) => {
  return (
    <div className="w-full h-[600px] backdrop-blur rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: '#232323' }}>
      <div className="p-4" style={{ backgroundColor: '#1E874B' }}>
        <h3 className="font-semibold text-white flex items-center gap-2">
          <PlayCircle size={20} />
          Playlist Videos
        </h3>
      </div>
      <div className="overflow-y-auto h-[calc(600px-60px)] custom-scrollbar">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => onVideoSelect(index)}
            className="w-full p-4 flex items-start gap-4 transition-colors"
            style={{
              backgroundColor: currentIndex === index ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.backgroundColor = '#171717';
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
              }
            }}
          >
            <div className="relative flex-shrink-0 group">
              <img
                src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-32 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
              />
              {video.completed ? (
                <div className="absolute top-2 right-2 rounded-full p-1 shadow-lg" style={{ backgroundColor: '#22C55E' }}>
                  <CheckCircle size={16} className="text-white" />
                </div>
              ) : currentIndex === index && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <PlayCircle size={24} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2 text-left"
                 style={{
                   color: currentIndex === index ? '#22C55E' : '#E5E5E5'
                 }}>
                {video.title}
              </p>
              <p className="text-xs mt-1" style={{ 
                color: video.completed ? '#22C55E' : index === currentIndex ? '#22C55E' : '#A3A3A3'
              }}>
                {video.completed ? 'Completed' : index === currentIndex ? 'Now Playing' : 'Not Started'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};