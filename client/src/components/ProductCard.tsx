import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@shared/schema";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { ExternalLink, Sparkles, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { currency } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const price = currency === 'USD' ? product.priceUSD : product.priceINR;
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const hasImage = product.image && product.image.trim() !== "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-card rounded-2xl border border-white/5 overflow-hidden hover-card-fx cursor-pointer flex flex-col h-full"
      >
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
              <Sparkles className="w-3 h-3 mr-1" />
              POPULAR
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
          
          {hasImage ? (
             <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain relative z-0 group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + product.name + '&background=random&size=256';
              }}
            />
          ) : (
            <Package className="w-20 h-20 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-700 z-0" />
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow z-20 -mt-6">
          <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
            {product.description || "No description provided."}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</span>
              <span className="font-display font-bold text-2xl text-white flex items-baseline">
                <span className="text-primary text-lg mr-1">{currencySymbol}</span>
                {price.toLocaleString()}
              </span>
            </div>
            
            <Button variant="secondary" className="rounded-xl font-bold bg-white/5 hover:bg-primary hover:text-white transition-all duration-300">
              Details
            </Button>
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
                  onClick={() => window.open(product.checkoutURL || '#', '_blank')}
                >
                  Purchase Now <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
