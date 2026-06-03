const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

import { privateGet } from "./utilsRequest/private";

export async function getUserProfile() {
    return await privateGet(`${API_URL}/profile/`);
}