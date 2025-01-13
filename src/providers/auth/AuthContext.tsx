import { createContext } from 'react';

export interface IAuthContext {
  user: null | number
}

const AuthContext = createContext<Partial<IAuthContext>>({});

export default AuthContext;
