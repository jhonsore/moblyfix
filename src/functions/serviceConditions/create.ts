import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"

const create = ({ db, data }: { db: Firestore, data: TypeTermsAndConditions }) => {
    return Database.create({ db, data, collection: 'termsAndConditions' })
}

export default create