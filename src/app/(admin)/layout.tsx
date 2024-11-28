import AdminNavBar from "@/components/admin/AdminNavBar";
import Footer from "@/components/common/Footer";
import React from "react";

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <AdminNavBar />
      {children}
      <Footer/>
    </div>
  );
};

export default ArtistLayout;
