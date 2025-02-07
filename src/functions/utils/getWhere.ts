import { where } from "firebase/firestore"
import { getQuery } from "./getQuery"

export const getWhere = (value:string) => {
    return Object.keys(getQuery(value)).map(key => where(`query.${key}`, '==', true))
}