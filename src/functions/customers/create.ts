import { Firestore } from "@firebase/firestore"
import Database from "../_database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeCustomers } from "../../types/Customers"

type IData = Omit<TypeCustomers, '_id' | 'createdAt'>

const create = async ({ db, data }: { db: Firestore, data: IData }) => {
    return await Database.create({ db, data, collection: COLLECTIONS.customers })
}

export default create