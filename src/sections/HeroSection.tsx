import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Particle component for animated background
const Particle = ({ delay, duration, size, left, top }: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: string; 
  top: string;
}) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      top,
      background: `radial-gradient(circle, rgba(176, 38, 255, ${Math.random() * 0.5 + 0.3}) 0%, transparent 70%)`,
      boxShadow: `0 0 ${size * 2}px rgba(176, 38, 255, 0.5)`,
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

// Animated gradient orb
const GradientOrb = ({ 
  color, 
  size, 
  left, 
  top, 
  delay = 0 
}: { 
  color: string; 
  size: number; 
  left: string; 
  top: string;
  delay?: number;
}) => (
  <div
    className="absolute rounded-full pointer-events-none animate-morph"
    style={{
      width: size,
      height: size,
      left,
      top,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(60px)',
      opacity: 0.6,
      animationDelay: `${delay}s`,
    }}
  />
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, delay: number, duration: number, size: number, left: string, top: string}>>([]);

  // Generate particles on client side only
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 4 + Math.random() * 12,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !image || !headline || !subhead || !cta) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(card, 
          { y: 30, scale: 0.95, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, duration: 1 }, 
          0.2
        )
        .fromTo(headline.querySelectorAll('.word'), 
          { y: 30, opacity: 0, rotateX: -30 }, 
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.8 }, 
          0.4
        )
        .fromTo([subhead, cta], 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, 
          0.6
        )
        .fromTo(image, 
          { x: 80, opacity: 0, scale: 1.1 }, 
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 
          0.3
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([card, image, headline, subhead, cta], { 
              opacity: 1, 
              x: 0, 
              y: 0,
              scale: 1 
            });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(card, 
          { y: 0, opacity: 1 }, 
          { y: '-40vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(image, 
          { x: 0, opacity: 1 }, 
          { x: '20vw', opacity: 0.2, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([headline, subhead, cta], 
          { x: 0, opacity: 1 }, 
          { x: '-20vw', opacity: 0.2, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="hero"
      className="section-pinned flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0514 0%, #1a0f2e 50%, #0a0514 100%)' }}
    >
      {/* Animated Background Image with Video-like Effect */}
      <div className="video-bg-container">
        <img 
          src="/assets/particle_network.jpg" 
          alt=""
          className="video-bg"
        />
        <div className="video-overlay" />
      </div>

      {/* Animated Gradient Orbs */}
      <GradientOrb color="rgba(176, 38, 255, 0.4)" size={500} left="-10%" top="-20%" delay={0} />
      <GradientOrb color="rgba(0, 245, 255, 0.3)" size={400} left="60%" top="60%" delay={2} />
      <GradientOrb color="rgba(255, 45, 149, 0.25)" size={350} left="80%" top="10%" delay={4} />

      {/* Floating Particles */}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      {/* Glass Hero Card */}
      <div 
        ref={cardRef}
        className="relative z-10 w-[90vw] max-w-[1280px] h-[70vh] min-h-[550px] rounded-[28px] glass-card p-6 md:p-10 flex flex-col overflow-hidden"
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #b026ff, #00f5ff, #ff2d95, #b026ff)',
            backgroundSize: '300% 100%',
            animation: 'border-glow 4s linear infinite',
            opacity: 0.3,
            filter: 'blur(8px)',
            zIndex: -1,
            margin: '-2px',
          }}
        />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-neon-purple" />
            <span className="font-display font-bold text-xl md:text-2xl text-white">
              Softix<span className="text-neon-cyan">Tech</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Process', 'Work', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
        </div>

        {/* Card Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
              <span className="text-xs text-neon-purple font-medium">Next-Gen IT Solutions</span>
            </div>
            
            <h1 
              ref={headlineRef}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight"
            >
              <span className="word inline-block">Future-Ready</span>{' '}
              <span className="word inline-block text-gradient">Software,</span>
              <br />
              <span className="word inline-block">Built</span>{' '}
              <span className="word inline-block">to</span>{' '}
              <span className="word inline-block text-neon-cyan">Scale.</span>
            </h1>
            
            <p 
              ref={subheadRef}
              className="text-white/70 text-base md:text-lg max-w-md mb-6 md:mb-8"
            >
              We design, build, and deploy digital products that move fast and last. 
              Transform your vision into reality with cutting-edge technology.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                ref={ctaRef}
                className="btn-primary flex items-center gap-2 group"
                onClick={() => scrollToSection('contact')}
              >
                Book a free discovery call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                className="px-6 py-3 rounded-xl font-medium text-white border border-white/20 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300"
                onClick={() => scrollToSection('work')}
              >
                View our work
              </button>
            </div>
          </div>

          {/* Right Image with Glow */}
          <div 
            ref={imageRef}
            className="relative w-full md:w-[40%] h-[220px] md:h-[88%] rounded-2xl overflow-hidden"
          >
            {/* Image glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple/30 to-neon-cyan/30 rounded-3xl blur-xl opacity-60" />
            <img 
              src="/assets/gradient_bg_01.jpg" 
              alt="Digital Innovation"
              className="relative w-full h-full object-cover rounded-2xl"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 via-transparent to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
