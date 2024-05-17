/* eslint-disable react/no-unescaped-entities */

import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Loading from "@/components/shared/loading";
import Link from "next/link";
import { Suspense } from "react";


const LoginPage = () => {
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
        <Suspense fallback={<Loading />} >
        <LoginForm />
        </Suspense>
        <SocialLogin mode="login" />
        <p className="mt-4 text-center text-gray-600">
          Don't have account?{" "}
          <Link href="/auth/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
