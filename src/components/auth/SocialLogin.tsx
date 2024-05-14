import { doSignIn } from "@/app/action";
import Link from "next/link";

type SocialLoginsProps = {
  mode: "login" | "register";
}





const SocialLogin : React.FC <SocialLoginsProps> = ({ mode }) => {
  return (
    <>
      <div className="mt-6 flex justify-center relative">
        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
          Or {mode === "register" ? "signup" : "login"} with
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      <div className="mt-4 flex gap-4">

       <form action={doSignIn}>
       <button
          className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
        >
          facebook
        </button>
        <button
         
          className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
        >
          google
        </button>

       </form>

      </div>
    </>
  );
};

export default SocialLogin;
