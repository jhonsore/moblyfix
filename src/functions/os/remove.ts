import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { COLLECTIONS } from "../../types/Collections"

const remove = async ({ db, id }: { id: string, db: Firestore }) => {
    return await Database.delete({ db, id, collection: COLLECTIONS.os })
}

export default remove