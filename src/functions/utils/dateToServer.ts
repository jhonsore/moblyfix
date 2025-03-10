import { Timestamp } from "firebase/firestore";

export default function dateToServer(date: Date) {
    return Timestamp.fromDate(date)
}