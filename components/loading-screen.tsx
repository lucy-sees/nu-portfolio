"use client";

import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "@/public/lottie/loading.json";

export default function LoadingScreen() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  if (isMounted) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-muted z-50 flex items-center justify-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
