"use client";

import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from "@/components/navbar";
import BlogCardsDemo from "@/components/blog-cards-demo";

gsap.registerPlugin(useGSAP);

export default function Blog() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial states
    if (cardsRef.current) {
      gsap.set(cardsRef.current, {
        autoAlpha: 0,
        y: 40,
        filter: 'blur(16px)',
        scale: 0.95
      });
    }

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Animate cards
    if (cardsRef.current) {
      tl.to(cardsRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.9
      }, 0.2);
    }
  });

  return (
    <div className="relative min-h-screen bg-black">
      <div className="container mx-auto px-6 py-24 pb-32 md:px-10 lg:px-16">
        {/* Blog Cards Grid */}
        <div ref={cardsRef} className="max-w-7xl mx-auto">
          <BlogCardsDemo />
        </div>
      </div>
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}