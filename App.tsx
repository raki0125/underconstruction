import React from 'react';
import { Twitter, Github, Linkedin, Instagram, Hammer, Mail } from 'lucide-react';
import Background from './components/Background';
import Countdown from './components/Countdown';
import Newsletter from './components/Newsletter';

const App: React.FC = () => {
  // Set launch date to 14 days from now for demo purposes
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14);

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:rakucsgo16@gmail.com' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-6 sm:p-8">
      <Background />

      {/* Header / Logo */}
      <header className="relative z-10 w-full max-w-7xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
            <Hammer className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white">
            ROCKY
          </span>
        </div>
        <div className="hidden sm:block">
          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-xs font-medium text-gray-300 backdrop-blur-sm">
            v0.1-alpha
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto mt-8 sm:mt-0">
        
        {/* Status Pill */}
        <div className="mb-8 inline-flex items-center space-x-2 px-4 py-2 bg-indigo-900/30 border border-indigo-500/30 rounded-full backdrop-blur-md animate-pulse-slow">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-indigo-200">System Upgrade in Progress</span>
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6">
          Building <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Something Great
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          We are crafting a digital experience that redefines the standards. 
          Our team is working hard to bring you the future of interaction.
        </p>

        {/* Countdown */}
        <Countdown targetDate={launchDate} />

        {/* Newsletter */}
        <Newsletter />

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center mt-12 sm:mt-0 pt-8 border-t border-gray-800/50 sm:border-t-0">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Rocky Inc. All rights reserved.
        </div>
        
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-500 hover:text-white transition-colors duration-200 transform hover:-translate-y-1"
              aria-label={link.name}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;