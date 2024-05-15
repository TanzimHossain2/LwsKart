import { hashMatched } from "@/utils/hashing";
import { getUserByEmail } from "../../services/user";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const loginUser = async ({
  email,
  password,
}: z.infer<typeof LoginSchema>): Promise<any> => {
  try {
    const validatedData = LoginSchema.parse({ email, password });

    if (!validatedData) {
      return null;
    } 

    // check if user exists
    const user = await getUserByEmail(validatedData.email);

    if (!user || !user.password) {
      return null;
    }

    // Check if password matches
    const passwordMatch = await hashMatched(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(String(err));
  }
};
