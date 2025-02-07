import axios, { AxiosResponse } from "axios";
import { TypeUsers } from "../../types/Users"

// Interface para o tipo de resposta que esperamos da API
export interface IResponse {
    status: boolean;
    id?: string
    erro?: unknown
}
type IData = Omit<TypeUsers, '_id' | 'createdAt'>
const create = async ({ data, token }: { token: string, data: IData }): Promise<IResponse> => {
    try {
        const _data: IData & { headquarterId: string, storeId: string } = { ...data, headquarterId: data._headquarterId, storeId: data._storeId }

        const response: AxiosResponse<IResponse> = await axios.post(
            'https://createuser-ete7sjbqeq-uc.a.run.app', // URL da API
            _data, // Dados enviados no corpo da requisição
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

}

export default create
