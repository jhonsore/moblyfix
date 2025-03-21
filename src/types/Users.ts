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
    phone: string
    phone2: string
    phone3: string
    state: string
    city: string
    neighborhood: string
    address: string
    zipcode: string
    number: string
    complement: string
    password: string
    cpf: string
}

export type TypeUsersViewList = {
    _id: TypeUsers['_id']
    name: TypeUsers['name']
    type: TypeUsers['type']
    _headquarterId: TypeUsers['_headquarterId']
    _storeId: TypeUsers['_storeId']
    createdAt: TypeUsers['createdAt']
    query: { [id: string]: boolean }
}