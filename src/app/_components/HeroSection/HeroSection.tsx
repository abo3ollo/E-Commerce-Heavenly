import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div className="relative w-full px-4 sm:px-6 md:px-0 py-6 sm:py-10 md:py-15">
        {/* Hero Section */}
        <div className="relative container mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl h-[50vh] sm:h-[60vh] md:h-[75vh]" >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/male-modelling-hero.jpg"
              alt="Heavenly Spring Collection - Fashion Models"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-end p-4 sm:p-8 md:p-12 lg:p-16">
            <div className="w-full">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight" >
                HEAVENLY SPRING COLLECTION
              </h1>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
                <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl leading-relaxed">
                  Find out our best selling collection. Offering our best quality products in a Heavenly Spring Collection.
                </p>

                <Link href="/products" className="flex-shrink-0">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-2.5 bg-white text-black rounded-full font-medium text-sm sm:text-base tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
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
