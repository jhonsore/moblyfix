import { collection as _collection, DocumentData, Firestore, getDocs, limit, orderBy, OrderByDirection, query, QueryConstraint, QueryDocumentSnapshot, QuerySnapshot, startAfter, where, WhereFilterOp } from "firebase/firestore";
import { CollectionsNames, TypeCollections } from "../../types/Collections";

//wheres: [['title', '==', 'teste']]
//order: [['title', 'asc']]
const list = async ({ db, lastDoc, pageSize, collection, wheres, order }: { collection: CollectionsNames, order?: [string, OrderByDirection][], wheres?: [string, WhereFilterOp, any][], db: Firestore, search?: string, pageSize?: number, lastDoc?: QueryDocumentSnapshot<DocumentData> | undefined }) => {
    const queryConstraints: QueryConstraint[] = [orderBy("createdAt", 'desc')]

    if (pageSize) queryConstraints.push(limit(pageSize))
    if (lastDoc) queryConstraints.push(startAfter(lastDoc));
    if (wheres) wheres.map(item => queryConstraints.push(where(...item)))
    if (order) order.map(item => queryConstraints.push(orderBy(...item)))

    const first = query(_collection(db, collection), ...queryConstraints);
    const documentSnapshots: QuerySnapshot<DocumentData> = await getDocs(first);
    const docs: { [id: string]: TypeCollections } = {}
    documentSnapshots.forEach((doc) => {
        docs[doc.id] = { ...doc.data() } as TypeCollections
    });
    return {
        docs,
        lastDoc: documentSnapshots.docs[documentSnapshots.docs.length - 1]
    }
}

export default list