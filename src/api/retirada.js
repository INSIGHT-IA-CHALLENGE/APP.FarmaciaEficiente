import env from '../../env.json'


export const retirar = async (auth, retirada) => {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/retirada/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(retirada)
    })

    return response
}

export const listarPorUsuario = async (auth, idUser) => {
    const { token, prefix } = auth

    const response = await fetch(`${env.BASE_URL}/retirada/${idUser}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}