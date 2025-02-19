import { Timestamp } from "firebase/firestore"

export type TypeTermsAndConditions = {
    _id: string
    text: string
    title: string
    _headquarterId: string
    _storeId: string
    createdAt: Timestamp
}

export type TypeTermsAndConditionsViewList = {
    _headquarterId: TypeTermsAndConditions['_headquarterId']
    _storeId: TypeTermsAndConditions['_storeId']
    _id: TypeTermsAndConditions['_id']
    title: TypeTermsAndConditions['title']
    createdAt: TypeTermsAndConditions['createdAt']
    query: { [id: string]: boolean }
}