import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "SoftixTech turned our roadmap into a shipped product in 10 weeks. Their speed and quality are unmatched.",
    name: "A. R.",
    role: "CTO",
    company: "Fintech Startup",
    avatar: "AR",
    color: "neon-purple"
  },
  {
    quote: "The cleanest handoff we've ever had—design to code felt seamless. They truly understand product thinking.",
    name: "M. T.",
    role: "Product Lead",
    company: "Healthcare Platform",
    avatar: "MT",
    color: "neon-cyan"
  },
  {
    quote: "They don't just build—they think with you. Our AI integration was smoother than we ever imagined.",
    name: "J. K.",
    role: "Founder",
    company: "AI Startup",
    avatar: "JK",
    color: "neon-pink"
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header, 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation with stagger
      cards.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 40, opacity: 0, scale: 0.95 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.15
          }
        );

        // Avatar animation
        const avatar = card.querySelector('.avatar');
        if (avatar) {
          gsap.fromTo(avatar, 
            { scale: 0.8, opacity: 0 }, 
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              delay: 0.2 + i * 0.15
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-flowing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #150a25 0%, #0a0514 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/neon_grid.jpg" 
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/95 to-deep-purple/98" />
      </div>

      {/* Floating orbs */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-neon-cyan/10 blur-[120px] left-0 top-1/3" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-pink/10 blur-[100px] right-0 bottom-1/4" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/30 mb-6">
            <MessageSquare className="w-4 h-4 text-neon-pink" />
            <span className="text-sm text-neon-pink font-medium">Testimonials</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            What teams <span className="text-gradient">say</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Don't just take our word for it—hear from the teams we've helped build.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="glass-card rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-px bg-gradient-to-br from-${testimonial.color}/0 to-${testimonial.color}/0 group-hover:from-${testimonial.color}/20 group-hover:to-transparent rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />
              
              {/* Quote Icon */}
              <div className={`relative w-12 h-12 rounded-xl bg-${testimonial.color}/20 flex items-center justify-center mb-6`}>
                <Quote className={`w-6 h-6 text-${testimonial.color}`} />
              </div>

              {/* Quote Text */}
              <p className="relative text-white/90 text-base md:text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="relative flex items-center gap-4">
                <div 
                  className={`avatar w-12 h-12 rounded-full bg-gradient-to-br from-${testimonial.color} to-${testimonial.color}/60 flex items-center justify-center shadow-glow-${testimonial.color}`}
                >
                  <span className="text-white font-medium text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-white/50">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
