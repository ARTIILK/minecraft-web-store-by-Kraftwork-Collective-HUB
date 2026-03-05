import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.config.site.path, async (req, res) => {
    const config = await storage.getSiteConfig();
    res.json(config);
  });

  app.get(api.config.categories.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get(api.config.products.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  return httpServer;
}
