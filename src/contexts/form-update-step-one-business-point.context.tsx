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
    console.log(baseData, "==");
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
