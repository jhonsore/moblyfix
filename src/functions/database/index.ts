import { DocumentData } from "firebase/firestore"
import { COLLECTIONS, COLLECTIONS_VIEWS, CollectionsNames, CollectionsViewsNames } from "../../types/Collections"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"
import { create } from "./create"
import { del } from "./del"
import { update } from "./update"
import { read } from "./read"
import { list } from "./list"
import { listView } from "./listView"
import { TypeCustomers } from "../../types/Customers"
import { TypeOs } from "../../types/Os"
import { TypePartsServicesProducts } from "../../types/PartsServicesProducts"
import { TypeSales } from "../../types/Sales"
import { TypeStores } from "../../types/Stores"
import { TypeUsers } from "../../types/Users"
import { PartialWithRequired } from "../../types/Commons"

const generateDB = <TDoc extends DocumentData>(collection: CollectionsNames) => ({
    create: create<TDoc>(collection),
    delete: del<TDoc>(collection),
    update: update<TDoc>(collection),
    read: read<TDoc>(collection),
    list: list<TDoc>(collection)
})

const generateDBView = <TDoc extends DocumentData>(collection: CollectionsViewsNames) => ({
    list: listView<TDoc>(collection)
})
export const DB = {
    termsAndConditions: generateDB<PartialWithRequired<TypeTermsAndConditions, 'title' | 'text' | '_headquarterId' | '_storeId'>>(COLLECTIONS.termsAndConditions),
    customers: generateDB<Omit<TypeCustomers, '_id' | 'createdAt'>>(COLLECTIONS.customers),
    os: generateDB<PartialWithRequired<TypeOs, 'devices' | '_headquarterId' | '_storeId'>>(COLLECTIONS.os),
    partsServicesProducts: generateDB<PartialWithRequired<TypePartsServicesProducts, 'name' | 'costPrice' | 'cashPrice' | 'installmentPrice' | '_headquarterId' | '_storeId'>>(COLLECTIONS.partsServicesProducts),
    sales: generateDB<Omit<TypeSales, '_id' | 'createdAt'>>(COLLECTIONS.sales),
    stores: generateDB<Omit<TypeStores, '_id' | 'createdAt'>>(COLLECTIONS.stores),
    users: generateDB<Omit<TypeUsers, '_id' | 'createdAt'>>(COLLECTIONS.users),
    views: {
        termsAndConditions: generateDBView<TypeTermsAndConditions>(COLLECTIONS_VIEWS._viewTermsAndConditionsList),
        customers: generateDBView<TypeCustomers>(COLLECTIONS_VIEWS._viewCustomersList),
        os: generateDBView<TypeOs>(COLLECTIONS_VIEWS._viewOsList),
        partsServicesProducts: generateDBView<TypePartsServicesProducts>(COLLECTIONS_VIEWS._viewPartsServicesProductsList),
        sales: generateDBView<TypeSales>(COLLECTIONS_VIEWS._viewSalesList),
        users: generateDBView<TypeUsers>(COLLECTIONS_VIEWS._viewUsersList),
    }
}
