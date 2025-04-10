import { VantaCloudsBackground } from "@/components/backgrounds/vanta-clouds-background";
import { VantaFogBackground } from "@/components/backgrounds/vanta-fog-background";
import { AnimatedResultsStatus } from "@/components/animated-results-status";
import { DummyNewsSection } from "@/components/dummy-news-section";
import { CarouselPreviews } from "@/components/carousel-previews";
import { PricingSection } from "@/components/pricing-section";
import { ImpactChart } from "@/components/impact-chart";
import { ArrowDown, ArrowRight } from "lucide-react";
import { APP_ROUTES } from "@/constants/app-routes";
import { FAQ_ITEMS } from "@/constants/faq-items";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

export default function Dashboard() {
  return (
    <main>
      <div className="absolute top-0 left-0 h-screen w-full">
        <VantaCloudsBackground />
      </div>

      <section className="relative z-20 flex h-screen flex-col justify-evenly px-2 pt-16">
        <div className="mx-auto md:w-1/2">
          <h1 className="px-4 leading-none font-bold text-cyan-50">
            <span className="text-start text-[clamp(1.8rem,2.3vw,2.8rem)] drop-shadow-lg">
              Tudo na
            </span>
            <br />
            <span className="inline-block w-full rounded-md bg-cyan-50 p-1 text-center text-[clamp(2.4rem,3vw,3.6rem)] text-black/70 shadow-2xl drop-shadow-lg">
              Nossa
            </span>
            <br />
            <span className="inline-block w-full text-end text-[clamp(2.8rem,3.5vw,4rem)] drop-shadow-lg">
              Cidade
            </span>
          </h1>

          <div className="w-full pt-12 text-center">
            <p className="font-extralight text-cyan-50 drop-shadow-lg">
              Saiba exatamente onde comprar na nossa cidade – veja no mapa e
              aproveite!
            </p>

            <div className="mt-10 flex w-full items-center justify-around gap-4 max-md:flex-col">
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

        <div className="mt-10 flex cursor-default items-center justify-center max-md:flex-col xl:mt-40">
          <div
            style={{
              clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0% 100%)",
            }}
            className="flex w-[clamp(12rem,20vw,30rem)] items-center justify-center rounded-md bg-gradient-to-r from-red-200/10 to-red-100 md:h-28"
          >
            <span className="text-[clamp(1.5rem,3vw,3.6rem)] font-light text-black/70 xl:font-extralight">
              Encontre
            </span>
          </div>
          <div
            style={{
              clipPath: "polygon(0 25%, 100% 0, 100% 100%, 0% 75%)",
            }}
            className="flex w-[clamp(12rem,20vw,30rem)] items-center justify-center bg-gradient-to-r from-blue-200 to-blue-200/10 md:h-28"
          >
            <span className="text-[clamp(1.5rem,3vw,3.6rem)] font-light text-black/70 xl:font-extralight">
              Conecte
            </span>
          </div>
          <div
            style={{
              clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0% 100%)",
            }}
            className="flex w-[clamp(12rem,20vw,30rem)] items-center justify-center bg-gradient-to-r from-blue-200/10 to-red-100 md:h-28"
          >
            <span className="text-[clamp(1.5rem,3vw,3.6rem)] font-light text-black/70 xl:font-extralight">
              Compre
            </span>
          </div>
        </div>
      </section>

      <div className="background-1 relative z-20 h-[300vh] border-t-4 border-zinc-600 pt-10 pb-28">
        <section className="sticky top-20 mx-auto h-screen w-full max-w-[1600px] overflow-hidden px-4 pt-10">
          <Image
            src="/imgs/others/deco-8.png"
            alt=""
            width={1000}
            height={1000}
            className="absolute top-[100px] -z-10 h-[400px] w-full object-cover md:top-56 md:left-1/2 md:w-96"
            data-scroll
            data-scroll-speed={0.4}
          />

          <h2 className="text-[clamp(2rem,2.4vw,3rem)] text-cyan-50 mix-blend-exclusion">
            Destacando <br /> a conexão local
          </h2>

          <div className="w-full max-w-[500px] pt-10">
            <p
              data-scroll
              data-scroll-speed={-0.04}
              className="text-cyan-50 mix-blend-exclusion"
            >
              Muitas vezes, quando precisamos comprar algo, acabamos recorrendo
              direto aos apps de compras online — pela praticidade e rapidez.
              Mas e se o que você procura estiver disponível na sua própria
              cidade, por um preço justo e pronto para levar na hora? Será que
              vale mesmo a pena esperar dias por algo que poderia estar logo
              ali, do lado?
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
                  Na Nossa Cidade, unimos praticidade com valorização do
                  comércio local. Você pode explorar produtos com a mesma
                  comodidade de uma vitrine online, direto de casa. E se quiser
                  sair para comprar, já saberá exatamente onde encontrar — com o
                  benefício de fortalecer a economia da sua região e ter a
                  confiança de levar o produto certo.
                </p>
              </div>

              <div className="mx-auto h-full w-full max-w-[1200px] rounded-md bg-[url('/imgs/others/deco-14.png')] bg-contain bg-center bg-no-repeat max-md:-mt-40" />
            </div>
          </section>

          <section className="background-1 mx-auto w-full max-w-[1600px] rounded-md px-4 pt-20 max-md:pb-20 md:pt-56">
            <h2 className="text-[clamp(2rem,2.4vw,3rem)] text-cyan-50">
              Conectando Você ao Comércio Local: <br /> Encontre as Melhores
              Ofertas Perto de Você
            </h2>

            <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-black/70 p-4 text-white shadow-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold">
                  Pizzaria da Esquina 🍕
                </h3>
                <p className="text-sm text-cyan-50">
                  Combo família com 30% OFF
                </p>
              </div>
              <div className="rounded-lg bg-black/70 p-4 text-white shadow-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold">Mercadinho Central 🛒</h3>
                <p className="text-sm text-cyan-50">
                  Leve 3, pague 2 no hortifruti
                </p>
              </div>
              <div className="rounded-lg bg-black/70 p-4 text-white shadow-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold">Salão Top Beleza 💇‍♀️</h3>
                <p className="text-sm text-cyan-50">
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

      <section className="mx-auto mt-96 mb-16 w-full max-w-[500px] space-y-10 px-4 text-center md:mt-20">
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
          Agora, ao sair de casa, você já sabe onde encontrar aquele sapato pelo
          melhor preço ou aquela bolsa estilosa que tanto procurava—e muitas
          vezes, com um valor ainda melhor do que imaginava, bem pertinho de
          você!
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-10">
        <h3 className="text-[clamp(2rem,2.4vw,3rem)]">
          Veja como a Nossa Cidade já faz a diferença!
        </h3>

        <blockquote className="mt-10 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
          “Ia comprar um fone online, mas achei o mesmo modelo numa loja a duas
          ruas de casa. Pude testar na hora e ainda paguei mais barato!”
          <footer className="mt-2 text-sm text-zinc-600">
            — Lucas, Belo Horizonte
          </footer>
        </blockquote>

        <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
          “Sempre achava que só dava pra encontrar essas ofertas na internet...
          agora vejo que o comércio local tem muito a oferecer!”
          <footer className="mt-2 text-sm text-zinc-600">
            — Mariana, Fortaleza
          </footer>
        </blockquote>

        <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
          “Comprei meu liquidificador na loja do bairro. Cheguei lá e ainda
          ganhei desconto só por ter visto pela plataforma. Muito mais prático!”
          <footer className="mt-2 text-sm text-zinc-600">
            — Diego, Curitiba
          </footer>
        </blockquote>

        <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
          “Eu sou do tipo que gosta de ver o produto de perto. Com a plataforma,
          achei a loja certa rapidinho — sem perder tempo com entrega.”
          <footer className="mt-2 text-sm text-zinc-600">
            — Patrícia, Recife
          </footer>
        </blockquote>

        <blockquote className="mt-6 rounded-md bg-white/60 p-6 text-zinc-800 italic shadow-md backdrop-blur-md">
          “Ia comprar uma camiseta pela Shopee, mas preferi pagar um pouco mais
          e buscar na loja aqui perto no mesmo dia. Valeu muito a pena — pude
          experimentar na hora e sair com o tamanho certo, sem dúvidas.”
          <footer className="mt-2 text-sm text-zinc-600">
            — Renan, São Paulo
          </footer>
        </blockquote>
      </section>

      <section className="bg-white px-6 py-16">
        <AnimatedResultsStatus />

        <ImpactChart />
      </section>

      <PricingSection />

      <section id="faq" className="border-y-8 border-black bg-orange-200 py-12">
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
          href={APP_ROUTES.public.businessPoint.registerBusinessPoint}
          className="mx-auto mt-72 inline-block w-full max-w-[300px] rounded-md bg-blue-500 p-2 text-center text-white drop-shadow-xl hover:scale-105"
        >
          Cadastar ponto comercial
        </Link>

        <p className="text-zinc-700 md:w-1/2">
          Prepare-se para ter crescimento nas suas vendas — você será notado na
          Nossa Cidade! Aproveite essa oportunidade para alcançar mais clientes
          e expandir seu negócio.
        </p>

        <CarouselPreviews />
      </section>

      <DummyNewsSection />

      <section className="relative flex h-[50vh] items-center justify-center">
        <div className="absolute top-0 left-0 h-full w-full rounded-md">
          <VantaFogBackground />
        </div>
        <div className="z-10 flex h-80 w-80 flex-col items-center justify-center gap-4 rounded-md bg-cyan-50/50 font-medium">
          <Image
            width={500}
            height={500}
            src="/imgs/logos/our-city-logo.png"
            alt=""
            className="h-24 w-24"
          />

          <h4 className="text-cyan-50">Seja notado</h4>

          <div className="mt-4 flex max-w-72 flex-col gap-4 text-white">
            <Link
              href={APP_ROUTES.public.auth.signUp}
              className="bg-rise-fade group bg-black md:p-[clamp(0.60rem,0.95vw,1rem)]"
            >
              <span className="bg-rise-fade-content group-hover:animate-rise-from-bottom text-center text-white group-hover:duration-300 before:content-['Comece']">
                Comece
              </span>
            </Link>

            <div className="text-center">
              <span className="opacity-80">Já tem uma conta?</span>
              <Link
                href={APP_ROUTES.public.auth.signIn}
                className="font-medium text-white underline"
              >
                Faça o login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
