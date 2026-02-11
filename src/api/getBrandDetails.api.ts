export async function getBrandDetails(id : string) {
    let res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    );
    let { data } = await res.json();
    return data;
}