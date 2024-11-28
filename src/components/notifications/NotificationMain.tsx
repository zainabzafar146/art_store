"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipLoader } from "react-spinners";
import { getChats } from "@/actions/fetchChatsForCustomer";
import PageHeading from "@/components/common/PageHeading";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";
import { createMessage } from "@/actions/createMessage";
import { getAllCustomerChats } from "@/actions/getAllCustomerChats";
import { Session } from "next-auth";
import { fetchUser } from "@/actions/fetchUser";
import { ScrollArea } from "@/components/ui/scroll-area";

const NotificationMain = ({
  session,
}: {
  session: Session | null | undefined;
}) => {
  const [chats, setChats] = useState<any[]>([]); // Store chats array
  const [selectedChat, setSelectedChat] = useState<any>(null); // For selected chat in dialog
  const [messageContent, setMessageContent] = useState("");
  const [customerUserId, setCustomerUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCusotmerId = async () => {
    try {
      if (!session?.user?.email) return;
      const customer = await fetchUser(session.user.email);
      console.log("this is the customer data", customer);
      if (customer) {
        setCustomerUserId(customer.customer?.userId ?? "");
        fetchChats(customer.customer?.userId ?? "");
      }
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  async function fetchChats(customerUserId: string) {
    try {
      console.log("this is the customer user id", customerUserId);
      const userChats = await getAllCustomerChats(customerUserId);
      console.log("these are the chats", userChats);
      setChats(userChats);
    } catch (error) {
      toast.error("Error while fetching chats");
    } finally {
      setIsLoading(false);
    }
  }

  // Handle message sending
  const handleSendMessage = async (
    messageContent: string,
    customerId: string,
    artistId: string
  ) => {
    if (messageContent.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      const response = await createMessage(
        messageContent,
        customerId,
        artistId
      );
      setMessageContent("");
      if (response) {
        // Update the local state for `selectedChat` and `chats`
        const newMessage = {
          id: response.id, // Assuming response contains the new message ID
          content: messageContent,
          senderId: customerId,
          createdAt: new Date().toISOString(), // or from response if available
        };

        // Update the selected chat's messages
        setSelectedChat((prevChat: any) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }));

        // Optionally, update the main chats array
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === selectedChat.id
              ? { ...chat, messages: [...chat.messages, newMessage] }
              : chat
          )
        );
      }
    } catch (error) {
      toast.error("Error while sending message");
      console.error("Error sending message:", error);
    } finally {
      // setIsFetching(false); // End fetching state after messages are fetched
    }
  };

  // Fetch chats on component mount
  useEffect(() => {
    fetchCusotmerId();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center w-full gap-y-10">
      <div className="w-full pt-10">
        <PageHeading text="Chats" />
      </div>
      <div className="px-5 md:px-10 min-h-[60vh] max-w-3xl w-full">
        <div className="flex justify-center bg-slate-50 rounded-2xl min-h-[50svh] py-5  shadow-md">
          {/* Chat List */}
          <div className="flex flex-col items-center space-y-5 w-full px-5">
            {chats && (
              <>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex justify-center w-full  border-b-[1px] py-3 "
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedChat(chat)}
                          className="text-xl font-medium "
                        >
                          Artist : {chat.artist.user.firstName} {""}
                          {chat.artist.user.lastName}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white !rounded-xl">
                        <DialogHeader>
                          <DialogTitle>
                            Chat with {chat.artist.user.firstName}{" "}
                            {chat.artist.user.lastName}
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="flex flex-col space-y-3 min-h-[300px] md:min-h-[500px] px-5">
                          {/* Render Messages */}
                          {selectedChat &&
                            selectedChat.messages.map((message: any) => (
                              <div
                                key={message.id}
                                className={`flex items-start ${
                                  message.senderId === customerUserId
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                <div
                                  className={`m-1 p-2 rounded-lg max-w-[70%] ${
                                    message.senderId === customerUserId
                                      ? "bg-blue-100 text-right self-end"
                                      : "bg-gray-100 text-left self-start"
                                  }`}
                                >
                                  {message.content}
                                </div>
                              </div>
                            ))}
                        </ScrollArea>

                        <div className="flex items-center">
                          <Input
                            type="text"
                            placeholder="Type here..."
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            className="bg-white w-full"
                          />
                          <Button
                            className="absolute right-5"
                            onClick={() =>
                              handleSendMessage(
                                messageContent,
                                customerUserId,
                                chat.artistId
                              )
                            }
                          >
                            <IoSend color="#58C5C7" size={24} />
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationMain;
