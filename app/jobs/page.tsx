"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const jobs = [
  {
    id: "frontend",
    title: "SENIOR FRONTEND ENGINEER",
    type: "FULL-TIME / REMOTE",
    description: "We need a cracked frontend engineer who can build blazing fast, beautiful interfaces. You'll be working on cutting-edge web applications using modern frameworks and technologies.",
    requirements: [
      "Expert-level TypeScript/JavaScript",
      "Deep understanding of React, Next.js, and modern frontend frameworks",
      "Experience with state management (Redux, Zustand, Jotai)",
      "CSS wizardry and animation skills",
      "Performance optimization obsession",
      "WebGL/Three.js experience is a plus",
    ],
    responsibilities: [
      "Build responsive, accessible web applications",
      "Optimize application performance and bundle sizes",
      "Implement complex UI/UX designs with precision",
      "Collaborate with backend engineers on API design",
      "Mentor junior developers",
    ],
  },
  {
    id: "fullstack",
    title: "SENIOR FULL STACK ENGINEER",
    type: "FULL-TIME / REMOTE",
    description: "Looking for a versatile engineer who can handle everything from database design to pixel-perfect UIs. You'll architect and build entire features from concept to deployment.",
    requirements: [
      "Strong TypeScript/JavaScript skills",
      "Experience with Node.js, Express, NestJS",
      "Database expertise (PostgreSQL, Redis, MongoDB)",
      "Frontend proficiency (React, Vue, or Angular)",
      "Cloud infrastructure knowledge (AWS/GCP/Azure)",
      "Docker and Kubernetes experience",
    ],
    responsibilities: [
      "Design and implement scalable backend services",
      "Build intuitive frontend interfaces",
      "Optimize database queries and architecture",
      "Implement CI/CD pipelines",
      "Make key architectural decisions",
    ],
  },
];

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApply, setShowApply] = useState(false);

  return (
    <main className="min-h-screen p-8 terminal-flicker">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-terminal-bright mb-4">
            ACCESS GRANTED
          </h1>
          <p className="text-terminal-dim">
            CONGRATULATIONS. YOU HAVE PROVEN YOUR SKILLS.
          </p>
          <p className="text-terminal-dim">
            SELECT A POSITION TO VIEW DETAILS.
          </p>
        </motion.div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`border p-6 cursor-pointer transition-all ${
                  selectedJob === job.id
                    ? "border-terminal-bright bg-terminal-accent/10"
                    : "border-terminal-dim hover:border-terminal-accent"
                }`}
                onClick={() => {
                  setSelectedJob(job.id);
                  setShowApply(false);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-terminal-bright">
                      {job.title}
                    </h2>
                    <p className="text-terminal-accent">{job.type}</p>
                  </div>
                  <div className="text-terminal-dim">
                    [{selectedJob === job.id ? "SELECTED" : "CLICK TO VIEW"}]
                  </div>
                </div>

                {selectedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-terminal-fg mb-6">{job.description}</p>

                    <div className="mb-6">
                      <h3 className="text-terminal-bright font-bold mb-3">
                        REQUIREMENTS:
                      </h3>
                      <ul className="space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-terminal-fg">
                            <span className="text-terminal-accent">▸</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-terminal-bright font-bold mb-3">
                        RESPONSIBILITIES:
                      </h3>
                      <ul className="space-y-1">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="text-terminal-fg">
                            <span className="text-terminal-accent">▸</span> {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowApply(true);
                      }}
                      className="w-full py-3 border border-terminal-bright text-terminal-bright hover:bg-terminal-bright hover:text-terminal-bg transition-colors"
                    >
                      APPLY FOR POSITION
                    </button>

                    {showApply && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-4 border border-terminal-accent bg-terminal-accent/10"
                      >
                        <p className="text-terminal-bright mb-2">
                          APPLICATION INSTRUCTIONS:
                        </p>
                        <p className="text-terminal-fg">
                          Send your resume and a link to your best work to:
                        </p>
                        <p className="text-terminal-bright font-mono mt-2">
                          careers@terminal-corp.dev
                        </p>
                        <p className="text-terminal-dim text-sm mt-2">
                          Include "TERMINAL-{job.id.toUpperCase()}" in the subject line
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-terminal-dim"
        >
          <p>TERMINAL CORP © 2024</p>
          <p className="mt-2">WE BUILD THE FUTURE</p>
        </motion.div>
      </div>
    </main>
  );
}