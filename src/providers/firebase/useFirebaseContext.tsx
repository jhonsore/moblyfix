import { useContext } from "react";
import { FirebaseContext } from "./FirebaseProvider";

export const useFirebaseContext = () => useContext(FirebaseContext);