import { Check } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Grátis",
      price: "R$0",
      features: [
        "1 ponto comercial",
        "Visibilidade local",
        "Acesso ilimitado ao mapa",
      ],
      highlight: false,
    },
    {
      name: "Profissional",
      price: "R$29/mês",
      features: [
        "Até 2 pontos comerciais",
        "Cadastro limitado de produtos para vitrine",
        "Direito a 1 destaque semanal como propaganda na plataforma",
        "Todos os benefícios do plano Grátis",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "R$49/mês",
      features: [
        "Até 5 pontos comerciais",
        "Cadastro ilimitado de produtos para vitrine",
        "Landpage gratuita para 1 ponto (hospedagem por conta do usuário)",
        "Todos os benefícios do plano Profissional",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-zinc-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-4xl font-bold">Escolha o plano ideal</h2>
        <p className="mb-12 text-zinc-600">
          Comece com o gratuito ou impulsione sua presença com recursos
          avançados.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-2xl border p-8 shadow-lg transition-transform duration-300 hover:scale-105 ${
                plan.highlight
                  ? "border-blue-500 bg-blue-50 shadow-blue-200"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <div>
                {plan.highlight && (
                  <span className="mb-3 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                    Melhor custo-benefício
                  </span>
                )}

                <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
                <p className="mb-6 text-3xl font-bold text-blue-600">
                  {plan.price}
                </p>

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-zinc-700"
                    >
                      <Check className="min-h-[20px] min-w-[20px] text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`mt-8 w-full rounded-xl py-3 font-medium transition ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
                }`}
              >
                Escolher Plano
              </button>
              {plan.highlight && (
                <p className="mt-2 text-sm text-blue-600">
                  Ideal para comércios em crescimento
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
