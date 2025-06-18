# 🎯 YouTube Focus Learner

A modern, AI-powered YouTube playlist learning tool that helps you stay focused while studying from video content. Built with React, TypeScript, and powered by Google's Gemini AI for intelligent note generation.

## ✨ Features

### 🎥 **Smart Video Management**
- **Playlist Loading**: Simply paste any YouTube playlist URL to get started
- **Progress Tracking**: Visual progress bar showing completion status
- **Sequential Learning**: Automatically advance through videos
- **Video Controls**: Skip, mark complete, adjust playback speed
- **Fullscreen Support**: Distraction-free viewing experience

### 🤖 **AI-Powered Study Notes**
- **Gemini Integration**: Generate intelligent study notes using Google's free Gemini API
- **First Principles Analysis**: Extract core concepts and fundamental ideas
- **Formula Detection**: Automatically identify and explain important formulas
- **Structured Output**: Well-organized notes with clear headings and bullet points
- **Copy & Export**: Easily copy notes for external use

### 🎨 **Modern UI/UX**
- **Dark Theme**: Easy on the eyes for long study sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Clean, modern interface with smooth animations
- **Visual Feedback**: Clear indicators for completed videos and current progress

### 🔒 **Privacy & Security**
- **Local Storage**: Your API keys stay on your device
- **No Data Collection**: We don't store or track your personal information
- **Self-Hosted**: Run entirely in your browser

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A free Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitdevv/ytfocusmode.git
   cd ytfocusmode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Setting Up Your API Key

To use the AI note generation feature, you'll need a free Gemini API key:

### Step 1: Get Your API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Step 2: Add to the App
1. Click the settings icon (⚙️) in the Smart Notes section
2. Paste your API key in the input field
3. Click "Save"

**🔒 Privacy Note**: Your API key is stored locally in your browser and never sent to our servers.

## 📖 How to Use

### 1. **Load a Playlist**
- Paste any YouTube playlist URL in the input field
- Click "Load Video" to import the playlist
- The app will fetch all videos and display them in the sidebar

### 2. **Study with Focus**
- Videos play automatically in sequence
- Use the control buttons to:
  - Mark videos as complete ✅
  - Skip videos you don't need ⏭️
  - Navigate between videos ⬅️➡️
  - Adjust playback speed ⚙️

### 3. **Generate Smart Notes**
- Click "Generate Notes" below any video
- The AI will analyze the video content and create:
  - Top 10 important concepts
  - Key formulas (if applicable)
  - Structured explanations
- Copy notes for external use

### 4. **Track Progress**
- View your completion percentage at the top
- See which videos you've finished
- Resume where you left off

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Video**: React YouTube Player

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ApiKeySettings.tsx    # API key management
│   ├── PlaylistInput.tsx     # URL input component
│   ├── PlaylistProgress.tsx  # Progress tracking
│   ├── PlaylistSidebar.tsx   # Video list sidebar
│   ├── VideoPlayer.tsx       # Main video player
│   └── VideoSummary.tsx      # AI notes generation
├── utils/              # Utility functions
│   ├── gemini.ts           # Gemini API integration
│   ├── storage.ts          # Local storage helpers
│   └── youtube.ts          # YouTube API helpers
├── types.ts            # TypeScript type definitions
└── App.tsx            # Main application component
```

## 🎨 Customization

### Theme Colors
The app uses a carefully crafted dark theme with green accents. You can customize colors in `tailwind.config.js`:

```javascript
colors: {
  background: "#171717",    // Main background
  card: "#232323",         // Component backgrounds
  border: "#2E2E2E",       // Borders
  accent: "#22C55E",       // Primary green
  success: "#22C55E",      // Success states
  warning: "#F59E0B",      // Warning states
  danger: "#EF4444",       // Error states
  textPrimary: "#E5E5E5",  // Main text
  textSecondary: "#A3A3A3", // Secondary text
}
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use the existing component structure
- Maintain the current design system
- Add proper error handling
- Test your changes thoroughly

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ❓ FAQ

### **Q: Is this free to use?**
A: Yes! Both the app and the Gemini API have generous free tiers.

### **Q: Do you store my data?**
A: No, everything runs locally in your browser. Your API keys and progress are stored locally.

### **Q: Can I use this offline?**
A: The app needs internet for YouTube videos and AI note generation, but your progress is saved locally.

### **Q: What's the API usage limit?**
A: Gemini's free tier includes 15 requests per minute and 1,500 requests per day, which is plenty for most users.

### **Q: Can I use this for any YouTube playlist?**
A: Yes! It works with any public YouTube playlist or individual video.

## 🐛 Known Issues

- Some videos may not have transcripts available for note generation
- Very long videos might hit API token limits
- Mobile browsers may have video playback limitations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google for the free Gemini API
- YouTube for the video platform
- The React and TypeScript communities
- All contributors and users

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/amitdevv/ytfocusmode/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ by [Amit](https://github.com/amitdevv)**

*Happy Learning! 🎓* 