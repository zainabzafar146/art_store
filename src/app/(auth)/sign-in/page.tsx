"use client";
import React from "react";
import PageHeading from "@/components/common/PageHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchUser } from "@/actions/fetchUser";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
const SignInPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("this is auth response", response)
      if (response?.error) {
        toast.error("There is an error while signing in");
        return;
      } else {
        console.log(data.email);
        const user = await fetchUser(data.email);
        if (user.role === "ARTIST") {
          router.push("/artist");
        } else if (user.role === "CUSTOMER") {
          router.push("/");
        } else {
          router.push("/admin/products");
        }
        toast.success("Sign in successful.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <section className="flex flex-col items-center py-10 gap-y-20">
      <PageHeading text="Sign in to your Account" />
      <div className="flex flex-col items-center bg-[#E5E5E5] gap-y-7 pt-10 pb-5 px-5 md:px-10 lg:px-20 max-w-80 sm:max-w-xl md:max-w-2xl w-full">
        <span className="text-lg md:text-xl lg:text-2xl font-bold">
          SIGN IN
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full space-y-7"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3 w-full">
                  <FormLabel>Email</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-3 w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
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
              Sign In
            </Button>
          </form>
        </Form>
        <hr />
        <div className="flex flex-col md:flex-row justify-between gap-y-3 items-center w-full">
          <Link href="/forgot-password" className="text-sm md:text-base">
            Forgot Your Password?
          </Link>
          <Link href="/sign-up" className="text-sm md:text-base">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
