"use client";

import React from "react";
import { HeroSection } from "@/components/ui/hero";
import { TimelineDemo } from "@/components/ui/realTimeLine";
import { ProjectsSection } from "@/components/ui/projects";
import { Footer } from "@/components/ui/footer";
import { SkillsSection } from "@/components/ui/skills";
import { Navigation } from "@/components/ui/nav";
import SpotlightCursor from "@/components/ui/spotLightCursor";
import {
  SectionReveal,
  sectionHeadingClass,
} from "@/components/ui/section-reveal";

export default function IndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-700 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <Navigation />
      <SpotlightCursor />

      <main id="main-content" className="flex-grow bg-slate-950">
        <section
          id="home"
          aria-label="Introduction"
          className="scroll-mt-20"
        >
          <HeroSection />
        </section>

        <section
          id="skills"
          aria-labelledby="skills-heading"
          className="py-16 md:py-28 px-4 scroll-mt-16 sm:scroll-mt-20"
        >
          <SectionReveal className="max-w-7xl mx-auto">
            <h2 id="skills-heading" className={sectionHeadingClass}>
              Skills & Technologies
            </h2>
            <SkillsSection />
          </SectionReveal>
        </section>

        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="py-16 md:py-28 px-4 scroll-mt-16 sm:scroll-mt-20 overflow-hidden"
        >
          <SectionReveal className="max-w-7xl mx-auto">
            <h2 id="experience-heading" className={sectionHeadingClass}>
              Work Experience
            </h2>
            <div className="mt-8 sm:mt-12">
              <TimelineDemo />
            </div>
          </SectionReveal>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="py-16 md:py-28 px-4 scroll-mt-16 sm:scroll-mt-20"
        >
          <SectionReveal delay={0.1} className="max-w-7xl mx-auto">
            <h2 id="projects-heading" className={sectionHeadingClass}>
              Projects
            </h2>
            <div className="mt-8 sm:mt-12">
              <ProjectsSection />
            </div>
          </SectionReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
