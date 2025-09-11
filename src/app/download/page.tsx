"use client";

import { useRef, useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState<string>('system-requirements');

  const sections = [
    { id: 'system-requirements', title: 'System Requirements' },
    { id: 'quick-installation', title: 'Quick Install' },
    { id: 'manual-installation', title: 'Manual Install' },
    { id: 'container-images', title: 'Docker' },
    { id: 'github-actions', title: 'CI/CD' },
    { id: 'verify-installation', title: 'Verify' },
    { id: 'troubleshooting', title: 'Troubleshooting' }
  ];

  const codeBlocks = [
    {
      id: "quick-installation",
      title: "Quick Installation",
      description: "The fastest way to get Elide running on your system:",
      code: `curl -sSL --tlsv1.2 elide.sh | bash -s -
# The installer script can take options:
curl -sSL --tlsv1.2 elide.sh | bash -s - --help`
    },
    {
      id: "manual-installation",
      title: "Manual Binary Installation", 
      description: "Download binaries directly from GitHub releases:",
      code: `# Visit GitHub releases for manual downloads:
# https://github.com/elide-dev/releases

# Extract and add to PATH
tar -xzf elide-*.tar.gz
sudo mv elide /usr/local/bin/`
    },
    {
      id: "container-images",
      title: "Container Images",
      description: "Run Elide in Docker without local installation:",
      code: `# Use the official container image:
docker run --rm -it ghcr.io/elide-dev/bash

# Mount your project directory:
docker run --rm -it -v $(pwd):/workspace ghcr.io/elide-dev/bash`
    },
    {
      id: "github-actions",
      title: "GitHub Actions",
      description: "Set up Elide in your CI/CD pipeline:",
      code: `- name: "Setup: Elide"
  uses: elide-dev/setup-elide@v2
  with:
    # any tag from the 'elide-dev/releases' repo
    # omit version to use the latest
    version: 1.0.0-beta8`
    },
    {
      id: "verify-installation",
      title: "Verify Installation",
      description: "Test that Elide is properly installed and working:",
      code: `# Check Elide is on your PATH
> which elide
/some/path/to/elide

# Verify binary architecture
> file $(which elide)
/some/path/to/elide: Mach-O 64-bit executable arm64

# Run help command
> elide --help`
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Common issues and solutions:",
      code: `# If 'elide' command not found:
export PATH="/path/to/elide:$PATH"
echo 'export PATH="/path/to/elide:$PATH"' >> ~/.bashrc

# Verify correct binary for your system:
uname -m  # Check your architecture
file $(which elide)  # Should match your system`
    }
  ];

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

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
      {/* Sticky Section Navigation */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white/80 hover:bg-white/10'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 pb-24">
        {/* Header Section */}
        <div ref={leftTextRef} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Download Elide</h1>
          <p className="text-lg font-light leading-relaxed tracking-tight text-white/75 mb-8 max-w-2xl mx-auto">
            Elide sets up on your machine similar to Node or Python. Choose the installation method that works best for your environment.
          </p>
        </div>

        {/* System Requirements Table */}
        <div id="system-requirements" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">System Requirements</h2>
          <div className="max-w-2xl mx-auto bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Operating System</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Architectures</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/75 font-medium">Linux</td>
                  <td className="px-6 py-4 text-white/60">amd64, aarch64</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-purple-600/80 text-purple-100 px-3 py-1 rounded-full text-sm">Beta</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/75 font-medium">macOS</td>
                  <td className="px-6 py-4 text-white/60">amd64, aarch64</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-purple-600/80 text-purple-100 px-3 py-1 rounded-full text-sm">Beta</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/75 font-medium">Windows</td>
                  <td className="px-6 py-4 text-white/60">amd64</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-orange-600/80 text-orange-100 px-3 py-1 rounded-full text-sm">Experimental</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Installation Methods */}
        <div className="space-y-12">
          {codeBlocks.map((block, index) => (
            <div 
              key={index} 
              id={block.id}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className="max-w-3xl mx-auto scroll-mt-24"
            >
              {/* Section title */}
              <h3 className="text-white font-semibold text-2xl mb-3">
                {block.title}
              </h3>
              
              {/* Section description */}
              {block.description && (
                <p className="text-white/60 text-base mb-6 leading-relaxed">
                  {block.description}
                </p>
              )}
              
              {/* Code content */}
              <div className="bg-black/90 border border-white/10 rounded-lg p-6">
                <pre className="text-sm font-mono leading-relaxed overflow-auto">
                  <code dangerouslySetInnerHTML={{ __html: formatCode(block.code) }} />
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}