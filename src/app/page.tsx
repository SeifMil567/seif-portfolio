"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/hero";
import { TimelineDemo } from "@/components/ui/realTimeLine";
import { ProjectsSection } from "@/components/ui/projects";
import { Footer } from "@/components/ui/footer";
import { SkillsSection } from "@/components/ui/skills";
import SpotlightCursor from "@/components/ui/spotLightCursor";

export default function IndexPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-950">
        <main className="flex-grow bg-slate-950">
          {/* Spotlight Cursor Effect */}
          <SpotlightCursor />

          {/* Hero Section */}
          <div className="min-h-screen flex items-center justify-center px-4">
            <HeroSection />
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-white">
              Skills & Technologies
            </h2>
            <SkillsSection />
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden px-4"
          >
            <div className="relative max-w-7xl mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10">
              <TimelineDemo />
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-white">
              Projects
            </h2>
            <div className="relative max-w-7xl mx-auto mt-4 sm:mt-6 md:mt-10">
              <ProjectsSection />
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
