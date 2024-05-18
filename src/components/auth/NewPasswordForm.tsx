"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { newPasswordSchema } from "@/schemas";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/app/action/auth";

const NewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof newPasswordSchema>>({
    defaultValues: {
      password: "",
      confirm: "",
      error: "",
      success: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<z.infer<typeof newPasswordSchema>> = async (
    data
  ) => {
    try {
      if (data.password !== data.confirm) {
        setError("confirm", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      const res = await newPassword(data, token);

      if (res.success) {
        setError("success", {
          message: res.success,
        });
      } else {
        setError("error", {
          message: res.error,
        });
      }
    } catch (err) {
      setError("error", {
        message: "Something went wrong",
      });
    }
  };

  return (
    <>
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
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
                required: " Password is required",
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

          <div>
            <label htmlFor="confirm" className="text-gray-600 mb-2 block">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="*******"
              {...register("confirm", {
                required: " Confirm Password is required",
                minLength: {
                  value: 6,
                  message: "Confirm Password must have at least 6 characters",
                },
              })}
            />
            {errors.confirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4" {...register("error")}>
          {errors?.error ? <FormError message={errors.error?.message} /> : null}

          {errors?.success ? (
            <FormSuccess message={errors.success?.message} />
          ) : null}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            Send reset email
          </button>
        </div>

        <div className="flex justify-center  mt-6">
          <Link href="/auth/login" className="text-primary">
            Back to login
          </Link>
        </div>
      </form>
    </>
  );
};

export default NewPasswordForm;
