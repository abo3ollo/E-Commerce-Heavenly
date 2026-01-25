export async function getAllProducts() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let { data } = await res.json();
  return data;
}
