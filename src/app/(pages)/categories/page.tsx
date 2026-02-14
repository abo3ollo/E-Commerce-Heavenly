

import { subCategory } from '@/types/subcategories.type';
import SubCategoryCard from "@/app/_components/SubCategoryCard/SubCategoryCard";
import { getCategories } from '@/api/categories.api';
import { Category } from '@/types/categories.type';
import CategoryCard from '@/app/_components/CategoryCard/CategoryCard';


export default async function Categories() {

    const data =  await getCategories()
    console.log(data);
    
   
  return (
    <>
    <div className="min-h-screen  p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
              {data?.map((category : Category) => {
                return <CategoryCard category={category} key={category._id}/>
              })}
            </div>
          </div>
      
    </>
  )
}
