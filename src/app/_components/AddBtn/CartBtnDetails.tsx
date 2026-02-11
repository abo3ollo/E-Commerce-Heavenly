"use client"
import { addToCart } from '@/CartActions/addToCart.action';
import { CartContext } from '@/context/CardContext';
import { useContext } from 'react'
import { toast } from 'sonner';

export default function CartBtnDetails({ id }: { id: string }) {

    let { noOfItems, setNoOfItems } = useContext(CartContext)!

    async function addProductToCart(id: string) {
        let res = await addToCart(id)
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
            <button onClick={() => addProductToCart(id)} className="w-full cursor-pointer flex-1 bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors">
                ADD TO CART
            </button>
        </div>
    )

}
