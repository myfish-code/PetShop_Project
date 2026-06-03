import { refreshToken } from "./auth";
import { setCookie, getCookie } from 'cookies-next';

async function apiRequest(url, method = "GET", data = null, isPrivate = true) {

    let accessToken = isPrivate ? getCookie("access") : null;
    const refresh = isPrivate ? getCookie("refresh") : null;

    const headers = {
        "Content-Type": "application/json",
    };
    
    if (isPrivate && accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }


    let body = null;
    if (data && method !== "GET") {
        if (data instanceof FormData) {
            body = data;
        } else {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(data);
        }
    }

    const sendRequest = async (token) => {
        const config = { method, headers, body };
        return await fetch(url, config);
    };

    let res = await sendRequest(accessToken);

    if (isPrivate && res.status === 401 && refresh) {
        try {
            const tokenData = await refreshToken(refresh);
            accessToken = tokenData.access;
            setCookie("access", accessToken, { maxAge: 60 * 60 * 24 * 7, path: '/' });
            res = await sendRequest(accessToken);
        } catch {
            const error = new Error("TOKEN_EXPIRED");
            error.status = 401;
            throw error;
        }
    }

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const error = new Error(errorData.error || "UNKNOWN_ERROR");
        error.status = res.status;
        throw error;
    }

    return res.status === 204 ? {} : res.json();
}

// Теперь экспортируем простые методы
export const privateGet = (url, isPrivate = true) => apiRequest(url, "GET", null, isPrivate);
export const privatePost = (url, data, isPrivate = true) => apiRequest(url, "POST", data, isPrivate);
export const privatePatch = (url, data, isPrivate = true) => apiRequest(url, "PATCH", data, isPrivate);
export const privateDelete = (url, isPrivate = true) => apiRequest(url, "DELETE", null, isPrivate);