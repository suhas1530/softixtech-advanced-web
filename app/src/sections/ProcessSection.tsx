import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Palette, Code, Rocket, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Requirements, risks, and a clear plan.',
    icon: Search,
    color: 'neon-purple',
  },
  {
    number: '02',
    title: 'Design',
    description: 'UI/UX, architecture, and prototypes.',
    icon: Palette,
    color: 'neon-pink',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Sprints, reviews, and continuous delivery.',
    icon: Code,
    color: 'neon-cyan',
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Launch, monitor, and optimize.',
    icon: Rocket,
    color: 'neon-purple',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const line = lineRef.current;

    if (!section || !header || cards.length === 0 || !line) return;

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

      // Line animation
      gsap.fromTo(line, 
        { scaleY: 0 }, 
        { 
          scaleY: 1, 
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      cards.forEach((card, i) => {
        const xOffset = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(card, 
          { x: xOffset, opacity: 0 }, 
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="process"
      className="section-flowing overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0514 0%, #150a25 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid-neon opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-neon-purple/10 blur-[150px] left-1/4 top-1/3" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-cyan/10 blur-[120px] right-1/4 bottom-1/4" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-6">
            <Workflow className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-neon-purple font-medium">Our Method</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            How we <span className="text-gradient">work</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            A proven process that delivers results, every time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div 
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background: 'linear-gradient(180deg, #b026ff 0%, #00f5ff 50%, #ff2d95 100%)',
            }}
          />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className={`flex flex-col md:flex-row items-center md:gap-12 ${
                  index !== steps.length - 1 ? 'md:mb-8' : ''
                }`}
              >
                {/* Left side (even indices) */}
                <div className={`flex-1 w-full ${index % 2 === 1 ? 'md:order-3' : ''}`}>
                  {index % 2 === 0 && (
                    <div className="glass-card rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-${step.color}/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <step.icon className={`w-7 h-7 text-${step.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-${step.color} text-sm font-bold`}>
                              {step.number}
                            </span>
                            <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-white/60 text-sm md:text-base">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 z-10 md:order-2">
                  <div className={`w-5 h-5 rounded-full bg-${step.color} shadow-glow-${step.color} flex items-center justify-center`}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>

                {/* Right side (odd indices) */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}>
                  {index % 2 === 1 && (
                    <div className="glass-card rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-${step.color}/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <step.icon className={`w-7 h-7 text-${step.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-${step.color} text-sm font-bold`}>
                              {step.number}
                            </span>
                            <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-white/60 text-sm md:text-base">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
