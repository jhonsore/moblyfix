import axios, { AxiosResponse } from "axios";

// Interface para o tipo de resposta que esperamos da API
export interface IResponse {
    status: boolean;
    erro?: unknown
}

const remove = async ({ uid, token }: { token: string, uid: string }): Promise<IResponse> => {
    try {
        const response: AxiosResponse<IResponse> = await axios.post(
            'https://us-central1-moblyfix.cloudfunctions.net/deleteUser', // URL da API
            { uid }, // Dados enviados no corpo da requisição
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Token de autenticação
                    'Content-Type': 'application/json', // Cabeçalho para JSON
                },
            }
        );

        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        // Trata erros
        console.error('Error deleting user:', error.response?.data || error.message);
        throw error;
    }
}

export default remove
