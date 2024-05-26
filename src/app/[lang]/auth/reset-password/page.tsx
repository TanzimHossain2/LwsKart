import NewPasswordForm from "@/components/auth/NewPasswordForm";
import Loading from "@/components/shared/loading";
import { Suspense } from "react";

const VerificationPage = () => {
  return (
    <>
      <div className="container contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Reset your password
          </h2>
          <Suspense fallback={<Loading />}>
            <NewPasswordForm />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
