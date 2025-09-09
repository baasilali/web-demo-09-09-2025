import Navbar from "@/components/navbar";
import Hero from "@/components/ui/neural-network-hero";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Neural Network Background */}
      <Hero 
        title="Elide Runtime"
        description="Elide is an all-in-one, AI-native, open source software runtime, supporting many languages in one; used by devs to build web apps, command line tools, and scripts."
        ctaButtons={[
          { text: "Get Started", href: "#get-started", primary: true },
          { text: "Learn More", href: "#learn-more" }
        ]}
      />
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}
