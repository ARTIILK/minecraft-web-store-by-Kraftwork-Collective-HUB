import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@shared/schema";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ExternalLink, Sparkles, Package, ChevronRight, Copy, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { currency, addToCart, exchangeRate } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const price = currency === 'USD' ? product.priceUSD : (product.priceUSD * exchangeRate);
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const hasImage = product.image && product.image.trim() !== "";

  const handleAddToCart = () => {
    addToCart(product);
    setIsModalOpen(false);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your bag.`,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-card/40 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden hover-card-fx glow-border cursor-pointer flex flex-col h-full"
      >
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-6 right-6 z-20">
            <div className="bg-primary/20 backdrop-blur-md text-primary text-[10px] tracking-[0.2em] font-black px-4 py-2 rounded-full flex items-center border border-primary/30 uppercase">
              <Sparkles className="w-3 h-3 mr-2" />
              Featured
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80 z-10" />

          {hasImage ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain relative z-0 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + product.name + '&background=random&size=256';
              }}
            />
          ) : (
            <Package className="w-24 h-24 text-primary/20 group-hover:scale-110 transition-transform duration-1000 z-0" />
          )}
        </div>

        {/* Content */}
        <div className="p-8 pt-0 flex flex-col flex-grow z-20">
          <h3 className="font-display font-black text-2xl text-white mb-2 group-hover:text-primary transition-colors tracking-tight">
            {product.name}
          </h3>
          <p className="text-muted-foreground/80 text-sm line-clamp-2 mb-8 flex-grow leading-relaxed font-medium">
            {product.description || "No description provided."}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">Starting from</span>
              <span className="font-display font-black text-3xl text-white flex items-baseline tracking-tighter">
                <span className="text-primary text-xl mr-1 opacity-80">{currencySymbol}</span>
                {price.toLocaleString()}
              </span>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-2xl border-white/10 p-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
          <div className="grid grid-cols-1 sm:grid-cols-5 h-full">

            {/* Modal Image */}
            <div className="col-span-2 bg-black/40 relative flex items-center justify-center p-8 min-h-[250px] sm:min-h-full border-b sm:border-b-0 sm:border-r border-white/5">
              {hasImage ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-contain drop-shadow-[0_0_30px_rgba(var(--primary),0.3)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + product.name + '&background=random&size=256';
                  }}
                />
              ) : (
                <Package className="w-24 h-24 text-muted-foreground/20" />
              )}
            </div>

            {/* Modal Content */}
            <div className="col-span-3 p-8 flex flex-col">
              <DialogHeader className="text-left space-y-4 mb-6">
                <div>
                  <DialogTitle className="font-display text-3xl font-bold text-white leading-tight">
                    {product.name}
                  </DialogTitle>
                  <div className="inline-flex items-center mt-3 bg-primary/10 text-primary px-3 py-1 rounded-lg border border-primary/20 font-mono font-bold text-xl">
                    {currencySymbol}{price.toLocaleString()}
                  </div>
                </div>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {product.description || "No description provided for this item."}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-auto pt-6 flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                  onClick={handleAddToCart}
                >
                  Add to Cart <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
