import { getAllProducts } from '@/api/allProducts.api'
import { Product } from '@/types/product.type'
import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import Link from 'next/link'

export default async function AllProductHome() {

    const data = await getAllProducts()
    return <>
        <div className="min-h-screen p-8 text-center">
            <h2 className='text-6xl italic mb-10  font-medium'>OUR PRODUCTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
                {data.slice(0, 12).map((prod: Product) => {
                    return <ProductCard prod={prod} key={prod.id} />
                })}
            </div>
            <Link href="/products" >
                <button className=" mt-10 px-12 py-4 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                    See More
                </button>
            </Link>
        </div>
    </>


}
