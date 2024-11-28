"use client";
import { fetchUser } from "@/actions/fetchUser";
import { updateUser } from "@/actions/updateUser";
import PageHeading from "@/components/common/PageHeading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {signOut } from "next-auth/react"; // Import signOut
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";
import { z } from "zod";
import { Session } from "next-auth";

// Validation schema
const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  secondName: z.string().min(2, {
    message: "Second name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
});

const CustomerProfie = ({
  session,
}: {
  session: Session | null | undefined;
}) => {
  const [userData, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false); // Control editability for all fields

  // Initialize the form with validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { reset } = form;

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      try {
        const user = await fetchUser(session.user.email);
        setUserData(user);

        // Set form values when userData is fetched
        reset({
          firstName: user.firstName,
          secondName: user.lastName,
          email: user.email,
        });
      } catch (err) {
        toast.error("Failed to get user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reset]);

  const toggleEditable = () => {
    setIsEditable((prev) => !prev); // Toggle editability for all fields
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await updateUser(data);
      toast.success("User updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/sign-in" }); // Redirect to home after sign-out
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-y-10 items-center justify-center py-10 w-full">
      <PageHeading text="Personal Information" />
      <div className="flex flex-col gap-y-8 justify-center items-center rounded-xl shadow-md max-w-2xl w-full p-20 relative bg-slate-50 ">
        {userData && (
          <>
            <Button onClick={toggleEditable} className="absolute top-5 right-5">
              {isEditable ? "" : <CiEdit size={30} color="#58C5C7" />}
            </Button>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full space-y-7 "
              >
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          disabled={!isEditable} // Toggle input field
                          className="placeholder:text-black py-6 relative bg-white border-none rounded-xl shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="secondName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          disabled={!isEditable} // Toggle input field
                          className="placeholder:text-black py-6 relative bg-white border-none rounded-xl shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          disabled={true} // Toggle input field
                          className="placeholder:text-black py-6 relative bg-white border-none rounded-xl shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button for form */}
                {isEditable && (
                  <Button
                    type="submit"
                    className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
                  >
                    Update User
                  </Button>
                )}
              </form>
            </Form>

            {/* Sign Out Button */}
            <Button
              onClick={handleSignOut}
              className="mt-5 bg-red-500 hover:bg-red-600 text-white rounded-3xl py-2 px-5"
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default CustomerProfie;
