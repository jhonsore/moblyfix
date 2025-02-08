import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeCustomers } from "../../types/Customers"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypeCustomers> }) => {
    return await Database.update({ db, data, id, collection: COLLECTIONS.customers })
}

export default update