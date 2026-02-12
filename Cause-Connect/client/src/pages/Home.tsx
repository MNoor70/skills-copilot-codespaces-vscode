import { motion } from "framer-motion";
import { ShieldCheck, Users, TrendingUp, Quote, Mail, MapPin, Phone } from "lucide-react";
import { DonationModal } from "@/components/DonationModal";
import { Navigation } from "@/components/Navigation";
import { DonationTicker } from "@/components/DonationTicker";
import { ContactForm } from "@/components/ContactForm";
import { useTestimonials } from "@/hooks/use-testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  const { data: testimonials } = useTestimonials();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-2/3 bg-gradient-to-tr from-secondary/40 to-transparent rounded-tr-[100px]" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6">
                Community Driven Support
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                Giving Hope, <span className="text-gradient">Changing Lives</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join a community dedicated to making a real impact. Your contribution provides essential support to those who need it most, with full transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <DonationModal />
                <button 
                  className="px-8 py-3 rounded-full font-semibold border-2 border-primary/20 hover:bg-primary/5 transition-colors text-primary"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <DonationTicker />

      {/* About / Impact Stats */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Lives Impacted", value: "10k+", desc: "Direct beneficiaries of your support" },
              { label: "Funds Raised", value: "$2.5M", desc: "For critical community projects" },
              { label: "Volunteers", value: "500+", desc: "Dedicated people on the ground" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-display">{stat.value}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-muted-foreground text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why Choose HopeFund?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in transparency, direct action, and the power of community to solve complex challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "100% Transparency",
                desc: "Track every dollar. We provide detailed reports on how funds are utilized so you can give with confidence."
              },
              {
                icon: TrendingUp,
                title: "Direct Impact",
                desc: "We minimize overhead costs ensuring maximum resources reach the beneficiaries directly."
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Projects are identified and managed by local community leaders who understand the real needs."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full border-none shadow-lg shadow-primary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Stories of Change</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from the people whose lives have been transformed by your generosity.
            </p>
          </motion.div>

          {testimonials && testimonials.length > 0 ? (
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((t) => (
                  <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/2 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-md h-full flex flex-col">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />
                      <p className="text-lg text-muted-foreground mb-6 flex-grow italic">"{t.content}"</p>
                      <div className="flex items-center gap-4 mt-auto">
                        <Avatar>
                          {t.avatarUrl ? <AvatarImage src={t.avatarUrl} /> : null}
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {t.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">{t.name}</div>
                          <div className="text-sm text-primary">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              Loading stories...
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-display font-bold mb-6">Get Involved</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you want to volunteer, partner with us, or just have a question, we'd love to hear from you. Together we can build a better future.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Our Office</h4>
                    <p className="text-muted-foreground">123 Hope Street, Kindness City, KC 45678</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <p className="text-muted-foreground">contact@hopefund.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Call Us</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              {/* Decorative image placeholder (Unsplash) */}
              {/* diverse group of people planting trees community service */}
              <div className="mt-12 rounded-2xl overflow-hidden shadow-lg h-64 relative">
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80" 
                  alt="Community volunteers working together" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 font-display font-bold text-2xl">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <span>HopeFund</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Empowering communities and connecting hearts through direct, transparent giving.
          </p>
          <div className="flex justify-center gap-8 mb-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
          <div className="text-xs text-gray-600">
            © {new Date().getFullYear()} HopeFund Organization. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
