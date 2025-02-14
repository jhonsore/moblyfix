import { useContext } from "react";
import StoresContext from "./StoresContext";

export const useStoresContext = () => useContext(StoresContext);