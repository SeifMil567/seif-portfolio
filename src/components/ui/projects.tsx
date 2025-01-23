"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BorderBeam } from "./border-beam";
import { motion } from "framer-motion";

interface Project {
  name: string;
  details: string;
  tech: string;
  img: string; // Comma-separated image names
  _id: string;
}

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22project%22%5D"
  );
  const { result } = await response.json();
  return result;
}

function ProjectImages({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-52 rounded-lg overflow-hidden group">
      <Image
        src={`/images/${images[currentImageIndex]}.png`} // Adjust path as needed
        alt="Project screenshot"
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-slate-900/80 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-slate-900/80 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? "bg-slate-200"
                    : "bg-slate-200/50"
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
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="w-full px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => {
          const images = project.img.split(",").map((img) => img.trim());

          return (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl bg-slate-100p overflow-hidden"
            >
              <BorderBeam
                size={400}
                duration={20}
                colorFrom="blue"
                colorTo="purple"
                delay={0.1}
              />

              <div className="relative z-10 flex flex-col h-full bg-slate-800 rounded-lg p-6 transition-transform duration-300 group-hover:scale-[0.99]">
                <ProjectImages images={images} />

                <div className="flex-1 space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-slate-100">
                    {project.name}
                  </h3>

                  <p className="text-lg text-slate-200 ">{project.details}</p>

                  <div className="flex flex-wrap gap-2 pt-2 my-auto">
                    {project.tech.split(",").map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute right-4 bottom-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
