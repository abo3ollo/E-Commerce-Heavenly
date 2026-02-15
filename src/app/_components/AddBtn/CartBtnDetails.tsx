"use client"
import { addToCart } from '@/CartActions/addToCart.action';
import { CartContext } from '@/context/CardContext';
import { useContext } from 'react'
import { toast } from 'sonner';

export default function CartBtnDetails({ id }: { id: string }) {

    const { noOfItems, setNoOfItems } = useContext(CartContext)!

    async function addProductToCart(id: string) {
        const res = await addToCart(id)
        console.log(res);

        if (res.status == "success") {
            toast.success("Product added successfully to your cart", {
                duration: 2000,
                position: "top-center"
            })
            setNoOfItems(noOfItems + 1)

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
