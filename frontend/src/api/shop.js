const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/shop`;

import { publicGet } from "./utilsRequest/public";
import { privateGet } from "./utilsRequest/private";

export async function getProducts(category) {
    const url = category 
        ? `${API_URL}/products/?category=${category}` 
        : `${API_URL}/products/`;
    return await publicGet(url);
}

export async function getUserOrders(status) {
    return await privateGet(`${API_URL}/orders/?status=${status}`);
}

export async function getProductById(productId) {
    
    return await publicGet(`${API_URL}/products/${productId}/`);
}