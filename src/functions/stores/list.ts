import { DocumentData, Firestore, OrderByDirection, QueryDocumentSnapshot, WhereFilterOp } from "@firebase/firestore"
import Database from "../database"
import { COLLECTIONS } from "../../types/Collections"

const list = async ({ db, lastDoc, pageSize, wheres, order }: { order?: [string, OrderByDirection][], wheres?: [string, WhereFilterOp, any][], db: Firestore, search?: string, pageSize?: number, lastDoc?: QueryDocumentSnapshot<DocumentData> | undefined }) => {
    return await Database.list({ db, collection: COLLECTIONS.stores, lastDoc, pageSize, wheres, order })
}

export default list