"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CompletionGraphProps {
  challengeIndex: number;
  userTime?: number;
}

export default function CompletionGraph({ challengeIndex, userTime }: CompletionGraphProps) {
  const [times, setTimes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletionTimes();
  }, [challengeIndex, userTime]);

  const fetchCompletionTimes = async () => {
    try {
      const response = await fetch(`/api/completions?challenge_index=${challengeIndex}`);
      const data = await response.json();
      if (data.success && data.data) {
        setTimes(data.data.map((item: any) => item.completion_time));
      }
    } catch (error) {
      console.error("Failed to fetch completion times:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || times.length === 0) {
    return (
      <div className="h-24 flex items-center justify-center text-terminal-dim">
        {loading ? "LOADING STATISTICS..." : "NO DATA AVAILABLE"}
      </div>
    );
  }

  // If only one data point, show it as a simple label
  if (times.length === 1) {
    return (
      <div className="border border-terminal-dim p-4 bg-terminal-bg/50">
        <div className="text-terminal-accent text-sm mb-2">
          COMPLETION TIME
        </div>
        <div className="text-terminal-fg text-2xl font-mono">
          {times[0]}s
        </div>
        {userTime === times[0] && (
          <div className="mt-2 text-sm text-terminal-bright">
            YOUR TIME
          </div>
        )}
      </div>
    );
  }

  // Sort times and count occurrences
  const timeCount = new Map<number, number>();
  times.forEach(time => {
    timeCount.set(time, (timeCount.get(time) || 0) + 1);
  });
  
  const sortedUniqueTimes = Array.from(timeCount.keys()).sort((a, b) => a - b);
  const min = sortedUniqueTimes[0];
  const max = sortedUniqueTimes[sortedUniqueTimes.length - 1];
  const range = max - min;
  const padding = range * 0.1;
  const displayMin = Math.floor(min - padding);
  const displayMax = Math.ceil(max + padding);
  const displayRange = displayMax - displayMin;
  
  const maxCount = Math.max(...Array.from(timeCount.values()));
  const yAxisMax = Math.ceil(maxCount * 1.1);
  
  // Generate integer y-axis labels
  const yAxisLabels = [];
  if (yAxisMax <= 5) {
    // For small counts, show every integer
    for (let i = yAxisMax; i >= 0; i--) {
      yAxisLabels.push(i);
    }
  } else {
    // For larger counts, show 5 evenly spaced integers
    const step = Math.ceil(yAxisMax / 4);
    for (let i = 0; i <= 4; i++) {
      yAxisLabels.unshift(Math.min(i * step, yAxisMax));
    }
  }

  return (
    <div className="border border-terminal-dim p-4 bg-terminal-bg/50">
      <div className="text-terminal-accent text-sm mb-4">
        COMPLETION TIME DISTRIBUTION (n={times.length})
      </div>
      
      <div className="flex gap-4">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-xs text-terminal-dim w-8 text-right">
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
        
        {/* Chart area */}
        <div className="flex-1">
          <div className="relative h-32">
            {/* Y-axis grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-terminal-dim/30"
                style={{ bottom: `${percent}%` }}
              />
            ))}
            
            {/* Bars */}
            <div className="absolute inset-0">
              {sortedUniqueTimes.map((time, index) => {
                const count = timeCount.get(time) || 0;
                const height = yAxisMax > 0 ? (count / yAxisMax) * 100 : 0;
                const position = ((time - displayMin) / displayRange) * 100;
                const isUserTime = time === userTime;
                const barWidth = Math.max(100 / sortedUniqueTimes.length, 3);
                
                return (
                  <motion.div
                    key={time}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.01, duration: 0.3 }}
                    className={`absolute bottom-0 ${
                      isUserTime ? "bg-terminal-bright" : "bg-terminal-accent/60"
                    } hover:opacity-80`}
                    style={{ 
                      left: `${position}%`,
                      width: `${barWidth}px`,
                      transform: 'translateX(-50%)'
                    }}
                    title={`${time}s: ${count} user${count !== 1 ? 's' : ''}`}
                  />
                );
              })}
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-terminal-dim mt-2">
            <span>{displayMin}s</span>
            <span>{Math.floor((displayMin + displayMax) / 2)}s</span>
            <span>{displayMax}s</span>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-4 text-xs text-terminal-dim flex justify-between">
        <span>FASTEST: {min}s</span>
        <span>MEDIAN: {times.sort((a, b) => a - b)[Math.floor(times.length / 2)]}s</span>
        <span>SLOWEST: {max}s</span>
      </div>
      
      {userTime && (
        <div className="mt-2 text-sm text-terminal-bright text-center">
          YOUR TIME: {userTime}s (FASTER THAN {Math.round((times.filter(t => t > userTime).length / times.length) * 100)}% OF USERS)
        </div>
      )}
    </div>
  );
}