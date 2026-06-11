import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const queryKeys = {
  about: ["about"] as const,
  cv: ["cv"] as const,
  socials: ["socials"] as const,
  skills: ["skills"] as const,
  experiences: ["experiences"] as const,
  projects: ["projects"] as const,
};

export interface AboutData {
  name: string;
  title: string;
  brief: string;
  details: string;
}

export interface Social {
  _id: string;
  icon: string;
  link: string;
  name: string;
}

export interface Skill {
  _id: string;
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

export interface ExperienceItem {
  _id: string;
  position: string;
  details: string;
  tech: string;
  name: string;
  start: string;
  end?: string;
  link: string;
}

export interface Project {
  _id: string;
  name: string;
  details: string;
  tech: string;
  img: string;
}

export async function fetchAbout(): Promise<AboutData | null> {
  return client.fetch(`*[_type == "about"][0]`);
}

export async function fetchCV(): Promise<string | null> {
  const result: { cvUrl: string }[] = await client.fetch(
    `*[_type == "resume"]{ "cvUrl": cv.asset->url }`
  );
  return result.length > 0 ? result[0].cvUrl : null;
}

export async function fetchSocials(): Promise<Social[]> {
  return client.fetch(`*[_type == "social"]`);
}

export async function fetchSkills(): Promise<Skill[]> {
  return client.fetch(`*[_type == "skill"]`);
}

export async function fetchExperiences(): Promise<ExperienceItem[]> {
  return client.fetch(`*[_type == "experience"]`);
}

export async function fetchProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project"]`);
}

export function getSkillImageUrl(skill: Skill): string {
  return urlFor(skill.image).width(128).height(128).url();
}

export function sortExperiencesByStartDate(
  items: ExperienceItem[]
): ExperienceItem[] {
  return [...items].sort(
    (a, b) => parseInt(b.start, 10) - parseInt(a.start, 10)
  );
}
