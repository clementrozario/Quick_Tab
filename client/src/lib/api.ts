
export const API_BASE_URL = 'http://localhost:5003/api'

export const apiFetch = async (url:string,options:RequestInit={}) => {
    const fullUrl = `${API_BASE_URL}${url}`

    const isFormData = options.body instanceof FormData

    const config: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            ...(isFormData ? {}:{'Content-Type':'application/json'}),
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

export const getMe = async () => {
    const response = await apiFetch('/auth/me')
    if (response.ok) {
        return response.json()
    }
    else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}

export const uploadLogo = async (file: File) => {
    const formData = new FormData()
    formData.append('logo', file)
    
    const response = await apiFetch('/user/profile/logo', {
        method: 'POST',
        body: formData,
    })

    if (response.ok) {
        return response.json()
    } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload logo')
    }
}

export const updateProfile = async (data: { businessName?: string; businessAddress?: string; defaultCurrency?:string}) => {
    const response = await apiFetch('/user/profile',{
        method: 'PUT',
        body:JSON.stringify(data)
    })
    if (response.ok) {
        return response.json()
    } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update profile')
    }
}

export const saveInvoice = async (invoice: any) => {
    const response = await apiFetch('/invoice', {
        method: 'POST',
        body: JSON.stringify(invoice)
    })
    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Failed to save invoice')    
    }
    return response.json()
}
