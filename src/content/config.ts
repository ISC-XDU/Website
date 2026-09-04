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
    name: z.string(), // Web 组 / AI 组 / Agent 组 / ACM 组
    order: z.number().default(99),
    tagline: z.string().optional(),
    /** 简短口号（副标题），如 "网页与全栈开发" */
    pitch: z.string().optional(),
    /** 适合谁 / 招新条件 */
    forWhom: z.string().optional(),
    /** 主图（AI 生成的插画） */
    heroImage: z.string().optional(),
    /** 配色 accent（'inspur' | 'ai' | 'agent' | 'acm'） */
    accent: z.enum(['inspur', 'ai', 'agent', 'acm']).default('inspur'),
    /** "你将收获" 列表 */
    gains: z
      .array(
        z.object({
          title: z.string(),
          detail: z.string(),
        })
      )
      .optional(),
    /** 学习路径 / 工具栈 / 标签云 */
    bullets: z.array(z.string()).optional(),
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
