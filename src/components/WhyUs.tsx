import { motion } from "framer-motion";
import { Zap, Target, Users, Award, Clock, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We deliver projects on time without compromising quality, using agile methodologies.",
  },
  {
    icon: Target,
    title: "Result-Oriented",
    description: "Our focus is on delivering measurable results that drive your business forward.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Work with certified professionals who are passionate about technology.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Rigorous testing and quality assurance processes ensure flawless delivery.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock support to address your concerns whenever you need us.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal project managers and dedicated support for seamless communication.",
  },
];

export const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(250_85%_65%_/_0.08),_transparent_60%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            The SoftixTech <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We combine technical expertise with business acumen to deliver 
            solutions that create real value for your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass-card p-8 h-full hover-glow animated-border">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
