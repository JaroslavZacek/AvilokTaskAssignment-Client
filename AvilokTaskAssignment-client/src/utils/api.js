const API_URL = "https://localhost:7029/api/"

export const apiGet = async (url, params = {}) => {
    const queryParams = new URLSearchParams(params);

    const response = await fetch(
        `${API_URL}${url}?${queryParams}`,
        {
            credentials: "include"
        }
    );

    if (!response.ok) {
        throw new Error(`Odezva sítě nebyla v pořádku: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export const apiPost = async (url, body) => {
    const response = await fetch(
        `${API_URL}${url}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    if (!response.ok) {
        throw new Error (`Odezva sítě nebyla v pořádku: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export const apiPatch = async (url, body) => {
    const response = await fetch(
        `${API_URL}${url}`,
        {
            method: "PATCH",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        }
    );

    if (!response.ok) {
        throw new Error (`Odezva sítě nebyla v pořádku: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204){
        return null;
    }

    return await response.json();
}

export const apiDelete = async (url) => {
    const response = await fetch(
        `${API_URL}${url}`,
        {
            method: "DELETE",
            credentials: "include"
        }
    );

    if (!response.ok) {
        throw new Error(`Odezva sítě nebyla v pořádku: ${response.status} ${response.statusText}`);
    }

    return true;
};