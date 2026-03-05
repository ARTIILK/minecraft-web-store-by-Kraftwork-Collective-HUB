import { ChevronRight, Server, ShieldCheck, Zap, Copy, Check, Users, Sparkles, TrendingUp, Trophy, Star, Shield, Layout, Palette, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig, useCategories, useProducts } from "@/hooks/use-store-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "wouter";

export default function Home() {
  const { data: config, isLoading: isConfigLoading } = useSiteConfig();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const enabledCategories = categories?.filter(c => c.enabled) || [];

  const copyIP = () => {
    if (config?.serverIP) {
      const text = config.serverIP;
      const onSuccess = () => {
        setCopied(true);
        toast({
          title: "IP Copied!",
          description: "The server IP has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
          // Fallback if promise fails
          copyToClipboardFallback(text, onSuccess);
        });
      } else {
        copyToClipboardFallback(text, onSuccess);
      }
    }
  };

  const copyToClipboardFallback = (text: string, cb: () => void) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      cb();
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  // Loading State
  if (isConfigLoading || isCategoriesLoading || isProductsLoading) {
    return (
      <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto space-y-20">
        <div className="space-y-6 text-center mt-20">
          <Skeleton className="h-16 w-3/4 max-w-2xl mx-auto rounded-3xl bg-white/5" />
          <Skeleton className="h-6 w-1/2 max-w-md mx-auto rounded-xl bg-white/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-96 w-full rounded-[2rem] bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const featuredProducts = products?.filter(p => p.featured) || [];

  return (
    <div className="relative w-full min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 px-4 flex flex-col items-center text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 max-w-5xl mx-auto space-y-12"
        >
          {config?.logo && (
            <motion.img
              src={config.logo}
              alt="Logo"
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 drop-shadow-[0_0_50px_rgba(var(--primary),0.5)] cursor-pointer"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}

          <div className="space-y-6">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter text-glow uppercase italic">
              {config?.serverName || "Our Server"}
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium tracking-tight">
              A premium Minecraft experience where innovation meets community. Join us to discover a world of endless possibilities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <div
              onClick={copyIP}
              className="group cursor-pointer flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl hover:border-primary/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">Server IP</span>
                <span className="font-display font-black text-xl text-white tracking-tight">{config?.serverIP || "play.example.com"}</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </div>
            </div>

            <a href="#store">
              <Button className="h-20 px-10 text-xl font-black rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-[0_20px_50px_rgba(var(--primary),0.4)] hover:scale-105 active:scale-95 transition-all duration-500 border-none uppercase tracking-tighter italic">
                Get Started <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Featured Features Section (FirmMC/AppleMC style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Premium Protection", desc: "Our servers are backed by world-class DDoS protection and custom anti-cheat systems." },
            { icon: Layout, title: "Custom Content", desc: "Experience unique plugins and gameplay mechanics that you won't find anywhere else." },
            { icon: Palette, title: "Unique Aesthetics", desc: "The most beautiful server environments designed for maximum immersion and performance." },
            { icon: Heart, title: "Community First", desc: "Active staff, regular events, and a welcoming community that's like a second home." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] glass-panel border-white/5 space-y-4 text-center group"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tight uppercase">{item.title}</h3>
              <p className="text-white/40 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Store Section */}
      <section id="store" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10 scroll-mt-32">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs text-primary font-black uppercase tracking-[0.4em]">Official Store</span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Featured Items</h2>
          </div>
          <p className="text-white/40 max-w-sm text-center md:text-right font-medium leading-relaxed">
            Enhance your gameplay with our handpicked selection of top-tier ranks, bundles, and cosmetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-xs text-accent font-black uppercase tracking-[0.4em]">Explore Categories</span>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Store Departments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enabledCategories.map((category, idx) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-96 rounded-[3rem] overflow-hidden border border-white/5 glass-panel cursor-pointer shadow-2xl hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
                {category.bannerImage ? (
                  <img
                    src={category.bannerImage}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                )}

                <div className="absolute bottom-10 left-10 right-10 z-20 space-y-2">
                  <div className="h-1 w-12 bg-primary rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  <h3 className="font-display text-4xl font-black text-white tracking-tighter italic uppercase group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/60 font-medium tracking-tight line-clamp-2 max-w-sm">
                    {category.description}
                  </p>
                </div>

                <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community & Stats Section (FirmMC/AppleMC style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10">
        <div className="glass-panel p-12 md:p-24 rounded-[4rem] text-center space-y-16 border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 blur-[150px] pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <h2 className="font-display text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase">Join Our Community</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium tracking-tight">
              Connect with thousands of players on our Discord server. Get updates, instant support, and participate in exclusive events and giveaways.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { icon: Users, value: "15k+", label: "Active Members" },
              { icon: TrendingUp, value: "24/7", label: "Server Uptime" },
              { icon: Trophy, value: "Weekly", label: "Tournaments" },
              { icon: Star, value: "Premium", label: "Ranks & Items" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-primary flex justify-center mb-4"><stat.icon className="w-6 h-6" /></div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter italic">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-black">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-8">
            <a href={config?.discord} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-20 px-12 text-xl font-black rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-500 hover:scale-105 active:scale-95 border-none uppercase tracking-tighter italic shadow-[0_20px_50px_rgba(88,101,242,0.4)]">
                Launch Discord
              </Button>
            </a>
            <Button
              onClick={copyIP}
              variant="outline"
              className="w-full sm:w-auto h-20 px-12 text-xl font-black rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-500 hover:scale-105 active:scale-95 uppercase tracking-tighter italic"
            >
              Play with us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
