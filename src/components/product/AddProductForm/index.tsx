/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { producInputSchema } from "@/schemas/product";
import { adProduct } from "@/app/action/product";
import * as z from "zod";
import Image from "next/image";
import { axiosInstance } from "@/config/axiosInstance"; 

type ProductFormValues = z.infer<typeof producInputSchema>;

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      tags: [] as (string | undefined)[],
      sku: "",
      brand: "",
      weight: 0,
      isTrending: false,
      isNewArrival: false,
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);

  const handleFiles = (files: File[]) => {
    const fileArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          setImgsSrc((imgs) => [...imgs, reader.result as string]);
        }
      };
      reader.onerror = () => {
        console.error(reader.error);
      };
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    handleFiles(acceptedFiles);

    const rejectedFiles = acceptedFiles.filter(
      (file) => !acceptedFiles.includes(file)
    );

    if (rejectedFiles.length > 0) {
      console.error("File type not supported");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1024 * 5, // 5MB
    onDrop,
  });

  const convertBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImgsSrc((prevImgs) => prevImgs.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key]);
    });

    //conver the images to base64
    const imageFiles = selectedFiles;
    const imageBase64 = await Promise.all(imageFiles.map(convertBase64));

    //append the base64 images to the formdata
    imageBase64.forEach((image) => {
      formData.append("images", image as string);
    });

    const response = await adProduct(formData);

    // Optionally reset the form and state
    // reset();
    // setSelectedFiles([]);
    // setImgsSrc([]);
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/categories");
      console.log(response);
      
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);



  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl text-center font-semibold py-2">Add Product</h1>

        <div>
          <label className="text-sm font-semibold">Product Name</label>
          <input
            {...register("name")}
            placeholder="Product Name"
            required
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Category</label>
          <select
            {...register("category")}
            required
            className="input w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((category: { id: string; name: string }) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Description</label>
          <textarea
            {...register("description")}
            placeholder="Description"
            required
            className="textarea w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Price</label>
          <input
            {...register("price", {
              validate: (value) =>
                value > 0 || "Price must be a positive number",
            })}
            type="number"
            placeholder="Price"
            required
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">
            Discount Price (Optional)
          </label>
          <input
            {...register("discountPrice", {
              validate: (value) =>
                (value ?? 0) > 0 || "discountPrice must be a positive number",
            })}
            type="number"
            placeholder="discountPrice"
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.discountPrice && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discountPrice.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Stock</label>
          <input
            {...register("stock", {
              validate: (value) =>
                value >= 0 || "Stock must be a non-negative integer",
            })}
            type="number"
            placeholder="Stock"
            required
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.stock && (
            <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">
            Tags (comma separated){" "}
          </label>
          <input
            {...register("tags")}
            placeholder="tag1, tag2"
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.tags && (
            <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">SKU</label>
          <input
            {...register("sku")}
            placeholder="SKU-123"
            required
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.sku && (
            <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Brand</label>
          <input
            {...register("brand")}
            placeholder="Brand"
            required
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">Weight (Optional)</label>
          <input
            {...register("weight")}
            type="text"
            placeholder="2 lbs"
            className="input w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold">
            {" "}
            Is Trending (Optional){" "}
          </label>
          <input
            {...register("isTrending")}
            type="checkbox"
            className="mr-2 mx-2"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">
            Is New Arrival (Optional)
          </label>
          <input
            {...register("isNewArrival")}
            type="checkbox"
            className="mr-2 mx-2"
          />
        </div>

        <div
          {...getRootProps()}
          className="file-input w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>

        <div className="flex flex-wrap mt-4">
          {imgsSrc.map((src, index) => (
            <div key={index} className="relative">
              <Image
                src={src}
                alt={`Preview ${index}`}
                className="w-32 h-32 object-cover m-2 rounded-md"
                width={100}
                height={100}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="btn w-full p-2 bg-blue-600 text-white rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
