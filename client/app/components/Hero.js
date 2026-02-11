"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // Fetch slides from API
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`)
            .then(res => res.json())
            .then(data => setSlides(data))
            .catch(err => console.error('Failed to fetch hero slides:', err));
    }, []);

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    if (slides.length === 0) return (
        <div className="h-screen flex items-center justify-center bg-black">
            <div className="animate-pulse">Loading amazing content...</div>
        </div>
    );

    return (
        <section className="relative h-screen w-full overflow-hidden text-white">
            {slides.map((slide, index) => (
                <div
                    key={slide._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
                    <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-left px-6 md:px-12 max-w-7xl mx-auto w-full">
                        <h1 className="heading-lg mb-6 animate-fade-in-up max-w-4xl leading-[0.9]">
                            {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 max-w-2xl text-gray-300 font-light tracking-wide">
                            {slide.description}
                        </p>
                        <a href={slide.ctaLink} className="group flex items-center gap-4 text-lg font-medium hover:gap-6 transition-all duration-300">
                            <span className="border-b border-white pb-1">{slide.ctaText}</span>
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
