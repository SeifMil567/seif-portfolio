import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { aboutType } from "./aboutType";
import { socialType } from "./socialType";
import { experienceType } from "./experienceType";
import { skillType } from "./skillsTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, aboutType, experienceType, socialType, skillType],
};
export const schemaTypes = [
  projectType,
  aboutType,
  experienceType,
  socialType,
  skillType,
];
