import { getProductDetails } from "@/api/getProductDetails.api";

import { FaStar } from "react-icons/fa";

export default async function ProductDetails({ params }) {
  let { id } = await params;
  console.log(id);

  let data = await getProductDetails(id);
  console.log(data);

  return (
    <>
      <div className="max-w-7xl mx-auto  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={data.imageCover}
                alt="Balmain Logo-Print Crew-Neck Sweatshirt"
                className="w-full h-180 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={data.images[1]}
                  alt="Product view 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={data.images[2]}
                  alt="Product view 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
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
              <h2 className="text-6xl font-bold tracking-wide mb-3">
                {data.title}
              </h2>
              <div className="flex items-center gap-5">
                {data.price > data.priceAfterDiscount ? (
                  
                  <>
                    <span className="text-gray-400 line-through text-xl">
                      £{data.price}.00
                    </span>
                    <span className="text-red-600 font-bold text-3xl">
                      £{data.priceAfterDiscount}.00
                    </span>
                  </>
                ) : (
                  
                  <span className="text-gray-900 font-bold text-3xl">
                    £{data.price}.00
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{data.description}</p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors">
                ADD TO CART
              </button>
            </div>

            {/* Characteristics */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="mb-3 font-bold ">Characteristics</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{data.brand.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Collection</span>
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Item no.</span>
                  <span className="font-medium">{data.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ratings</span>
                  <div className="flex items-center">
                    <span className="font-medium">{data.ratingsAverage}</span>
                    <FaStar className="text-yellow-400" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Care recommendations</span>
                  <span className="font-medium">Machine wash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
