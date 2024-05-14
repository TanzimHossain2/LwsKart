"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async()=>{}

  return (
    <>
      <form  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
              {...register('email',{
                required: 'Email is required',
                pattern: /^\S+@\S+$/i,
                minLength: {
                  value: 3,
                  message: 'Email must have at least 3 characters'
                }
              })}
            />
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
              {...register('password',{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password must have at least 3 characters'
                }
              })}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
           
              id="remember"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              {
                ...register('remember')
              }
            />
            <label
              htmlFor="remember"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link href="/forget" className="text-primary">
            Forgot password
          </Link>
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
