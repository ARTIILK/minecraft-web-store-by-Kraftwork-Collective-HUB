import { useSiteConfig } from "@/hooks/use-store-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Terminal, Gamepad2, Disc } from "lucide-react";

export function Footer() {
  const { data: config } = useSiteConfig();
  const { toast } = useToast();

  const handleCopyIP = () => {
    if (config?.serverIP) {
      navigator.clipboard.writeText(config.serverIP);
      toast({
        title: "IP Copied!",
        description: `${config.serverIP} has been copied to your clipboard.`,
        duration: 3000,
      });
    }
  };

  return (
    <footer className="mt-24 border-t border-white/10 bg-card/40 backdrop-blur-md relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Server Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="font-display font-bold text-2xl text-white">
                {config?.serverName || "Store"}
              </span>
            </div>
            <p className="text-muted-foreground text-center md:text-left text-sm max-w-xs">
              The ultimate premium experience for our players. Support the server and unlock exclusive perks today.
            </p>
          </div>

          {/* Copy IP Action */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Join the adventure
            </span>
            <Button 
              onClick={handleCopyIP}
              className="group relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 hover:border-primary/50 text-white h-14 px-8 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              <Terminal className="w-5 h-5 mr-3 text-primary group-hover:animate-pulse" />
              <span className="font-mono text-lg tracking-wide">{config?.serverIP || "play.example.com"}</span>
              <div className="w-[1px] h-6 bg-white/20 mx-4" />
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
            </Button>
          </div>

          {/* Socials & Discord */}
          <div className="flex flex-col items-center md:items-end gap-4">
             <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Community
            </span>
            {config?.discord ? (
              <a href={config.discord} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white border-none shadow-lg shadow-[#5865F2]/20 h-12 px-6">
                  <Disc className="w-5 h-5 mr-2" />
                  Join our Discord
                </Button>
              </a>
            ) : (
              <Button disabled className="rounded-xl bg-white/5 text-muted-foreground h-12 px-6">
                Discord Unavailable
              </Button>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {config?.serverName || "Minecraft Server"}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center sm:text-right max-w-sm">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
