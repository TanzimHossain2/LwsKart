/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { toast } from "react-toastify";

interface ICategoryFormInput {
  name: string;
  description?: string;
  image?: string;
  icon?: string;
}

const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryFormInput>();
  const [image, setImage] = useState<string | null>(null);
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [fileIcon, setFileIcon] = useState<File | null>(null);

  const onDropImage = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileImage(file);
      setImage(URL.createObjectURL(file));
    }
  }, []);

  const onDropIcon = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileIcon(file);
      setIcon(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveImage = () => {
    setFileImage(null);
    setImage(null);
  };

  const handleRemoveIcon = () => {
    setFileIcon(null);
    setIcon(null);
  };

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

  const onSubmit: SubmitHandler<ICategoryFormInput> = async (data) => {
    let base64Image = image;
    let base64Icon = icon;
    if (fileImage) {
      base64Image = (await convertBase64(fileImage)) as string;
    }
    if (fileIcon) {
      base64Icon = (await convertBase64(fileIcon)) as string;
    }
    const categoryData = { ...data, image: base64Image, icon: base64Icon };

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message, {
        position: "bottom-right",
        autoClose: 3000,
      });

      setFileImage(null);
      setImage(null);
      setFileIcon(null);
      setIcon(null);

        return; 

    } else {
      toast.error(result.error, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({ onDrop: onDropImage });
  const {
    getRootProps: getIconRootProps,
    getInputProps: getIconInputProps,
    isDragActive: isIconDragActive,
  } = useDropzone({ onDrop: onDropIcon });

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Create Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            {...register("description")}
          />
        </div>
        <div>
          <label className="block text-gray-700">Category Image</label>
          <div
            {...getImageRootProps()}
            className="border-2 border-gray-300 border-dashed rounded-md p-4 cursor-pointer"
          >
            <input {...getImageInputProps()} accept="image/*" />
            {isImageDragActive ? (
              <p className="text-center text-gray-500">
                Drop the files here...
              </p>
            ) : (
              <p className="text-center text-gray-500">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
          {image && (
            <div className="relative mt-4 text-center">
              <Image
                src={image}
                alt="Preview"
                className="mx-auto"
                width={120}
                height={140}
              />
              <X
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 cursor-pointer text-red-500"
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Category Icon</label>
          <div
            {...getIconRootProps()}
            className="border-2 border-gray-300 border-dashed rounded-md p-4 cursor-pointer"
          >
            <input {...getIconInputProps()} accept="image/*" />
            {isIconDragActive ? (
              <p className="text-center text-gray-500">
                Drop the files here...
              </p>
            ) : (
              <p className="text-center text-gray-500">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
          {icon && (
            <div className="relative mt-4 text-center">
              <Image
                src={icon}
                alt="Preview"
                className="mx-auto"
                width={120}
                height={140}
              />
              <X
                onClick={handleRemoveIcon}
                className="absolute top-2 right-2 cursor-pointer text-red-500"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
