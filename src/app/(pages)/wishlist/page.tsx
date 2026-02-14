"use client"

import AddToCardWishListBtn from '@/app/_components/AddBtn/AddToCardWishListBtn'
import CartBtnDetails from '@/app/_components/AddBtn/CartBtnDetails'
import WishlistLoading from '@/app/_components/Loading/WishlistLoading'
import { WishlistContext } from '@/context/WishlistContext'
import { WishlistProductsType} from '@/types/wishlist.type'
import { getUserWishlist } from '@/WishlistActions/getUserWishlist.action'
import { removeWishlistItem } from '@/WishlistActions/removeWishlistItem.action'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Wishlist() {
  let {noOfWishlistItems, setNoOfWishlistItems} = useContext(WishlistContext)!
  

  let [wishlistProducts, setwishlistProducts] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [isRemoving, setIsRemoving] = useState(false)
  

  async function getUserWishlistProducts() {
    let res = await getUserWishlist()
    console.log("wishlist", res.data);
    if (res.status == "success") {
      setwishlistProducts(res.data)
      setIsLoading(false)

    } else {
      setIsLoading(false)
    }
  }

  async function removeProductFromWishlist(id: string) {
    setIsRemoving(true)
    let res = await removeWishlistItem(id)
    console.log(res.data);
    
    if (res.status == "success") {
      toast.success("item removed successfully", {
        position: "top-center"
      })
      await getUserWishlistProducts()
      setIsRemoving(false)
      setNoOfWishlistItems(noOfWishlistItems - 1)
      

    } else {
      toast.error("item  can't remove now", {
        position: "top-center"
      })
      setIsRemoving(false)

      
    }
  }

  useEffect(() => {
    getUserWishlistProducts()
  }, [])

  return (
    <>
      {isLoading ? <WishlistLoading /> : <>
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-8 border-b border-gray-200">

              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">My Wishlist</h1>
              </div>
            </div>

            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-[80px_1fr_200px_200px_200px] gap-6 px-8 py-4 bg-gray-50 border-b border-gray-100 items-center">
              <div></div>
              <div className="text-sm font-medium text-gray-600">Product Name</div>
              <div className="text-sm font-medium text-gray-600">Unit Price</div>
              <div className="text-sm font-medium text-gray-600">Stock Status</div>
              <div className="text-sm font-medium text-gray-600 ms-10">Actions</div>
            </div>

            {/* Wishlist Items */}
            <div className="divide-y divide-gray-100">
              {wishlistProducts.length === 0 ? <>
                <div className="px-8 py-16 text-center">
                  <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add items to your wishlist to save them for later
                  </p>
                </div>
              </> : <>
                {wishlistProducts.map((wishlist: WishlistProductsType) => {
                  return (
                  <div key={wishlist?._id} className="grid grid-cols-1 lg:grid-cols-[80px_1fr_200px_200px_200px] gap-6 px-8 py-6 items-center ">
                    <button
                      onClick={() => removeProductFromWishlist(wishlist?._id)}
                      disabled={isRemoving}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors self-start lg:self-center justify-self-start lg:justify-self-center">
                      <X className="w-5 h-5" />
                    </button>

                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-24 bg-gray-100 rounded overflow-hidden shrink-0">
                        <img
                          src={wishlist.imageCover}
                          alt={wishlist.slug}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-900 font-medium">{wishlist.title?.split(" ").slice(0, 2).join(" ")}</p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {wishlist.price > wishlist.priceAfterDiscount! ? (

                        <>
                          <span className="text-gray-400 line-through text-sm">
                            {wishlist.price?.toFixed(1).toLocaleString()}EGP
                          </span>
                          <span className="text-gray-900 font-bold text-sm  underline">
                            {wishlist.priceAfterDiscount!.toFixed(1).toLocaleString()}EGP
                          </span>
                        </>
                      ) : (

                        <span className="text-gray-900 font-bold text-sm">
                          {wishlist.price?.toFixed(1).toLocaleString()}EGP
                        </span>
                      )}
                    </div>


                    {/* Stock Status */}
                    <div>
                      <span className="text-sm ">
                        In Stock
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex  justify-start p-5">
                      <AddToCardWishListBtn id={wishlist._id} onAdded={getUserWishlistProducts} />
                    </div>

                  </div>)


                })}
                

              </>}
            </div>
          </div>
        </div>
      </>}

    </>
  );

}
