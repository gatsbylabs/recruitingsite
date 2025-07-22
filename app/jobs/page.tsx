"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CompletionGraph from "@/components/CompletionGraph";
import { challenges } from "@/lib/challenges";

const jobs = [
  {
    id: "frontend",
    title: "LEAD FRONTEND ENGINEER",
    type: "FULL-TIME / REMOTE",
    description: "Gatsby Labs is looking for a Lead Frontend Engineer to drive the next chapter of our product development. You'll architect cutting-edge frontend systems, shape our technical vision, and raise engineering excellence across the team.",
    requirements: [
      "4-6 years building SaaS web applications",
      "Expert in React Hooks and component system design",
      "Performance-focused UI development experience",
      "Advanced frontend architecture skills",
      "Ability to mentor and elevate other engineers",
      "Entrepreneurial mindset with intellectual curiosity",
    ],
    responsibilities: [
      "Own frontend architecture and lead component system evolution",
      "Collaborate with Design to blur lines between code and craft",
      "Balance speed with quality in a fast-paced environment",
      "Define and refine frontend standards and tooling",
      "Work with React, styled-components, WebSockets, and REST APIs",
    ],
  },
  {
    id: "fullstack",
    title: "FULL STACK ENGINEER",
    type: "FULL-TIME / REMOTE",
    description: "Gatsby Labs is looking for a Full Stack Engineer who loves solving real problems with fast, scalable solutions. Join our venture-backed startup focused on enabling organizations to connect and build relationships through our flagship product, Gatsby Events.",
    requirements: [
      "Degree in technical field (CS, EE, Math)",
      "4+ years building web applications",
      "Strong skills in Node, React, and GraphQL",
      "Experience with Redis, MongoDB, and Postgres",
      "AWS, Docker, and Kubernetes proficiency",
      "Entrepreneurial mindset with ability to work autonomously",
    ],
    responsibilities: [
      "Build, ship, and maintain product features across the full stack",
      "Collaborate with design and product to prototype and validate ideas",
      "Troubleshoot and resolve production issues",
      "Help shape engineering culture and raise the technical bar",
      "Work with Terraform/EKS infrastructure",
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
          <p className="text-terminal-dim mb-8">
            SELECT A POSITION TO VIEW DETAILS.
          </p>
          
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold text-terminal-accent">
              CHALLENGE STATISTICS
            </h2>
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-terminal-bright mb-2">
                  {challenge.title}
                </h3>
                <CompletionGraph challengeIndex={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-bold text-terminal-accent">
            OPEN POSITIONS
          </h2>
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              <div
                className={`border p-6 cursor-pointer transition-all ${
                  selectedJob === job.id
                    ? "border-terminal-bright bg-terminal-accent/10"
                    : "border-terminal-dim hover:border-terminal-accent"
                }`}
                onClick={() => {
                  setSelectedJob(job.id);
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

                    <div className="mb-6 p-4 border border-terminal-accent bg-terminal-accent/10">
                      <h3 className="text-terminal-bright font-bold mb-2">
                        HOW TO APPLY:
                      </h3>
                      <p className="text-terminal-fg mb-2">
                        Email your resume and specify which position you&apos;re interested in to:
                      </p>
                      <a 
                        href="mailto:eng@gatsby.events"
                        className="text-terminal-bright font-mono hover:text-terminal-accent transition-colors underline"
                      >
                        eng@gatsby.events
                      </a>
                    </div>

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
                          eng@gatsby.events
                        </p>
                        <p className="text-terminal-dim text-sm mt-2">
                          Include &quot;TERMINAL-{job.id.toUpperCase()}&quot; in the subject line
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
          <p>GATSBY EVENTS © 2025</p>
          <p className="mt-2">WE BUILD THE FUTURE</p>
        </motion.div>
      </div>
    </main>
  );
}
