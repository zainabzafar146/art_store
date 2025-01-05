"use client";
import { fetchUser } from "@/actions/fetchUser";
import { uploadProduct } from "@/actions/productUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Session } from "next-auth";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  vendor: z.string().min(1, { message: "Vendor is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  width: z.number().positive({ message: "Width must be a positive number" }),
  height: z.number().positive({ message: "Height must be a positive number" }),
  description: z.string().min(1, { message: "Description is required" }),
  feature: z.string().min(1, { message: "Feature is required" }),
  style: z.string().min(1, { message: "Style is required" }),
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

const ProductUploadForm = ({
  session,
}: {
  session: Session | null | undefined;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [disable, setDisable] = useState(false);
  const [artistUserId, setArtistUserId] = useState("");
  const fetchArtistId = async () => {
    try {
      if (!session?.user?.email) return;
      const artist = await fetchUser(session.user.email);
      console.log("this is the artist data", artist.artist?.userId);
      if (artist) {
        setArtistUserId(artist.artist?.userId ?? "");
      }
    } catch (error) {
      console.error("Failed to fetch artist", error);
    }
  };
  // const fetchArtistId = async () =
  //     if (!session?.user?.email) return;
  //     const artist = await fetchUser(session.user.email);
  //     if (artist) {
  //       setArtistUserId(artist.artist?.userId ?? "");
  //       console.log("this is the user id", artist.artist?.userId);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch artist", error);
  //   }
  // };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
      vendor: "",
      type: "",
      color: "",
      material: "",
      width: 0,
      height: 0,
      description: "",
      feature: "",
      style: "",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log("file changed");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const randomString = generateRandomString(12);
      const uploadPath = `public/${randomString}/${file.name}`;
      const { error, data } = await supabase.storage
        .from("products")
        .upload(uploadPath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        toast.error(error.message);
        return null;
      }
      const publicUrl = supabase.storage
        .from("products")
        .getPublicUrl(uploadPath).data.publicUrl;
      console.log("this is image public url", publicUrl);
      return publicUrl;
    } catch (error) {
      toast.error("Failed to upload image");
      return null;
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    fetchArtistId();
    setDisable(true);
    console.log("this is onSubmit");
    try {
      if (file) {
        const uploadedImageUrl = await handleImageUpload(file);
        if (!uploadedImageUrl) {
          return;
        }
        setImageUrl(uploadedImageUrl);
        console.log("image url seted");

        console.log("after image url");
        console.log("this is the image url as state set", uploadedImageUrl);
        const response = uploadProduct({
          ...data,
          imageUrl: uploadedImageUrl ?? undefined,
          artistUserId: artistUserId,
        });
        if (!response) {
          toast.error("Error uploading product");
        } else {
          console.log(response);
          toast.success("Product successfully uploaded");
          form.reset();
          setDisable(false);
        }
      }
    } catch (error) {
      toast.error("Failed to upload product");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center max-w-screen-2xl w-full">
        <div className="max-w-[1000px] w-full rounded-2xl shadow-md p-10 border-[1px]">
          <Input
            name="image"
            type="file"
            onChange={handleFileChange}
            className="bg-white cursor-pointer w-56 placeholder:text-slate-400 py-2 !rounded-xl border-[1px] border-slate-500"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5 items-center"
            >
              <div className="grid grid-cols-2 w-full gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0; // Parse value as number
                            form.setValue("price", value);
                          }}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Vendor</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                

                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            form.setValue("width", value);
                          }}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0; // Parse value as number
                            form.setValue("height", value);
                          }}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feature"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Feature</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Feature"
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Style</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Style"
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6 !rounded-xl border-[1px] border-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-white placeholder:text-slate-400 py-3 !rounded-xl border-[1px] border-slate-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              {disable ? (
                <Button
                  type="submit"
                  disabled
                  className="border-[1px] border-[#58C5C7] w-36 rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
                >
                  Upload Product
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="border-[1px] border-[#58C5C7] w-36 rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
                >
                  Upload Product
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadForm;
