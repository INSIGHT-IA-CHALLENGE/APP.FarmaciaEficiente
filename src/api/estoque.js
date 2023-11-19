import env from '../../env.json'

export async function cadastrar(auth, estoque) {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/estoque/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(estoque)
    })

    return response

}

export async function listarPorPosto(auth, idPosto) {
    
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/estoque/${idPosto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function alterar(auth, estoque) {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/estoque/atualizar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(estoque)
    })

    return response
}

export async function deletar(auth, id) {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/estoque/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}