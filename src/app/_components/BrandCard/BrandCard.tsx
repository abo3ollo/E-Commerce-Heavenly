import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { BrandsTypes } from "@/types/brands.type";


export default async function BrandCard({ brand }: { brand: BrandsTypes }) {
    return (
        <>
            <Link href={`/brands/${brand._id}`}>

                <Card className="relative w-82 h-90 overflow-hidden rounded-3xl border-none shadow-xl"
                    key={brand._id}>

                    <CardContent className="relative h-64 p-4">
                        <Image
                            src={brand.image}
                            fill
                            alt={brand.name}
                            priority
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </CardContent>

                </Card>
            </Link>
        </>
    );
}
