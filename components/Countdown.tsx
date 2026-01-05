import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="relative">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-800 flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
          <span className="text-2xl sm:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-indigo-500/50 rounded-tl"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-purple-500/50 rounded-br"></div>
      </div>
      <span className="mt-3 text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center py-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;