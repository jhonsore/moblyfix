import { Timestamp } from "firebase/firestore"
import { TypePartsServicesProducts } from "./PartsServicesProducts"

export type TypeSales = {
    _id: string
    _headquarterId: string
    _storeId: string
    _osId?: string
    createdAt: Timestamp

    items: Omit<TypePartsServicesProducts, 'createdAt' | '_headquarterId' | '_storeId'>[]
    paymentType: 'cash' | 'card' | 'free' | 'pix' | 'picpay'
    discountType: 'cash' | 'percentage'
    signFile: string
    observations: string
}