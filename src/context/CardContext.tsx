"use client";

import { getUserCart } from "@/CartActions/getUserCart.action";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ========= Types ========= */

 export type CartContextType = {
  noOfItems: number;
  setNoOfItems: React.Dispatch<React.SetStateAction<number>>;
};

type CartContextProviderProps = {
  children: ReactNode;
};

 export type CartProduct = {
  count: number;
};

export type GetUserCartResponse = {
  status: "success" | "error";
  data: {
    products: CartProduct[];
  };
};

/* ========= Context ========= */

export const CartContext = createContext<CartContextType | null>(null);

/* ========= Provider ========= */

export function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [noOfItems, setNoOfItems] = useState<number>(0);

  async function getLoggedUserCart() {
    try {
      const res: GetUserCartResponse = await getUserCart();
      console.log( "cart" , res.data.products);

      if (res.status === "success") {
        const sum = res.data.products.reduce(
          (acc, prod) => acc + prod.count,
          0
        );
        setNoOfItems(sum);
      }
      else{
        console.log(res);
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    function fetchData() {
      getLoggedUserCart();
    } 
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ noOfItems, setNoOfItems }}>
      {children}
    </CartContext.Provider>
  );
}
