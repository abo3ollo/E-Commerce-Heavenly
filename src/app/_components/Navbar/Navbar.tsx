"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BiHeart, BiShoppingBag, BiUser } from 'react-icons/bi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import { CartContext } from '@/context/CardContext';
import { WishlistContext } from '@/context/WishlistContext';

export default function Navbar() {


  const { noOfItems} = useContext(CartContext)!
  const {noOfWishlistItems} = useContext(WishlistContext)!


  const { data: session} = useSession()

  function logOut() {
    signOut({
      callbackUrl: "/login"
    })
  }



  const path = usePathname()
  return (
    <>
      {/* Header Banner */}
      <nav className="bg-white border-b border-gray-200 text-center  fixed start-0 top-0 end-0 z-50">
        <div className="bg-black text-white text-center py-2 px-4 text-sm">
          Free Shipping on all orders until April . Don&apos;t miss !
        </div>
        <div className="container w-[80%] mx-auto py-4 ">
          <div className="flex items-center justify-between ">

            <Link href="/" className="text-2xl tracking-wider ">HEAVENLY</Link>

            <ul className="flex gap-5">
              <li>
                <Link href="/products" className={path.includes("/products") ? "active" : "text-sm text-gray-600 hover:text-black"}>PRODUCTS</Link >
              </li>
              <li>
                <Link href="/categories" className={path.includes("/categories") ? "active" : "text-sm text-gray-600 hover:text-black"}>CATEGORIES</Link >
              </li>
              <li>
                <Link href="/brands" className={path.includes("/brands") ? "active" : "text-sm text-gray-600 hover:text-black"}>BRANDS</Link >
              </li>
            </ul>

            

            <ul className="flex items-center space-x-2">
              {session ? <>
                <Link href="/wishlist" className="p-2 rounded-full relative ">
                  <BiHeart className="w-5 h-5" />
                  {noOfWishlistItems > 0 && <span className="absolute -top-2 -right-1 bg-black text-white text-xs w-5.5 h-5.5 flex items-center justify-center rounded-full">
                    {noOfWishlistItems}
                  </span>}
                </Link>
                <Link href="/cart" className="p-2 rounded-full relative">
                  <BiShoppingBag className="w-5 h-5" />
                  {noOfItems> 0 && <span className="absolute -top-2 -right-1 bg-black text-white text-xs w-5.5 h-5.5 flex items-center justify-center rounded-full">
                     {noOfItems}
                  </span>}
                </Link>

                <DropdownMenu >
                  <DropdownMenuTrigger asChild className='cursor-pointer '>
                    <BiUser className="w-5 h-5 mx-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuGroup>
                      
                      <Link href="/allorders">
                        <DropdownMenuItem>Your Orders</DropdownMenuItem>
                      </Link>
                      <Link href="/changepassword">
                        <DropdownMenuItem>Change Password</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive" onClick={logOut}>Log out</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu></> : <>
                <DropdownMenu >
                  <DropdownMenuTrigger asChild className='cursor-pointer '>
                    <BiUser className="w-5 h-5 mx-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuGroup>
                      <Link href="/login" >
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href="/register">
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                      
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu></>}




              {/* <Link href="" className="p-2 hover:bg-gray-100 rounded-full">
                <BiSearch className="w-5 h-5" />
              </Link>
              <Link href="" className="p-2 hover:bg-gray-100 rounded-full">
              <BiUser className="w-5 h-5" />
              </Link>
               */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
