import { createContext } from 'react';
import { TypeOs } from '../../../types/Os';
import { TypePageStatus } from '../../../types/PageStatus';

export interface IOsContext {
  os: TypeOs | undefined
  setOs: React.Dispatch<React.SetStateAction<TypeOs | undefined>>
  pageStatus: TypePageStatus
}

const StoresContext = createContext<Partial<IOsContext>>({});

export default StoresContext;
