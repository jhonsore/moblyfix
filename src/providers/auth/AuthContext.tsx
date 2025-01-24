import { User } from 'firebase/auth';
import { createContext } from 'react';

export interface IAuthContext {
  user: User | null
  idToken: string
  login: ({ username, password }: { password: string, username: string }) => void
  logout: () => void
}

const AuthContext = createContext<Partial<IAuthContext>>({});

export default AuthContext;
