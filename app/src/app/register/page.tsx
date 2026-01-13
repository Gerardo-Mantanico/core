"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiMail, HiUser, HiEye, HiEyeOff } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi2";
import { registerValidationSchema } from "../../utils/validators/register.schema";
import { RegisterFormValues } from "../../utils/types/register.types";
import { registerUser } from "@/services/register.service";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValidationSchema),
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = methods;

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitError(null);
    try {
      await registerUser(values);
      setSubmitError("Usuario registrado con éxito");
    } catch (error) {
      setSubmitError(error?.message || "Error al registrar el usuario");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2  p-8 items-center bg-white flex justify-center">
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
            <div className="mb-4 flex flex-col gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <HiUser className="text-gray-400" />
                Nombre
              </Label>
              <Input
                id="name"
                {...register("name")}
                className={touchedFields.name && errors.name ? "border-red-500" : ""}
              />
              {touchedFields.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
              )}
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <HiMail className="text-gray-400" />
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={touchedFields.email && errors.email ? "border-red-500" : ""}
              />
              {touchedFields.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              )}
            </div>

            <div className="mb-6 flex flex-col gap-2 relative">
              <Label htmlFor="password" className="flex items-center gap-2">
                <HiLockClosed className="text-gray-400" />
                Contraseña
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={touchedFields.password && errors.password ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
              {touchedFields.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Registrarse
            </Button>
              {submitError && (
              <div className="mb-4 text-red-600 text-center font-normal">
                {submitError}
              </div>
            )}
          </form>
        </Form>
      </div>
      <div className="hidden md:block w-1/2 bg-blue-500 p-8"></div>
    </div>
  );
}