import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "details",
      type: "string",
    }),
    defineField({
      name: "tech",
      type: "string",
    }),
    defineField({
      name: "img",
      type: "string",
    }),
  ],
});
