import { CarouselPreviewsMap } from "@/components/carousel-previews-map";
import Link from "next/link";
import "swiper/css";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FAQ_ITEMS } from "@/constants/faq-items";

export default function Dashboard() {
  return (
    <div>
      <main className="pt-24 max-md:pt-24 lg:pt-28">
        <section className="relative flex flex-col justify-between bg-[url('/imgs/others/deco-4.png')] bg-cover bg-top bg-no-repeat text-center">
          <div className="relative px-2 pt-16">
            <h1 className="drop-shadow-h1 text-[clamp(2.4rem,3vw,3.6rem)] leading-none font-bold max-md:text-start">
              Encontre. <br /> Conecte. <br /> Compre. <br /> Tudo na Nossa
              Cidade.
            </h1>

            <div className="pt-12">
              <p className="drop-shadow-p font-bold text-white">
                Saiba exatamente onde comprar na nossa cidade – veja no mapa e
                aproveite!
              </p>

              <div className="mt-10 flex items-center justify-center gap-10">
                <Link
                  href="/map-city"
                  className="inline-block w-44 rounded-md bg-zinc-500 p-1 text-white duration-500 hover:bg-zinc-700"
                >
                  Ir para o mapa
                </Link>

                <Link
                  href="/shopping"
                  className="inline-block w-44 rounded-md bg-zinc-500 p-1 text-white duration-500 hover:bg-zinc-700"
                >
                  Ver produtos
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 -mb-16">
            <CarouselPreviewsMap />
          </div>

          <div className="absolute -bottom-28 left-0 z-10 h-10 w-full bg-black blur-2xl" />
        </section>

        <section className="background-1 relative space-y-10 overflow-x-hidden py-28">
          <div className="mx-auto h-screen w-full max-w-[1600px] rounded-md px-4 pt-10 md:h-[650px]">
            <Image
              src="/imgs/others/deco-8.png"
              alt=""
              width={1000}
              height={1000}
              className="absolute top-[500px] h-[400px] w-full object-cover md:top-72 md:left-1/2 md:w-96"
              data-scroll
              data-scroll-speed={0.4}
            />

            <h2>
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
          </div>

          <div className="relative h-screen">
            <h2
              data-scroll
              data-scroll-speed={0.1}
              className="px-4 text-center"
            >
              Conforto e Conveniência: <br /> Compre de Casa ou Encontre o
              Melhor Perto de Você
            </h2>

            <div className="mx-auto h-full w-full max-w-[1600px] rounded-md bg-[url('/imgs/others/deco-1.png')] bg-left bg-no-repeat md:bg-center" />

            <div className="top-72 right-44 -mt-20 px-4 md:absolute md:w-96">
              <p className="text-zinc-700">
                Na Nossa Cidade, trazemos essa facilidade para você! Aqui, você
                tem a mesma experiência de comprar com conforto, direto de casa.
                E se preferir sair, já saberá exatamente onde ir.
              </p>
            </div>
          </div>

          <div className="max-md:mt-96 md:-mt-56">
            <div className="mx-auto h-screen w-full max-w-[1600px] rounded-md bg-cyan-950 bg-[url('/imgs/others/deco-2.png')] bg-bottom bg-no-repeat px-4 pt-10 md:pt-72">
              <h2 className="text-white mix-blend-exclusion">
                Conectando Você ao Comércio Local: <br /> Encontre as Melhores
                Ofertas Perto de Você
              </h2>
            </div>

            <div className="mx-auto mt-28 w-full max-w-[500px] space-y-10 px-4 text-center text-white">
              <p data-scroll data-scroll-speed={0.1} className="font-light">
                A Nossa Cidade é uma plataforma focada no comércio local,
                impulsionando as vendas da sua região e conectando comerciantes
                aos clientes próximos.
              </p>

              <Image
                src="/imgs/others/deco-5.png"
                alt=""
                width={500}
                height={500}
                className="mx-auto h-20 w-20"
              />

              <p className="font-light">
                Agora, ao sair de casa, você já sabe onde encontrar aquele
                sapato pelo melhor preço ou aquela bolsa estilosa que tanto
                procurava—e muitas vezes, com um valor ainda melhor do que
                imaginava, bem pertinho de você!
              </p>
            </div>
          </div>
        </section>

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

          <div className="mt-16 flex flex-wrap justify-center gap-16 md:justify-around">
            <div className="text-center">
              <h3 className="font-extrabold">Ficou alguma dúvida?</h3>
              <div>
                <p className="uppercase">Me chame agora mesmo no</p>
                <button
                  type="button"
                  className="rounded-md bg-green-600 p-2 text-white duration-500 hover:bg-green-500"
                >
                  WhatsApp
                </button>
              </div>
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
      </main>
    </div>
  );
}
