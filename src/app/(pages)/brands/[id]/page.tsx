import { getBrandDetails } from "@/api/getBrandDetails.api";

import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { getRelatedBrand } from "@/Related/RelatedBrands";

import { Product } from "@/types/product.type";




export default async function BrandDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);

    const data = await getBrandDetails(id);
    console.log(data?._id);

    if (!data)  return <h1>no products details</h1> 
            
        
    


    const res = await getRelatedBrand(data._id);
    console.log(res);



    return (
      res.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">Brand not found</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
            {res.map((prod: Product) => (
              <ProductCard prod={prod} key={prod.id} />
            ))}
          </div>
        </div>
      )
    );
}