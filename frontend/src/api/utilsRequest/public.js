export async function publicRequest(url, method = "GET", data = null) {
    const headers = { "Content-Type": "application/json" };
    
    let body = null;
    if (data) {
        body = data instanceof FormData ? data : JSON.stringify(data);
        if (!(data instanceof FormData)) headers["Content-Type"] = "application/json";
    }

    const res = await fetch(url, { method, headers, body });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const error = new Error(errorData.error || "UNKNOWN_ERROR");
        error.status = res.status;
        throw error;
    }

    return res.status === 204 ? {} : await res.json();
}

export const publicGet = (url) => publicRequest(url, "GET");
export const publicPost = (url, data) => publicRequest(url, "POST", data);
export const publicPatch = (url, data) => publicRequest(url, "PATCH", data);
export const publicDelete = (url) => publicRequest(url, "DELETE");