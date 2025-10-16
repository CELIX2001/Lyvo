# Lyvo - Modern Real-time Messaging Platform

A professional messaging application that rivals WhatsApp and Telegram, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Messaging
- **Real-time messaging** with WebSocket support
- **Modern UI/UX** with dark/light theme support
- **Message reactions** and replies
- **File sharing** with drag-and-drop support
- **Voice messages** with recording capabilities
- **Message status** indicators (sent, delivered, read)

### Advanced Features
- **AI-powered message suggestions** for smart replies
- **Voice commands** for hands-free operation
- **Smart message templates** and quick replies
- **Message encryption** for enhanced security
- **Real-time translation** of messages
- **Advanced analytics** and chat insights
- **Typing indicators** and presence status
- **Mobile-responsive** design

### Technical Features
- **End-to-end encryption** for secure communication
- **WebSocket real-time** communication
- **Progressive Web App** (PWA) support
- **Accessibility compliant** (WCAG 2.1 AA)
- **Performance optimized** with virtual scrolling
- **Monorepo structure** for scalable development

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React icons
- **Backend**: Fastify, WebSocket
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Real-time**: WebSocket connections
- **Build Tool**: Turborepo (monorepo)

## 📁 Project Structure

```
lyvo/
├── apps/
│   ├── web/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # Utility functions
│   │   └── package.json
│   └── server/              # Fastify backend server
│       ├── src/
│       └── package.json
├── packages/                # Shared packages
├── package.json            # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CELIX2001/Lyvo.git
   cd Lyvo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:web    # Frontend on http://localhost:3000
   npm run dev:server # Backend on http://localhost:3001
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 🎨 UI Components

### Modern Sidebar
- Chat list with search functionality
- User presence indicators
- Theme toggle (dark/light mode)
- Settings and logout options

### Chat Interface
- Real-time message display
- Message reactions and replies
- Typing indicators
- Message status indicators
- File sharing capabilities

### Message Input
- Rich text input with auto-resize
- AI-powered message suggestions
- Voice message recording
- File attachment support
- Emoji picker integration

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start all apps in development
npm run dev:web      # Start web app only
npm run dev:server   # Start server only

# Building
npm run build        # Build all apps
npm run build:web    # Build web app
npm run build:server # Build server

# Linting & Formatting
npm run lint         # Lint all apps
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Code Style
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Tailwind CSS for styling

## 🌟 Key Features in Detail

### Real-time Communication
- WebSocket-based real-time messaging
- Connection status management
- Automatic reconnection handling
- Message queuing for offline scenarios

### AI Integration
- Smart message suggestions based on context
- Voice command recognition
- Intelligent message templates
- Context-aware replies

### Security
- End-to-end message encryption
- Secure file sharing
- User authentication and authorization
- Privacy-focused design

### Performance
- Virtual scrolling for large message lists
- Optimized re-rendering with React.memo
- Lazy loading of components
- Efficient state management

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-optimized interactions
- Mobile-specific gestures
- Progressive Web App capabilities

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation
- High contrast mode
- Reduced motion support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by leading messaging platforms
- Community-driven development

---

**Lyvo** - Connecting people through modern, secure, and intelligent messaging. 💬✨