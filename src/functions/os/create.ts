import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { PartialWithRequired } from "../../types/Commons"
import { COLLECTIONS } from "../../types/Collections"
import { TypeOs } from "../../types/Os"

const create = async ({ db, data }: { db: Firestore, data: PartialWithRequired<TypeOs, 'devices' | '_headquarterId' | '_storeId'> }) => {
    return await Database.create({ db, data, collection: COLLECTIONS.os })
}

export default create