import NewVerificationForm from "@/components/auth/NewVerificationForm";
import Loading from "@/components/shared/loading";
import { Suspense } from "react";

const VerificationPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <NewVerificationForm />
      </Suspense>
    </>
  );
};

export default VerificationPage;
