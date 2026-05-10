import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatarUri?: string;
};

type SignUpDetails = {
  name: string;
  email: string;
  phone: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  user: UserProfile;
  signIn: () => void;
  signOut: () => void;
  signUp: (details: SignUpDetails) => void;
  updateAvatar: (uri: string) => void;
};

const defaultUser: UserProfile = {
  name: "Maria Silva",
  email: "maria@cabocash.com",
  phone: "+238 912 34 56"
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      user,
      signIn: () => setIsAuthenticated(true),
      signOut: () => setIsAuthenticated(false),
      signUp: (details) => {
        setUser((currentUser) => ({ ...currentUser, ...details }));
        setIsAuthenticated(true);
      },
      updateAvatar: (uri) => setUser((currentUser) => ({ ...currentUser, avatarUri: uri }))
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
