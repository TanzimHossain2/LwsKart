import ResetForm from "@/components/auth/ResetForm";
import Loading from "@/components/shared/loading";
import { Suspense } from "react";

const ResetPage = () => {
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Reset your password
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your new password to reset your account
        </p>
        <Suspense fallback={<Loading />}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ResetPage;
