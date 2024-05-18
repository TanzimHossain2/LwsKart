import Image from "next/image";

const FormSuccess = ({ message }: { message: any }) => {
  return (
    <p className="mt-4 p-3 bg-red-100 text-red-500 rounded flex items-center">
      <Image
        src="/images/icons/check.svg"
        alt="error icon"
        width={20}
        height={20}
      />{" "}
      <span className="ml-2">{message}</span>
    </p>
  );
};

export default FormSuccess;
