import { auth } from "@/auth";
import NotificationMain from "@/components/notifications/NotificationMain";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <main className="flex flex-col justify-center items-center">
      <NotificationMain session={session ?? null} />
    </main>
  );
};

export default page;
