import { createContext } from 'react';
import { TypeStoresViewList } from '../../types/Stores';

export interface IStoresContext {
  stores: { [id: string]: TypeStoresViewList }
  store: TypeStoresViewList | undefined
  setStore: React.Dispatch<React.SetStateAction<TypeStoresViewList | undefined>>
}

const StoresContext = createContext<Partial<IStoresContext>>({});

export default StoresContext;
