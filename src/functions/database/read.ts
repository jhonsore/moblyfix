import { collection as _collection, doc, Firestore, getDoc } from "@firebase/firestore";
import { CollectionsNames } from "../../types/Collections";

const read = async ({ db, id, collection }: { id: string, collection: typeof CollectionsNames, db: Firestore }) => {
    const ref = doc(db, collection, id)
    try {
        const data = await getDoc(ref)
        return { status: true, data: data.data() }
    } catch (error) {
        const _e = error as { message: string }
        return { status: false, error: _e }
    }

}

export default read