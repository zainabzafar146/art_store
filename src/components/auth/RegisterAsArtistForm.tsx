"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { registerArtist } from "@/actions/registerArtist";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  secondName: z.string().min(2, {
    message: "Second name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNo: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const RegisterAsArtistForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      email: "",
      phoneNo: "",
      password: "",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const randomString = generateRandomString(12);
      const uploadPath = `public/${randomString}/${file.name}`;
      const { error, data } = await supabase.storage
        .from("artists")
        .upload(uploadPath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        setUploadError(error.message);
        return null;
      }

      // Get the public URL of the uploaded image
      const publicUrl = supabase.storage
        .from("artists")
        .getPublicUrl(uploadPath).data.publicUrl;
      return publicUrl;
    } catch (error) {
      setUploadError("Failed to upload image");
      return null;
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      let uploadedImageUrl = null;

      if (file) {
        uploadedImageUrl = await handleImageUpload(file);
        if (!uploadedImageUrl) {
          toast.error("Failed to upload image");
          return;
        }
      }

      const response = await registerArtist({
        ...data,
        imageUrl: uploadedImageUrl ?? undefined,
      });

      if (response) {
        toast.success("Artist successfully registered");
        router.push("/sign-in");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to register artist");
      }
      console.error("Error registering artist:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-5">
      <Input
        name="image"
        type="file"
        onChange={handleFileChange}
        className="bg-whit cursor-pointer rounded-full"
      />
      {uploadError && <p className="text-red-500">{uploadError}</p>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full space-y-7"
        >
          {/* First Name and Second Name Fields */}
          <div className="flex w-full gap-x-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondName"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email and Phone Number Fields */}
          <div className="flex w-full gap-x-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Input
                      placeholder="Phone No"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center w-full">
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className="bg-white placeholder:text-slate-400 py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterAsArtistForm;
