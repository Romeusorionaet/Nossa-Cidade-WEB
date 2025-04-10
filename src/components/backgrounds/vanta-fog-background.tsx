"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
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
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect) {
      const loadScript = async () => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.VANTA && vantaRef.current) {
            // @ts-ignore
            const effect = window.VANTA.FOG({
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
            setVantaEffect(effect);
          }
        };
        document.body.appendChild(script);
      };

      loadScript();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}
