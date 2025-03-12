import { ParsedToken, User } from 'firebase/auth';
import { createContext } from 'react';
import { TypeUsers } from '../../types/Users';

export interface IAuthContext {
  user: { user: User, data: TypeUsers } | null
  idToken: string
  claims: ParsedToken
  login: ({ username, password }: { password: string, username: string }) => void
  logout: () => void
}

const AuthContext = createContext<Partial<IAuthContext>>({});

export default AuthContext;
