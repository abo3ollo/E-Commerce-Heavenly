export async function getRelatedCategory(id : string) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
    );
    const { data } = await res.json();
    return data;
}