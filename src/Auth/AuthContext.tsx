import * as React from 'react';

export interface IAuthContext {
  logged: boolean;
  token: string | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  logged: false,
  token: null
});
