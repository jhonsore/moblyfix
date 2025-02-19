import { DocumentData } from "firebase/firestore"
import { COLLECTIONS, COLLECTIONS_VIEWS, CollectionsNames, CollectionsViewsNames } from "../../types/Collections"
import { TypeTermsAndConditions, TypeTermsAndConditionsViewList } from "../../types/TermsAndConditions"
import { create } from "./create"
import { del } from "./del"
import { update } from "./update"
import { read } from "./read"
import { list } from "./list"
import { listView } from "./listView"
import { TypeCustomers, TypeCustomersViewList } from "../../types/Customers"
import { TypeOs } from "../../types/Os"
import { TypePartsServicesProducts, TypePartsServicesProductsViewList } from "../../types/PartsServicesProducts"
import { TypeSales } from "../../types/Sales"
import { TypeStores, TypeStoresViewList } from "../../types/Stores"
import { TypeUsers, TypeUsersViewList } from "../../types/Users"
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
    termsAndConditions: {
        ...generateDB<TypeTermsAndConditions>(COLLECTIONS.termsAndConditions),
        create: create<PartialWithRequired<TypeTermsAndConditions, 'title' | 'text' | '_headquarterId' | '_storeId'>>(COLLECTIONS.termsAndConditions),
    },
    customers: generateDB<TypeCustomers>(COLLECTIONS.customers),
    os: generateDB<TypeOs>(COLLECTIONS.os),
    partsServicesProducts: {
        ...generateDB<TypePartsServicesProducts>(COLLECTIONS.partsServicesProducts),
        create: create<PartialWithRequired<TypePartsServicesProducts, 'name' | 'type' | 'costPrice' | 'cashPrice' | 'installmentPrice' | '_headquarterId' | '_storeId'>>(COLLECTIONS.partsServicesProducts),
    },
    sales: generateDB<TypeSales>(COLLECTIONS.sales),
    stores: generateDB<TypeStores>(COLLECTIONS.stores),
    users: {
        ...generateDB<TypeUsers>(COLLECTIONS.users),
        create: create<PartialWithRequired<TypeUsers, '_headquarterId' | '_storeId'>>(COLLECTIONS.users),
    },
    views: {
        termsAndConditions: generateDBView<TypeTermsAndConditionsViewList>(COLLECTIONS_VIEWS._viewTermsAndConditionsList),
        customers: generateDBView<TypeCustomersViewList>(COLLECTIONS_VIEWS._viewCustomersList),
        os: generateDBView<TypeOs>(COLLECTIONS_VIEWS._viewOsList),
        partsServicesProducts: generateDBView<TypePartsServicesProductsViewList>(COLLECTIONS_VIEWS._viewPartsServicesProductsList),
        sales: generateDBView<TypeSales>(COLLECTIONS_VIEWS._viewSalesList),
        users: generateDBView<TypeUsersViewList>(COLLECTIONS_VIEWS._viewUsersList),
        stores: generateDBView<TypeStoresViewList>(COLLECTIONS_VIEWS._viewStoresList),
    }
}
