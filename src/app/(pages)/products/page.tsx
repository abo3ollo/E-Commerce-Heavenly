import { getAllProducts } from "@/api/allProducts.api";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { Product } from "@/types/product.type";

export default async function Products() {

    const data = await getAllProducts()
    console.log(data);
     //call allproduct api 
  

  return (
    <>
      <div className="min-h-screen  p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
          {data?.map((prod : Product) => {
            return <ProductCard prod = {prod} key={prod.id}/>
          })}
        </div>
      </div>
    </>
  );
}
