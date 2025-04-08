import Image from "next/image";

export function DummyNewsSection() {
  const dummyNews = [
    {
      title: "Novo evento cultural movimenta o centro da cidade",
      excerpt:
        "A praça principal recebeu artistas locais e visitantes para uma noite especial...",
      imageUrl: "/imgs/others/deco-10.png",
    },
    {
      title: "Feira de produtores locais cresce a cada edição",
      excerpt:
        "A feira de domingo tem atraído cada vez mais moradores em busca de produtos frescos...",
      imageUrl: "/imgs/others/deco-11.png",
    },
    {
      title: "Campanha de doação de agasalhos começa neste mês",
      excerpt:
        "Organizações da cidade unem forças para ajudar quem mais precisa durante o inverno...",
      imageUrl: "/imgs/others/deco-12.png",
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-zinc-800">
            Notícias da Cidade
          </h2>
          <p className="mt-2 text-zinc-600">
            Fique por dentro dos acontecimentos, eventos e novidades da sua
            região.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {dummyNews.map((news, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-zinc-800">
                  {news.title}
                </h3>
                <p className="text-sm text-zinc-600">{news.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="bg-rise-fade group rounded-xl border-blue-200 px-6 py-3 font-medium transition"
          >
            <span className="bg-rise-fade-content group-hover:animate-rise-from-bottom text-black group-hover:text-white before:content-['Ver_todas_as_notícias']">
              Ver todas as notícias
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
