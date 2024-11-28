import { auth } from "@/auth";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import { redirect } from "next/navigation";
import React from "react";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log(session?.user);
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col">
      <Header />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
