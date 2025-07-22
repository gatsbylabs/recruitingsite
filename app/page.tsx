"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

export default function Home() {
  const [showLandingOverlay, setShowLandingOverlay] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  useEffect(() => {
    if (showTerminal) {
      const timer = setTimeout(() => {
        setShowTerminal(false);
        setShowEditor(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showTerminal]);

  const handleChallengeComplete = (challengeIndex: number) => {
    setCompletedChallenges([...completedChallenges, challengeIndex]);
    if (challengeIndex < 2) {
      setCurrentChallenge(challengeIndex + 1);
    } else {
      window.location.href = "/jobs";
    }
  };

  const handleYes = () => {
    setShowLandingOverlay(false);
    setShowTerminal(true);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com/about/careers/applications/";
  };

  return (
    <main className="min-h-screen p-8 terminal-flicker">
      <AnimatePresence>
        {showLandingOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-terminal-bg z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-terminal-bright mb-12">
                DO YOU HAVE WHAT IT TAKES?
              </h1>
              <div className="flex gap-8 justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYes}
                  className="px-12 py-4 border-2 border-terminal-bright text-terminal-bright hover:bg-terminal-bright hover:text-terminal-bg transition-all text-2xl font-bold"
                >
                  YES
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNo}
                  className="px-12 py-4 border-2 border-terminal-dim text-terminal-dim hover:border-terminal-accent hover:text-terminal-accent transition-all text-2xl font-bold"
                >
                  NO
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showTerminal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/jobs"}
            className="absolute top-8 right-8 px-4 py-2 border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-black transition-colors font-mono text-sm"
          >
            SKIP CHALLENGES
          </motion.button>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8 text-terminal-bright typewriter">
              SYSTEM INITIALIZATION...
            </h1>
            <div className="space-y-2 text-terminal-dim">
              <p className="cursor">LOADING GATSBY RECRUITMENT MODULE</p>
              <p>SECURITY CLEARANCE REQUIRED</p>
              <p>PREPARE FOR EVALUATION</p>
            </div>
          </div>
        </motion.div>
      )}

      {showEditor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-terminal-bright mb-2">
                    GATSBY ENGINEERING ENLISTMENT TERMINAL v1.0
                  </h1>
                  <p className="text-terminal-dim">
                    Complete all challenges to access job listings
                  </p>
                </div>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = "/jobs"}
                  className="px-4 py-2 border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-black transition-colors font-mono text-sm"
                >
                  SKIP CHALLENGES
                </motion.button>
              </div>
              <div className="mt-4 flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 ${
                      completedChallenges.includes(i)
                        ? "bg-terminal-bright"
                        : currentChallenge === i
                        ? "bg-terminal-accent"
                        : "bg-terminal-bg border border-terminal-dim"
                    }`}
                  />
                ))}
              </div>
            </div>

            <CodeEditor
              challengeIndex={currentChallenge}
              onComplete={() => handleChallengeComplete(currentChallenge)}
            />
          </div>
        </motion.div>
      )}
    </main>
  );
}