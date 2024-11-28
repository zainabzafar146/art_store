"use client";
import React, { useState } from "react";
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
import { resetPassword } from "@/actions/resetPassword";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
});

const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters."),
    confirmNewPassword: z
      .string()
      .min(6, "Password must be at least 6 characters."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });

const ForgotPassword = () => {
  const [userFound, setUserFound] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const forgotForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });

  const resetForm = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function handleForgotPassword(data: z.infer<typeof FormSchema>) {
    try {
      const response = await resetPassword("verify", data);

      if (response?.success) {
        setUserFound(true);
        setUserName(response.userName || null);
      } else {
        toast.error(response?.message || "No matching user found.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  async function handleResetPassword(
    data: z.infer<typeof ResetPasswordSchema>
  ) {
    try {
      const response = await resetPassword("reset", {
        email: forgotForm.getValues("email"),
        phoneNumber: forgotForm.getValues("phoneNumber"),
        newPassword: data.newPassword,
      });

      if (response?.success) {
        toast.success("Password reset successful. You can now sign in.");
      } else {
        toast.error(response?.message || "Failed to reset the password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <section className="flex flex-col items-center py-10 gap-y-20">
      <PageHeading text="Forgot Password" />
      <div className="flex flex-col items-center bg-[#E5E5E5] gap-y-7 pt-10 pb-5 px-5 md:px-10 lg:px-20 max-w-80 sm:max-w-xl md:max-w-2xl w-full">
        <span className="text-lg md:text-xl lg:text-2xl font-bold">
          Forgot Password
        </span>
        {!userFound ? (
          <Form {...forgotForm}>
            <form
              onSubmit={forgotForm.handleSubmit(handleForgotPassword)}
              className="flex flex-col items-center w-full space-y-7"
            >
              <FormField
                control={forgotForm.control}
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
                control={forgotForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
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
                Verify Account
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center w-full">
            <p className="text-lg text-gray-700">
              User Found: <span className="font-bold">{userName}</span>
            </p>
            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(handleResetPassword)}
                className="flex flex-col items-center w-full space-y-7 mt-5"
              >
                <FormField
                  control={resetForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New Password"
                          {...field}
                          className="bg-white placeholder:text-slate-400 py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetForm.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-3 w-full">
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm New Password"
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
                  Reset Password
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
