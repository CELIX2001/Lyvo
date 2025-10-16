import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-8 animate-pulse">
          <div className="w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#87CEEB"></circle>
              <path d="M15 25 C15 15, 25 10, 50 10 C75 10, 85 15, 85 25 C85 35, 75 40, 50 40 L30 50 L20 45 Z" fill="white" stroke="#E5E7EB" strokeWidth="0.5"></path>
              <g transform="translate(50, 25)">
                <ellipse cx="0" cy="0" rx="12" ry="8" fill="#4A90E2"></ellipse>
                <circle cx="-8" cy="-3" r="6" fill="#4A90E2"></circle>
                <path d="M-5 -5 C-12 -8, -15 -2, -12 2 C-9 5, -2 1, -5 -5 Z" fill="#4A90E2"></path>
                <path d="M2 -2 C-2 -4, -5 0, -2 2 C1 4, 5 1, 2 -2 Z" fill="#4A90E2"></path>
                <path d="M12 0 L20 -5 L18 5 L12 0 Z" fill="#4A90E2"></path>
                <circle cx="-10" cy="-5" r="2" fill="white"></circle>
                <path d="M-14 -2 L-18 0 L-14 2 Z" fill="#4A90E2"></path>
              </g>
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Lyvo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Modern Real-time Messaging Platform
        </p>
        
        <div className="space-x-4">
          <Link 
            href="/working" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Messaging
          </Link>
          <Link 
            href="/demo" 
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            View Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

