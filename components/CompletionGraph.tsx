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

  // Create histogram buckets
  const min = Math.min(...times);
  const max = Math.max(...times);
  const bucketCount = Math.min(20, times.length);
  const bucketSize = (max - min) / bucketCount || 1;
  
  const buckets = Array(bucketCount).fill(0);
  times.forEach(time => {
    const bucketIndex = Math.min(Math.floor((time - min) / bucketSize), bucketCount - 1);
    buckets[bucketIndex]++;
  });

  const maxCount = Math.max(...buckets);
  const userBucket = userTime ? Math.min(Math.floor((userTime - min) / bucketSize), bucketCount - 1) : -1;

  return (
    <div className="border border-terminal-dim p-4 bg-terminal-bg/50">
      <div className="text-terminal-accent text-sm mb-2">
        COMPLETION TIME DISTRIBUTION (n={times.length})
      </div>
      <div className="h-16 flex items-end gap-[2px]">
        {buckets.map((count, i) => {
          const height = (count / maxCount) * 100;
          const isUserBucket = i === userBucket;
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.02 }}
              className={`flex-1 ${
                isUserBucket ? "bg-terminal-bright" : "bg-terminal-accent"
              }`}
              title={`${(min + i * bucketSize).toFixed(0)}s - ${(min + (i + 1) * bucketSize).toFixed(0)}s: ${count} users`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-terminal-dim mt-1">
        <span>{min.toFixed(0)}s</span>
        {userTime && (
          <span className="text-terminal-bright">YOUR TIME: {userTime}s</span>
        )}
        <span>{max.toFixed(0)}s</span>
      </div>
    </div>
  );
}