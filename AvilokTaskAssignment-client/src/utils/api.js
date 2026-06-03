const API_URL = "https://localhost:7029/"

export const apiGet = (url, par) => {
    const queryParams = new URLSearchParams(par);
    const apiUrl = `${API_URL}${url}?${queryParams}`;

    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok){
                throw new Error(`Odezva sítě nebyla v pořádku: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
        
};