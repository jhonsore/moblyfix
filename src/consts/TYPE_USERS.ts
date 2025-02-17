const TYPE_OF_USERS = {
    master: { _id: 'master', label: 'Master' },
    admin: { _id: 'admin', label: 'Administrador' },
    manager: { _id: 'manager', label: 'Gerente' },
    technical: { _id: 'technical', label: 'Técnico' },
    attendant: { _id: 'attendant', label: 'Atendente' },
    financial1: { _id: 'financial1', label: 'Financeiro I' },// acesso a todas as lojas
    financial2: { _id: 'financial2', label: 'Financeiro II' }// acesso apenas a loja de criação

}

export type TypeOfUsers = keyof typeof TYPE_OF_USERS

export default TYPE_OF_USERS