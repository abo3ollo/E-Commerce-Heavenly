"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BiHeart, BiShoppingBag, BiUser, BiMenu, BiX } from 'react-icons/bi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { signOut, useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CardContext';
import { WishlistContext } from '@/context/WishlistContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <nav className="bg-white border-b border-gray-200 fixed start-0 top-0 end-0 z-50">
        <div className="bg-black text-white text-center py-2 px-4 text-xs sm:text-sm">
          Free Shipping on all orders until April . Don&apos;t miss !
        </div>
        <div className="w-full sm:w-[90%] md:w-[85%] mx-auto py-3 sm:py-4 px-4 sm:px-0">
          <div className="flex items-center justify-between">

            <Link href="/" className="text-xl sm:text-2xl tracking-wider font-bold">HEAVENLY</Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-5 lg:gap-8">
              <li>
                <Link href="/products" className={path.includes("/products") ? "font-semibold text-black" : "text-sm text-gray-600 hover:text-black transition-colors"}>PRODUCTS</Link >
              </li>
              <li>
                <Link href="/categories" className={path.includes("/categories") ? "font-semibold text-black" : "text-sm text-gray-600 hover:text-black transition-colors"}>CATEGORIES</Link >
              </li>
              <li>
                <Link href="/brands" className={path.includes("/brands") ? "font-semibold text-black" : "text-sm text-gray-600 hover:text-black transition-colors"}>BRANDS</Link >
              </li>
            </ul>

            {/* Right Section - Icons and Menu */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <BiX className="w-6 h-6" /> : <BiMenu className="w-6 h-6" />}
              </button>

              <ul className="flex items-center space-x-1 sm:space-x-2">
                {session ? <>
                  <Link href="/wishlist" className="p-2 rounded-full relative hover:bg-gray-100 transition-colors">
                    <BiHeart className="w-4 sm:w-5 h-4 sm:h-5" />
                    {noOfWishlistItems > 0 && <span className="absolute -top-2 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {noOfWishlistItems}
                    </span>}
                  </Link>
                  <Link href="/cart" className="p-2 rounded-full relative hover:bg-gray-100 transition-colors">
                    <BiShoppingBag className="w-4 sm:w-5 h-4 sm:h-5" />
                    {noOfItems > 0 && <span className="absolute -top-2 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                       {noOfItems}
                    </span>}
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                        <BiUser className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
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
                  </DropdownMenu>
                </> : <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                        <BiUser className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuGroup>
                        <Link href="/login">
                          <DropdownMenuItem>Login</DropdownMenuItem>
                        </Link>
                        <Link href="/register">
                          <DropdownMenuItem>Register</DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>}
              </ul>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <ul className="flex flex-col gap-3 py-4">
                <li>
                  <Link 
                    href="/products" 
                    className={path.includes("/products") ? "block py-2 font-semibold text-black" : "block py-2 text-gray-600 hover:text-black transition-colors"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    PRODUCTS
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/categories" 
                    className={path.includes("/categories") ? "block py-2 font-semibold text-black" : "block py-2 text-gray-600 hover:text-black transition-colors"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    CATEGORIES
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/brands" 
                    className={path.includes("/brands") ? "block py-2 font-semibold text-black" : "block py-2 text-gray-600 hover:text-black transition-colors"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    BRANDS
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
