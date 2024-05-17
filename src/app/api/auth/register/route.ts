import { register } from "@/backend/lib/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, email, password, confirm, aggrement } = await req.json();
  try {

    if (!aggrement) {
      return new NextResponse("You must agree to the terms", { status: 400, statusText: "You must agree to the terms"});
    }

    if (password !== confirm) {
      return new NextResponse("Passwords do not match", { status: 400, statusText: "Passwords do not match"});
    }

    const result = await register({ name , email, password });

    if (result.success) {
      return new NextResponse("User created successfully", { status: 201, statusText: result.success});
    } else {
      return new NextResponse("User could not be created", { status: 400, statusText: "User could not be created"});
    }
  } catch (err) {
    return new NextResponse((err as Error).message, {
      status: 500,
      statusText: (err as Error).message,
    });
  }
};
