import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { COLLECTIONS } from "../../types/Collections"

const read = async ({ db, id }: { db: Firestore, id: string }) => {
    return await Database.read({ db, id, collection: COLLECTIONS.termsAndConditions })
}

export default read