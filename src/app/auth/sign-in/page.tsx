import { OurCityLogo } from "@/components/our-city-logo";
import { FormSignIn } from "../components/form-sign-in";

export default async function SignIn() {
  return (
    <main className="background-1 min-h-screen">
      <div className="p-10">
        <OurCityLogo />
      </div>
      <FormSignIn />
    </main>
  );
}
