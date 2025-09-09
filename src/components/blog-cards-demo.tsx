"use client";

import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  area: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with Elide Runtime",
    author: "Baasil Ali",
    date: "January 15, 2024",
    thumbnail: "/elide-logo.png",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
  },
  {
    title: "Building Multi-Language Applications",
    author: "Baasil Ali", 
    date: "January 12, 2024",
    thumbnail: "/elide-logo.png",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
  },
  {
    title: "Elide vs Traditional Runtimes: A Deep Dive",
    author: "Baasil Ali",
    date: "January 8, 2024", 
    thumbnail: "/elide-logo.png",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
  },
  {
    title: "Performance Optimization Tips",
    author: "Baasil Ali",
    date: "January 5, 2024",
    thumbnail: "/elide-logo.png", 
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
  },
  {
    title: "Container Deployment Best Practices",
    author: "Baasil Ali",
    date: "January 1, 2024",
    thumbnail: "/elide-logo.png",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
  }
];

export default function BlogCardsDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[28rem] xl:grid-rows-2">
      {blogPosts.map((post, index) => (
        <BlogCard
          key={index}
          area={post.area}
          thumbnail={post.thumbnail}
          title={post.title}
          author={post.author}
          date={post.date}
        />
      ))}
    </ul>
  );
}

interface BlogCardProps {
  area: string;
  thumbnail: string;
  title: string;
  author: string;
  date: string;
}

const BlogCard = ({ area, thumbnail, title, author, date }: BlogCardProps) => {
  return (
    <li className={`min-h-[11rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            {/* Thumbnail */}
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              <Image 
                src={thumbnail}
                alt={title}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <div className="space-y-1">
                <p className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 font-medium">
                  {author}
                </p>
                <p className="font-sans text-xs/[1rem] text-black md:text-sm/[1.125rem] dark:text-neutral-500">
                  {date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};