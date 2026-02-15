"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/product.type";

export default function CategoriesSwipper({ categories } : {categories : Category[]}) {
    return (
        <>
            <div className="w-full px-4 sm:px-6 md:px-0">
                <div className="container mx-auto w-full sm:w-[90%] md:w-[85%] text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl italic mb-6 sm:mb-8 md:mb-10 font-medium">
                        OUR CATEGORIES
                    </h2>
                    <Swiper
                        spaceBetween={8}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 8,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 12,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                        }}
                        modules={[Autoplay]}
                        autoplay={{ delay: 1500 }}
                    >
                        {categories.map((cate : Category) => {
                            return (
                                <SwiperSlide key={cate._id || cate.name}>
                                    <div className="relative rounded-lg sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl h-40 sm:h-56 md:h-64 lg:h-62.5">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={cate.image}
                                                alt={cate.name}
                                                width={500}
                                                height={500}
                                                className="object-center w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/20"></div>
                                        </div>
                                        <div className="relative flex items-end justify-center h-full px-2 pb-6 sm:pb-8 md:pb-10">
                                            <h1 className="text-white text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-center line-clamp-2">
                                                {cate.name}
                                            </h1>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <Link href="/categories">
                        <button className="mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 bg-neutral-900 text-white rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                            See Details
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
