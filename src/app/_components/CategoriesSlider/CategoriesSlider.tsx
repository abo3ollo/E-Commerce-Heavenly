import { getCategories } from '@/api/categories.api'
import React from 'react'
import CategoriesSwipper from './CategoriesSwipper';

export default async function CategoriesSlider() {

    let data =  await getCategories()
    console.log(data);
    
   
  return (
    <>
      <CategoriesSwipper categories={data}/>
    </>
  )
}

