import { deleteDoc, doc, DocumentData, Firestore } from "firebase/firestore"
import { CollectionsNames } from "../../types/Collections"
import { TypeDbResponse } from "./TypeDbResponse"

export const del = <TDoc extends DocumentData>(collection: CollectionsNames) => (
    async ({ id, db }: { id: string, db: Firestore }): Promise<TypeDbResponse<TDoc>> => {
        const ref = doc(db, collection, id)
        try {
            await deleteDoc(ref);
            return { status: true }
        } catch (error) {
            const _e = error as { message: string }
            return { status: false, error: _e }
        }
    })