import { createContext } from 'react';
import { TypeStores } from '../../types/Stores';

export interface IStoresContext {
  stores: { [id: string]: TypeStores }
  store: TypeStores | undefined
  setStore: React.Dispatch<React.SetStateAction<TypeStores | undefined>>
}

const StoresContext = createContext<Partial<IStoresContext>>({});

export default StoresContext;
