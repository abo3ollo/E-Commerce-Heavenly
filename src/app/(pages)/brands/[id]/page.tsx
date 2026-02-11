import { getBrandDetails } from "@/api/getBrandDetails.api";
import { Card, CardContent } from "@/components/ui/card";
import { BrandsTypes } from "@/types/brands.type";
import Image from "next/image";
import Link from "next/link";

export default async function BrandDetails({ params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    console.log(id);

    let data = await getBrandDetails(id);
    console.log(data);
    return (
        
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
                    <Card className="relative w-72 overflow-hidden rounded-3xl border-none shadow-xl hover:shadow-2xl transition-shadow"
                        key={data._id}>
                        <CardContent className="relative h-64 p-4">
                            <Image
                                src={data.image}
                                fill
                                alt={data.name}
                                priority
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        
    );
}