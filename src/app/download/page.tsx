"use client";

import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from "@/components/navbar";

gsap.registerPlugin(useGSAP);

function formatCode(code: string): string {
  return code
    .split('\n')
    .map(line => {
      // Comments (green) - handle entire line
      if (line.trim().startsWith('#')) {
        return `<span style="color: #6A9955;">${line}</span>`;
      }
      
      // Escape HTML first
      let formattedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      // Commands at start of line (cyan/blue) - be more specific
      if (/^(curl|docker|echo|elide|FROM|COPY|WORKDIR|RUN)\s/.test(formattedLine)) {
        formattedLine = formattedLine.replace(/^(curl|docker|echo|elide|FROM|COPY|WORKDIR|RUN)/, '<span style="color: #4FC1FF;">$1</span>');
      }
      
      // Strings in quotes (orange) - only if not already colored
      if (!formattedLine.includes('span style')) {
        formattedLine = formattedLine.replace(/('.*?')/g, '<span style="color: #CE9178;">$1</span>');
        formattedLine = formattedLine.replace(/(".*?")/g, '<span style="color: #CE9178;">$1</span>');
      }
      
      // File extensions (yellow)
      formattedLine = formattedLine.replace(/(\.[a-zA-Z]+)(?![^<]*>)/g, '<span style="color: #DCDCAA;">$1</span>');
      
      // Flags and options (purple)
      formattedLine = formattedLine.replace(/(\s-{1,2}[a-zA-Z-]+)(?![^<]*>)/g, '<span style="color: #C586C0;">$1</span>');
      
      return formattedLine;
    })
    .join('\n');
}

export default function Download() {
  const leftTextRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const codeBlocks = [
    {
      title: "Installation",
      code: `curl -sSL --tlsv1.2 elide.sh | bash -s -
# The installer script can take options:
curl -sSL --tlsv1.2 elide.sh | bash -s - --help`
    },
    {
      title: "Testing your installation",
      code: `# Make sure Elide is on your PATH
> which elide
/some/path/to/elide

# Run --help:
> elide --help
/some/path/to/elide`
    },
    {
      title: "Container Images",
      code: `# Elide ships as container images, too. You can use Elide from Docker:

docker run --rm -it ghcr.io/elide-dev/bash`
    }
  ];

  useGSAP(() => {
    // Set initial states
    if (leftTextRef.current) {
      gsap.set(leftTextRef.current, { 
        autoAlpha: 0, 
        y: 20,
        filter: 'blur(8px)'
      });
    }

    const validSectionRefs = sectionRefs.current.filter(Boolean);
    if (validSectionRefs.length > 0) {
      gsap.set(validSectionRefs, {
        autoAlpha: 0,
        y: 30,
        filter: 'blur(12px)',
        scale: 0.98
      });
    }

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Animate left text first
    if (leftTextRef.current) {
      tl.to(leftTextRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      }, 0.2);
    }

    // Then animate sections with stagger
    if (validSectionRefs.length > 0) {
      tl.to(validSectionRefs, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.7,
        stagger: 0.15
      }, 0.4);
    }
  });

  return (
    <div className="relative min-h-screen bg-black">
      <div className="flex min-h-screen">
        {/* Left side - Text */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div ref={leftTextRef} className="max-w-lg">
            <p className="text-base font-light leading-relaxed tracking-tight text-white/75 sm:text-lg">
              Elide supports Linux and macOS. Windows support is coming soon but is currently considered experimental:
            </p>
          </div>
        </div>

        {/* Right side - Code sections */}
        <div className="flex-1 flex items-center justify-center p-8 pb-24">
          <div className="w-full max-w-2xl space-y-6">
            {codeBlocks.map((block, index) => (
              <div 
                key={index} 
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="flex flex-col"
              >
                {/* Section title */}
                <h3 className="text-white font-mono text-base mb-3 tracking-tight">
                  {block.title}
                </h3>
                
                {/* Code content */}
                <div className="bg-black/90 border border-white/10 rounded-lg p-4">
                  <pre className="text-xs font-mono leading-relaxed overflow-auto">
                    <code dangerouslySetInnerHTML={{ __html: formatCode(block.code) }} />
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}