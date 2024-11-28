"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { createMessage } from "@/actions/createMessage"; // Server action to create a message
import { getChats } from "@/actions/fetchChatsForCustomer"; // Server action to fetch messages
import { toast } from "sonner";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { fetchArtistById } from "@/actions/fetchArtistById";
import { Session } from "next-auth";
import { fetchUser } from "@/actions/fetchUser";
import { ScrollArea } from "../ui/scroll-area";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  // ... other properties ...
}

const ArtistProfileMain = ({
  session,
}: {
  session: Session | null | undefined;
}) => {
  const params = useParams();
  const userId = Array.isArray(params.userId)
    ? params.userId[0]
    : params.userId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
  const [loading, setLoading] = useState(false); // For loading messages when the page first loads
  const [isFetching, setIsFetching] = useState(false); // For fetching after sending a message
  const [artist, setArtist] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [customerUserId, setCustomerUserId] = useState("");
  const router = useRouter();

  // Fetch the messages when the component mounts

  const fetchCusotmerId = async () => {
    try {
      if (!session?.user?.email) return;
      const customer = await fetchUser(session.user.email);
      if (customer) {
        setCustomerUserId(customer.customer?.userId ?? "");
      }
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  const fetchMessagesData = async () => {
    setLoading(true); // Start loading when component mounts
    try {
      const data = await getChats(customerUserId, userId);
      setMessages(data[0]?.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchArtistDetails = async () => {
    try {
      const response = await fetchArtistById(userId);
      if (response?.artist?.id) {
        console.log("Artist response:", response);
        setArtist(response);
      } else {
        toast.error("Artist details not found");
      }
    } catch (error) {
      toast.error("Failed to fetch artist details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesData();
    fetchCusotmerId();
    fetchArtistDetails();
  }, []);

  const handleSendMessage = async () => {
    if (!customerUserId || !userId) {
      toast.error("Missing customer or artist information");
      return;
    }

    if (messageContent.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      await createMessage(messageContent, customerUserId, userId);
      setMessageContent(""); // Clear the input after sending

      // Set fetching state while we fetch updated messages
      setIsFetching(true);
      const updatedMessages = await getChats(customerUserId, userId);
      setMessages(updatedMessages[0]?.messages || []);
    } catch (error) {
      toast.error("Error while sending message");
      console.error("Error sending message:", error);
    } finally {
      setIsFetching(false); // End fetching state after messages are fetched
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
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center gap-y-10 px-5 md:px-10 max-w-screen-2xl w-full">
        {artist && (
          <div className="flex flex-col items-center gap-y-10 max-w-5xl w-full">
            <div className="relative max-h-[50svh] py-10">
              <Image
                src={"/artists/atrist-background.jpg"}
                alt=""
                height={1000}
                width={1000}
                className="h-[50svh]"
              />
              <div className="absolute -bottom-40 right-20 lg:right-[45%] flex flex-col items-center gap-y-5">
                <Image
                  src={artist.artist.imageUrl}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-44 "
                />
                <span className="text-xl font-semibold">
                  {artist.firstName} {artist.lastName}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-y-10 pt-40">
              <div className="flex flex-col gap-y-5">
                <span className="text-center py-2 bg-[#58C5C7] w-32">
                  About:
                </span>
                <span className="text-sm md:text-base">
                  Welcome to my creative corner! I{"'"}m {artist.firstName}{" "}
                  {artist.lastName}, a passionate artisan dedicated to the
                  timeless art of handcrafting vases and mud pots. Each piece I
                  create is a labor of love, infused with a deep appreciation
                  for the natural world and a commitment to preserving
                  traditional craftsmanship.
                </span>
              </div>
              <div className="flex flex-col gap-y-5">
                <span className="w-32 text-center py-2 bg-[#58C5C7]">
                  Experience:
                </span>
                <span className="text-sm md:text-base">
                  With over 3 years of dedicated experience in the world of
                  handcrafting, I have had the privilege of transforming my
                  passion for pottery into a thriving career.
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-end justify-end gap-y-5 w-full relative">
          <span className="text-sm md:text-base">
            Need Customized Artwork or any Queries?
          </span>
          <div className="flex flex-col items-center gap-y-3 pb-5 text-sm md:text-base">
            <span>Let’s Chat</span>
            {}
            <Button
              className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
              onClick={() => {
                if (session?.user) {
                  if (session.user.role === "ARTIST") {
                    toast.error(
                      "You are logged in as an artist and cannot send messages."
                    );
                  } else {
                    setIsMessageBoxVisible(true);
                  }
                } else {
                  router.push("/sign-in");
                }
              }}
            >
              Message
            </Button>
          </div>

          {isMessageBoxVisible && (
            <div className="absolute flex flex-col max-w-xs w-full right-0 ">
              <span className="py-3 bg-slate-100 text-center rounded-t-xl border-2 border-[#58C5C7]">
                Messages
              </span>
              <ScrollArea className="min-h-64 max-h-64 bg-[#CEF3F3] p-4 overflow-y-auto">
                {loading || isFetching ? (
                  <div className="text-center text-sm">Loading...</div>
                ) : messages?.length > 0 ? (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.senderId === customerUserId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`mb-2 p-2 rounded-lg max-w-[70%] ${
                          msg.senderId === customerUserId
                            ? "bg-slate-300 text-right"
                            : "bg-gray-100 text-left"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm">No messages yet</div>
                )}
              </ScrollArea>

              <div className="relative flex items-center">
                <Input
                  type="text"
                  placeholder="Type here..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="bg-white w-full"
                />
                <Button
                  className="absolute right-2 bottom-[2px]"
                  onClick={handleSendMessage}
                >
                  <IoSend color="#58C5C7" size={24} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileMain;
