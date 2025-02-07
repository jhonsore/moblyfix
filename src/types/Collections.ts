import { TypeCustomers } from "./Customers";
import { TypeOs } from "./Os";
import { TypePartsServicesProducts } from "./PartsServicesProducts";
import { TypeStores } from "./Stores";
import { TypeTermsAndConditions } from "./TermsAndConditions";
import { TypeUsers } from "./Users";

export const COLLECTIONS = { sales: 'sales', os: 'os', stores: 'stores', customers: 'customers', termsAndConditions: 'termsAndConditions', partsServicesProducts: 'partsServicesProducts', users: 'users' } as const
export type CollectionsNames = keyof typeof COLLECTIONS
export type TypeCollections = TypeOs | TypeTermsAndConditions | TypePartsServicesProducts | TypeUsers | TypeCustomers | TypeStores