"use client"
import { getUserWishlist } from "@/WishlistActions/getUserWishlist.action";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext()

export function WishlistContextProvider({children}) {
    let[noOfWishlistItems, setNoOfWishlistItems]= useState()


    async function getLoggedUserWishlist() {
        try {
            let res = await getUserWishlist()
        console.log(res.data);
         if(res.status == "success"){
            setNoOfWishlistItems(res.data.length)
         }
        } catch (error) {
          console.log(error);
            
        }
        
    }


    useEffect(() => {
      getLoggedUserWishlist()
    
      
    }, [])
    

    return <WishlistContext.Provider value={{noOfWishlistItems, setNoOfWishlistItems}}>
        {children}
    </WishlistContext.Provider>
    
}