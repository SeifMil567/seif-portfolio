import { defineField, defineType } from "sanity";

export const socialType = defineType({
  name: "social",
  title: "Social",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "string",
    }),
    defineField({
      name: "icon",
      type: "string",
    }),
  ],
});
