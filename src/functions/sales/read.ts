import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { COLLECTIONS } from "../../types/Collections"

const read = async ({ db, id }: { db: Firestore, id: string }) => {
    return await Database.read({ db, id, collection: COLLECTIONS.sales })
}

export default read