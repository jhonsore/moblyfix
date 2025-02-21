export async function getCep(cep: string) {
    try {
        const URL = `https://brasilapi.com.br/api/cep/v2/${cep}`
        const response = await fetch(URL);
        const data = await response.json();
        return data
    } catch (error) {

    }
}

/*
Resposta do servidor
{
    "cep": "29147500",
    "state": "ES",
    "city": "Cariacica",
    "neighborhood": "Santa Cecília",
    "street": "Rua Nossa Senhora das Graças",
    "service": "open-cep",
    "location": {
        "type": "Point",
        "coordinates": {
            "longitude": "-40.39462943655067",
            "latitude": "-20.334241034474807"
        }
    }
}
*/