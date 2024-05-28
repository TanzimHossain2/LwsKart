"use client";
import { login } from "@/app/action/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState } from "react";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { toast } from "react-toastify";
import { Dictionary } from "@/interfaces/lang";

type Props = {
  dictionary: Dictionary;

}

const LoginForm = ({dictionary}:Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
      error: "",
      success: "",
      code: "",
    },
  });

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const [message, setMessages] = useState<{
    success: string | null;
    error: string;
  }>({
    success: "",
    error: "",
  });

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Your account is already linked with another provider"
      : "";

  const callbackUrl = searchParams.get("callbackUrl");
  console.log("callbackUrl login form", callbackUrl);
  

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    try {
      const res = await login(data, callbackUrl);

      if (res.status === 203) {
        toast.success(res?.success, {
          position: "bottom-right",
          autoClose: 1500,
        });

        setMessages({
          ...message,
          success: res?.success,
        });

        return;
      }

      if (res.status === 200) {
        reset();

        clearErrors();

        toast.success(res?.success, {
          position: "bottom-right",
          autoClose: 2000,
        });

        return;
      }

      if (res.twoFactor) {
        setShowTwoFactor(true);
      } else {
        reset();
        clearErrors();

        setError("error", {
          type: "manual",
          message: res?.error,
        });
      }
    } catch (err) {
      toast.error((err as Error).message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {showTwoFactor && (
            <div className="space-y-2">
              <div>
                <label htmlFor="code" className="text-gray-600 mb-2 block">
                  Two Factor Code
                </label>
                <input
                  type="text"
                  id="code"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="123456"
                  {...register("code", {
                    required: "Code is required",
                    minLength: {
                      value: 6,
                      message: "Code must have at least 6 characters",
                    },
                  })}
                />
                {errors.code && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {!showTwoFactor && (
            <>
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  
                  {dictionary.auth.email_address}
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                    minLength: {
                      value: 3,
                      message: "Email must have at least 3 characters",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  {dictionary.auth.password}
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    {...register("remember")}
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    {dictionary.auth.remember_me}
                  </label>
                </div>
                <Link href="/auth/reset" className="text-primary">
                  {dictionary.auth.forgot_password}
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-4" {...register("error")}>
          {errors?.error || urlError ? (
            <FormError message={errors.error?.message || urlError} />
          ) : null}

          {message.success ? <FormSuccess message={message.success} /> : null}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            {showTwoFactor ? `${dictionary.auth.verify}` : `${dictionary.auth.login}`}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
