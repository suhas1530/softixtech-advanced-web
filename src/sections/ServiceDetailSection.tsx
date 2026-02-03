import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDetailProps {
  id: string;
  headline: string;
  body: string;
  bullets: string[];
  cta: string;
  ctaAction: string;
  imageSrc: string;
  layout: 'left-image' | 'right-image';
  accentColor?: string;
}

export default function ServiceDetailSection({
  id,
  headline,
  body,
  bullets,
  cta,
  ctaAction,
  imageSrc,
  layout,
  accentColor = 'neon-purple'
}: ServiceDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;

    if (!section || !image || !panel || !content) return;

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

      const imageStartX = layout === 'left-image' ? '-60vw' : '60vw';
      const panelStartX = layout === 'left-image' ? '60vw' : '-60vw';
      const imageExitX = layout === 'left-image' ? '-28vw' : '30vw';
      const panelExitX = layout === 'left-image' ? '28vw' : '-30vw';

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(image, 
          { x: imageStartX, opacity: 0, scale: 0.95 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power3.out' }, 
          0
        )
        .fromTo(panel, 
          { x: panelStartX, opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power3.out' }, 
          0
        )
        .fromTo(content.children, 
          { y: 25, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' }, 
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(image, 
          { x: 0, opacity: 1 }, 
          { x: imageExitX, opacity: 0.2, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(panel, 
          { x: 0, opacity: 1 }, 
          { x: panelExitX, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(content.children, 
          { y: 0, opacity: 1 }, 
          { y: -15, opacity: 0.2, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, [layout]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLeftImage = layout === 'left-image';

  return (
    <section 
      ref={sectionRef} 
      id={id}
      className="section-pinned flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0514 0%, #120820 100%)' }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/aurora_bg.jpg" 
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/90 via-deep-purple/70 to-deep-purple/90" />
      </div>

      {/* Light beam effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${isLeftImage ? '90deg' : '270deg'}, transparent 40%, rgba(176, 38, 255, 0.08) 50%, transparent 60%)`,
        }}
      />

      {/* Floating accent orb */}
      <div 
        className={`absolute w-[350px] h-[350px] rounded-full blur-[100px] ${
          accentColor === 'neon-cyan' ? 'bg-neon-cyan/20' : 'bg-neon-purple/20'
        } ${isLeftImage ? 'right-1/4' : 'left-1/4'} top-1/3 animate-pulse-glow`} 
      />

      {/* Image Card */}
      <div 
        ref={imageRef}
        className={`absolute ${isLeftImage ? 'left-[5vw]' : 'right-[5vw]'} top-1/2 -translate-y-1/2 w-[52vw] max-w-[52vw] h-[72vh] rounded-3xl overflow-hidden z-10`}
      >
        {/* Glow effect */}
        <div className={`absolute -inset-4 rounded-[32px] blur-2xl opacity-40 ${
          accentColor === 'neon-cyan' 
            ? 'bg-gradient-to-br from-neon-cyan/30 to-neon-purple/20' 
            : 'bg-gradient-to-br from-neon-purple/30 to-neon-pink/20'
        }`} />
        <img 
          src={imageSrc} 
          alt={headline}
          className="relative w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/40 to-transparent rounded-3xl" />
      </div>

      {/* Glass Panel */}
      <div 
        ref={panelRef}
        className={`absolute ${isLeftImage ? 'right-[5vw]' : 'left-[5vw]'} top-1/2 -translate-y-1/2 w-[34vw] max-w-[520px] h-[72vh] rounded-3xl glass-card p-6 md:p-8 flex flex-col justify-center z-10`}
      >
        <div ref={contentRef}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-5 h-5 text-${accentColor}`} />
            <span className={`text-sm text-${accentColor} font-medium`}>Service</span>
          </div>
          
          <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            {headline}
          </h2>
          
          <p className="text-white/70 text-sm md:text-base mb-6">
            {body}
          </p>

          <ul className="space-y-3 mb-8">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full bg-${accentColor}/20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className={`w-3.5 h-3.5 text-${accentColor}`} />
                </div>
                <span className="text-white/90 text-sm">{bullet}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => scrollToSection(ctaAction)}
            className={`btn-primary flex items-center gap-2 group ${accentColor === 'neon-cyan' ? 'btn-cyan' : ''}`}
          >
            {cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
