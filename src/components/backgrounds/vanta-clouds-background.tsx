"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import * as THREE from "three";
import Image from "next/image";

interface VantaBackgroundProps {
  className?: string;
  children?: ReactNode;
}

export function VantaCloudsBackground({
  className = "",
  children,
}: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vantaEffect) {
      const loadScript = async () => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.VANTA && vantaRef.current) {
            // @ts-ignore
            const effect = window.VANTA.CLOUDS({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              speed: 0.7,
            });
            setVantaEffect(effect);
            setIsLoading(false);
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
      {isLoading && (
        <div className="absolute inset-0 z-20 transition-opacity">
          <Image
            src="/imgs/previews/preview-effect-clounds-vanta.png"
            alt=""
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
