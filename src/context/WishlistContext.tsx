"use client";

import { getUserWishlist } from "@/WishlistActions/getUserWishlist.action";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

/* ========= Types ========= */

type WishlistItem = {
  _id: string;
  // add other fields if your wishlist item contains more
};

type GetUserWishlistResponse = {
  status: "success" | "error";
  data: WishlistItem[];
};

type WishlistContextType = {
  noOfWishlistItems: number;
  setNoOfWishlistItems: Dispatch<SetStateAction<number>>;
};

type WishlistProviderProps = {
  children: ReactNode;
};

/* ========= Context ========= */

export const WishlistContext =
  createContext<WishlistContextType | null>(null);

/* ========= Provider ========= */

export function WishlistContextProvider({
  children,
}: WishlistProviderProps) {
  const [noOfWishlistItems, setNoOfWishlistItems] =
    useState<number>(0);

  async function getLoggedUserWishlist() {
    try {
      const res: GetUserWishlistResponse =
        await getUserWishlist();

      console.log(res.data);

      if (res.status === "success") {
        setNoOfWishlistItems(res.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    function fetchData() {
      getLoggedUserWishlist();
    }   
    fetchData();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ noOfWishlistItems, setNoOfWishlistItems }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
