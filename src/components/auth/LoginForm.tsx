"use client";
import { login } from "@/app/action/loginAction";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

type Inputs = {
  email: string;
  password: string;
  remember?: boolean;
  error?: string;
  success?: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
      error: "",
      success: "",
    },
  });

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Your account is already linked with another provider"
      : "";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await login(data);
      if (res.user || res.success) {
        console.log(res?.user);
        setError("success", { type: "manual", message: res?.success });
      } else {
        console.log(res?.error);
        setError("error", {
          type: "manual",
          message: res?.error,
        });
      }
    } catch (err) {
      // React Toastify will add here
      console.log((err as Error).message);
    }
  };

  return (
    <>
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Email address
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
              Password
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
              Remember me
            </label>
          </div>
          <Link href="/auth/reset" className="text-primary">
            Forgot password
          </Link>
        </div>

        <div className="mt-4" {...register("error")}>
          {errors?.error || urlError ? (
            <FormError message={errors.error?.message || urlError} />
          ) : null}

          {errors?.success ? (
            <FormSuccess message={errors.success?.message} />
          ) : null}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
