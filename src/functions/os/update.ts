import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeOs } from "../../types/Os"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypeOs> }) => {
    return await Database.update({ db, data, id, collection: COLLECTIONS.os })
}

export default update