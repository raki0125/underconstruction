import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SubscriptionStatus } from '../types';
import { generateWelcomeMessage } from '../services/geminiService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus>(SubscriptionStatus.IDLE);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus(SubscriptionStatus.LOADING);
    
    // Log intent to email the admin (Backend Simulation)
    console.log(`[Newsletter] New subscriber: ${email}`);
    console.log(`[Newsletter] Notifying admin at: rakucsgo16@gmail.com`);
    
    try {
      // Simulate API call delay slightly for effect, then call Gemini
      const generatedMessage = await generateWelcomeMessage(email);
      setMessage(generatedMessage);
      setStatus(SubscriptionStatus.SUCCESS);
      setEmail('');
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setStatus(SubscriptionStatus.ERROR);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12 relative z-10">
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-xl font-display font-semibold text-white mb-2 text-center">
          Get notified when we launch
        </h3>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Be the first to experience the future. No spam, ever.
        </p>

        {status === SubscriptionStatus.SUCCESS ? (
          <div className="flex flex-col items-center justify-center text-center animate-fade-in p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-10 h-10 text-green-400 mb-3" />
            <p className="text-green-200 font-medium italic">"{message}"</p>
            <button 
              onClick={() => setStatus(SubscriptionStatus.IDLE)}
              className="mt-4 text-xs text-green-400 hover:text-green-300 underline underline-offset-2"
            >
              Register another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === SubscriptionStatus.LOADING}
                className="w-full bg-gray-950/50 border border-gray-700 text-white placeholder-gray-500 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={status === SubscriptionStatus.LOADING}
                className="absolute right-2 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label="Subscribe"
              >
                {status === SubscriptionStatus.LOADING ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            {status === SubscriptionStatus.ERROR && (
              <div className="flex items-center mt-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;