import { Firestore } from "@firebase/firestore"
import Database from "../database"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"
import { PartialWithRequired } from "../../types/Commons"


const create = async ({ db, data }: { db: Firestore, data: PartialWithRequired<TypeTermsAndConditions, 'title' | 'text' | '_headquarterId' | '_storeId'> }) => {
    return await Database.create({ db, data, collection: 'termsAndConditions' })
}

export default create