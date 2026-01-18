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

export const signupUser = async (data: { name: string; email: string; password: string }) => {
    const response = await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return response.json()
    }
    else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}

export const loginUser = async (data:{email:string,password:string}) => {
    const response = await apiFetch('/auth/signin', {
        method: 'POST',
        body:JSON.stringify(data)
    })
    if (response.ok) {
        return response.json()
    }
    else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}