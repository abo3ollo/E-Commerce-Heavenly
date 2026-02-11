export async function getCategoryDetails(id : string) {
    let res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    );
    let { data } = await res.json();
    return data;
}