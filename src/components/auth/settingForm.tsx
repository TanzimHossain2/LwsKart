"use client";

import { updateInfo } from "@/app/action/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";


const SettingForm = () => {
  const user = useCurrentUser();
  const { update, status } = useSession();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      role: user?.role || 'user',
      password: '',
      newPassword: '',
      number: user?.number || '',
    },
  });

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");


  const onSubmit: SubmitHandler<z.infer<typeof SettingSchema>> = async (
    data
  ) => {
    try {
      const res = await updateInfo(data);

      if (res.success) {
        setSuccess(res.success);
        update( );
        console.log(res.success);
        return;
      }

      setError(res.error);
      console.log(res.error);
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <>
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div>
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must have at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {user?.isOAuth === false && (
            <>
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
                    required: " Email is required",
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
              <label htmlFor="password" className="text-gray-600 mb-2 block">Your Password</label>
              <input type="password" id="password" className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400" placeholder="*******" {...register("password")} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="newPassword" className="text-gray-600 mb-2 block">Enter New Password</label>
              <input type="password" id="newPassword" className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400" placeholder="*******" {...register("newPassword")} />
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
            </div>
            </>
          )}

          <div>
            <label htmlFor="number" className="text-gray-600 mb-2 block">
              Phone number
            </label>

            <input
              type="text"
              id="number"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="+880 180 000 1111"
              {...register("number", {
                required: " Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone number must have at least 10 characters",
                },
                maxLength: {
                  value: 14,
                  message: "Phone number must have at most 14 characters",
                },
              })}
            />

            {errors.number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.number.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="text-gray-600 mb-2 block">
              Role
            </label>
            <select
              id="role"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              {...register("role", {
                required: "Role is required",
              })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {user?.isOAuth === false && (
            <div className="flex gap-2 py-3">
              <label
                htmlFor="isTwoFactorEnabled"
                className="text-gray-600 mb-2 block"
              >
                Two Factor Authentication
              </label>
              <Controller
                name="isTwoFactorEnabled"
                control={control}
                render={({ field }) => <h2>Hi</h2> }
              />
            </div>
          )}
        </div>

       

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            Update Information
          </button>
        </div>
      </form>
    </>
  );
};

export default SettingForm;
