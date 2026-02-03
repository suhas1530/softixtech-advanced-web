import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Fintech Onboarding Flow', image: '/assets/portfolio_01.jpg', tags: ['UX/UI', 'Fintech'] },
  { title: 'Healthcare Scheduling Platform', image: '/assets/portfolio_02.jpg', tags: ['Healthcare', 'Web App'] },
  { title: 'E-commerce Rebuild', image: '/assets/portfolio_03.jpg', tags: ['E-commerce', 'Full Stack'] },
  { title: 'Logistics Dashboard', image: '/assets/portfolio_04.jpg', tags: ['Dashboard', 'Analytics'] },
  { title: 'AI Search Interface', image: '/assets/portfolio_05.jpg', tags: ['AI/ML', 'Interface'] },
  { title: 'SaaS Design System', image: '/assets/portfolio_06.jpg', tags: ['Design System', 'SaaS'] },
];

export default function PortfolioSection() {
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
          { y: 50, opacity: 0, scale: 0.95 }, 
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
            delay: i * 0.08
          }
        );

        // Parallax on card image
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(img, 
            { y: -15 }, 
            { 
              y: 15, 
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
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
      id="work"
      className="section-flowing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #120820 0%, #0a0514 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/wave_pattern.jpg" 
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/90 to-deep-purple/95" />
      </div>

      {/* Floating orbs */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-purple/15 blur-[120px] -left-40 top-1/4" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-neon-cyan/10 blur-[100px] right-0 bottom-1/4" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-6">
            <Layers className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan font-medium">Our Portfolio</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Work that <span className="text-gradient">ships.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            A few recent builds—designed for clarity, engineered for performance.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple/0 via-neon-cyan/0 to-neon-pink/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              
              <img 
                src={project.image} 
                alt={project.title}
                className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-purple via-deep-purple/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-medium mb-1 group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-white/50">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ExternalLink className="w-5 h-5 text-neon-purple" />
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
