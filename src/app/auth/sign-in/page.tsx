import { OurCityLogo } from "@/components/our-city-logo";
import { FormSignIn } from "../components/form-sign-in";
import Link from "next/link";
import { APP_ROUTES } from "@/constants/app-routes";

export default async function SignIn() {
  return (
    <main className="background-1 min-h-screen md:p-10">
      <Link href={APP_ROUTES.public.dashboard}>
        <div className="h-24 w-24">
          <OurCityLogo />
        </div>
      </Link>
      <FormSignIn />
    </main>
  );
}
