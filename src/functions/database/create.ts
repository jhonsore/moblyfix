import { collection as _collection, doc, Firestore, setDoc, Timestamp } from "@firebase/firestore";
import { CollectionsNames, TypeCollections } from "../../types/Collections";

const create = async ({ db, data, collection }: { collection: typeof CollectionsNames, db: Firestore, data: Partial<TypeCollections> }) => {
    const ref = doc(_collection(db, collection))
    data._id = ref.id
    data.createdAt = Timestamp.now()

    try {
        await setDoc(ref, data)
        return { status: true }
    } catch (error) {
        const _e = error as { message: string }
        return { status: false, error: _e }
    }

}

export default create