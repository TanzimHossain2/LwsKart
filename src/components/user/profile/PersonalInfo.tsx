import { ExtendedUser } from "@/next-auth";
import Image from "next/image";

interface PersonalInfoProps {
  user: ExtendedUser;
}

const PersonalInfo = ({ user }:PersonalInfoProps) => {

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Personal Profile</h3>
        <a href="#" className="text-primary">
          Edit
        </a>
      </div>
      <div className="space-y-1">
        <div>
          <Image
            src={user?.image || ""}
            alt="profile"
            className="w-20 h-20 rounded-full mx-auto"
            width={80}
            height={80}
          />
        </div>

        <h4 className="text-gray-700 font-medium">
          {user?.name}
        </h4>

        <p className="text-gray-800">
          {user?.email}
        </p>

        <p className="text-gray-800">
          {user?.id}
        </p>

        <p className="text-gray-800">
          {user?.role}
        </p>

        <p className="text-gray-800">
          {user?.number}
        </p>

      </div>
    </div>
  );
};

export default PersonalInfo;
