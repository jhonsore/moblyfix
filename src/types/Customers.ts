import { Timestamp } from "firebase/firestore"

export type TypeCustomers = {
    _id: string
    _headquarterId: string
    _storeId: string
    createdAt: Timestamp

    cpfCnpj: string
    name: string
    email: string
    whatsapp: string
    telefone: string
    state: string
    city: string
    neighborhood: string
    address: string
    zipcode: string
    number: string
    complement: string
}

export type TypeCustomersViewList = {
    _id: TypeCustomers['_id']
    name: TypeCustomers['name']
    email: TypeCustomers['email']
    cpfCnpj: TypeCustomers['cpfCnpj']
    whatsapp: TypeCustomers['whatsapp']
    _headquarterId: TypeCustomers['_headquarterId']
    _storeId: TypeCustomers['_storeId']
    createdAt: TypeCustomers['createdAt']
    query: { [id: string]: boolean }
}