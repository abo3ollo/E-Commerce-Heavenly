

import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Category } from "@/types/categories.type";


export default async function CategoryCard({category }: { category: Category }) {
    return (
        <>
            <Link href={`/categories/${category._id}`}>

                

                <div key={category._id} className="relative rounded-2xl overflow-hidden shadow-2xl h-62.5">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={500}
                            height={500}
                            className="object-contain"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/20"></div>
                    </div>
                    <div className="relative flex items-end  justify-center h-full px-2 ">
                        <h1 className="text-white text-3xl font-bold tracking-tight mb-10">
                            {category.name}
                        </h1>
                    </div>
                </div>

            
            </Link>
        </>
    );
}
