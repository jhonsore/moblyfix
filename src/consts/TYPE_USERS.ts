const TYPE_OF_USERS = {
    master: 'master',
    admin: 'admin',
    manager: 'manager',
    technical: 'technical',
    attendant: 'attendant',
    financial1: 'financial1',// acesso a todas as lojas
    financial2: 'financial2'// acesso apenas a loja de criação

}

export type TypeOfUsers = keyof typeof TYPE_OF_USERS

export default TYPE_OF_USERS