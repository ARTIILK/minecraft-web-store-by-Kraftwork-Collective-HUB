import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import CatalogPage from "@/pages/CatalogPage";
import CheckoutPage from "@/pages/CheckoutPage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThreeBackground } from "@/components/ThreeBackground";
import { ThemeInjector } from "@/components/ThemeInjector";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

function Router() {
  const { fetchExchangeRate } = useStore();

  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      <Navbar />
      <main className="flex-1 w-full relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:categoryId">
            {(params) => <CatalogPage params={params} />}
          </Route>
          <Route path="/checkout" component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeInjector />
        <ThreeBackground />
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
