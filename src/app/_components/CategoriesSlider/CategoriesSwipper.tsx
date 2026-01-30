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
            <div className="container w-[80%] mx-auto text-center">
                <h2 className="text-6xl italic mb-10  font-medium">
                    OUR CATEGORIES
                </h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[Autoplay]}
                    autoplay={{ delay: 1500 }}
                >
                    {categories.map((cate : Category) => {
                        return (
                            <>
                                <SwiperSlide key={cate._id || cate.name}>
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-62.5">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={cate.image}
                                                alt={cate.name}
                                                width={500}
                                                height={500}
                                                className="object-center"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/20"></div>
                                        </div>
                                        <div className="relative flex items-end  justify-center h-full px-2 ">
                                            <h1 className="text-white text-3xl font-bold tracking-tight mb-10">
                                                {cate.name}
                                            </h1>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                ;
                            </>
                        );
                    })}
                </Swiper>
                <Link href="/categories" >
                    <button className=" mt-10 px-12 py-4 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                        See Details
                    </button>
                </Link>
            </div>
        </>
    );
}
