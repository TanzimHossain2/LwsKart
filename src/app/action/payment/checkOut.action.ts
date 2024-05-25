"use server";
import { performCheckOut } from "@/backend/lib/transaction";
import { currentUser } from "@/lib/authUser";
import { OrderDataSchema } from "@/schemas/transaction";
import * as z from "zod";

type IOrderData = z.infer<typeof OrderDataSchema>;

export const checkOutAction = async (values: IOrderData) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized", data: null, status: 401 };
  }
  const userId = user?.id;

  try {
    const orderInformation = OrderDataSchema.parse(values);
    if (orderInformation instanceof z.ZodError) {
      return { error: "Invalid data", data: null, status: 400 };
    }

    const res = await performCheckOut(orderInformation, userId as string);

    if (res.status === 201) {
      return { error: null, data: res, status: 201 };
    }

  } catch (err) {
    console.log(err);

    if (err instanceof z.ZodError) {
      return {
        error: err.errors.map((err) => err.message),
        data: null,
        status: 400,
      };
    }
    return { error: (err as Error).message, data: null, status: 500 };
  }
};
