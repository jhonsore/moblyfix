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
    type: 'part' | 'service' | 'product'// define se o item é um produto
}

export type TypePartsServicesProductsViewList = {
    _id: TypePartsServicesProducts['_id']
    name: TypePartsServicesProducts['name']
    cashPrice: TypePartsServicesProducts['cashPrice']
    installmentPrice: TypePartsServicesProducts['installmentPrice']
    costPrice: TypePartsServicesProducts['costPrice']
    _headquarterId: TypePartsServicesProducts['_headquarterId']
    _storeId: TypePartsServicesProducts['_storeId']
    type: TypePartsServicesProducts['type']
    createdAt: TypePartsServicesProducts['createdAt']
    query: { [id: string]: boolean }
}