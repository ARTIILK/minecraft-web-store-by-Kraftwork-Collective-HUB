import { useSiteConfig, useCategories, useProducts } from "@/hooks/use-store-data";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Server, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: config, isLoading: isConfigLoading } = useSiteConfig();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts();

  const enabledCategories = categories?.filter(c => c.enabled) || [];

  // Loading State
  if (isConfigLoading || isCategoriesLoading || isProductsLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 max-w-7xl mx-auto space-y-20">
        <div className="space-y-6 text-center mt-20">
          <Skeleton className="h-16 w-3/4 max-w-2xl mx-auto rounded-2xl bg-white/5" />
          <Skeleton className="h-6 w-1/2 max-w-md mx-auto rounded-lg bg-white/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden flex flex-col items-center text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Official Store
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight text-glow">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
              {config?.serverName || "Our Server"}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enhance your gameplay, unlock exclusive ranks, and support the community. Secure checkout and instant delivery on all packages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#store-categories">
              <Button className="h-14 px-8 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:scale-105 transition-all duration-300">
                Browse Store <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Feature Tickers */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto mt-24 relative z-10"
        >
          <div className="flex items-center justify-center gap-3 bg-black/20 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-semibold text-white/90">Instant Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-black/20 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-semibold text-white/90">Secure Checkout</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-black/20 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
            <Server className="w-6 h-6 text-primary" />
            <span className="font-semibold text-white/90">24/7 Support</span>
          </div>
        </motion.div>
      </section>

      {/* Store Categories Container */}
      <div id="store-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {enabledCategories.length === 0 ? (
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <p className="text-xl text-muted-foreground font-medium">No categories available at the moment.</p>
          </div>
        ) : (
          enabledCategories.map((category, idx) => {
            const categoryProducts = products?.filter(p => p.categoryId === category.id) || [];
            
            if (categoryProducts.length === 0) return null; // Hide empty categories
            
            return (
              <section key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
                
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                      <h2 className="font-display text-4xl font-bold text-white">
                        {category.name}
                      </h2>
                    </div>
                    {category.description && (
                      <p className="text-muted-foreground text-lg ml-6">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-6 md:pl-0">
                    {categoryProducts.length} Packages
                  </div>
                </div>

                {/* Category Banner (Optional, if exists and valid) */}
                {category.bannerImage && category.bannerImage.trim() !== "" && (
                  <div className="w-full h-48 md:h-64 mb-12 rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
                    <img 
                      src={category.bannerImage} 
                      alt={`${category.name} Banner`} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product, pIdx) => (
                    <ProductCard key={product.id} product={product} index={pIdx} />
                  ))}
                </div>
                
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
