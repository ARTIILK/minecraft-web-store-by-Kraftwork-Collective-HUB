import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { cart, currency, updateQuantity, removeFromCart, getTotal, exchangeRate } = useStore();
    const currencySymbol = currency === 'USD' ? '$' : '₹';

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md bg-card/95 backdrop-blur-2xl border-l-white/10 p-0 flex flex-col">
                <SheetHeader className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <SheetTitle className="text-2xl font-black text-white italic uppercase tracking-tighter">Your Bag</SheetTitle>
                            <p className="text-white/40 text-sm font-medium">{cart.length} items collected</p>
                        </div>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 p-8">
                    {cart.length === 0 ? (
                        <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                                <ShoppingCart className="w-10 h-10" />
                            </div>
                            <p className="text-white/40 font-medium">Your cart is empty.</p>
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-white/10 text-white"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="group relative flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                    <div className="h-20 w-20 rounded-xl bg-black/40 p-2 flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + item.name + '&background=random';
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0 py-1">
                                        <h4 className="text-white font-bold truncate pr-8">{item.name}</h4>
                                        <p className="text-primary font-bold">
                                            {currencySymbol}{(currency === 'USD' ? item.priceUSD : (item.priceUSD * exchangeRate)).toLocaleString()}
                                        </p>

                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="h-8 w-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="h-8 w-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {cart.length > 0 && (
                    <SheetFooter className="p-8 bg-black/40 border-t border-white/5 sm:flex-col gap-6">
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-white/60">
                                <span>Subtotal</span>
                                <span>{currencySymbol}{getTotal().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-white text-xl font-black italic uppercase">
                                <span>Total</span>
                                <span className="text-primary">{currencySymbol}{getTotal().toLocaleString()}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="w-full" onClick={() => onOpenChange(false)}>
                            <Button className="w-full h-16 text-lg font-black rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 border-none uppercase tracking-tighter italic">
                                Checkout Now <ArrowRight className="w-6 h-6 ml-2" />
                            </Button>
                        </Link>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
