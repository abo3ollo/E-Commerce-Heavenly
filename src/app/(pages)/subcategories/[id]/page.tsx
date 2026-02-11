import { getSubCategories } from '@/api/getSubCategories.api';
import { getSubCategoriesDetails } from '@/api/getSubCategoriesDetails';
import React from 'react'

export default async function SubCategoriesDetails({ params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    console.log(id);

    let data = await getSubCategoriesDetails(id);
    console.log(data);
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                {/* Subcategories might not have images, so handle that */}
                {data.image && (
                    <img
                        src={data.image}
                        alt={data.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}

                <h1 className="text-4xl font-bold">{data.name}</h1>

                {data.slug && (
                    <p className="text-gray-600 mt-2">Slug: {data.slug}</p>
                )}

            </div>
        </div>
    )
}
