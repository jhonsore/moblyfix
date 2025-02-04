import { Timestamp } from "firebase/firestore"

export type TypeTermsAndConditions = {
    _id: string
    text: string
    title: string
    _headquarterId: string
    _storeId: string
    createdAt: Timestamp
}