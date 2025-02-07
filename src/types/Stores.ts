import { Timestamp } from "firebase/firestore"

export type TypeStores = {
    _id: string
    _headquarterId: string
    _storeId: string
    createdAt: Timestamp

    name: string
    cnpj: string
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
    lastOsNumber: number
    lastSaleNumber: number
}