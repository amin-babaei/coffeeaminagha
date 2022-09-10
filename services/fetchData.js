const BASE_URL = process.env.BASE_URL
export const getData = async (url) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await res.json()
}

export const postData = async (url, post) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    return await res.json()
}

export const putData = async (url, post) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    return await res.json()
}

export const deleteData = async (url) => {
    const res = await fetch(`${BASE_URL}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await res.json()
}