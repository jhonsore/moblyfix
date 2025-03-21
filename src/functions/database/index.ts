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
import { TypeOs, TypeOsViewList } from "../../types/Os"
import { TypePartsServicesProducts, TypePartsServicesProductsViewList } from "../../types/PartsServicesProducts"
import { TypeSales, TypeSalesViewList } from "../../types/Sales"
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
    customers: {
        ...generateDB<TypeCustomers>(COLLECTIONS.customers),
        create: create<PartialWithRequired<TypeCustomers, '_headquarterId' | '_storeId'>>(COLLECTIONS.customers),
    },
    os: {
        ...generateDB<TypeOs>(COLLECTIONS.os),
        create: create<PartialWithRequired<TypeOs, 'customer' | 'product' | '_headquarterId' | '_storeId'>>(COLLECTIONS.os),
    },
    partsServicesProducts: {
        ...generateDB<TypePartsServicesProducts>(COLLECTIONS.partsServicesProducts),
        create: create<PartialWithRequired<TypePartsServicesProducts, 'name' | 'type' | 'costPrice' | 'cashPrice' | 'installmentPrice' | '_headquarterId' | '_storeId'>>(COLLECTIONS.partsServicesProducts),
    },
    sales: {
        ...generateDB<TypeSales>(COLLECTIONS.sales),
        create: create<PartialWithRequired<TypeSales, '_headquarterId' | '_storeId' | 'paymentType' | 'discountType' | 'paymentMethod' | 'signFile' | 'observation' | 'installments' | 'discount'>>(COLLECTIONS.sales),
    },
    stores: {
        ...generateDB<TypeStores>(COLLECTIONS.stores),
        create: create<PartialWithRequired<TypeStores, '_headquarterId' | '_storeId'>>(COLLECTIONS.stores),
    },

    users: generateDB<TypeUsers>(COLLECTIONS.users),
    views: {
        termsAndConditions: generateDBView<TypeTermsAndConditionsViewList>(COLLECTIONS_VIEWS._viewTermsAndConditionsList),
        customers: generateDBView<TypeCustomersViewList>(COLLECTIONS_VIEWS._viewCustomersList),
        os: generateDBView<TypeOsViewList>(COLLECTIONS_VIEWS._viewOsList),
        partsServicesProducts: generateDBView<TypePartsServicesProductsViewList>(COLLECTIONS_VIEWS._viewPartsServicesProductsList),
        sales: generateDBView<TypeSalesViewList>(COLLECTIONS_VIEWS._viewSalesList),
        users: generateDBView<TypeUsersViewList>(COLLECTIONS_VIEWS._viewUsersList),
        stores: generateDBView<TypeStoresViewList>(COLLECTIONS_VIEWS._viewStoresList),
    }
}
