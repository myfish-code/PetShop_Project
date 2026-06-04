const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

import { privateGet, privatePatch } from "./utilsRequest/private";

export async function getUserProfile() {
    return await privateGet(`${API_URL}/profile/`);
}

export async function updateUserProfile(first_name, last_name, phone) {
    const data = {
        first_name: first_name, 
        last_name: last_name, 
        phone: phone
    }
    return await privatePatch(`${API_URL}/profile/`, data);
}


export async function getUserAddresses() {
    return await privateGet(`${API_URL}/addresses/`);
}

export async function updateUserAddress(id, recipient_name, city, street, house) {
    const data = {
        recipient_name: recipient_name, 
        city: city,
        street: street,
        house: house
    }
    return await privatePatch(`${API_URL}/addresses/${id}/`, data);
}

export async function addUserAddress(id, data) {
    return await privatePost(`${API_URL}/addresses/${id}/`, data);
}