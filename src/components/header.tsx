"use client";

import { cleanAuthCookies } from "@/actions/auth/sign-out";
import { UserContext } from "@/contexts/user.context";
import { LogIn } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export function Header() {
  const { profile, refetchUserProfile, isLoadingDataUserProfile } =
    useContext(UserContext);
  const { data } = useSession();

  const router = useRouter();

  const handleLogout = async () => {
    const logOutFromGoogle = !!data?.user;

    if (logOutFromGoogle) {
      await Promise.all([signOut(), cleanAuthCookies()]);
    } else {
      await Promise.all([cleanAuthCookies(), refetchUserProfile()]);
    }
  };

  const handleLogin = () => {
    router.push("/sign-in");
  };

  return (
    <header className="fixed top-0 left-0 z-20 w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1680px] justify-between bg-white p-6">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign in</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign up</Link>
            </li>
            <li>
              <Link href="/business-point/register-business-point">
                Registrar ponto comercial
              </Link>
            </li>
          </ul>
        </nav>

        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="h-10 w-10 rounded-full bg-black text-white"
          >
            Perfil
          </Dropdown.Toggle>

          <Dropdown.Menu className="flex flex-col bg-black p-1 text-white">
            <Dropdown.Item href="/user/profile">Perfil</Dropdown.Item>
            <Dropdown.Item href="/user/my-business-points">
              Meus Pontos comerciais
            </Dropdown.Item>
            <Dropdown.Item>
              {isLoadingDataUserProfile ? (
                <p>Carregando....</p>
              ) : (
                <div className="flex items-center justify-between gap-8">
                  <div className="w-full">
                    {!profile.username ? (
                      <div className="flex flex-col gap-4">
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="flex w-32 items-center justify-center gap-4 border font-bold uppercase"
                        >
                          Login
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="hover:bg-base_one_reference_header hover:text-base_color_text_top w-full gap-4 font-semibold duration-700"
                      >
                        <LogIn size={26} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
