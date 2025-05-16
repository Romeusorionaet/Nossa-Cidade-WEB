import Link from "next/link";
import { ProfileContent } from "../components/profile-content";
import { APP_ROUTES } from "@/constants/app-routes";
import { getAccessTokenFromCookies } from "@/utils/get-access-token-from-cookies";
import { extractDataFromJwtToken } from "@/utils/extract-data-from-jwt-token";

export default async function Profile() {
  const accessToken = await getAccessTokenFromCookies();
  const { tokenStaffId, errorMessage } = extractDataFromJwtToken(accessToken);

  if (errorMessage) {
    return (
      <p className="pt-48 text-center underline">
        <Link href={APP_ROUTES.public.auth.signIn}>{errorMessage}</Link>
      </p>
    );
  }

  const isMerchant = Boolean(tokenStaffId);

  return (
    <main className="pt-28">
      <ProfileContent />

      <div className="my-10 h-1 w-full bg-sky-400 shadow-[0_0_10px_#38bdf8,0_0_20px_#38bdf8]" />

      <section className="relative">
        <div
          data-value={isMerchant}
          className="absolute inset-0 z-10 mx-auto flex max-w-96 flex-col items-center justify-center space-y-4 rounded-xl bg-slate-400 p-4 text-center text-white backdrop-blur-sm data-[value=true]:hidden"
        >
          <h3 className="font-light">
            Você precisa se tornar comerciante para ter acesso a essa área
          </h3>
          <Link
            href={APP_ROUTES.public.businessPoint.registerBusinessPoint}
            className="rounded-xl bg-sky-500 px-6 py-2 text-white shadow-lg transition hover:bg-sky-600 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          >
            Se tornar comerciante
          </Link>
        </div>

        <h2 className="text-center">Área do comerciante</h2>

        <nav
          data-value={isMerchant}
          className="my-10 flex gap-20 px-10 data-[value=false]:pointer-events-none data-[value=false]:blur-xs"
        >
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
      </section>
    </main>
  );
}
