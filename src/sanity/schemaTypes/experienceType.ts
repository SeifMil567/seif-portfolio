import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "position",
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
      name: "start",
      type: "string",
    }),
    defineField({
      name: "end",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "string",
    }),
  ],
});
