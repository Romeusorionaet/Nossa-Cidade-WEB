"use client";

import { signInWithEmailAndPassword } from "@/actions/auth/signIn";
import { UserContext } from "@/contexts/user.context";
import { signInFormSchema } from "@/schemas/form-sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { FormError } from "./form-error";

type LoginFormData = z.infer<typeof signInFormSchema>;

export function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const { refetchUserProfile } = useContext(UserContext);

  const router = useRouter();

  async function handleSignInForm(data: LoginFormData) {
    const { email, password } = data;

    const response = await signInWithEmailAndPassword({ email, password });

    if (!response.success) {
      console.log(response.message, "err");
      return;
    }

    if (response.success && !isSubmitting) {
      await refetchUserProfile();

      router.push("/map-city");
    }
  }

  function handleNavigateToSignUp() {
    router.push("/sign-up");
  }

  const handleLoginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="bg-base_color_text_top mx-auto mt-10 w-[90vw] max-w-[450px] rounded-xl p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-hidden md:mt-28"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="text-base_one_reference_header mb-4 text-center font-bold uppercase">
        Fazer login
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
        <fieldset className="flex flex-col gap-6">
          <label className="flex flex-col" htmlFor="email">
            Email
            <input
              id="email"
              placeholder="pedro@gmail.com"
              className="p-2"
              {...register("email")}
            />
            <FormError errors={errors.email?.message} />
          </label>

          <label className="flex flex-col" htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              placeholder="******"
              className="p-2"
              {...register("password")}
            />
            <FormError errors={errors.password?.message} />
          </label>
        </fieldset>

        <div className="flex justify-center">
          <button
            type="submit"
            className="hover:bg-base_one_reference_header hover:text-base_color_text_top w-60 gap-4 font-semibold"
          >
            {isSubmitting ? <p>Carregando...</p> : <p>Entrar</p>}
          </button>
        </div>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          type={"button"}
          onClick={handleLoginWithGoogle}
          className="hover:bg-base_one_reference_header hover:text-base_color_text_top w-60 gap-4 font-semibold"
        >
          Entrar com Google
        </button>
      </div>

      <button
        type="button"
        onClick={handleNavigateToSignUp}
        className="hover:bg-base_one_reference_header w-full text-center"
      >
        Criar conta
      </button>
    </motion.div>
  );
}
