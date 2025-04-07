import { CarouselPreviewsMap } from "@/components/carousel-previews-map";
import Link from "next/link";
import "swiper/css";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FAQ_ITEMS } from "@/constants/faq-items";
import { PricingSection } from "@/components/pricing-section";
import { ImpactChart } from "@/components/impact-chart";
import { DummyNewsSection } from "@/components/dummy-news-section";

export default function Dashboard() {
  return (
    <div>
      <main className="pt-24 max-md:pt-24 lg:pt-28">
        <section className="relative flex flex-col justify-between text-center">
          <div className="relative z-10 px-2 pt-16">
            <div className="flex cursor-default items-center justify-center max-md:flex-col">
              <div
                style={{
                  clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0% 100%)",
                }}
                className="flex h-28 w-[clamp(12rem,20vw,30rem)] items-center justify-center rounded-md bg-gradient-to-r from-amber-100 to-blue-200"
              >
                <span className="text-[clamp(2.4rem,3vw,3.6rem)]">
                  Encontre
                </span>
              </div>
              <div
                style={{
                  clipPath: "polygon(0 25%, 100% 0, 100% 100%, 0% 75%)",
                }}
                className="flex h-28 w-[clamp(12rem,20vw,30rem)] items-center justify-center bg-gradient-to-r from-blue-200 to-blue-200"
              >
                <span className="text-[clamp(2.4rem,3vw,3.6rem)]">Conecte</span>
              </div>
              <div
                style={{
                  clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0% 100%)",
                }}
                className="flex h-28 w-[clamp(12rem,20vw,30rem)] items-center justify-center bg-gradient-to-r from-blue-200 to-amber-200"
              >
                <span className="text-[clamp(2.4rem,3vw,3.6rem)]">Compre</span>
              </div>
            </div>

            <h1 className="mt-10 text-[clamp(2.4rem,3vw,3.6rem)] leading-none font-bold text-white max-md:text-start">
              Tudo na Nossa Cidade
            </h1>

            <div className="w-full pt-12">
              <p className="drop-shadow-p font-bold text-zinc-50">
                Saiba exatamente onde comprar na nossa cidade – veja no mapa e
                aproveite!
              </p>

              <div className="mt-10 flex w-full justify-around">
                <Link
                  href="/map-city"
                  className="block w-44 rounded-md border border-white/20 p-1 text-white duration-500 hover:bg-zinc-700"
                >
                  Ir para o mapa
                </Link>

                <Link
                  href="/shopping"
                  className="block w-44 rounded-md border border-white/20 p-1 text-white duration-500 hover:bg-zinc-700"
                >
                  Ver produtos
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute top-0 -z-20 h-full w-full bg-black">
            <video
              src="/mp4/lathe-gradients.mp4"
              controls={false}
              autoPlay
              muted
              loop
              className="h-full w-full mix-blend-exclusion"
            />
          </div>

          <div className="mt-16 -mb-32">
            <CarouselPreviewsMap />
          </div>

          <div className="absolute -bottom-28 left-0 z-10 h-10 w-full bg-black blur-2xl" />
        </section>

        <div className="background-1 relative h-[300vh] pt-44 pb-28">
          <section className="sticky top-20 z-10 mx-auto h-screen w-full max-w-[1600px] px-4 pt-10">
            <Image
              src="/imgs/others/deco-8.png"
              alt=""
              width={1000}
              height={1000}
              className="absolute top-[100px] h-[400px] w-full object-cover md:top-56 md:left-1/2 md:w-96"
              data-scroll
              data-scroll-speed={0.4}
            />

            <h2 className="text-[clamp(2rem,2.4vw,3rem)]">
              Destacando <br /> a conexão local
            </h2>

            <div className="w-full max-w-[500px] pt-10 text-zinc-700">
              <p data-scroll data-scroll-speed={-0.04}>
                Muitas vezes, quando precisamos comprar algo, nem sempre temos
                tempo ou paciência para ir até o centro da cidade procurar. O
                que a maioria das pessoas faz? Abre um app de compras online,
                encontra o que precisa e finaliza a compra. Isso pode ser
                eficiente em comparação com a busca tradicional, mas será que é
                sempre a melhor opção?
              </p>
            </div>
          </section>

          <div className="pointer-events-none absolute top-[100vh] z-20 h-[100vh] w-full">
            <section className="border-top rounded-t-2xl border-4 border-x-1 border-white pt-20 backdrop-blur-sm">
              <div className="sticky top-0 h-screen rounded-t-2xl bg-amber-50">
                <h2
                  data-scroll
                  data-scroll-speed={0.1}
                  className="px-4 pt-20 text-center"
                >
                  Conforto e Conveniência: <br /> Compre de Casa ou Encontre o
                  Melhor Perto de Você
                </h2>

                <div className="mt-20 rounded-md bg-white p-1 px-4 md:absolute md:top-72 md:right-44 md:-mt-10 md:w-96">
                  <p>
                    Na Nossa Cidade, trazemos essa facilidade para você! Aqui,
                    você tem a mesma experiência de comprar com conforto, direto
                    de casa. E se preferir sair, já saberá exatamente onde ir.
                  </p>
                </div>

                <div className="mx-auto h-full w-full max-w-[1200px] rounded-md bg-[url('/imgs/others/deco-14.png')] bg-contain bg-center bg-no-repeat max-md:-mt-20" />
              </div>
            </section>

            <section className="background-1 mx-auto w-full max-w-[1600px] rounded-md px-4 pt-20 max-md:pb-20 md:pt-56">
              <h2 className="text-[clamp(2rem,2.4vw,3rem)]">
                Conectando Você ao Comércio Local: <br /> Encontre as Melhores
                Ofertas Perto de Você
              </h2>

              <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white/60 p-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-semibold">
                    Pizzaria da Esquina 🍕
                  </h3>
                  <p className="text-sm text-zinc-700">
                    Combo família com 30% OFF
                  </p>
                </div>
                <div className="rounded-lg bg-white/60 p-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-semibold">
                    Mercadinho Central 🛒
                  </h3>
                  <p className="text-sm text-zinc-700">
                    Leve 3, pague 2 no hortifruti
                  </p>
                </div>
                <div className="rounded-lg bg-white/60 p-4 shadow-lg backdrop-blur-md">
                  <h3 className="text-lg font-semibold">Salão Top Beleza 💇‍♀️</h3>
                  <p className="text-sm text-zinc-700">
                    Agende e ganhe 20% de desconto
                  </p>
                </div>
              </div>

              <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-lg font-medium text-zinc-800">
                  Descubra promoções incríveis perto de você!
                </p>
                <button
                  type="button"
                  className="rounded-full bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                >
                  Ativar Localização
                </button>
              </div>
            </section>
          </div>
        </div>

        <section className="mx-auto mt-60 mb-16 w-full max-w-[500px] space-y-10 px-4 text-center md:mt-20">
          <p data-scroll data-scroll-speed={0.1} className="font-light">
            A Nossa Cidade é uma plataforma focada no comércio local,
            impulsionando as vendas da sua região e conectando comerciantes aos
            clientes próximos.
          </p>

          <Image
            src="/imgs/others/deco-5.png"
            alt=""
            width={500}
            height={500}
            className="mx-auto h-20 w-20"
          />

          <p className="font-light">
            Agora, ao sair de casa, você já sabe onde encontrar aquele sapato
            pelo melhor preço ou aquela bolsa estilosa que tanto procurava—e
            muitas vezes, com um valor ainda melhor do que imaginava, bem
            pertinho de você!
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-10">
          <h3 className="text-[clamp(2rem,2.4vw,3rem)]">
            Veja como a Nossa Cidade já faz a diferença!
          </h3>

          <blockquote className="mt-10 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
            “Ia comprar um fone online, mas achei o mesmo modelo numa loja a
            duas ruas de casa. Pude testar na hora e ainda paguei mais barato!”
            <footer className="mt-2 text-sm text-zinc-600">
              — Lucas, Belo Horizonte
            </footer>
          </blockquote>

          <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
            “Sempre achava que só dava pra encontrar essas ofertas na
            internet... agora vejo que o comércio local tem muito a oferecer!”
            <footer className="mt-2 text-sm text-zinc-600">
              — Mariana, Fortaleza
            </footer>
          </blockquote>

          <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
            “Comprei meu liquidificador na loja do bairro. Cheguei lá e ainda
            ganhei desconto só por ter visto pela plataforma. Muito mais
            prático!”
            <footer className="mt-2 text-sm text-zinc-600">
              — Diego, Curitiba
            </footer>
          </blockquote>

          <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
            “Eu sou do tipo que gosta de ver o produto de perto. Com a
            plataforma, achei a loja certa rapidinho — sem perder tempo com
            entrega.”
            <footer className="mt-2 text-sm text-zinc-600">
              — Patrícia, Recife
            </footer>
          </blockquote>

          <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
            “Ia comprar uma camiseta pela Shopee, mas preferi pagar um pouco
            mais e buscar na loja aqui perto no mesmo dia. Valeu muito a pena —
            pude experimentar na hora e sair com o tamanho certo, sem dúvidas.”
            <footer className="mt-2 text-sm text-zinc-600">
              — Renan, São Paulo
            </footer>
          </blockquote>
        </section>

        <section className="bg-white px-6 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Resultados de quem usa a Nossa Cidade
          </h2>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 text-center md:grid-cols-3">
            <div className="rounded-xl bg-slate-100 p-6 shadow-sm">
              <p className="text-5xl font-bold text-blue-500">+65%</p>
              <p className="mt-2 text-zinc-700">
                Visibilidade nos primeiros 15 dias
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-6 shadow-sm">
              <p className="text-5xl font-bold text-green-500">+40%</p>
              <p className="mt-2 text-zinc-700">
                Mais pessoas visitando a loja
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-6 shadow-sm">
              <p className="text-5xl font-bold text-orange-500">92%</p>
              <p className="mt-2 text-zinc-700">
                Dos usuários dizem que preferem comprar perto quando encontram o
                produto
              </p>
            </div>
          </div>

          <ImpactChart />
        </section>

        <PricingSection />

        <section
          id="faq"
          className="border-y-8 border-black bg-orange-200 py-12"
        >
          <div className="flex flex-wrap items-center justify-center">
            <h2 className="text-center text-4xl font-thin drop-shadow-lg md:text-7xl">
              Perguntas Frequentes
            </h2>

            <div>
              <Image
                width={500}
                height={500}
                src="/imgs/others/deco-6.png"
                alt=""
              />
            </div>
          </div>

          <div className="mx-auto mt-10 space-y-4 px-1 md:max-w-4xl">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-gray-200 bg-gray-100 p-4"
              >
                <summary className="cursor-pointer text-lg font-semibold">
                  {item.question}
                </summary>
                <p className="mt-2 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-10 text-center">
            <h3 className="font-extrabold">Ficou alguma dúvida?</h3>
            <div className="space-y-4">
              <p className="uppercase">Me chame agora mesmo no</p>
              <button
                type="button"
                className="rounded-md bg-green-600 p-2 text-white duration-500 hover:bg-green-500"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col justify-center gap-28 bg-white bg-[url('/imgs/others/deco-7.png')] bg-left bg-no-repeat px-2 py-12 md:bg-right md:pl-10">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-thin drop-shadow-lg max-md:text-center md:text-7xl">
              Você está no caminho certo
            </h2>
            <div className="flex items-center max-md:flex-col">
              <p className="text-xl max-md:text-center">
                Em poucos passos você cadastra seu ponto comercial de graça!
              </p>
              <ArrowRight size={56} className="rounded-full max-lg:hidden" />
              <ArrowDown size={56} className="lg:hidden" />
            </div>
          </div>

          <Link
            href=""
            className="mx-auto mt-72 inline-block w-full max-w-[300px] rounded-md bg-green-500 p-2 text-center text-white drop-shadow-xl"
          >
            Cadastar ponto comercial
          </Link>

          <p className="text-zinc-700 md:w-1/2">
            Prepare-se para ter crescimento nas suas vendas — você será notado
            na Nossa Cidade! Aproveite essa oportunidade para alcançar mais
            clientes e expandir seu negócio.
          </p>
        </section>

        <DummyNewsSection />
      </main>
    </div>
  );
}
