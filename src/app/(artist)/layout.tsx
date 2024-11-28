import { auth } from "@/auth";
import NavBar from "@/components/artist/NavBar";
import Footer from "@/components/common/Footer";
import { redirect } from "next/navigation";
import React from "react";

const ArtistLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log(session?.user);
  if (session?.user.role === "CUSTOMER") {
    redirect("/");
  }
  return (
    <div className="flex flex-col">
      <NavBar />
      {children}
      <Footer/>
    </div>
  );
};

export default ArtistLayout;
