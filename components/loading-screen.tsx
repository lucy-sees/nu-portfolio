"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/loading.json";

export default function LoadingScreen() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (isMounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-muted z-50 flex items-center justify-center">
      <Lottie animationData={animationData} loop autoplay style={{ height: 400, width: 400 }} />
    </div>
  );
}
