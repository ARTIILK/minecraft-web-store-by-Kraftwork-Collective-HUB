import { z } from "zod";

export const siteThemeSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
});

export const backgroundAnimationSchema = z.object({
  enabled: z.boolean(),
  type: z.string(),
  density: z.number(),
  speed: z.number(),
});

export const siteConfigSchema = z.object({
  serverName: z.string(),
  serverIP: z.string(),
  logo: z.string(),
  discord: z.string(),
  currency: z.array(z.string()),
  defaultCurrency: z.string(),
  theme: siteThemeSchema,
  backgroundAnimation: backgroundAnimationSchema,
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  bannerImage: z.string(),
  enabled: z.boolean(),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
  priceINR: z.number(),
  priceUSD: z.number(),
  description: z.string(),
  image: z.string(),
  featured: z.boolean(),
  checkoutURL: z.string(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
