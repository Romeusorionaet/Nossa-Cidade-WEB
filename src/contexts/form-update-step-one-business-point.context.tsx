"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { createContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  UpdateBusinessPointFormDataStepOneType,
  updateBusinessPointStepOneSchema,
} from "@/schemas/update-business-point.schema";
import { updateBusinessPointOverview } from "@/actions/put/business-point/update-business-point-overview";
import { useParams, useRouter } from "next/navigation";

interface FormUpdateStepOneBusinessPointContextType {
  register: UseFormRegister<UpdateBusinessPointFormDataStepOneType>;
  handleSubmit: UseFormHandleSubmit<UpdateBusinessPointFormDataStepOneType>;
  handleUpdateStepOneBusinessPointForm: (
    businessPointData: UpdateBusinessPointFormDataStepOneType,
  ) => Promise<void>;
  errors: FieldErrors<UpdateBusinessPointFormDataStepOneType>;
  isLoadingForm: boolean;
  setValue: UseFormSetValue<UpdateBusinessPointFormDataStepOneType>;
  getValues: UseFormGetValues<UpdateBusinessPointFormDataStepOneType>;
}

interface FormUpdateStepOneBusinessPointContextProps {
  children: React.ReactNode;
}

export const FormUpdateStepOneBusinessPointContext = createContext(
  {} as FormUpdateStepOneBusinessPointContextType,
);

export function FormUpdateStepOneBusinessPointContextProvider({
  children,
}: FormUpdateStepOneBusinessPointContextProps) {
  const { id } = useParams();
  const businessPointId = id as string;

  const router = useRouter();

  const queryClient = useQueryClient();
  const businessPointData =
    queryClient.getQueryData<UpdateBusinessPointFormDataStepOneType>([
      "businessPointData",
    ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isLoading: isLoadingForm },
  } = useForm<UpdateBusinessPointFormDataStepOneType>({
    resolver: zodResolver(updateBusinessPointStepOneSchema),
  });

  const handleUpdateStepOneBusinessPointForm = async (
    baseData: UpdateBusinessPointFormDataStepOneType,
  ) => {
    const { messageError, messageSuccess } = await updateBusinessPointOverview({
      businessPoint: baseData,
      businessPointId,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push("/user/my-business-points");
      return;
    }

    alert(messageError);
  };

  useEffect(() => {
    if (businessPointData) {
      reset(businessPointData);
    }
    reset();
  }, [businessPointData]);

  return (
    <FormUpdateStepOneBusinessPointContext.Provider
      value={{
        register,
        handleSubmit,
        handleUpdateStepOneBusinessPointForm,
        errors,
        isLoadingForm,
        setValue,
        getValues,
      }}
    >
      {children}
    </FormUpdateStepOneBusinessPointContext.Provider>
  );
}
