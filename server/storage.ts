import { type SiteConfig, type Category, type Product } from "@shared/schema";

export interface IStorage {
  getSiteConfig(): Promise<SiteConfig>;
  getCategories(): Promise<Category[]>;
  getProducts(): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private siteConfig: SiteConfig = {
    serverName: "ExampleMC",
    serverIP: "play.examplemc.com",
    logo: "/assets/logo.png",
    discord: "https://discord.gg/example",
    currency: ["INR", "USD"],
    defaultCurrency: "INR",
    theme: {
      primary: "#6c5ce7",
      secondary: "#1e1e2f",
      accent: "#a29bfe",
      background: "#0f0f1a",
    },
    backgroundAnimation: {
      enabled: true,
      type: "floatingParticles",
      density: 80,
      speed: 0.4,
    },
  };

  private categories: Category[] = [
    {
      id: "ranks",
      name: "Ranks",
      description: "Purchase powerful server ranks",
      bannerImage: "/assets/ranks.png",
      enabled: true,
    },
    {
      id: "coins",
      name: "Coins",
      description: "Buy coins for the server",
      bannerImage: "/assets/coins.png",
      enabled: true,
    },
  ];

  private products: Product[] = [
    {
      id: "vip_rank",
      name: "VIP Rank",
      categoryId: "ranks",
      priceINR: 299,
      priceUSD: 4.99,
      description: "Unlock VIP perks on the server",
      image: "/assets/vip.png",
      featured: true,
      checkoutURL: "https://checkout.tebex.io/example",
    },
    {
      id: "mvp_rank",
      name: "MVP Rank",
      categoryId: "ranks",
      priceINR: 599,
      priceUSD: 9.99,
      description: "Unlock MVP perks on the server",
      image: "/assets/mvp.png",
      featured: true,
      checkoutURL: "https://checkout.tebex.io/example",
    },
    {
      id: "1000_coins",
      name: "1000 Coins",
      categoryId: "coins",
      priceINR: 99,
      priceUSD: 1.99,
      description: "Get 1000 in-game coins",
      image: "/assets/coins.png",
      featured: false,
      checkoutURL: "https://checkout.tebex.io/example",
    },
  ];

  async getSiteConfig(): Promise<SiteConfig> {
    return this.siteConfig;
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getProducts(): Promise<Product[]> {
    return this.products;
  }
}

export const storage = new MemStorage();
