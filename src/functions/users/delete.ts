import axios, { AxiosResponse } from 'axios';
// Interface para o tipo de resposta que esperamos da API
export interface CreateResponse {
    status: boolean;
}

// Função que faz a requisição POST
const remove = async (token: string, uid: string): Promise<CreateResponse> => {
    try {
        const response: AxiosResponse<CreateResponse> = await axios.post(
            'https://deleteuser-ete7sjbqeq-uc.a.run.app', // URL da API
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
        console.error('Error creating user:', error.response?.data || error.message);
        throw error;
    }
};

export default remove
