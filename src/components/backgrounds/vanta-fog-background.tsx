"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import * as THREE from "three";

interface VantaFogBackgroundProps {
  className?: string;
  children?: ReactNode;
}

export function VantaFogBackground({
  className = "",
  children,
}: VantaFogBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  const initVanta = useCallback(() => {
    if (!window.VANTA || !vantaRef.current || vantaEffectRef.current) return;

    vantaEffectRef.current = window.VANTA.FOG({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: 0x638d9d,
      midtoneColor: 0x0877ff,
      speed: 5.0,
    });
  }, []);

  useEffect(() => {
    if (scriptLoadedRef.current) {
      initVanta();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
      initVanta();
    };
    document.body.appendChild(script);

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [initVanta]);

  return (
    <div ref={vantaRef} className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}
