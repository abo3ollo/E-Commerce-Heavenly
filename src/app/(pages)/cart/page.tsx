"use client"

import React, { useContext, useEffect, useState } from "react";
import {  Trash2Icon, X } from "lucide-react";
import { getUserCart } from "@/CartActions/getUserCart.action";
import { removeCartItem } from "@/CartActions/removeCartItem.action";
import { toast } from "sonner";
import CartLoading from "@/app/_components/Loading/CartLoading";
import { updateCart } from "@/CartActions/updateCard.action";
import { clearCart } from "@/CartActions/clearCart.action";
import { ProductCartType } from "@/types/cart.type";
import { CartContext } from "@/context/CardContext";
import Link from "next/link";

export default function Cart() {

  const { noOfItems, setNoOfItems } = useContext(CartContext)!

  

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRemoving, setIsRemoving] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [cartId, setCartId] = useState('')




  async function getUserCartProducts() {
    //  setIsLoading(true)

    const res = await getUserCart()
    console.log(res);
    setCartId(res.cartId)

    if (res.status == "success") {
      setProducts(res.data.products)
      setIsLoading(false)

    } else {
      setIsLoading(false)
    }

  }

  async function removeProductFromCart(id: string) {
    setIsRemoving(true)
    const res = await removeCartItem(id)
    if (res.status == "success") {
      toast.success("item removed successfully", {
        position: "top-center"
      })

      setProducts(res.data.products)
      setIsRemoving(false)

      let sum = 0 
      res.data.products.forEach((product : ProductCartType)=>{
        sum+= product.count
        setNoOfItems(sum)
      })
      console.log(sum);
      

    } else {
      toast.error("item  can't remove now", {
        position: "top-center"
      })
      setIsRemoving(false)

    }
  }

  async function updateCartProduct(id: string, count: string, sign: string) {
    setCurrentId(id)
    setUpdateLoading(true)
    const res = await updateCart(id, count)
    console.log(res);
    if (res.status == "success") {
      toast.success("product Qtn updated", {
        position: "top-center"
      })

      setProducts(res.data.products)
      setUpdateLoading(false)

      if (sign == "+") {
        setNoOfItems(noOfItems + 1)

      } else if (sign == "-") {
        setNoOfItems(noOfItems - 1)
      }

    } else {
      toast.error("product Qtn can't be updated", {
        position: "top-center"
      })
      setUpdateLoading(false)

    }
  }

  async function clearAllCart() {
    const res = await clearCart()
    console.log(res);
    if (res.message == "success") {
      toast.success("Cart cleared", {
        position: "top-center"
      })
      setProducts([])
    }

  }

  useEffect(() => {
    function fetchData() {
      getUserCartProducts()
    }
    fetchData()
  }, [])

  // Calculate totals
  const subtotal = products.reduce((sum, prod: ProductCartType) => sum + (prod.count * prod.price), 0)
  const total = subtotal


  return (
    <>
      {isLoading ? (
        <CartLoading />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl md:text-4xl text-left mb-2 font-medium flex items-center gap-x-1.5">
              <span className="text-3xl">🛍️</span>
               Shopping Cart
            </h1>
            <p className="text-sm text-gray-600">
              {products.length} {products.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 pb-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items Section */}
              <div className="flex-1">
                {products.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((prod: ProductCartType) => {
                      return (
                        <React.Fragment key={prod.product.id}>
                          <div className="bg-white rounded-lg p-6 flex gap-4">
                            <button
                              className="text-gray-400 hover:text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => removeProductFromCart(prod.product.id)}
                              disabled={isRemoving}
                            >
                              <X className="w-5 h-5" />
                            </button>

                            <img
                              src={prod.product.imageCover}
                              alt={prod.product.title}
                              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                            />

                            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h3 className="font-medium mb-1">{prod.product.title}</h3>
                                <p className="text-sm text-gray-600">
                                  {prod.product.brand.name} / {prod.product.category.name}
                                </p>
                              </div>

                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 border rounded">
                                  <button onClick={() => updateCartProduct(prod.product.id, `${prod.count - 1}`, "-")} className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
                                    −
                                  </button>

                                  {currentId == prod.product.id ? updateLoading ? <span className="loader w-full"></span> : <span className="w-8 text-center">{prod.count}</span> : <span className="w-8 text-center">{prod.count}</span>}

                                  <button onClick={() => updateCartProduct(prod.product.id, `${prod.count + 1}`, "+")} className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
                                    +
                                  </button>
                                </div>

                                <div className="text-right min-w-20  ">
                                  <p className="text-gray-500 text-xs">{prod.count} x {prod.price} </p>
                                  <p className="text-lg text-gray-600">{prod.count * prod.price} EGP</p>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Sidebar - Summary & Cart Preview */}
              <div className="lg:w-96">
                {/* Summary Section */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-medium mb-6">Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{subtotal.toLocaleString('en-US')} EGP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">🚚 Shipping</span>
                      <span className="font-medium text-emerald-500">Free</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium text-lg">{total.toLocaleString('en-US')} EGP</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={products.length === 0}>
                      <Link href={`/checkout/${cartId}`} >Check Out</Link>
                  </button>
                </div>

                {products.length > 0 && (
                  <button
                    onClick={clearAllCart}
                    className="my-3 ms-auto block text-red-600 py-2 px-3.5 rounded-3xl cursor-pointer hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Trash2Icon className="w-5 h-5 me-1" />
                      <p className="font-medium">Clear Cart</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

}


