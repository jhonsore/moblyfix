import axios, { AxiosResponse } from 'axios';
import { TypeUsers } from '../../types/Users';


// Interface para o tipo de resposta que esperamos da API
export interface CreateResponse {
    status: boolean;
}

// Função que faz a requisição POST
const create = async (token: string, userData: Omit<TypeUsers, 'createdAt' | '_id'>): Promise<CreateResponse> => {
    try {
        const response: AxiosResponse<CreateResponse> = await axios.post(
            'https://createuser-ete7sjbqeq-uc.a.run.app', // URL da API
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

export default create
