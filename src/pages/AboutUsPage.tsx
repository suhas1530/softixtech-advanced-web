import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowLeft, Users, Lightbulb, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const companyRef = useRef<HTMLDivElement>(null);
    const foundersRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const hero = heroRef.current;
        const company = companyRef.current;
        const founders = foundersRef.current;

        if (!section || !hero || !company || !founders) return;

        const ctx = gsap.context(() => {
            // Hero animation
            gsap.fromTo(hero,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );

            // Company section animation
            gsap.fromTo(company,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: company,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Founders section animation
            gsap.fromTo(founders.querySelectorAll('.founder-card'),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: founders,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0a0514 0%, #1a0f2e 50%, #0a0514 100%)' }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0">
                <img
                    src="/assets/particle_network.jpg"
                    alt=""
                    className="w-full h-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/90 via-deep-purple/80 to-deep-purple/95" />
            </div>

            {/* Ambient Glow Effects */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    left: '-10%',
                    top: '10%',
                    background: 'radial-gradient(circle, rgba(176, 38, 255, 0.3) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    right: '-5%',
                    top: '40%',
                    background: 'radial-gradient(circle, rgba(0, 245, 255, 0.25) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    left: '30%',
                    bottom: '10%',
                    background: 'radial-gradient(circle, rgba(255, 45, 149, 0.2) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-12">
                {/* Navigation Header */}
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-neon-purple" />
                        <span className="font-display font-bold text-xl md:text-2xl text-white">
                            Softix<span className="text-neon-cyan">Tech</span>
                        </span>
                    </div>
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </div>

                {/* Hero Section */}
                <div ref={heroRef} className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-6">
                        <Users className="w-4 h-4 text-neon-cyan" />
                        <span className="text-sm text-neon-cyan font-medium">About Us</span>
                    </div>
                    <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Innovating for a{' '}
                        <span className="text-gradient">Digital Future</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        Empowering businesses through cutting-edge technology and innovative solutions
                    </p>
                </div>

                {/* Company Section */}
                <div ref={companyRef} className="mb-24">
                    <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Card glow effect */}
                        <div className="absolute -inset-px bg-gradient-to-br from-neon-purple/20 via-neon-cyan/10 to-neon-pink/20 rounded-3xl blur-sm opacity-50" />

                        <div className="relative flex flex-col lg:flex-row gap-10 items-center">
                            {/* Company Image */}
                            <div className="w-full lg:w-2/5 relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple/30 to-neon-cyan/30 rounded-3xl blur-xl opacity-60" />
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 p-6">
                                    {/* Company Logo */}
                                    <img src="/images/logo.png" alt="SoftixTech Logo" className="w-full h-full object-contain" />
                                </div>
                            </div>

                            {/* Company Description */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-4">
                                    <Lightbulb className="w-3.5 h-3.5 text-neon-purple" />
                                    <span className="text-xs text-neon-purple font-medium">Our Vision</span>
                                </div>
                                <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-6">
                                    Who We <span className="text-neon-cyan">Are</span>
                                </h2>
                                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                    We are a next-generation software company delivering innovative IT solutions, web applications, mobile applications, cloud services, and digital transformation solutions. Our goal is to help businesses grow using modern, scalable, and secure technologies.
                                </p>

                                {/* Feature highlights */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                    {[
                                        { label: 'IT Solutions', icon: '💻' },
                                        { label: 'Web Apps', icon: '🌐' },
                                        { label: 'Mobile Apps', icon: '📱' },
                                        { label: 'Cloud Services', icon: '☁️' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all duration-300">
                                            <span className="text-2xl mb-2 block">{item.icon}</span>
                                            <span className="text-xs text-white/60">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Founders Section */}
                <div ref={foundersRef} className="mb-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/30 mb-4">
                            <Rocket className="w-4 h-4 text-neon-pink" />
                            <span className="text-sm text-neon-pink font-medium">Leadership</span>
                        </div>
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                            Meet Our <span className="text-gradient">Founders</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Founder Card */}
                        <div className="founder-card glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-neon-purple/40 transition-all duration-500">
                            <div className="absolute -inset-px bg-gradient-to-br from-neon-purple/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative">
                                {/* Founder Image */}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 border-2 border-white/20">
                                        {/* Founder Image */}
                                        <img src="/images/suhas.jpg" alt="Suhas H J" className="w-full h-full object-cover object-center" style={{ objectPosition: 'center 40%' }} />
                                    </div>
                                </div>

                                {/* Founder Info */}
                                <div className="text-center">
                                    <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-1">
                                        Suhas H J
                                    </h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/30 mb-4">
                                        <span className="text-xs text-neon-purple font-semibold">Founder</span>
                                    </div>
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                        Suhas H J is the Founder of the company, focused on building reliable, scalable, and innovative software solutions that solve real-world problems.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Co-Founder Card */}
                        <div className="founder-card glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-neon-cyan/40 transition-all duration-500">
                            <div className="absolute -inset-px bg-gradient-to-br from-neon-cyan/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative">
                                {/* Co-Founder Image */}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-neon-cyan/30 to-neon-pink/30 border-2 border-white/20">
                                        {/* Co-Founder Image */}
                                        <img src="/images/spandhana.jpg" alt="Spandhana N" className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                {/* Co-Founder Info */}
                                <div className="text-center">
                                    <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-1">
                                        Spandhana N
                                    </h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-4">
                                        <span className="text-xs text-neon-cyan font-semibold">Co-Founder</span>
                                    </div>
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                        Spandhana N is the Co-Founder, contributing to strategic planning, operations, and delivering high-quality technology solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-neon-purple" />
                            <span className="font-display font-bold text-xl text-white">
                                Softix<span className="text-neon-cyan">Tech</span>
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <div className="text-white/70 text-sm font-medium">
                                Contact: <a href="tel:+918088356247" className="text-neon-cyan hover:text-neon-purple transition-colors">+91 8088356247</a>
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
