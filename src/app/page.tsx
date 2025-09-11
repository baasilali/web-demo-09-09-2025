import Navbar from "@/components/navbar";
import Hero from "@/components/ui/neural-network-hero";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Neural Network Background */}
      <Hero 
        title="Elide Runtime"
        description="Run <span class='text-purple-400 font-bold'>JavaScript</span>, <span class='text-purple-400 font-bold'>Python</span>, <span class='text-purple-400 font-bold'>Ruby</span>, <span class='text-purple-400 font-bold'>Java</span>, <span class='text-purple-400 font-bold'>Kotlin</span>, and more — all in a single, blazing-fast runtime.<br><br>Build anything from <span class='text-pink-400 font-bold'>web apps</span> to <span class='text-pink-400 font-bold'>CLI tools</span> with the power of <span class='text-pink-400 font-bold'>polyglot</span> programming."
        ctaButtons={[
          { text: "Get Started", href: "/download", primary: true },
          { text: "Learn More", href: "/blog" }
        ]}
      />
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}
