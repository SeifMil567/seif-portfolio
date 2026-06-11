"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BorderBeam } from "./border-beam";
import { motion, useReducedMotion } from "framer-motion";
import { fetchProjects, queryKeys } from "@/lib/sanity/queries";
import { ProjectsSkeleton } from "@/components/ui/skeleton";

function ProjectImages({
  images,
  projectName,
}: {
  images: string[];
  projectName: string;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-44 sm:h-52 rounded-lg overflow-hidden group">
      <Image
        src={`/images/${images[currentImageIndex]}.png`}
        alt={`${projectName} screenshot ${currentImageIndex + 1} of ${images.length}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5"
            role="tablist"
            aria-label={`${projectName} images`}
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentImageIndex}
                aria-label={`Image ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${
                  index === currentImageIndex
                    ? "bg-slate-200"
                    : "bg-slate-200/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => {
          const images = project.img.split(",").map((img) => img.trim());

          return (
            <motion.article
              key={project._id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden"
            >
              <BorderBeam
                size={400}
                duration={20}
                colorFrom="#3b82f6"
                colorTo="#a855f7"
                delay={0.1}
              />

              <div className="relative z-10 flex flex-col h-full bg-slate-800 border border-slate-700/50 rounded-xl p-6 transition-colors duration-300 group-hover:border-slate-600">
                <ProjectImages images={images} projectName={project.name} />

                <div className="flex-1 space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-slate-100">
                    {project.name}
                  </h3>

                  <p className="text-base text-slate-300 leading-relaxed">
                    {project.details}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.split(",").map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full bg-slate-700 text-slate-200"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
