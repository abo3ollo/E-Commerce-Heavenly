// app/subcategories/page.tsx

import { subCategory } from '@/types/subcategories.type';
import SubCategoryCard from "@/app/_components/SubCategoryCard/SubCategoryCard";
import { getSubCategories } from '@/api/getSubCategories.api';

export default async function SubCategories() {
  const data = await getSubCategories();
  console.log(data);
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Subcategories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container w-[80%] mx-auto">
        {data?.map((subcategory: subCategory) => (
          <SubCategoryCard 
            subcategory={subcategory} 
            key={subcategory._id}
          />
        ))}
      </div>
    </div>
  );
}