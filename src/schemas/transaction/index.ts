import * as z from "zod";



export const OrderDataSchema = z.object({
    _id :  z.string().optional(), 
    user: z.object({
        id: z.string().optional(),
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        city: z.string(),
        postalCode: z.string(),
        state: z.string(),
        country: z.string(),
        deliveryAt: z.string(),
    }),
    products: z.array(z.object({
        id: z.string(),
        productId: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        image: z.string().optional(),
        weight: z.number().optional(),
        stock: z.number(),
    })),
    totalPrice: z.string(),
    paymentMethod: z.enum(["cash", "card", "paypal", "crypto"]),
});