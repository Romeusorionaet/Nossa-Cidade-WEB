import { OurCityLogo } from "@/components/our-city-logo";
import { FormSignUp } from "../components/form-sign-up";

export default async function SignUp() {
  return (
    <main className="background-1 min-h-screen flex-row-reverse lg:flex">
      <div className="p-10">
        <OurCityLogo />
      </div>

      <FormSignUp />

      <div className="mt-10 p-4 text-justify lg:w-96">
        <p>
          <strong>Nota</strong>: Ao criar uma conta, você receberá um e-mail com
          um token de confirmação. Verifique sua caixa de entrada para confirmar
          seu endereço de e-mail. Este procedimento é necessário para validar
          seu e-mail.
        </p>
      </div>
    </main>
  );
}
