import { getCategories } from '@/api/categories.api'
import CategoriesSwipper from './CategoriesSwipper';

export default async function CategoriesSlider() {

    const data =  await getCategories()
    console.log(data);
    
   
  return (
    <>
      <CategoriesSwipper categories={data}/>
    </>
  )
}

