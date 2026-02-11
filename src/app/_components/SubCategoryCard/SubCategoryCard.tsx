

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


import { subCategory } from "@/types/subcategories.type";


export default async function SubCategoryCard({ subcategory }: { subcategory: subCategory }) {
    return (
        <>
            <Link href={`/subcategories/${subcategory._id}`}>

                

                <div key={subcategory._id} className="flex justify-center items-center p-2 text-center m-auto rounded-2xl overflow-hidden shadow-2xl h-62.5 w-auto">
                    {/* Background Image */}
                    
                        <h1 className="text-center text-black text-3xl font-bold tracking-tight mb-10">
                            {subcategory.name}
                        </h1>
                    
                </div>

            {/*  */}
            </Link>
        </>
    );
}
