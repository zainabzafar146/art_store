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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/actions/reisterUser";
import { toast } from "sonner";

// Schema for the form validation
const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      registerUser(data);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("There is an error creating the account, Try again later.");
    }
  }

  return (
    <section className="flex flex-col items-center py-10 gap-y-20">
      <PageHeading text="Sign up to your Account" />

      <div className="flex flex-col items-center bg-[#E5E5E5] gap-y-7 pt-10 pb-5 px-5 md:px-10 lg:px-20 max-w-80 sm:max-w-xl md:max-w-2xl w-full">
        <span className="text-lg md:text-xl lg:text-2xl font-bold">
          CREATE ACCOUNT
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full space-y-7"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-7 w-full">
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-7 w-full">
                  <FormControl>
                    <Input
                      placeholder="Second Name"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-7 w-full">
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-7 w-full">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="bg-white placeholder:text-slate-400 py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignUpPage;
