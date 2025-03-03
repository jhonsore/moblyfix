import { Timestamp } from "firebase/firestore"
import { TypePartsServicesProducts } from "./PartsServicesProducts"
import PAYMENT_METHODS from "../consts/PAYMENT_METHODS"
import { TypeCustomers } from "./Customers"
import PAYMENT_TYPES from "../consts/PAYMENT_TYPES"

export type TypeSales = {
    _id: string
    _headquarterId: string
    _storeId: string
    _osId?: string
    createdAt: Timestamp
    customer: {
        _id: TypeCustomers['_id'],
        name: TypeCustomers['name']
    }
    items: Omit<TypePartsServicesProducts, 'createdAt' | '_headquarterId' | '_storeId'>[]
    paymentType: keyof typeof PAYMENT_TYPES
    discountType: 'cash' | 'percentage' | 'none'
    paymentMethod: keyof typeof PAYMENT_METHODS | null
    signFile: string | null
    observations: string
    installments: number | null
    discount: number | null
    total: number
}

export type TypeSalesViewList = {
    _id: TypeSales['_id']
    _headquarterId: TypeSales['_headquarterId']
    _storeId: TypeSales['_storeId']
    _osId?: TypeSales['_osId']
    createdAt: TypeSales['createdAt']
    customer: TypeSales['customer']
    items: TypeSales['items']
    paymentType: TypeSales['paymentType']
    discountType: TypeSales['discountType']
    paymentMethod: TypeSales['paymentMethod']
    total: TypeSales['total']
    query: { [id: string]: boolean }
}