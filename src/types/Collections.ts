import { TypeCustomers } from "./Customers";
import { TypeOs } from "./Os";
import { TypePartsServicesProducts } from "./PartsServicesProducts";
import { TypeStores } from "./Stores";
import { TypeTermsAndConditions } from "./TermsAndConditions";
import { TypeUsers } from "./Users";

export const COLLECTIONS = { sales: 'sales', os: 'os', stores: 'stores', customers: 'customers', termsAndConditions: 'termsAndConditions', partsServicesProducts: 'partsServicesProducts', users: 'users' } as const
export type CollectionsNames = keyof typeof COLLECTIONS

export const COLLECTIONS_VIEWS = { _viewSalesList: '_viewSalesList', _viewTermsAndConditionsList: '_viewTermsAndConditionsList', _viewCustomersList: '_viewCustomersList', _viewOsList: '_viewOsList', _viewPartsServicesProductsList: '_viewPartsServicesProductsList', _viewUsersList: '_viewUsersList' } as const
export type CollectionsViewsNames = keyof typeof COLLECTIONS_VIEWS

export type TypeCollections = TypeOs | TypeTermsAndConditions | TypePartsServicesProducts | TypeUsers | TypeCustomers | TypeStores