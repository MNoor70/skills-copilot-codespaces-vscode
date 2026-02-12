import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DonationModal } from "./DonationModal";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", to: "about" },
    { name: "Features", to: "features" },
    { name: "Stories", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-gray-100"
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer font-display font-bold text-2xl text-primary">
          <HeartHandshake className="h-8 w-8" />
          <span>HopeFund</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              offset={-80}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {link.name}
            </ScrollLink>
          ))}
          <DonationModal
            trigger={
              <Button size="sm" className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg">
                Donate Now
              </Button>
            }
          />
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-10">
              {links.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  className="text-lg font-medium hover:text-primary cursor-pointer"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <div className="mt-4">
                <DonationModal
                  trigger={
                    <Button className="w-full rounded-full" size="lg">
                      Donate Now
                    </Button>
                  }
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
