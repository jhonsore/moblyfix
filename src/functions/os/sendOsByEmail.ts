import axios, { AxiosResponse } from 'axios';
// Interface para o tipo de resposta que esperamos da API
export interface CreateResponse {
    status: boolean;
    error?: { code: string, message: string }
}

// Função que faz a requisição POST
const sendOsByEmail = async (token: string, data: any): Promise<CreateResponse> => {
    try {
        const response: AxiosResponse<CreateResponse> = await axios.post(
            'https://us-central1-moblyfix.cloudfunctions.net/sendOsByEmail', // URL da API
            data, // Dados enviados no corpo da requisição
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
        console.error('Error creating user:', error.response?.data || error.message);
        throw error;
    }
};

export default sendOsByEmail
