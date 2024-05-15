import { hashMatched } from "@/utils/hashing";
import { z } from "zod";
import { getUserByEmail } from "../../services/user";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface AuthData {
  email: string;
  password: string;
}

export const loginUser = async ({
  email,
  password,
}: AuthData): Promise<any> => {
  try {
    const validatedData = authSchema.parse({ email, password });

    // check if user exists
    const user = await getUserByEmail(validatedData.email);

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // Check if password matches
    const passwordMatch = await hashMatched(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid Credentials");
    }
    
    return user;
    
  } catch (err) {
    throw new Error(String(err));
  }
};
