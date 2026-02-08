"use client"
import { addToCart } from '@/CartActions/addToCart.action';
import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

export default function CartBtn({ id }: { id: string }) {

    async function addProductToCart(id: string) {
        let res = await addToCart(id)
        console.log(res);

        if(res.status == "success"){
            toast.success("Product added successfully to your cart" , {
                duration : 2000,
                position : "top-center"
            })
        }else{
            toast.error("You can't add product to your cart" , {
                duration : 2000,
                position : "top-center"
            })
        }

    }
    return (

        <div>
            <button onClick={() => addProductToCart(id)}>
                <ShoppingCart className="w-6 h-6  text-gray-500 cursor-pointer  transition-transform shrink-0" />
            </button>
        </div>
    )

}
