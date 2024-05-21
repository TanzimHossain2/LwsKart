"use server";
import { addProductData } from "@/backend/lib/product";
import { productSchema } from "@/schemas/product";
import * as z from "zod";

// {
//     "name": "Acer",
//     "category": "664b0fd883bc970f160df544",
//     "description": "x",
//     "price": "100",
//     "discountPrice": "74",
//     "stock": "6",
//     "tags": "laptop, best, incity",
//     "sku": "ddd",
//     "brand": "asus",
//     "weight": "1",
//     "isTrending": true,
//     "isNewArrival": true
// }

 
export const adProduct =async (formData: FormData) => {

    const data = {
        name: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        price: parseFloat(<string>formData.get('price')),
        stock: parseInt(<string>formData.get('stock')),
        discountPrice: parseFloat(<string>formData.get('discountPrice')),
        sku: formData.get('sku'),
        brand: formData.get('brand'),
        weight: parseFloat(<string>formData.get('weight')),
        isTrending: formData.get('isTrending') === 'true',
        isNewArrival: formData.get('isNewArrival') === 'true',
        tags: (<string>formData.get('tags')).split(','),
        images: Array.from(formData.getAll('images')) 
    }

    const result = productSchema.safeParse(data);
    
    if(result.success){
        const res =await addProductData(result.data);
    }

    else{
        console.log(result.error.errors);
        
       return {
              error: result.error.errors
       }
    }
    

}