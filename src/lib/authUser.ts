import { auth } from "@/auth";
import { getUserById } from "@/backend/services/user";
import { modifyObjData } from "@/utils/data";

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }
  return session?.user; 
};

export const currentRole= async () => {
  const session = await auth();

  return session?.user?.role; 
};


export const currentUserById = async (id: string) => {
  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  return modifyObjData(user._doc);

};