import { setCookie, deleteCookie, getCookie } from 'cookies-next';

import { publicPost } from './utilsRequest/public';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/`;

export async function refreshToken(refresh) {
    const res = await fetch(`${API_URL}token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh })
    })

    if (!res.ok) {
        throw new Error("refresh token expired")
    }

    return res.json()
}


export const loginWithGoogle = async (googleToken) => {
    const data = await publicPost(
        `${API_URL}auth/google/`, 
        { access_token: googleToken }
    );

    if (data.access && data.refresh) {
        setCookie("access", data.access, { maxAge: 60 * 60 * 24 * 7, path: '/' });
        setCookie("refresh", data.refresh, { maxAge: 60 * 60 * 24 * 30, path: '/' });
    }
    
    return data;
};