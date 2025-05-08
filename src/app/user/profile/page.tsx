import Link from "next/link";
import { ProfileContent } from "../components/profile-content";
import { APP_ROUTES } from "@/constants/app-routes";
import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";

export default async function Profile() {
  const accessToken = await getAccessTokenFromCookies();

  return (
    <main className="pt-28">
      <ProfileContent />

      <div className="my-10 h-1 w-full bg-sky-400 shadow-[0_0_10px_#38bdf8,0_0_20px_#38bdf8]" />

      <h2 className="text-center">Área do comerciante</h2>

      <nav className="my-10 flex gap-20 px-10">
        <div className="group">
          <h3 className="mb-4 font-light">
            Visibilidade
            <span className="ml-1.5 inline-block whitespace-nowrap duration-300 group-hover:rotate-90 group-focus:rotate-90 after:content-['->'] group-hover:after:text-blue-500" />
          </h3>

          <ul>
            <li>
              <Link
                href={APP_ROUTES.public.businessPoint.registerBusinessPoint}
                className="hover:underline"
              >
                Cadastrar estabelecimento
              </Link>
            </li>
            <li>
              <Link
                href={APP_ROUTES.public.user.myReviews}
                className="hover:underline"
              >
                Minhas avaliações
              </Link>
            </li>
            <li>
              <Link
                href={APP_ROUTES.public.user.myBusinessPoints}
                className="hover:underline"
              >
                Meus pontos comerciais
              </Link>
            </li>
          </ul>
        </div>

        <div className="group opacity-50">
          <h3 className="mb-4 font-light">
            Gestão
            <span className="ml-1.5 inline-block whitespace-nowrap duration-300 group-hover:rotate-90 group-focus:rotate-90 after:content-['->'] group-hover:after:text-blue-500" />
          </h3>

          <ul>
            <li>
              <Link href="#" className="hover:underline">
                Dashboard comercial
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Monitore interações e visitas - (Ánalise)
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Adicionar produtos e serviços
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Minhas campanhas
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  );
}
