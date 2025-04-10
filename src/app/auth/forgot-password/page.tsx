// app/auth/forgot-password/page.tsx
import { Suspense } from "react";
import { NewPasswordForm } from "../components/new-password-form";

export default function ForgotPassword() {
  return (
    <main>
      <h1>Recuperar senha</h1>

      <Suspense fallback={<p>Carregando...</p>}>
        <NewPasswordForm />
      </Suspense>
    </main>
  );
}
