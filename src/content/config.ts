import { defineCollection, z } from 'astro:content';

const activities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional(),
    description: z.string().optional(),
  }),
});

const techGroups = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(), // ACM 组 / AI 组 / WEB 组 / 系统组
    order: z.number().default(99),
    tagline: z.string().optional(),
  }),
});

const thanks = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['company', 'club', 'teacher']),
    logo: z.string().optional(),
    url: z.string().url().optional(),
    email: z.string().email().optional(),
    order: z.number().default(99),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  activities,
  techGroups,
  thanks,
  pages,
};
