import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const fields = fieldsRef.current;

    if (!section || !left || !right || fields.length === 0) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Right form animation
      gsap.fromTo(right,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: right,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form fields stagger
      fields.forEach((field, i) => {
        gsap.fromTo(field,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: right,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: 0.3 + i * 0.08
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0514 0%, #120820 50%, #0a0514 100%)' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/particle_network.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/95 via-deep-purple/90 to-deep-purple/95" />
      </div>

      {/* Ambient glow behind form */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          right: '5%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(176, 38, 255, 0.25) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          left: '10%',
          bottom: '20%',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div ref={leftRef}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-6">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm text-neon-cyan font-medium">Get in Touch</span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              Let's build<br />
              <span className="text-gradient">what's next.</span>
            </h2>

            <p className="text-white/60 text-base md:text-lg mb-10 max-w-md">
              Tell us what you're building. We'll reply within 24 hours.
            </p>

            {/* Contact Details */}
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center group-hover:bg-neon-purple/30 transition-colors">
                  <Mail className="w-5 h-5 text-neon-purple" />
                </div>
                <span className="text-white group-hover:text-neon-purple transition-colors">hello@softixtech.com</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors">
                  <Phone className="w-5 h-5 text-neon-cyan" />
                </div>
                <span className="text-white group-hover:text-neon-cyan transition-colors">+91 8088356247</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center group-hover:bg-neon-pink/30 transition-colors">
                  <MapPin className="w-5 h-5 text-neon-pink" />
                </div>
                <span className="text-white group-hover:text-neon-pink transition-colors">Remote</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, color: 'neon-purple' },
                { icon: Twitter, color: 'neon-cyan' },
                { icon: Github, color: 'neon-pink' },
              ].map(({ icon: Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-${color}/20 transition-all duration-300 group`}
                  onClick={(e) => { e.preventDefault(); toast.info('Coming soon!'); }}
                >
                  <Icon className={`w-5 h-5 text-white/50 group-hover:text-${color} transition-colors`} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden">
              {/* Form glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-neon-purple/20 via-neon-cyan/10 to-neon-pink/20 rounded-3xl blur-sm opacity-50" />

              <div className="relative space-y-5">
                <div
                  ref={(el) => { if (el) fieldsRef.current[0] = el; }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div ref={(el) => { if (el) fieldsRef.current[1] = el; }}>
                  <label className="block text-sm text-white/60 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
                    placeholder="Your company"
                  />
                </div>

                <div ref={(el) => { if (el) fieldsRef.current[2] = el; }}>
                  <label className="block text-sm text-white/60 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div ref={(el) => { if (el) fieldsRef.current[3] = el; }}>
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 group"
                  >
                    Send message
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-purple" />
              <span className="font-display font-bold text-xl text-white">
                Softix<span className="text-neon-cyan">Tech</span>
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="text-white/70 text-sm font-medium">
                Contact: <a href="tel:+918088356246" className="text-neon-cyan hover:text-neon-purple transition-colors">+91 8088356246</a>
              </div>
              <div className="text-white/40 text-sm">
                © 2026 SoftixTech. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
