"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FormSuccess = ({ message, mode = true }: { message: any; mode?: boolean }) => {
  
  const [show, setShow] = useState<boolean>(mode);

  if (!show) return null;

  return (
    <div className="mt-4 p-3 bg-green-100 text-green-500 rounded flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/images/icons/check.svg"
          alt="success icon"
          width={20}
          height={20}
        />
        <span className="ml-2">{message}</span>
      </div>
      <button
        onClick={() => setShow(false)}
        className="ml-4 text-gray-600 hover:text-gray-800"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default FormSuccess;
