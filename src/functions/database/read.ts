import { doc, DocumentData, Firestore, getDoc } from "firebase/firestore"
import { CollectionsNames } from "../../types/Collections"
import { TypeDbResponse } from "./TypeDbResponse"

export const read = <TDoc extends DocumentData>(collection: CollectionsNames) => (
    async ({ id, db }: { id: string, db: Firestore }): Promise<TypeDbResponse<TDoc>> => {
        const ref = doc(db, collection, id)
        try {
            const data = await getDoc(ref)
            return { status: true, doc: data.data() as TDoc }
        } catch (error) {
            const _e = error as { message: string }
            return { status: false, error: _e }
        }
    })