"use client"

import { WishlistContext } from '@/context/WishlistContext';
import { addToWishlist } from '@/WishlistActions/addToWishlist.action'
import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function WishlistBtnDetails({ id }: { id: string }) {
        let {noOfWishlistItems, setNoOfWishlistItems} = useContext(WishlistContext)
    
    async function addProductsToWishlist(id: string) {
        let res = await addToWishlist(id)
        console.log(res);
        if (res.status == "success") {
            toast.success("Product added successfully to your wishlist", {
                duration: 2000,
                position: "top-center"
            })
            setNoOfWishlistItems(noOfWishlistItems + 1)
        } else {
            toast.error(res.message, {
                duration: 2000,
                position: "top-center"
            })
        }


    }
    return (
        <div>
            <button onClick={()=>{addProductsToWishlist(id)}} className="border-2 border-gray-300 hover:border-red-400 rounded-md py-3 px-6 cursor-pointer group transition-all duration-200 hover:bg-red-50">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 group-active:fill-red-500 transition-colors duration-200" />
            </button>
        </div>


    )
}
