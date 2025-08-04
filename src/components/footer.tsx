import { APP_ROUTES } from "@/constants/app-routes";
import { Crown } from "lucide-react";
import Link from "next/link";
import { Facebook } from "./social-media/facebook";
import { Instagram } from "./social-media/instagram";
import { Linkedin } from "./social-media/linkedin";
import { Youtube } from "./social-media/youtube";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1200px] space-y-10 px-4 py-10 md:space-y-20">
        <h3 className="text-xl font-light text-white md:text-2xl">
          Receber notícias da sua cidade <br /> através da Nossa Cidade.
        </h3>

        <div className="mt-10 flex flex-col gap-4">
          <label className="flex flex-col">
            <span>Email</span>
            <input
              type="email"
              className="border-b focus:ring-0 focus:outline-none"
            />
          </label>
          <label className="flex flex-col">
            <span>CEP</span>
            <input
              type="number"
              className="no-spinner-input-number border-b focus:ring-0 focus:outline-none"
            />
          </label>

          <div className="flex justify-between gap-4 max-md:flex-col">
            <label className="flex items-center gap-5">
              <input type="checkbox" />
              Sim, eu concordo em receber notícias.
            </label>

            <button
              type="button"
              className="bg-rise-fade group w-full bg-gradient-to-r from-blue-400 to-blue-200 md:w-1/2 md:p-[clamp(0.60rem,0.95vw,1rem)]"
            >
              <span className="bg-rise-fade-content group-hover:animate-rise-from-bottom text-center text-white group-hover:duration-300 before:content-['Enviar']">
                Enviar
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <nav className="w-1/2 text-center">
            <ul>
              <li>
                <Link href={APP_ROUTES.public.dashboard}>Home</Link>
              </li>
              <li>
                <Link href={APP_ROUTES.public.mapCity.slugBusinessPoint}>
                  Mapa
                </Link>
              </li>
              <li>Produtos</li>
              <li>
                <Link href={APP_ROUTES.public.user.profile}>Perfil</Link>
              </li>
            </ul>
          </nav>

          <nav className="w-1/2">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              <li>
                <a href="/">
                  <Facebook className="h-10 w-10 md:h-16 md:w-16" />
                </a>
              </li>
              <li>
                <a href="/">
                  <Instagram className="h-10 w-10 md:h-16 md:w-16" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/romeu-soares-87749a231/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-10 w-10 md:h-16 md:w-16" />
                </a>
              </li>
              <li>
                <a href="/">
                  <Youtube className="h-10 w-10 md:h-16 md:w-16" />
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-10 w-full space-y-6 border-t border-white/30 pt-6">
            <div className="text-center">
              <h4 className="mb-2 font-light text-white">Importante</h4>
              <ul>
                <li>Privacidade</li>
                <li>Termos e condições</li>
                <li>Acessibilidade</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="mb-2 font-light text-white">Endereço</h4>
              <p>Canguaretama - Rio Grande do Norte (RN)</p>
              <p>59190-000</p>
              <p>Bairro Fictício</p>
              <p>Rua Exemplo de Teste, 123</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-4 pb-4 text-cyan-50/50">
        <Crown />
        <span className="text-xs">
          Desenvolvido por Romeu Soares - Desenvolvedor Web
        </span>
        <span className="text-xs">romeusoares14569@gmail.com</span>
      </div>
    </footer>
  );
}
