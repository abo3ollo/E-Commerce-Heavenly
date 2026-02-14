

import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { Product } from "@/types/product.type";
import { getAllBrands } from "@/api/allBrands.api";

import BrandCard from "@/app/_components/BrandCard/BrandCard";
import { BrandsTypes } from "@/types/brands.type";

export default async function Brands() {

    const data = await getAllBrands()
    console.log(data);
     //call allproduct api 
  

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
          {data?.map((brand : BrandsTypes ) => {
            return <BrandCard brand = {brand} key={brand._id}/>
          })}
        </div>
      </div>
    </>
  );
}
