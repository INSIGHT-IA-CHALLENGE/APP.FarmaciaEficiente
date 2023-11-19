import env from '../../env.json'

export async function cadastrar(auth, medicamento) {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/medicamento/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(medicamento)
    })

    return response
}

export async function listar(auth) {
    
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/medicamento`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function alterar(auth, medicamento) {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/medicamento/atualizar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(medicamento)
    })

    return response
}

export async function deletar(auth, id) {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/medicamento/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

