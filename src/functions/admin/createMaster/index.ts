import axios, { AxiosResponse } from 'axios';

// Interface para representar os dados que vamos enviar no corpo da requisição
export interface CreateMasterRequest {
    userName: string;
    email: string;
    password: string;
}

// Interface para o tipo de resposta que esperamos da API
export interface CreateMasterResponse {
    status: boolean;
}

// Função que faz a requisição POST
const createMaster = async (token: string, userData: CreateMasterRequest): Promise<CreateMasterResponse> => {
    try {
        const response: AxiosResponse<CreateMasterResponse> = await axios.post(
            'https://createmaster-ete7sjbqeq-uc.a.run.app', // URL da API
            userData, // Dados enviados no corpo da requisição
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

export default createMaster
