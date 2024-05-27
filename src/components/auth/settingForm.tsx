"use client";

import { updateInfo } from "@/app/action/user";
import { SettingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface SettingFormProps {
  user: {
    name: string;
    email: string;
    isTwoFactorEnabled: boolean;
    number: string;
    isOAuth: boolean;
    role: "user" | "admin";
    username: string;
    image: string;
    id: string;
  };
}

const SettingForm: React.FC<SettingFormProps> = ({ user }) => {
  const router = useRouter();
  const { update, status, data } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      role: user?.role || "user",
      password: "",
      newPassword: "",
      number: user?.number || "",
    },
  });

  const [isChangePassword, setIsChangePassword] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof SettingSchema>> = async (
    data
  ) => {
    clearErrors();

    try {
      const res = await updateInfo(data);
      if (res.success) {
        update();

        toast.success(res.success, {
          position: "bottom-right",
          autoClose: 1000,
        });

        // redirect profile after 2 seconds
        setTimeout(() => {
          router.push("/profile");
        }, 1300);

        return;
      }

      toast.error(res.error, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.log((err as Error).message);

      toast.error((err as Error).message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container">
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-primary focus:border-primary placeholder-gray-400"
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
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-primary focus:border-primary placeholder-gray-400"
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

              <div className="flex items-center gap-2 py-3">
                <input
                  type="checkbox"
                  id="isChangePassword"
                  className="form-checkbox h-5 w-5 text-primary"
                  checked={isChangePassword}
                  onChange={() => setIsChangePassword(!isChangePassword)}
                />
                <label htmlFor="isChangePassword" className="text-gray-600">
                  Change Password
                </label>
              </div>

              {isChangePassword && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-gray-600 mb-2 block"
                    >
                      Your Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-primary focus:border-primary placeholder-gray-400"
                      placeholder="*******"
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message: "Password must have at least 6 characters",
                        },
                      })}
                      defaultValue={""}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="text-gray-600 mb-2 block"
                    >
                      Enter New Password
                    </label>
                    <input
                      type="text"
                      id="newPassword"
                      className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-primary focus:border-primary placeholder-gray-400"
                      placeholder="*******"
                      {...register("newPassword", {
                        minLength: {
                          value: 6,
                          message: "Password must have at least 6 characters",
                        },
                      })}
                      defaultValue={""}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          <div>
            <label htmlFor="number" className="text-gray-600 mb-2 block">
              Phone number
            </label>
            <input
              type="text"
              id="number"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-primary focus:border-primary placeholder-gray-400"
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
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-primary focus:border-primary placeholder-gray-400"
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
            <div className="flex items-center gap-2 py-3">
              <label htmlFor="isTwoFactorEnabled" className="text-gray-600">
                Two Factor Authentication
              </label>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  id="isTwoFactorEnabled"
                  className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer peer checked:right-0 checked:bg-primary"
                  {...register("isTwoFactorEnabled")}
                />
                <label
                  htmlFor="isTwoFactorEnabled"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-primary"
                ></label>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-medium"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingForm;
