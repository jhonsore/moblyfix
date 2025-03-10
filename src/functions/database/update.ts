import { doc, DocumentData, Firestore, updateDoc, WithFieldValue } from "firebase/firestore"
import { CollectionsNames } from "../../types/Collections"
import { TypeDbResponse } from "./TypeDbResponse"

export const update = <TDoc extends DocumentData>(collection: CollectionsNames) => (
    async ({ id, data, db }: { db: Firestore, id: string, data: Partial<TDoc> }): Promise<TypeDbResponse<TDoc>> => {
        const ref = doc(db, collection, id)

        try {
            await updateDoc(ref, data as WithFieldValue<DocumentData>)
            return { status: true }
        } catch (error) {
            const _e = error as { message: string }
            return { status: false, error: _e }
        }

    })