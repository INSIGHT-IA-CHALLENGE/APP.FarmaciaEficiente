import env from '../../env.json'

export async function cadastrar(auth, posto) {

    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/posto/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(posto)
    })

    return response
}

export async function listar(auth) {

    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/posto`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function alterar(auth, posto, id) {

    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/posto/atualizar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(posto)
    })

    return response
}

export async function deletar(auth, id) {

    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/posto/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}