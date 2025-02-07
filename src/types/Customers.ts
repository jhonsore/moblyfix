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