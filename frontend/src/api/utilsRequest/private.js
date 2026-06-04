import { cookies } from 'next/headers';
import { refreshAndRetry } from '../actions';

export async function privateRequest(url, method = "GET", data = null) {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('access')?.value;
    const refresh = cookieStore.get('refresh')?.value;

    const headers = {
        "Content-Type": "application/json",
        ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
    };

    const sendRequest = async (token) => {
        return await fetch(url, {
            method,
            headers: { ...headers, "Authorization": `Bearer ${token}` },
            body: data ? JSON.stringify(data) : null
        });
    };

    let res = await sendRequest(accessToken);

    if (res.status === 401 && refresh) {
        try {
            accessToken = await refreshAndRetry();
            res = await sendRequest(accessToken);
        } catch {
            const error = new Error("TOKEN_EXPIRED");
            error.status = 401; // Явно указываем, что это ошибка авторизации
            error.details = "Failed to refresh token";
            throw error;
        }
    }

    if (res.ok) {
        return res.status === 204 ? {} : await res.json();
    }

    const error = new Error(res.status === 401 ? "TOKEN_EXPIRED" : "API_ERROR");
    error.status = res.status;
    error.details = await res.json().catch(() => ({}));

    throw error;
}

export const privateGet = (url) => privateRequest(url, "GET");
export const privatePost = (url, data) => privateRequest(url, "POST", data);
export const privatePatch = (url, data) => privateRequest(url, "PATCH", data);
export const privateDelete = (url) => privateRequest(url, "DELETE");