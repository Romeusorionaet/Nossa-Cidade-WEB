import { PricingSection } from "@/components/pricing-section";
import { APP_ROUTES } from "@/constants/app-routes";
import Link from "next/link";

export default function Prices() {
  return (
    <main>
      <section id="como-funciona" className="bg-white px-4 py-32 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Como funciona a plataforma
          </h2>
          <p className="mb-8 text-zinc-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt, nisl eget aliquam rhoncus, nunc sapien commodo eros, eu
            varius lectus justo vel sapien. Descubra como nossos planos se
            adaptam ao crescimento do seu negócio e garantem a máxima
            visibilidade para seus produtos e serviços.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Passo 1: Crie sua conta
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
            </div>
            <div className="rounded-lg bg-green-200 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Passo 2: Escolha o plano ideal
              </h3>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit. Nossos planos foram pensados para atender desde
                pequenos empreendedores até grandes redes.
              </p>
            </div>
            <div className="rounded-lg bg-green-500 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Passo 3: Configure seu espaço
              </h3>
              <p>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit. Personalize sua vitrine e destaque
                seus produtos com poucos cliques.
              </p>
            </div>
          </div>

          <div className="mt-12 text-left">
            <h3 className="mb-4 text-2xl font-bold">
              Por que escolher nossos planos?
            </h3>
            <ul className="space-y-4 text-zinc-700">
              <li>
                <strong>Flexibilidade:</strong> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nossos planos permitem que você
                evolua conforme seu negócio cresce.
              </li>
              <li>
                <strong>Visibilidade:</strong> Nullam tincidunt, nisl eget
                aliquam rhoncus, nunc sapien commodo eros, eu varius lectus
                justo vel sapien. Alcance mais clientes com destaques na
                plataforma.
              </li>
              <li>
                <strong>Suporte dedicado:</strong> Sed ut perspiciatis unde
                omnis iste natus error sit voluptatem. Nossa equipe está sempre
                pronta para ajudar.
              </li>
              <li>
                <strong>Benefícios exclusivos:</strong> Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur. Tenha acesso a
                promoções, campanhas especiais e recursos avançados.
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <p className="mb-4 text-lg text-zinc-600">
              Quer saber mais detalhes? Compare os planos disponíveis e encontre
              o mais adequado para você.
            </p>
            <a
              href="#plans"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Ver Planos e Preços
            </a>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-4xl font-bold">Cadastro gratuito</h2>
          <p className="text-zinc-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            vehicula dapibus ante, vel fermentum massa. Lorem ipsum dolor sit
            amet consectetur, adipisicing elit.{" "}
            <span className="text-green-500">Delectus</span> vero adipisci odio
            a quas, error molestiae saepe ipsum nisi rerum possimus voluptates
            id unde nihil ipsa veniam modi voluptatum! Rerum!
          </p>
          <div className="mt-8">
            <Link
              href={APP_ROUTES.public.auth.signUp}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Crie sua conta agora
            </Link>
          </div>
        </div>
      </section>

      <section
        id="benefits-customers"
        className="bg-zinc-50 px-4 py-20 md:px-8"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-4xl font-bold">Benefícios para clientes</h2>
          <p className="text-zinc-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            feugiat, sapien nec fringilla ultricies, tellus odio luctus velit,
            non dapibus erat massa sed odio.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            <div className="rounded-lg bg-cyan-200 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Variedade de opções
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur tincidunt.
              </p>
            </div>
            <div className="rounded-lg bg-green-200 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Promoções exclusivas
              </h3>
              <p>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia.
              </p>
            </div>
            <div className="rounded-lg bg-violet-200 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Facilidade de acesso
              </h3>
              <p>
                Donec vehicula, lorem in euismod facilisis, metus neque posuere
                libero, ac tempor.
              </p>
            </div>
            <div className="rounded-lg bg-amber-200 p-4 shadow">
              <h3 className="mb-2 text-xl font-semibold">
                Avaliações e feedback
              </h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
    </main>
  );
}
