import { cookies } from 'next/headers';
import { refreshToken } from '../auth';

export async function privateRequest(url, method = "GET", data = null) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access')?.value;
    const refresh = cookieStore.get('refresh')?.value;

    if (!accessToken || !refresh) {
        cookieStore.delete('access');
        cookieStore.delete('refresh');
        throw new Error("TOKEN_EXPIRED");
    }
    const headers = { 
        "Content-Type": "application/json",
        ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
    };

    let body = data ? (data instanceof FormData ? data : JSON.stringify(data)) : null;

    const sendRequest = async (token) => {
        return await fetch(url, { 
            method, 
            headers: { ...headers, "Authorization": `Bearer ${token}` }, 
            body 
        });
    };

    let res = await sendRequest(accessToken);

    if (res.status === 401 && refresh) {
        try {
            const tokenData = await refreshToken(refresh);
            
            (await cookies()).set('access', tokenData.access, { 
                maxAge: 60 * 60 * 24 * 7, 
                path: '/',
                httpOnly: true
            });

            res = await sendRequest(tokenData.access);
        } catch {
            cookieStore.delete('access');
            cookieStore.delete('refresh');
            throw new Error("TOKEN_EXPIRED");
        }
    }

    if (!res.ok) throw new Error("API_ERROR");
    return res.status === 204 ? {} : await res.json();
}


export const privateGet = (url) => privateRequest(url, "GET");
export const privatePost = (url, data) => privateRequest(url, "POST", data);
export const privatePatch = (url, data) => privateRequest(url, "PATCH", data);
export const privateDelete = (url) => privateRequest(url, "DELETE");