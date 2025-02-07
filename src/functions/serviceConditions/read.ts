import { Firestore } from "@firebase/firestore"
import Database from "../database"


const read = async ({ db, id }: { db: Firestore, id: string }) => {
    return await Database.read({ db, id, collection: 'termsAndConditions' })
}

export default read