/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "@/interfaces";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { updateBasicInformation } from "@/app/action/user";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { convertBase64 } from "@/utils/base64Convert";

function ProfileForm({ user }: { user: IUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      number: user.number,
    },
  });

  const [image, setImage] = useState<string | null>(user.image);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveImage = () => {
    setFile(null);
    setImage(null);
  };



  const onSubmit = async (data: any) => {
    let base64Image = image;
    if (file) {
      base64Image = await convertBase64(file) as string; // Add type assertion here
    }
    const updatedUserData = { ...data, image: base64Image };
  const res = await updateBasicInformation(updatedUserData);

    if (res.error) {
      toast.error(res.error, {
        autoClose: 1000,
      });
    } else {
      toast.success(res.message, {
        autoClose: 1000,
      });

      setTimeout(() => {
        router.push("/profile");
      }, 1000);

    }

  };


  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl text-center font-semibold mb-4 text-gray-700">
        Edit Basic Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-input w-full"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="number"
          >
            Number:
          </label>
          <input
            type="text"
            id="number"
            className="form-input w-full"
            {...register("number")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture:
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-gray-300 border-dashed rounded-md p-4 cursor-pointer"
          >
            <input {...getInputProps()} accept="image/*" />
            {isDragActive ? (
              <p className="text-center text-gray-500">Drop the files here...</p>
            ) : (
              <p className="text-center text-gray-500">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
          {image && (
            <div className="mt-4 text-center">
              <Image
                src={image}
                alt="Preview"
                className="mx-auto"
                width={120}
                height={140}
              />
              <button
                type="button"
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
