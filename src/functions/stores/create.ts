import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { COLLECTIONS } from "../../types/Collections"
import { TypeStores } from "../../types/Stores"

type IData = Omit<TypeStores, '_id' | 'createdAt'>

const create = async ({ db, data }: { db: Firestore, data: IData }) => {
    return await Database.create({ db, data, collection: COLLECTIONS.stores })
}

export default create