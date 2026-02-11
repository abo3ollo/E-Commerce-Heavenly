
import { getCategoryDetails } from "@/api/getCategoryDetails.api";
import { getSubCategoriesByCategory } from "@/api/getSubCategoriesByCategory.api";
import SubCategoryCard from "@/app/_components/SubCategoryCard/SubCategoryCard";
import { subCategory } from "@/types/subcategories.type";


export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    console.log(id);

    // let data = await getCategoryDetails(id);
    // console.log(data);


    // Fetch both category details AND its subcategories
  const [category, subcategories] = await Promise.all([
    getCategoryDetails(id),
    getSubCategoriesByCategory(id)
  ]);
    return( <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-12 ">
        <h1 className="text-4xl font-bold ">{category.name}</h1>
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-screen object-cover  rounded-lg mb-4"
        />
      </div>
      <div className="mb-4 border-b-2 border-gray-200"></div>

      {/* Subcategories Section */}
      {subcategories && subcategories.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6">Subcategories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategories.map((subcategory: subCategory) => (
              <SubCategoryCard 
                subcategory={subcategory} 
                key={subcategory._id}
              />
            ))}
          </div>
        </div>
      )}

      {/* No subcategories message */}
      {(!subcategories || subcategories.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-500">No subcategories found for this category</p>
        </div>
      )}
    </div>
  );
}
