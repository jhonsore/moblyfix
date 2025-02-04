import { collection as _collection, doc, Firestore, updateDoc } from "@firebase/firestore";
import { CollectionsNames, TypeCollections } from "../../types/Collections";

const update = async ({ db, id, data, collection }: { id: string, collection: typeof CollectionsNames, db: Firestore, data: Partial<TypeCollections> }) => {
    const ref = doc(db, collection, id)
    try {
        await updateDoc(ref, data)
        return { status: true }
    } catch (error) {
        const _e = error as { message: string }
        return { status: false, error: _e }
    }

}

export default update