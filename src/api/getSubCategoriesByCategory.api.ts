export async function getSubCategoriesByCategory(categoryId : string) {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
  let { data } = await res.json();
  return data;
}