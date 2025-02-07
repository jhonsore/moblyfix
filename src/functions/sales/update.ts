import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeSales } from "../../types/Sales"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypeSales> }) => {
    return await Database.update({ db, data, id, collection: COLLECTIONS.sales })
}

export default update