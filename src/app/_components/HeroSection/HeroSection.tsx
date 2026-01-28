import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div className="relative container mx-auto  py-15">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[75vh]" >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/male-modelling-hero.jpg"
              alt="Tolus Spring Collection - Fashion Models"
              fill
              priority
              className="object-cover"

            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-end  p-12 md:p-16">
            <div className=" w-full">
              <h1 className="text-white text-6xl font-bold tracking-tight mb-10" >
                HEAVENLY SPRING COLLECTION
              </h1>

              <div className="flex justify-between items-center ">
                <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
                  Find out our best selling collection. Offering our best quality products in a Heavenly Spring Collection.
                </p>

                <Link href="/products">
                <button className=" px-8 py-2.5 bg-white text-black rounded-full font-medium tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  Buy Now
                </button>
                </Link>
              </div>

            </div>
          </div>
        </div>


      </div>
  )
}
