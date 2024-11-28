import { auth } from "@/auth";
import CustomerProfie from "@/components/customer-profile/CustomerProfie";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <main className="flex flex-col justify-center items-center">
      <CustomerProfie session={session ?? null} />
    </main>
  );
};

export default page;
