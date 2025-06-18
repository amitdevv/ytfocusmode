export interface Video {
  id: string;
  title: string;
  completed: boolean;
}

export interface PlaylistData {
  videos: Video[];
  currentIndex: number;
  darkMode: boolean;
  playbackSpeed: number;
  isFullscreen: boolean; // Added fullscreen state
}