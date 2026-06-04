export async function publicRequest(url, method = "GET", data = null) {
    const headers = {
        "Content-Type": "application/json"
    };

    const res = await fetch(url, { 
        method, 
        headers,
        body: data ? JSON.stringify(data) : null
    });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const error = new Error(errorData.error || "API_ERROR");
        error.status = res.status;
        error.details = errorData;
        throw error;
    }

    return res.status === 204 ? {} : await res.json();
}

export const publicGet = (url) => publicRequest(url, "GET");
export const publicPost = (url, data) => publicRequest(url, "POST", data);
export const publicPatch = (url, data) => publicRequest(url, "PATCH", data);
export const publicDelete = (url) => publicRequest(url, "DELETE");