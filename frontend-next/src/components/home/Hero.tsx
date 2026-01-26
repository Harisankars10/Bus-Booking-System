"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchForm from "./SearchForm";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const busRef = useRef<HTMLDivElement>(null);
    const cityRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Bus moving animation
        gsap.fromTo(
            busRef.current,
            { x: "-100%" },
            {
                x: "100vw",
                duration: 8,
                ease: "none",
                repeat: -1,
                delay: 0.5,
            }
        );

        // Parallax effect for city
        gsap.to(cityRef.current, {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden hero-section pt-20">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/20 via-background to-background opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Floating Particles or Stars */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-brand-cyan rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-brand-purple rounded-full animate-pulse delay-300"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center mb-12 max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-cyan to-brand-purple leading-tight font-heading">
                    Travel with Comfort. <br /> Arrive in Style.
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Experience the premium bus booking platform designed for the modern
                    traveler. Seamless, fast, and luxurious.
                </p>
            </div>

            {/* Search Form */}
            <SearchForm />

            {/* Animated Landscape */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 z-0 pointer-events-none transform translate-y-10">
                {/* City Skyline Silhouette (CSS) */}
                <div ref={cityRef} className="absolute bottom-0 left-0 right-0 h-full flex items-end opacity-30">
                    <div className="w-10 h-20 bg-brand-blue/30 mx-1"></div>
                    <div className="w-14 h-32 bg-brand-purple/30 mx-1"></div>
                    <div className="w-8 h-16 bg-brand-cyan/30 mx-1"></div>
                    <div className="w-20 h-40 bg-brand-blue/30 mx-1"></div>
                    <div className="w-12 h-24 bg-brand-purple/30 mx-1"></div>
                    <div className="w-full h-10 bg-gradient-to-t from-brand-purple/20 to-transparent"></div>
                </div>

                {/* Road */}
                <div className="absolute bottom-0 w-full h-4 bg-gray-800 border-t border-gray-700">
                    <div className="w-full h-full flex justify-center items-center gap-10 overflow-hidden">
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                        <div className="h-0.5 w-10 bg-yellow-500/50"></div>
                    </div>
                </div>

                {/* Moving Bus */}
                <div ref={busRef} className="absolute bottom-5 left-0 w-32 h-16 text-white">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full text-brand-cyan drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                        {/* Simple Bus SVG shape */}
                        <path d="M48 112c-8.8 0-16 7.2-16 16v24H16c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h16v32c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32v-32h256v32c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32v-32h16c8.8 0 16-7.2 16-16V168c0-8.8-7.2-16-16-16h-16v-24c0-8.8-7.2-16-16-16H48zM48 144h112v64H48v-64zm144 0h128v64H192v-64zm160 0h112v64H352v-64zM32 256h448v96H32v-96z" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
