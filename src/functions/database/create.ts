import { collection as _collection, doc, Firestore, setDoc } from "@firebase/firestore";
import { CollectionsNames, TypeCollections } from "../../types/Collections";

const create = async ({ db, data, collection }: { collection: typeof CollectionsNames, db: Firestore, data: TypeCollections }) => {
    const ref = doc(_collection(db, collection))
    data._id = ref.id
    return await setDoc(ref, data)
}

export default create