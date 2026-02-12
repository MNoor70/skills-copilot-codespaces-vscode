import { useDonations } from "@/hooks/use-donations";
import { motion } from "framer-motion";

export function DonationTicker() {
  const { data: donations } = useDonations();

  if (!donations || donations.length === 0) return null;

  return (
    <div className="bg-primary/5 py-3 overflow-hidden border-b border-primary/10">
      <div className="container mx-auto px-4 flex items-center">
        <span className="text-xs font-bold text-primary uppercase tracking-wider mr-4 whitespace-nowrap">
          Recent Contributions:
        </span>
        <div className="flex-1 overflow-hidden relative h-6">
          <motion.div
            className="flex gap-8 absolute whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
          >
            {[...donations, ...donations, ...donations].map((donation, i) => (
              <div key={`${donation.id}-${i}`} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold text-foreground">{donation.name}</span>
                <span>donated</span>
                <span className="font-bold text-primary">${(donation.amount / 100).toFixed(2)}</span>
                {donation.message && (
                  <span className="italic text-xs opacity-70 truncate max-w-[200px]">"{donation.message}"</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
