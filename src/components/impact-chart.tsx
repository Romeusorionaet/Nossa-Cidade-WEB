"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useRef, useState } from "react";

const fullData = [
  { name: "Antes", Visitas: 40 },
  { name: "Depois", Visitas: 140 },
];

const emptyData = [
  { name: "Antes", Visitas: 0 },
  { name: "Depois", Visitas: 0 },
];

export function ImpactChart() {
  const [hasEntered, setHasEntered] = useState(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white px-4 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Impacto na Visibilidade dos Negócios
        </h2>

        <div
          ref={chartRef}
          className="h-64 w-full transition-all duration-1000"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hasEntered ? fullData : emptyData}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="Visitas"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-6 text-center text-zinc-600">
          Negócios que se cadastraram tiveram, em média,{" "}
          <strong>75% mais visitas</strong> em comparação com antes de usarem a
          plataforma.
        </p>
      </div>
    </section>
  );
}
