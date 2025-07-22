"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  isRunning: boolean;
  onReset?: () => void;
}

export default function Timer({ isRunning, onReset }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (onReset) {
      setSeconds(0);
    }
  }, [onReset]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="text-terminal-accent font-mono">
      TIME ELAPSED: {formatTime(seconds)}
    </div>
  );
}