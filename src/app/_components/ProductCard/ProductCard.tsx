import { Card } from "@/components/ui/card";
import { Product } from "@/types/product.type";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CartBtn from "../AddBtn/CartBtn";


export default async function ProductCard({ prod }:{prod : Product}) {
    return (
        <>
            <Card
                className="relative w-72 h-125 overflow-hidden rounded-3xl border-none shadow-xl"
                key={prod.id}
            >
                <Link href={`/products/${prod.id}`}>
                    {/* Full Background Image */}
                    <div className="absolute inset-0 ">
                        
                        <Image
                            src={prod.imageCover}
                            alt={prod.slug}
                            fill
                            priority
                            className=" object-cover w-full h-auto"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/10 to-black/10"></div>
                    </div>
                </Link>
                {/* Season Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-lg flex items-center gap-2">
                    {prod.category.name}
                    <button className="hover:scale-110 transition-transform">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>

                {/* Product Info Button at Bottom */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="w-full bg-white  backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between group transition-all shadow-lg">
                        <div className="text-left">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                {prod.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <p className="text-gray-600 text-sm">{prod.price} EGP</p>
                        </div>
                        {/* <Link href="/cart"> */}
                        <CartBtn id={prod.id}/>
                        {/* </Link> */}
                    </div>
                </div>
            </Card>
        </>
    );
}
