import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"
import { COLLECTIONS } from "../../types/Collections"
import { TypeStores } from "../../types/Stores"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypeStores> }) => {
    return await Database.update({ db, data, id, collection: COLLECTIONS.stores })
}

export default update