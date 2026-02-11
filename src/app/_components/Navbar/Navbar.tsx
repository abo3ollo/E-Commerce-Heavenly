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

export default function Navbar() {


  let { noOfItems, setNoOfItems } = useContext(CartContext)!


  const { data: session, status } = useSession()

  function logOut() {
    signOut({
      callbackUrl: "/login"
    })
  }



  let path = usePathname()
  return (
    <>
      {/* Header Banner */}
      <nav className="bg-white border-b border-gray-200 text-center  fixed start-0 top-0 end-0 z-50">
        <div className="bg-red-500 text-white text-center py-2 px-4 text-sm">
          Free Shipping on all orders until April . Don't miss !
        </div>
        <div className="container w-[80%] mx-auto py-4 ">
          <div className="flex items-center justify-between ">
            <ul className="flex gap-5">
              <li>
                <Link href="/products" className={path == "/products" ? "active" : "text-sm text-gray-600 hover:text-black"}>PRODUCTS</Link >
              </li>
              <li>
                <Link href="/categories" className={path == "/categories" ? "active" : "text-sm text-gray-600 hover:text-black"}>CATEGORIES</Link >
              </li>
              <li>
                <Link href="/brands" className={path == "/brands" ? "active" : "text-sm text-gray-600 hover:text-black"}>BRANDS</Link >
              </li>
            </ul>

            <Link href="/" className="text-2xl tracking-wider ">HEAVENLY</Link>

            <ul className="flex items-center space-x-2">
              {session ? <>
                <Link href="/favourites" className="p-2 rounded-full relative ">
                  <BiHeart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    2
                  </span>
                </Link>
                <Link href="/cart" className="p-2 rounded-full relative">
                  <BiShoppingBag className="w-5 h-5" />
                  {noOfItems> 0 && <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {noOfItems}
                  </span>}
                </Link>

                <DropdownMenu >
                  <DropdownMenuTrigger asChild className='cursor-pointer '>
                    <BiUser className="w-5 h-5 mx-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuGroup>
                      <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <Link href="/orders">
                        <DropdownMenuItem>Your Orders</DropdownMenuItem>
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
