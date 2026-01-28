"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BiHeart, BiSearch, BiShoppingBag, BiUser } from 'react-icons/bi';
export default function Navbar() {
  let path = usePathname()
  return (
    <>
      <nav className="bg-white border-b border-gray-200 ">
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

            <Link href="/" className="text-2xl   tracking-wider">HEAVENLY</Link>

            <ul className="flex  gap-4">
                <Link href="" className="p-2 hover:bg-gray-100 rounded-full">
                  <BiSearch className="w-5 h-5" />
                </Link>
                <Link href="" className="p-2 hover:bg-gray-100 rounded-full">
                  <BiUser className="w-5 h-5" />
                </Link>
                <Link href="" className="p-2 hover:bg-gray-100 rounded-full">
                  <BiHeart className="w-5 h-5" />
                </Link>
                <Link href="" className="p-2 hover:bg-gray-100 rounded-full relative">
                  <BiShoppingBag className="w-5 h-5" />
                  <span className="absolute top-0 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
                </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
