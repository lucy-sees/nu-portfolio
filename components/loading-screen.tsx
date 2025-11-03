"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import animationData from "@/public/lottie/loading.json";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after component mounts (hydration complete)
    setIsLoading(false);
  }, []);

  // Hide loader once mounted
  if (!isLoading) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-muted z-50 flex items-center justify-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}