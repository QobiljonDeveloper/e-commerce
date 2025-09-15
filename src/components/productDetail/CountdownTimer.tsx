import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          return {
            days: 2,
            hours: 12,
            minutes: 45,
            seconds: 5
          };
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Offer expires in::
      </h3>
      <div className="flex gap-2">
        <div className="bg-gray-100 px-3 py-2 rounded text-center min-w-[50px]">
          <div className="text-lg font-bold text-gray-900">
            {timeLeft.days.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-500">Days</div>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded text-center min-w-[50px]">
          <div className="text-lg font-bold text-gray-900">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-500">Hours</div>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded text-center min-w-[50px]">
          <div className="text-lg font-bold text-gray-900">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-500">Minutes</div>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded text-center min-w-[50px]">
          <div className="text-lg font-bold text-gray-900">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-500">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
