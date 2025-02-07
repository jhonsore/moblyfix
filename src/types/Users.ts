import { Timestamp } from "firebase/firestore"
import { TypeOfUsers } from "../consts/TYPE_USERS"

export type TypeUsers = {
    _id: string
    _headquarterId: string
    _storeId: string
    createdAt: Timestamp

    type: TypeOfUsers
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
    password: string
}