"use client";
import { useState } from "react";
import useHash from "@/hooks/use-hash";
import { cn } from "@/lib/utils";
import { File, Home, LucideSend, User, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  {
    id: 1,
    name: "Home.tsx",
    path: "#home",
    icon: Home,
  },
  {
    id: 2,
    name: "About.tsx",
    path: "#about",
    icon: User,
  },
  {
    id: 3,
    name: "Projects.tsx",
    path: "#projects",
    icon: File,
  },
  {
    id: 4,
    name: "Contact-Me.tsx",
    path: "#contact",
    icon: LucideSend,
    isRight: true,
  },
];

export default function Header() {
  const { hash } = useHash();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-12 border-b bg-muted/50 flex items-center border border-cyan-300 backdrop-blur-sm">
      {/* Logo */}
      <div className="w-14 flex items-center justify-center flex-shrink-0 font-bold border-r border-cyan-300/30">
        <Image
          src="/imgs/logo.png"
          alt="LM Logo"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center size-full border border-cyan-300">
        {navItems.map((item) => {
          const isActive =
            item.path === hash || (item.path === "#home" && hash === "");
          return (
            <Link
              key={item.id}
              href={item.path}
              scroll
              className={cn(
                "border border-cyan-300 group relative h-full w-fit md:min-w-40 flex items-center justify-start gap-2 text-muted-foreground hover:bg-background/50 px-4 border-r",
                isActive && "text-foreground bg-background/80 hover:bg-background/80",
                item.isRight && "ml-auto"
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Icon */}
              <item.icon
                size={14}
                className={cn(
                  "text-primary-foreground",
                  isActive && "text-orange-400"
                )}
              />

              {/* Link Text */}
              <span className="hidden md:inline">{item.name}</span>

              {/* Active State Border */}
              {isActive && (
                <>
                  <div className="absolute inset-0 border border-dotted border-orange-400 pointer-events-none m-1" />
                  <div className="absolute inset-0 bg-orange-400/10 pointer-events-none" />
                </>
              )}

              {/* Close Icon (X) */}
              {isActive && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X
                    size={14}
                    className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}