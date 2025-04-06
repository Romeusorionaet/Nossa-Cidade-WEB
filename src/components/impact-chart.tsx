"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Antes",
    Visitas: 40,
  },
  {
    name: "Depois",
    Visitas: 140,
  },
];

export function ImpactChart() {
  return (
    <section className="w-full bg-white px-4 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Impacto na Visibilidade dos Negócios
        </h2>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Visitas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
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
