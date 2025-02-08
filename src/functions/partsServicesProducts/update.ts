import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { COLLECTIONS } from "../../types/Collections"
import { TypePartsServicesProducts } from "../../types/PartsServicesProducts"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypePartsServicesProducts> }) => {
    return await Database.update({ db, data, id, collection: COLLECTIONS.partsServicesProducts })
}

export default update