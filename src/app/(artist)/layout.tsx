import { auth } from "@/auth";
import ArtistNavBar from "@/components/artist/NavBar";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
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
      <ArtistNavBar />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default ArtistLayout;
