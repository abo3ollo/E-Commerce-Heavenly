export async function getSubCategoriesDetails( id :string ) {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
  let { data } = await res.json();
  return data;
}