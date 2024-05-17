"use client";

import { newVerification } from "@/app/action/new-Verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Invalid Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setSuccess(data.success || null);
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (token) {
      onSubmit();
    }

    return () => {};
  }, [onSubmit, token]);

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1 text-center">
          Verification.....
        </h2>
        {!success && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </div>
    </div>
  );
};

export default NewVerificationForm;
