"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { ResetSchema } from "@/schemas";
import * as z from 'zod';
import { reset } from "@/app/action/auth";


const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof ResetSchema>>({
    defaultValues: {
      email: "",
      error: "",
      success: "",
    },
  });

  

  const onSubmit: SubmitHandler<z.infer<typeof ResetSchema>> = async (data) => {
    try {
      const res= await reset(data);

      
      if(res.success){
        setError("success", {
          message: res.success
        })
      } else {
        setError("error", {
          message: res.error
        })
      }
    } catch (err) {
      setError("error", {
        message: "Something went wrong"
      })
    }
  };

  return (
    <>
      <form autoComplete="o</div>n" onSubmit={handleSubmit(onSubmit)}>
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

export default ResetForm;
