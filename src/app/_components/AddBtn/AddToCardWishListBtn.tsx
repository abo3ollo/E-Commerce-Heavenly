"use client"
import { addToCart } from '@/CartActions/addToCart.action';
import { removeWishlistItem } from '@/WishlistActions/removeWishlistItem.action';
import { CartContext } from '@/context/CardContext';
import { WishlistContext } from '@/context/WishlistContext';
import { useContext } from 'react'
import { toast } from 'sonner';

export default function AddToCardWishListBtn({ id, onAdded }: { id: string; onAdded?: () => Promise<void> | void }) {

    let { noOfItems, setNoOfItems } = useContext(CartContext)!
    let { noOfWishlistItems, setNoOfWishlistItems } = useContext(WishlistContext)!

    async function addProductToCart(id: string) {
        let res = await addToCart(id)
        console.log(res.data.products);

        if (res.status == "success") {
            toast.success("Product added successfully to your cart", {
                duration: 2000,
                position: "top-center"
            })
            setNoOfItems(noOfItems + 1)
            await removeWishlistItem(id)
            setNoOfWishlistItems(noOfWishlistItems - 1)
            if (onAdded) await onAdded()
            


        } else {
            toast.error(res.message, {
                duration: 2000,
                position: "top-center"
            })
        }

    }
    return (

        <div>
            <button onClick={() => addProductToCart(id)} className="w-full cursor-pointer flex-1 bg-black text-white py-3 px-5  font-medium hover:bg-gray-800 transition-colors">
                <p className=' text-sm'>ADD TO CART</p>
            </button>
        </div>
    )

}
