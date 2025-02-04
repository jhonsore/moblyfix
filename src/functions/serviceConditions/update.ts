import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"

const update = async ({ db, data, id }: { id: string, db: Firestore, data: Partial<TypeTermsAndConditions> }) => {
    return await Database.update({ db, data, id, collection: 'termsAndConditions' })
}

export default update