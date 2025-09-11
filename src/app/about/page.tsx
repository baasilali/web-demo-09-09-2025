import Navbar from "@/components/navbar";

export default function About() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">
            About Elide
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-white/80">
            <p>
              Elide is an all-in-one, AI-native, open source software runtime that supports many languages in one unified platform.
            </p>
            
            <p>
              Built for modern developers, Elide empowers you to build web applications, command line tools, and scripts with unprecedented flexibility and performance.
            </p>
            
            <p>
              Whether you&apos;re prototyping, building production applications, or exploring new technologies, Elide provides the runtime foundation you need to bring your ideas to life.
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navbar />
    </div>
  );
}