import { auth } from "@/auth";

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
