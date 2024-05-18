import { generateHash } from "@/utils/hashing";
import * as z from 'zod';


import { registerUser } from "@/backend/services/auth";
import { existingUserCheck } from "@/backend/services/user";
import { generateVerificationToken } from "../token"; 

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  number: z.string().min(10).max(14)
});



export const register = async ({
  name,
  email,
  password,
  number
}: z.infer<typeof schema>
) => {
  try {
    const validatedData = schema.parse({ name, email, password, number });

    // Check if user already exists
    const userExists = await existingUserCheck(validatedData.email.toLowerCase());
    
    if (userExists) {
      throw new Error("User already exists");
    }


    const hashedPassword = await generateHash(password);

    // Register user
    const newUser = await registerUser({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      password: hashedPassword,
      number: validatedData.number
    });
    
    // Generate verification token
    const verificationToken = await generateVerificationToken(validatedData.email.toLowerCase());
    console.log(verificationToken);
    
    return {success: "Confirmation email sent!"};


  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((err) => err.message).join("\n"));
    } else {
      throw error;
    }
  }
};
