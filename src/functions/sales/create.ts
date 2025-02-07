import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeSales } from "../../types/Sales"

type IData = Omit<TypeSales, '_id' | 'createdAt'>

const create = async ({ db, data }: { db: Firestore, data: IData }) => {
    return await Database.create({ db, data, collection: COLLECTIONS.sales })
}

export default create