import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { aboutType } from "./aboutType";
import { socialType } from "./socialType";
import { experienceType } from "./experienceType";
import { skillType } from "./skillsTypes";
import { resumeType } from "./resumeType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    aboutType,
    experienceType,
    socialType,
    skillType,
    resumeType,
  ],
};
export const schemaTypes = [
  projectType,
  aboutType,
  experienceType,
  socialType,
  skillType,
  resumeType,
];
