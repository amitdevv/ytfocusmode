import React, { useState } from 'react';
import { PlayCircle, Loader2 } from 'lucide-react';

interface PlaylistInputProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
}

export const PlaylistInput: React.FC<PlaylistInputProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8 animate-slide-in">
      <div className="flex gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube video or playlist URL here..."
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl border-2 shadow-lg outline-none transition-all duration-300 disabled:opacity-50"
          style={{ 
            backgroundColor: '#232323',
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
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-lg"
          style={{ backgroundColor: '#22C55E' }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#16A34A')}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#22C55E')}
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <PlayCircle size={20} />
          )}
          {loading ? 'Loading...' : 'Load Video'}
        </button>
      </div>
    </form>
  );
};