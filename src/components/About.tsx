import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Expert team of certified developers",
  "Agile development methodology",
  "On-time project delivery",
  "Transparent communication",
  "Scalable and maintainable code",
  "24/7 technical support",
];

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About SoftixTech
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Building the Future of{" "}
              <span className="gradient-text">Digital Innovation</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At SoftixTech, we're passionate about leveraging technology to solve 
              complex business challenges. With over 8 years of experience, we've 
              helped startups and enterprises alike achieve their digital transformation goals.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team of skilled developers, designers, and strategists work 
              collaboratively to deliver solutions that not only meet but exceed 
              expectations. We believe in building long-term partnerships with 
              our clients, understanding their vision, and turning it into reality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 group">
              Learn More About Us
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="glass-card p-8 glow-effect">
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-card p-6 text-center">
                    <div className="text-4xl font-display font-bold gradient-text mb-2">150+</div>
                    <div className="text-muted-foreground text-sm">Projects Completed</div>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <div className="text-4xl font-display font-bold gradient-text mb-2">50+</div>
                    <div className="text-muted-foreground text-sm">Global Clients</div>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <div className="text-4xl font-display font-bold gradient-text mb-2">30+</div>
                    <div className="text-muted-foreground text-sm">Team Members</div>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <div className="text-4xl font-display font-bold gradient-text mb-2">99%</div>
                    <div className="text-muted-foreground text-sm">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              >
                <span className="text-primary-foreground font-display font-bold text-2xl">8+</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 glass-card px-4 py-2"
              >
                <span className="text-sm text-foreground">Years of Excellence</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
