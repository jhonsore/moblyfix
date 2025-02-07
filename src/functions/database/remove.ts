import { collection as _collection, doc, Firestore, deleteDoc } from "@firebase/firestore";
import { CollectionsNames } from "../../types/Collections";

const remove = async ({ db, id, collection }: { id: string, collection: CollectionsNames, db: Firestore }) => {
    const ref = doc(db, collection, id)
    try {
        await deleteDoc(ref);
        return { status: true }
    } catch (error) {
        const _e = error as { message: string }
        return { status: false, error: _e }
    }

}

export default remove