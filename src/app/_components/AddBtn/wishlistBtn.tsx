"use client"

import { WishlistContext } from '@/context/WishlistContext';
import { addToWishlist } from '@/WishlistActions/addToWishlist.action'
import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function WishlistBtn({id} : {id:string}) {
    const {noOfWishlistItems, setNoOfWishlistItems} = useContext(WishlistContext)!

    async function addProductsToWishlist(id: string) {
        const res = await addToWishlist(id)
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
            <button onClick={()=> addProductsToWishlist(id)} className="hover:scale-110 transition-transform">
                <Heart className="w-4 h-4" />
            </button>
        </div>


    )
}
