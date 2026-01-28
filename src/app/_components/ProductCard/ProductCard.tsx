import { Card } from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ prod }) {
    return (
        <>
            
            <Card className="relative w-72 h-125 overflow-hidden rounded-3xl border-none shadow-xl" key={prod.id}>
                <Link href={`/products/${prod.id}`}>
                {/* Full Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={prod.imageCover}
                        alt={"asasas"}
                        className="w-full h-full object-cover"
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
                    <button className="w-full bg-white  backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between group transition-all shadow-lg">
                        <div className="text-left">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                {prod.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <p className="text-gray-600 text-sm">{prod.price} EGP</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                </div>
            </Card>
            
        </>
    );
}
