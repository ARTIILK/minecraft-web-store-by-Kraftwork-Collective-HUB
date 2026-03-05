import { ChevronRight, Server, ShieldCheck, Zap, Copy, Check, Users, Sparkles, TrendingUp, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig, useCategories, useProducts } from "@/hooks/use-store-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "wouter";

export default function CatalogPage({ params }: { params: { categoryId: string } }) {
    const { categoryId } = params;
    const { data: config, isLoading: isConfigLoading } = useSiteConfig();
    const { data: categories, isLoading: isCategoriesLoading } = useCategories();
    const { data: products, isLoading: isProductsLoading } = useProducts();
    const { toast } = useToast();

    const category = categories?.find(c => c.id === categoryId);
    const categoryProducts = products?.filter(p => p.categoryId === categoryId) || [];

    // Loading State
    if (isConfigLoading || isCategoriesLoading || isProductsLoading) {
        return (
            <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto space-y-20">
                <div className="space-y-6 text-center">
                    <Skeleton className="h-16 w-3/4 max-w-2xl mx-auto rounded-3xl bg-white/5" />
                    <Skeleton className="h-6 w-1/2 max-w-md mx-auto rounded-xl bg-white/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-96 w-full rounded-[2rem] bg-white/5" />
                    ))}
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-black text-white mb-4 italic">Category Not Found</h1>
                <p className="text-white/60 mb-8">The category you are looking for does not exist or has been removed.</p>
                <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 font-bold transition-all hover:scale-105 active:scale-95">
                        Return Home
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen pb-20 pt-32">
            {/* Category Header */}
            <header className="relative mb-20 px-4">
                <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] border border-white/5 glass-panel p-12 md:p-24 text-center">
                    {/* Ambient Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 space-y-6"
                    >
                        <span className="text-xs text-primary font-black uppercase tracking-[0.4em]">Official Store</span>
                        <h1 className="font-display text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase">
                            {category.name}
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium tracking-tight">
                            {category.description}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6 mb-12">
                    <div className="h-1 w-20 bg-primary/30 rounded-full" />
                    <h2 className="font-display text-2xl font-black text-white tracking-tight italic uppercase">
                        Available Items
                    </h2>
                    <div className="flex-grow h-px bg-white/5" />
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">
                        {categoryProducts.length} Items Found
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoryProducts.map((product, pIdx) => (
                        <ProductCard key={product.id} product={product} index={pIdx} />
                    ))}
                </div>

                {categoryProducts.length === 0 && (
                    <div className="text-center py-40 glass-panel rounded-[2rem] border-white/5">
                        <p className="text-white/40 font-medium">No products currently available in this category.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
