import { ExtendedUser } from "@/next-auth";
import Image from "next/image";
import Card from "./ProfileCard"

interface PersonalInfoProps {
  user: ExtendedUser;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
  
  return (
    <Card title="Personal Profile" link={`/profile/edit?id=${user.id}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="profile"
            className="rounded-full"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Name:</span>
            <span className="text-gray-800">{user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Email:</span>
            <span className="text-gray-800">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">ID:</span>
            <span className="text-gray-800">{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Role:</span>
            <span className="text-gray-800">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Username:</span>
            <span className="text-gray-800">{user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Number:</span>
            <span className="text-gray-800">{user?.number}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfo;
