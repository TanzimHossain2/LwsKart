import RegistrationForm from "@/components/auth/RegistrationForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import React from "react";

const RegistrationPage = () => {
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create an account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">Register for new cosutumer</p>
        <RegistrationForm />

        <SocialLogin mode="register" />

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link href="/login" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
