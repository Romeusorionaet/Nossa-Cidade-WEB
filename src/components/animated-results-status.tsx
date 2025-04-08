"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  color: string;
  description: string;
};

export function AnimatedResultsStatus() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);

  const stats: Stat[] = [
    {
      value: 65,
      suffix: "%",
      color: "text-blue-500",
      description: "Visibilidade nos primeiros 15 dias",
    },
    {
      value: 40,
      suffix: "%",
      color: "text-green-500",
      description: "Mais pessoas visitando a loja",
    },
    {
      value: 92,
      suffix: "%",
      color: "text-orange-500",
      description:
        "Dos usuários dizem que preferem comprar perto quando encontram o produto",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const durations = [1200, 1200, 1200]; // ms
    const starts = [0, 0, 0];
    const ends = stats.map((s) => s.value);
    const startTime = performance.now();

    const animate = (time: number) => {
      const newCounts = ends.map((end, i) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / durations[i], 1);
        return Math.floor(starts[i] + (end - starts[i]) * progress);
      });

      setCounts(newCounts);

      if (newCounts.some((val, i) => val < ends[i])) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <section className="w-full bg-white px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Resultados de quem usa a Nossa Cidade
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 text-center md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl bg-slate-100 p-6 shadow-sm transition-transform duration-700 ease-in-out"
            >
              <p className={`text-5xl font-bold ${stat.color}`}>
                +{counts[index]}
                {stat.suffix}
              </p>
              <p className="mt-2 text-zinc-700">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
