import React from "react";
import {
  Card,
  
} from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import { getAllProducts } from "@/api/allProducts.api";
import ProductCard from "@/app/_components/ProductCard/ProductCard";

export default async function Products() {

    let data = await getAllProducts() //call allproduct api 
  

  return (
    <>
      <div className="min-h-screen bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
          {data.map((prod) => {
            return <ProductCard prod = {prod} key={prod.id}/>
          })}
        </div>
      </div>
    </>
  );
}
