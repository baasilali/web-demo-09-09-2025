import Navbar from "@/components/navbar";
import Hero from "@/components/ui/neural-network-hero";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Neural Network Background */}
      <Hero 
        title="Elide Runtime"
        description="Run <span class='text-yellow-400 font-bold text-xl'>JavaScript</span>, <span class='text-blue-400 font-bold text-xl'>Python</span>, <span class='text-red-400 font-bold text-xl'>Ruby</span>, <span class='text-orange-400 font-bold text-xl'>Java</span>, <span class='text-purple-400 font-bold text-xl'>Kotlin</span>, and more — all in a single, blazing-fast runtime.<br><br>Build anything from web apps to CLI tools with the power of polyglot programming."
        ctaButtons={[
          { text: "Get Started", href: "https://docs.elide.dev/index_md.html", primary: true },
          { text: "Learn More", href: "/blog" }
        ]}
      />
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}
