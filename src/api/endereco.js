import env from '../../env.json'

export async function buscaCep(cep) {

    const response = await fetch(`${env.CEP_URL}/${cep}/json`, {
        method: "GET"
    })

    return response
}