export async function getSubCategories() {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`);
  let { data } = await res.json();
  return data;
}