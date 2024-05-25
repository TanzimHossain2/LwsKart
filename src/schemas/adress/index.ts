import * as z from 'zod';


export const AdressSchema = z.object({
    _id: z.string().optional(),
    userId: z.string().optional(),
    name: z.string(),
    country: z.string(),
    streetAddress: z.string(),
    city: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    additionalInfo: z.string().optional(),
    deliveryAt: z.union([z.literal("home"), z.literal("office")])
}) 