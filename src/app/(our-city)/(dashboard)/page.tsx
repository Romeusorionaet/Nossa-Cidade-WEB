import { CarouselPreviewsMap } from '@/components/carousel-previews-map'
import Link from 'next/link'
import 'swiper/css'

export default function Dashboard() {
  return (
    <div>
      <header>Header</header>

      <main className="mt-44 text-center">
        <h1>Encontre. Conecte. Compre. Tudo na Nossa Cidade.</h1>
        <p>
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

        <div className="mt-10 px-2">
          <CarouselPreviewsMap />
        </div>
      </main>
    </div>
  )
}
