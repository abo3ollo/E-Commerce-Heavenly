

import { getProductDetails } from "@/api/getProductDetails.api";
import CartBtnDetails from "@/app/_components/AddBtn/CartBtnDetails";
import WishlistBtnDetails from "@/app/_components/AddBtn/wishlistBtnDetails";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { getRelatedCategory } from "@/Related/RelatedCategory";
import { getRelatedProducts } from "@/Related/RelatedProducts";
import { Product } from "@/types/product.type";
import { Heart, Star } from "lucide-react";
import React from "react";


export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params;
  console.log(id);

  let data = await getProductDetails(id);
  console.log(data);

  if (!data) return <h1>no products details here</h1>


  const res = await getRelatedProducts(data.category._id);
  console.log(res);



  return (
    <>
      <div className="container mx-auto  py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-400">
              <img
                src={data.imageCover}
                alt="Balmain Logo-Print Crew-Neck Sweatshirt"
                className="w-full h-180 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square border border-gray-400">
                <img
                  src={data.images[1]}
                  alt="Product view 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square border border-gray-400">
                <img
                  src={data.images[2]}
                  alt="Product view 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square border border-gray-400">
                <img
                  src={data.images[0]}
                  alt="Product view 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10 ">
            <div className="">
              <h2 className="text-5xl font-bold  mb-3">
                {data.title}
              </h2>
              <div className="flex items-center gap-5">
                {data.price > data.priceAfterDiscount ? (

                  <>
                    <span className="text-gray-400 line-through text-xl">
                      {data.price.toFixed(1).toLocaleString('en-US')}EGP
                    </span>
                    <span className="text-red-600 font-bold text-3xl">
                      {data.priceAfterDiscount.toFixed(1).toLocaleString('en-US')}EGP
                    </span>
                  </>
                ) : (

                  <span className="text-gray-900 font-bold text-3xl">
                    {data.price.toFixed(1).toLocaleString('en-US')}EGP
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{data.description}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 items-center">
              <div className="w-full">

                <CartBtnDetails id={data.id} />
              </div>

              <WishlistBtnDetails id={data.id} />
            </div>

            {/* Characteristics */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="mb-3 font-bold ">Characteristics</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{data.brand.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Collection</span>
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Item no.</span>
                  <span className="font-medium">{data.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ratings</span>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((star, index) => {
                      const filledStar = star < Math.round(data.ratingsAverage)
                      return <React.Fragment key={index}>
                        <Star className={`size-5 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                      </React.Fragment>
                    })}
                    <p className="font-medium ms-1">({data.ratingsAverage.toFixed(1)})</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Care recommendations</span>
                  <span className="font-medium">Machine wash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
          <h1 className="col-span-full text-3xl font-bold ">Related Products</h1>
          {res.map((prod: Product) => (
            <ProductCard prod={prod} key={prod.id} />
          ))}
        </div>
      </div>

    </>
  );
}
