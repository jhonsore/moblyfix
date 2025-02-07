import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { PartialWithRequired } from "../../types/Commons"
import { TypePartsServicesProducts } from "../../types/PartsServicesProducts"
import { COLLECTIONS } from "../../types/Collections"


const create = async ({ db, data }: { db: Firestore, data: PartialWithRequired<TypePartsServicesProducts, 'name' | 'costPrice' | 'cashPrice' | 'installmentPrice' | '_headquarterId' | '_storeId'> }) => {
    return await Database.create({ db, data, collection: COLLECTIONS.partsServicesProducts })
}

export default create