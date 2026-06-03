const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/shop`;

import { publicGet } from "./utilsRequest/public";

export async function getProducts() {
    return await publicGet(`${API_URL}/products/`);
}