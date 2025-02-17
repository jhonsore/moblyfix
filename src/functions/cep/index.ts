export async function getCep(cep: string) {
    const URL = `https://brasilapi.com.br/api/cep/v2/${cep}`
    const response = await fetch(URL);
    const data = await response.json();
    return data
}