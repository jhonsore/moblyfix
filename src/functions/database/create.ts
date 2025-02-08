import { doc, DocumentData, Firestore, collection as _collection, Timestamp, setDoc, WithFieldValue } from "firebase/firestore"
import { CollectionsNames } from "../../types/Collections"
import { TypeDbResponse } from "./TypeDbResponse"

export const create = <TDoc extends DocumentData>(collection: CollectionsNames) => (
    async ({ data, db }: { data: TDoc, db: Firestore }): Promise<TypeDbResponse<TDoc>> => {
        const serviceResult: TypeDbResponse<TDoc> = {
            status: false
        }
        const _data: Partial<TDoc | { _id: string, createdAt: Timestamp }> = { ...data }
        const ref = doc(_collection(db, collection))
        _data._id = ref.id
        _data.createdAt = Timestamp.now()

        try {
            await setDoc(ref, _data as WithFieldValue<DocumentData>)
            serviceResult.status = true
            serviceResult.id = ref.id
            return { status: true, doc: data as TDoc, id: ref.id }
        } catch (error) {
            const _e = error as { message: string }
            return { status: false, error: _e }
        }
    })


