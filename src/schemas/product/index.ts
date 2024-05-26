import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  category: z.union([z.string(), z.string().uuid()]), // Accepts either a string or a UUID
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, { message: 'Stock must be a non-negative integer' }),
  isTrending: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  sku: z.string().min(1, { message: 'SKU is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  weight: z.number().positive().optional(),
  averageRating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  reviewIds: z.array(z.string()).optional(),
  variants: z.array(z.string()).optional(),
});


export const producInputSchema = z.object({
  price: z.string().min(1, { message: 'Price is required' }), 
  discountPrice: z.string().optional(),
  stock: z.string().min(1, { message: 'Stock is required' }), 
}).merge(productSchema); 


export const variantSchema = z.object({
  productId: z.string().uuid(),
  variantName: z.string().min(1, { message: 'Variant Name is required' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  stock: z.number().int().min(0, { message: 'Stock must be a non-negative integer' }),
  attributes: z.record(z.string()).optional(),
  images: z.array(z.string()).optional(),
});