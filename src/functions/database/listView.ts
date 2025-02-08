import { DocumentData, Firestore, collection as _collection, startAfter, limit as _limit, where as _where, OrderByDirection, QueryConstraint, WhereFilterOp, orderBy as _orderBy, QueryDocumentSnapshot, query, QuerySnapshot, getDocs } from "firebase/firestore"
import { CollectionsViewsNames } from "../../types/Collections"

export const listView = <TDoc extends DocumentData>(collection: CollectionsViewsNames) => (
    async ({ wheres, limit, orderBy, lastDocument, db }: { db: Firestore, wheres?: [string, WhereFilterOp, any][], limit?: number, orderBy?: [string, OrderByDirection][], lastDocument?: QueryDocumentSnapshot<DocumentData> | undefined }) => {
        const queryConstraints: QueryConstraint[] = [_orderBy("createdAt", 'desc')]

        if (limit) queryConstraints.push(_limit(limit))
        if (lastDocument) queryConstraints.push(startAfter(lastDocument));
        if (wheres) wheres.map(item => queryConstraints.push(_where(...item)))
        if (orderBy) orderBy.map(item => queryConstraints.push(_orderBy(...item)))

        const first = query(_collection(db, collection), ...queryConstraints);
        const documentSnapshots: QuerySnapshot<DocumentData> = await getDocs(first);
        const docs: { [id: string]: TDoc } = {}
        documentSnapshots.forEach((doc) => {
            docs[doc.id] = { ...doc.data() } as TDoc
        });
        return {
            docs,
            lastDoc: documentSnapshots.docs[documentSnapshots.docs.length - 1]
        }
    })