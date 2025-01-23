"use client";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Skill {
  _id: string;
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

// Helper function to get Sanity image URL
function getImageUrl(ref: string): string {
  return `https://cdn.sanity.io/images/kyu37vb9/production/${ref
    .replace("image-", "")
    .replace("-svg", ".svg")
    .replace("-png", ".png")}`;
}

// Skill categories
const skillCategories = {
  frontend: ["react", "next js", "typescript", "javascript", "tailwind css"],
  backend: [
    "node js",
    "python",
    "django",
    "express",
    "fastapi",
    "flask",
    "php",
  ],
  database: ["postgresql", "mongodb", "mysql", "redis", "drizzle", "sequelize"],
  tools: ["git", "github", "docker", "aws", "vercel", "firebase"],
};

async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22skill%22%5D"
  );
  const { result } = await response.json();
  return result;
}

export function SkillsSection() {
  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  // Categorize skills
  const categorizedSkills = Object.keys(skillCategories).reduce(
    (acc, key) => {
      acc[key] = skills.filter((skill) =>
        skillCategories[key as keyof typeof skillCategories].includes(
          skill.name.toLowerCase()
        )
      );
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const categoryTitles = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    database: "Database & ORM",
    tools: "Tools & Platforms",
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {Object.entries(categoryTitles).map(([category, title], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="space-y-6"
          >
            <h3 className=" sm:text-xl md:text-xl lg:text-2xl text-slate-400 text-center">
              {title}
            </h3>

            {/* Skills Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center"
            >
              {categorizedSkills[category]?.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative flex flex-col items-center p-4 bg-slate-800/50 border border-slate-700 shadow-lg backdrop-blur-lg rounded-2xl transition-all duration-300 hover:shadow-cyan-500/30"
                >
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={getImageUrl(skill.image.asset._ref)}
                      alt={skill.name}
                      fill
                      className="object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
