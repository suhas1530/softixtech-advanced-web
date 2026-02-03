import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Globe, 
  Cloud, 
  Brain, 
  BarChart3, 
  Shield,
  ArrowRight,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Code2, label: 'Custom Software Development', color: 'neon-purple' },
  { icon: Globe, label: 'Web & Mobile Apps', color: 'neon-cyan' },
  { icon: Cloud, label: 'Cloud Solutions (AWS/GCP)', color: 'neon-pink' },
  { icon: Brain, label: 'AI & Machine Learning', color: 'neon-purple' },
  { icon: BarChart3, label: 'Data Analytics & BI', color: 'neon-cyan' },
  { icon: Shield, label: 'Cybersecurity', color: 'neon-pink' },
];

export default function ServicesOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const image = imageRef.current;
    const rows = rowsRef.current;
    const cta = ctaRef.current;

    if (!section || !panel || !image || rows.length === 0 || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(panel, 
          { x: '-60vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power3.out' }, 
          0
        )
        .fromTo(image, 
          { x: '60vw', opacity: 0, scale: 0.95 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power3.out' }, 
          0
        );

      // Service rows staggered entrance
      rows.forEach((row, i) => {
        scrollTl.fromTo(row, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.05 + i * 0.03
        );
      });

      scrollTl.fromTo(cta, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, ease: 'power2.out' }, 
        0.15
      );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(panel, 
          { x: 0, opacity: 1 }, 
          { x: '-30vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(image, 
          { x: 0, opacity: 1 }, 
          { x: '30vw', opacity: 0.2, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rows, 
          { y: 0, opacity: 1 }, 
          { y: -20, opacity: 0.2, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(cta, 
          { scale: 1, opacity: 1 }, 
          { scale: 0.95, opacity: 0.2, ease: 'power2.in' }, 
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
      id="services"
      className="section-pinned flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0514 0%, #150a25 100%)' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/data_streams.jpg" 
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/80 via-deep-purple/60 to-deep-purple/80" />
      </div>

      {/* Neon Grid Overlay */}
      <div className="absolute inset-0 dot-grid-neon opacity-50 pointer-events-none" />

      {/* Floating Orbs */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-purple/20 blur-[100px] -left-20 top-1/4 animate-pulse-glow" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-neon-cyan/15 blur-[80px] right-10 bottom-1/4 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Left Glass Panel */}
      <div 
        ref={panelRef}
        className="absolute left-[5vw] top-1/2 -translate-y-1/2 w-[38vw] max-w-[560px] h-[75vh] rounded-3xl glass-card p-6 md:p-8 flex flex-col z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-neon-purple/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-neon-purple" />
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white">
            End-to-End<br />
            <span className="text-gradient">IT Services</span>
          </h2>
        </div>

        <div className="flex-1 space-y-2 md:space-y-3 overflow-y-auto scrollbar-hide">
          {services.map((service, index) => (
            <div 
              key={service.label}
              ref={(el) => { if (el) rowsRef.current[index] = el; }}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-neon-purple/30 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg bg-${service.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-5 h-5 text-${service.color}`} />
              </div>
              <span className="text-white text-sm md:text-base flex-1">{service.label}</span>
              <ArrowRight className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </div>
          ))}
        </div>

        <button 
          ref={ctaRef}
          onClick={() => scrollToSection('process')}
          className="btn-primary w-fit mt-6 flex items-center gap-2 group"
        >
          See our process
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Right Image Card */}
      <div 
        ref={imageRef}
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 w-[50vw] max-w-[800px] h-[75vh] rounded-3xl overflow-hidden z-10"
      >
        {/* Glow behind image */}
        <div className="absolute -inset-4 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 rounded-[32px] blur-2xl" />
        <img 
          src="/assets/geometric_morph.jpg" 
          alt="Technology Solutions"
          className="relative w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/50 via-transparent to-transparent rounded-3xl" />
        
        {/* Floating badge */}
        <div className="absolute bottom-6 left-6 glass-panel px-4 py-2 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-sm text-white/80">50+ Projects Delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
