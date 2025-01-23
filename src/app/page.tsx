"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/hero";
import { TimelineDemo } from "@/components/ui/realTimeLine";
import { ProjectsSection } from "@/components/ui/projects";
import { Footer } from "@/components/ui/footer";
import { SkillsSection } from "@/components/ui/skills";

export default function IndexPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-950">
        <main className="flex-grow bg-slate-950">
          <div className="h-screen flex items-center justify-center">
            <HeroSection />
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=" text-center"
          >
            <h2 className="text-lg md:text-4xl text-center text-white dark:text-white">
              Skills & Technologies
            </h2>
            <SkillsSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative w-full mt-8 overflow-hidden rounded-lg">
              <TimelineDemo />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg md:text-4xl mb-4 text-center text-white dark:text-white">
              Projects
            </h2>
            <div className="relative w-full mt-10 overflow-hidden">
              <ProjectsSection />
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
