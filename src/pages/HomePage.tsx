import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from '../sections/HeroSection';
import ServicesOverviewSection from '../sections/ServicesOverviewSection';
import ServiceDetailSection from '../sections/ServiceDetailSection';
import PortfolioSection from '../sections/PortfolioSection';
import ProcessSection from '../sections/ProcessSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const mainRef = useRef<HTMLElement>(null);
    const snapTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        // Wait for all sections to mount and create their ScrollTriggers
        const timer = setTimeout(() => {
            const pinned = ScrollTrigger.getAll()
                .filter(st => st.vars.pin)
                .sort((a, b) => a.start - b.start);

            const maxScroll = ScrollTrigger.maxScroll(window);

            if (!maxScroll || pinned.length === 0) return;

            // Build ranges and snap targets from pinned sections
            const pinnedRanges = pinned.map(st => ({
                start: st.start / maxScroll,
                end: (st.end ?? st.start) / maxScroll,
                center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
            }));

            // Create global snap
            snapTriggerRef.current = ScrollTrigger.create({
                snap: {
                    snapTo: (value: number) => {
                        // Check if within any pinned range (with buffer)
                        const inPinned = pinnedRanges.some(
                            r => value >= r.start - 0.02 && value <= r.end + 0.02
                        );

                        if (!inPinned) return value; // Flowing section: free scroll

                        // Find nearest pinned center
                        const target = pinnedRanges.reduce((closest, r) =>
                            Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                            pinnedRanges[0]?.center ?? 0
                        );

                        return target;
                    },
                    duration: { min: 0.15, max: 0.35 },
                    delay: 0,
                    ease: 'power2.out',
                }
            });
        }, 500);

        return () => {
            clearTimeout(timer);
            if (snapTriggerRef.current) {
                snapTriggerRef.current.kill();
            }
        };
    }, []);

    // Cleanup all ScrollTriggers on unmount
    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <main ref={mainRef} className="relative">
            {/* Section 1: Hero - pin: true */}
            <HeroSection />

            {/* Section 2: Services Overview - pin: true */}
            <ServicesOverviewSection />

            {/* Section 3: Service Detail - Development - pin: true */}
            <ServiceDetailSection
                id="development"
                headline="Custom Development"
                body="From MVPs to enterprise platforms—clean architecture, modern stacks, and scalable delivery."
                bullets={[
                    'Frontend & backend engineering',
                    'API design & system integration',
                    'Quality assurance & CI/CD'
                ]}
                cta="Request a roadmap"
                ctaAction="contact"
                imageSrc="/assets/dev_code.jpg"
                layout="left-image"
                accentColor="neon-purple"
            />

            {/* Section 4: Service Detail - Cloud & AI - pin: true */}
            <ServiceDetailSection
                id="cloud-ai"
                headline="Cloud & AI"
                body="Deploy faster, predict smarter, and automate the repetitive with secure, modern infrastructure."
                bullets={[
                    'Cloud migration & DevOps',
                    'AI prototypes & model integration',
                    'Automation & monitoring'
                ]}
                cta="Explore AI solutions"
                ctaAction="contact"
                imageSrc="/assets/cloud_ai.jpg"
                layout="right-image"
                accentColor="neon-cyan"
            />

            {/* Section 5: Service Detail - Data & Security - pin: true */}
            <ServiceDetailSection
                id="data-security"
                headline="Data & Security"
                body="Turn raw data into decisions, and protect every layer with modern security practices."
                bullets={[
                    'Analytics dashboards & reporting',
                    'Identity, access & compliance',
                    'Threat detection & hardening'
                ]}
                cta="Get a security review"
                ctaAction="contact"
                imageSrc="/assets/data_security.jpg"
                layout="left-image"
                accentColor="neon-pink"
            />

            {/* Section 6: Portfolio - pin: false */}
            <PortfolioSection />

            {/* Section 7: Process - pin: false */}
            <ProcessSection />

            {/* Section 8: Testimonials - pin: false */}
            <TestimonialsSection />

            {/* Section 9: Contact - pin: false */}
            <ContactSection />
        </main>
    );
}
