"use client";

import { deleteCartItem } from "@/actions/deleteCartItem";
import { fetchCartItems } from "@/actions/fetchCartItems";
import CommonButton from "@/components/common/CommonButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { fetchUser } from "@/actions/fetchUser";

const CartMain = ({ userEmail }: { userEmail: string }) => {
  const [cart, setCart] = useState<any>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await fetchUser(userEmail);
      setUser(user);
      console.log("this is user", user.customer?.userId);
    };
    fetchUserData();
  }, [userEmail]);

  const fetchCart = async () => {
    try {
      const cartResponse = await fetchCartItems(user.customer.userId);
      setCart(cartResponse.cart);
    } catch (error) {
      toast.error("Can not find cart. Please add items to the cart first.");
    }
  };
  useEffect(() => {
    if (user?.customer?.userId) {
      fetchCart();
    }
  }, [user]);

  async function handleDeleteItem(userId: string, productId: number) {
    const response = await deleteCartItem(userId, productId);

    if (response.success) {
      toast.success(response.message);
      await fetchCart(); // Refresh cart items after successful deletion
    } else {
      toast.error(response.message);
    }
  }

  async function handleCheckOutItem(userId: string, productId: number) {
    const response = await deleteCartItem(userId, productId);

    if (response.success) {
      toast.success("Check out successfull");
      await fetchCart(); // Refresh cart items after successful deletion
    } else {
      toast.error("Check out failed");
    }
  }

  let subTotal = 0;

  return (
    <section className="flex flex-col items-center justify-center w-full px-5 md:px-10 gap-y-10 py-20  ">
      <div className="grid grid-cols-4 gap-20 pb-5 border-b-2 w-full">
        <span className="font-semibold text-lg lg:text-xl">Products</span>
        <span className="font-semibold text-lg lg:text-xl">Quantity</span>
        <span className="font-semibold text-lg lg:text-xl">Price</span>
      </div>
      {cart ? (
        <>
          {cart.items.map((item: any, index: number) => (
            <>
              <div className="flex flex-col gap-y-5 py-10 border-b-2 w-full">
                <div
                  key={index}
                  className="grid grid-cols-4 gap-20 justify-between"
                >
                  <span className="text-lg ">{item.product.name}</span>
                  <span className="text-lg ">{item.quantity}</span>
                  <span className="text-lg">{item.price}</span>
                  <Button
                    onClick={() =>
                      handleDeleteItem(
                        "cm0jp9qz000002or3ysse664e",
                        item.product.id
                      )
                    }
                  >
                    <MdDelete color="red" size={30} />
                  </Button>
                </div>
                <span className="hidden">{(subTotal += item.price)}</span>
              </div>
              <Link href={"/shop"}>
                <CommonButton btnText="CONTINUE SHOPPING" width="w-48" />
              </Link>

              <div className="flex flex-col gap-y-5">
                <div className="flex gap-x-10">
                  <span className="font-semibold">SubTotal</span>
                  <span className="font-semibold">{subTotal}</span>
                </div>
                <span></span>
              </div>
              <div className="flex w-full justify-end">
                <Button
                  onClick={() =>
                    handleCheckOutItem(
                      "cm0jp9qz000002or3ysse664e",
                      item.product.id
                    )
                  }
                >
                  <CommonButton btnText="Check Out" width="w-48" />
                </Button>
              </div>
            </>
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[40svh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
        </div>
      )}
    </section>
  );
};

export default CartMain;
