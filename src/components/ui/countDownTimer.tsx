import React, { useEffect, useState } from 'react';

interface CountDownTimerProps {
  minutes: number;
  onComplete?: () => void;
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({
  minutes,
  onComplete,
}) => {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    if (time <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onComplete]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return <div>{formatTime(time)}</div>;
};

export default CountDownTimer;
