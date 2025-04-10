import { Suspense } from "react";
import { HandleConfirmEmail } from "../components/handle-confirm-email";

export default function ConfirmEmail() {
  return (
    <div className="pt-28 pl-4">
      <div className="flex-wrap items-center justify-center gap-8 text-center md:flex">
        <h1 className="mb-2 font-bold">Confirme seu email</h1>

        <Suspense fallback="Carregando...">
          <HandleConfirmEmail />
        </Suspense>
      </div>
    </div>
  );
}
