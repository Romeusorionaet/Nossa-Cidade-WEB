import { BackNavigation } from "@/components/back-navigation";
import { FormRegisterBusinessPoint } from "../components/form-register-business-point";

export default function RegisterBusinessPoint() {
  return (
    <main className="py-32">
      <BackNavigation />

      <h1 className="my-10 px-4 md:px-10">
        Registre seu ponto comercial e se torne um comerciante
      </h1>

      <FormRegisterBusinessPoint />
    </main>
  );
}
