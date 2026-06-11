"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  fetchSkills,
  getSkillImageUrl,
  queryKeys,
  type Skill,
} from "@/lib/sanity/queries";
import { SkillsSkeleton } from "@/components/ui/skeleton";

const skillCategorySets = {
  frontend: new Set(["react", "next js", "typescript", "javascript", "tailwind css"]),
  backend: new Set(["node js", "python", "django", "express", "fastapi", "flask", "php"]),
  database: new Set(["postgresql", "mongodb", "mysql", "redis", "drizzle", "sequelize"]),
  tools: new Set(["git", "github", "docker", "aws", "vercel", "firebase"]),
};

const categoryTitles = {
  frontend: "Frontend Development",
  backend: "Backend Development",
  database: "Database & ORM",
  tools: "Tools & Platforms",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
const cardHover = { scale: 1.05, transition: { duration: 0.2 } };
const staggerVariants = { visible: { transition: { staggerChildren: 0.1 } } };

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  const { data: skills = [], isLoading } = useQuery({
    queryKey: queryKeys.skills,
    queryFn: fetchSkills,
  });

  const categorizedSkills = useMemo(
    () =>
      Object.keys(skillCategorySets).reduce(
        (acc, key) => {
          acc[key] = skills.filter((skill) =>
            skillCategorySets[key as keyof typeof skillCategorySets].has(
              skill.name.toLowerCase()
            )
          );
          return acc;
        },
        {} as Record<string, Skill[]>
      ),
    [skills]
  );

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  return (
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {Object.entries(categoryTitles).map(([category, title], index) => (
          <motion.div
            key={category}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl text-slate-400 text-center font-medium">
              {title}
            </h3>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={prefersReducedMotion ? undefined : staggerVariants}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            >
              {categorizedSkills[category]?.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={prefersReducedMotion ? undefined : cardVariants}
                  whileHover={prefersReducedMotion ? undefined : cardHover}
                  className="group flex flex-col items-center gap-2 p-4 bg-slate-800/50 border border-slate-700 shadow-lg backdrop-blur-lg rounded-2xl transition-shadow duration-300 hover:shadow-cyan-500/20 hover:border-slate-600"
                  aria-label={skill.name}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                    <Image
                      src={getSkillImageUrl(skill)}
                      alt=""
                      fill
                      className="object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                      sizes="64px"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 text-center font-medium transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
