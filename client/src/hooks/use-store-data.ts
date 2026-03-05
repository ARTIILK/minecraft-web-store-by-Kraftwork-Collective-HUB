import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Safe JSON parser with logging for debugging
function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useSiteConfig() {
  return useQuery({
    queryKey: [api.config.site.path],
    queryFn: async () => {
      const res = await fetch(api.config.site.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 404) return null; // Handle missing config gracefully
        throw new Error("Failed to fetch site config");
      }
      const data = await res.json();
      return parseWithLogging(api.config.site.responses[200], data, "Site Config");
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [api.config.categories.path],
    queryFn: async () => {
      const res = await fetch(api.config.categories.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 404) return []; 
        throw new Error("Failed to fetch categories");
      }
      const data = await res.json();
      return parseWithLogging(api.config.categories.responses[200], data, "Categories");
    },
  });
}

export function useProducts() {
  return useQuery({
    queryKey: [api.config.products.path],
    queryFn: async () => {
      const res = await fetch(api.config.products.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return parseWithLogging(api.config.products.responses[200], data, "Products");
    },
  });
}
