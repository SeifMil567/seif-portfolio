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

// Skill categories and their associated skills
const skillCategories = {
  frontend: [
    "react",
    "next js",
    "typescript",
    "javascript",
    "tailwind css",
    "html",
    "css",
    "vue",
    "angular",
  ],
  backend: [
    "node",
    "python",
    "django",
    "express",
    "fastapi",
    "nest",
    "java",
    "spring",
    "flask",
    "php",
    "node js",
  ],
  database: [
    "postgresql",
    "mongodb",
    "mysql",
    "redis",
    "drizzle",
    "prisma",
    "supabase",
    "sql",
    "sequelize",
  ],
  tools: ["git", "github", "docker", "kubernetes", "aws", "vercel", "firebase"],
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

  const categorizeSkills = (skills: Skill[]) => {
    const categorized = {
      frontend: [] as Skill[],
      backend: [] as Skill[],
      database: [] as Skill[],
      tools: [] as Skill[],
    };

    skills.forEach((skill) => {
      const name = skill.name.toLowerCase();
      if (skillCategories.frontend.includes(name)) {
        categorized.frontend.push(skill);
      } else if (skillCategories.backend.includes(name)) {
        categorized.backend.push(skill);
      } else if (skillCategories.database.includes(name)) {
        categorized.database.push(skill);
      } else {
        categorized.tools.push(skill);
      }
    });

    return categorized;
  };

  const categorizedSkills = categorizeSkills(skills);

  const categoryTitles = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    database: "Database & ORM",
    tools: "Tools & Platforms",
  };

  return (
    <div className="w-full h-screen pt-10">
      <div className="space-y-16">
        {Object.entries(categoryTitles).map(
          ([category, title], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="space-y-0"
            >
              <h3 className="text-xl font-bold text-slate-200 mb-3">{title}</h3>
              <div className="flex items-center justify-center gap-6">
                {categorizedSkills[
                  category as keyof typeof categorizedSkills
                ].map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative w-36 flex flex-col items-center p-4 bg-slate-600 hover:bg-slate-800/80 transition-all duration-300 [border-radius:60%_40%_30%_70%/60%_30%_70%_40%]"
                  >
                    <div className="relative w-16 h-16 mb-1">
                      <Image
                        src={getImageUrl(skill.image.asset._ref)}
                        alt={skill.name}
                        fill
                        className="object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
