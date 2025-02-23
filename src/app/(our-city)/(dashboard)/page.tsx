import { CarouselPreviewsMap } from "@/components/carousel-previews-map";
import Link from "next/link";
import "swiper/css";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div>
      {/* <header>Nossa Cidade</header> */}

      <main className="text-center">
        <section className="flex h-screen flex-col justify-between bg-[url('/imgs/others/deco-4.png')] bg-cover bg-top bg-no-repeat pt-20 text-black">
          <div>
            <h1 className="text-6xl">
              Encontre. Conecte. Compre. Tudo na Nossa Cidade.
            </h1>
            <p className="text-xl">
              Saiba exatamente onde comprar na nossa cidade – veja no mapa e
              aproveite!
            </p>

            <div className="mt-10 flex items-center justify-center gap-10">
              <Link href="/map-city" className="inline-block w-44 border p-1">
                Ir para o mapa
              </Link>

              <Link href="/shopping" className="inline-block w-44 border p-1">
                Ver produtos
              </Link>
            </div>
          </div>

          <div className="px-2">
            <CarouselPreviewsMap />
          </div>
        </section>

        <div className="mt-20 space-y-10">
          <h2 className="text-4xl">Destacando a conexão local</h2>
          <p>
            Muitas vezes, quando precisamos comprar algo, nem sempre temos tempo
            ou paciência para ir até o centro da cidade procurar. O que a
            maioria das pessoas faz? Abre um app de compras online, encontra o
            que precisa e finaliza a compra. Isso pode ser eficiente em
            comparação com a busca tradicional, mas será que é sempre a melhor
            opção?
          </p>

          <Image
            src="/imgs/others/deco-3.png"
            alt=""
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />

          <p>
            Na Nossa Cidade, trazemos essa facilidade para você! Aqui, você tem
            a mesma experiência de comprar com conforto, direto de casa. E se
            preferir sair, já saberá exatamente onde ir.
          </p>

          <Image
            src="/imgs/others/deco-1.png"
            alt=""
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />

          <p>
            A Nossa Cidade é uma plataforma focada no comércio local,
            impulsionando as vendas da sua região e conectando comerciantes aos
            clientes próximos.
          </p>

          <Image
            src="/imgs/others/deco-2.png"
            alt=""
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />

          <p>
            Agora, ao sair de casa, você já sabe onde encontrar aquele sapato
            pelo melhor preço ou aquela bolsa estilosa que tanto procurava—e
            muitas vezes, com um valor ainda melhor do que imaginava, bem
            pertinho de você!
          </p>
        </div>
      </main>
    </div>
  );
}
