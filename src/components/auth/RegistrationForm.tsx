"use client";
import { AuthDictionary, Dictionary } from "@/interfaces/lang";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  aggrement: boolean;
  number: string;
};

type Props = {
  dictionary: Dictionary;
}

const RegistrationForm = ({dictionary}:Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      aggrement: false,
      number: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirm) {
      setError("confirm", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        reset();
        console.log("User created successfully");
        router.push("/auth/login");
      } else {
        console.log(res.statusText);
        // React Toastify will add here
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div>
            <label htmlFor="name" className="text-gray-600 mb-2 block">
            
              {dictionary.auth.full_name}
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
            <label htmlFor="password" className="text-gray-600 mb-2 block">
              {dictionary.auth.password}
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
              {dictionary.auth.confirm_password}
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

          <div>
            <label htmlFor="number" className="text-gray-600 mb-2 block">
              {dictionary.auth.phone_number}
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
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="aggrement"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              {...register("aggrement", { required: " Aggrement is required" })}
            />
            <label
              htmlFor="aggrement"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              I have read and agree to the{" "}
              <Link href="#" className="text-primary">
                terms & conditions
              </Link>
            </label>
            {errors.aggrement && (
              <p className="text-red-500 text-xs mt-1">
                {errors.aggrement.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            {dictionary.auth.create_account}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
