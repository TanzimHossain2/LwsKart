import { generateHash } from "@/utils/hashing";
import { z } from "zod";
import { registerUser } from "../services/auth";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterData): Promise<any> => {
  try {
    const validatedData = schema.parse({ name, email, password });
    const hashedPassword = await generateHash(password);

    // Register user
    const newUser = await registerUser({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });
   
    return newUser;

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((err) => err.message).join("\n"));
    } else {
      throw error;
    }
  }
};
