export const API_BASE_URL = 'http://localhost:5003/api'

export const apiFetch = async (url:string,options:RequestInit={}) => {
    const fullUrl = `${API_BASE_URL}${url}`
    const config: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    }
    const response = await fetch(fullUrl, config);
    return response;
}