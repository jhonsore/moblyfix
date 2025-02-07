import { Firestore } from "@firebase/firestore"
import Database from "../database"

const remove = async ({ db, id }: { id: string, db: Firestore }) => {
    return await Database.delete({ db, id, collection: 'termsAndConditions' })
}

export default remove