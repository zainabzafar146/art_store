import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
