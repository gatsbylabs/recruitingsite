"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { challenges } from "@/lib/challenges";
import { stripTypeScript } from "@/lib/stripTypes";
import Timer from "@/components/Timer";
import CompletionGraph from "@/components/CompletionGraph";

interface CodeEditorProps {
  challengeIndex: number;
  onComplete: () => void;
}

export default function CodeEditor({ challengeIndex, onComplete }: CodeEditorProps) {
  const challenge = challenges[challengeIndex];
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState<number | undefined>();
  const [timerRunning, setTimerRunning] = useState(true);

  // Reset state when challenge changes
  useEffect(() => {
    setCode(challenge.starterCode);
    setOutput("");
    setShowSuccess(false);
    setStartTime(Date.now());
    setCompletionTime(undefined);
    setTimerRunning(true);
  }, [challengeIndex, challenge.starterCode]);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("EXECUTING...");

    try {
      // Strip TypeScript types before execution
      const strippedCode = stripTypeScript(code);
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const userFunction = new AsyncFunction('return ' + strippedCode)();
      const fn = await userFunction;
      
      const results = challenge.tests.map((test, i) => {
        try {
          const result = fn(...test.input);
          const passed = JSON.stringify(result) === JSON.stringify(test.expected);
          return {
            testNum: i + 1,
            passed,
            input: test.input,
            expected: test.expected,
            actual: result,
          };
        } catch (e) {
          return {
            testNum: i + 1,
            passed: false,
            input: test.input,
            expected: test.expected,
            actual: `ERROR: ${e}`,
          };
        }
      });

      const allPassed = results.every(r => r.passed);
      
      let outputText = `RUNNING ${results.length} TESTS...\n\n`;
      results.forEach(r => {
        outputText += `TEST ${r.testNum}: ${r.passed ? "PASS" : "FAIL"}\n`;
        outputText += `  Input: ${JSON.stringify(r.input)}\n`;
        outputText += `  Expected: ${JSON.stringify(r.expected)}\n`;
        if (!r.passed) {
          outputText += `  Actual: ${JSON.stringify(r.actual)}\n`;
        }
        outputText += "\n";
      });

      if (allPassed) {
        outputText += "\nALL TESTS PASSED! ACCESS GRANTED.";
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        setCompletionTime(timeTaken);
        setTimerRunning(false);
        setShowSuccess(true);
        
        // Save completion time to database
        fetch('/api/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            challenge_index: challengeIndex,
            completion_time: timeTaken
          })
        });
        
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        outputText += "\nTESTS FAILED. ACCESS DENIED.";
      }

      setOutput(outputText);
    } catch (e) {
      setOutput(`SYNTAX ERROR: ${e}\n\nACCESS DENIED.`);
    }

    setIsRunning(false);
  }, [code, challenge, onComplete]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Timer isRunning={timerRunning} />
        <div className="text-terminal-dim text-sm">
          CHALLENGE {challengeIndex + 1} OF {challenges.length}
        </div>
      </div>
      
      <CompletionGraph challengeIndex={challengeIndex} userTime={completionTime} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="border border-terminal-dim p-4 mb-4 bg-terminal-bg">
            <h2 className="text-xl font-bold text-terminal-bright mb-2">
              CHALLENGE {challengeIndex + 1}: {challenge.title}
            </h2>
            <p className="text-terminal-dim mb-4">{challenge.description}</p>
            <div className="text-sm text-terminal-accent">
              <p>FUNCTION SIGNATURE:</p>
              <pre className="mt-2 text-terminal-fg">{challenge.signature}</pre>
            </div>
          </div>

        <div className="border border-terminal-dim bg-black/50">
          <div className="border-b border-terminal-dim p-2">
            <span className="text-terminal-accent">EDITOR.TS</span>
          </div>
          <Editor
            height="400px"
            defaultLanguage="typescript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "Golos Text, monospace",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <button
          onClick={runCode}
          disabled={isRunning}
          className="mt-4 w-full py-3 border border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-colors disabled:opacity-50"
        >
          {isRunning ? "EXECUTING..." : "RUN CODE [CTRL+ENTER]"}
        </button>
      </div>

      <div>
        <div className="border border-terminal-dim bg-black/50 h-full">
          <div className="border-b border-terminal-dim p-2">
            <span className="text-terminal-accent">OUTPUT</span>
          </div>
          <pre className="p-4 font-mono text-sm overflow-auto h-[calc(100%-3rem)] text-terminal-fg">
            {output || "AWAITING EXECUTION..."}
          </pre>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-terminal-bg/90 z-50"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-terminal-bright border-t-transparent rounded-full mx-auto mb-4"
              />
              <h2 className="text-3xl font-bold text-terminal-bright">
                CHALLENGE COMPLETE
              </h2>
              <p className="text-terminal-dim mt-2">LOADING NEXT CHALLENGE...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}