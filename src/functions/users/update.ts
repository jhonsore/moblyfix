import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeUsers } from "../../types/Users"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypeUsers> }) => {
    return await Database.update({ db, data, id, collection: COLLECTIONS.users })
}

export default update