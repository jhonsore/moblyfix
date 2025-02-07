import { Timestamp } from "firebase/firestore"

export type TypePartsServicesProducts = {
    _id: string
    name: string
    cashPrice: number // preço a vista
    installmentPrice: number // preço a prazo
    costPrice: number // preço de custo
    _headquarterId: string
    _storeId: string
    createdAt: Timestamp
    isProduct: boolean// define se o item é um produto
}