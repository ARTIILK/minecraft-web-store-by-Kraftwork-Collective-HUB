import { type SiteConfig, type Category, type Product } from "@shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, "data.json");

export interface IStorage {
  getSiteConfig(): Promise<SiteConfig>;
  getCategories(): Promise<Category[]>;
  getProducts(): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private async loadData() {
    try {
      const content = fs.readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.error("Error loading data.json:", error);
      return null;
    }
  }

  async getSiteConfig(): Promise<SiteConfig> {
    const data = await this.loadData();
    return data?.siteConfig;
  }

  async getCategories(): Promise<Category[]> {
    const data = await this.loadData();
    return data?.categories || [];
  }

  async getProducts(): Promise<Product[]> {
    const data = await this.loadData();
    return data?.products || [];
  }
}

export const storage = new MemStorage();
