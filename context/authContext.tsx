import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  user: any;
  isAuthenticated: boolean | undefined;
  login: () => Promise<void>;
  loginOut: () => Promise<void>;
  register: () => Promise<void>;
};
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    // setTimeout(() => {
    //   setIsAuthenticated(false);
    // }, 2000);
  }, []);

  const login = async () => {
    try {
    } catch (error) {}
  };
  const loginOut = async () => {
    try {
      setIsAuthenticated(false);
      console.log("logged out");
    } catch (error) {
      console.log(error);
    }
  };
  const register = async () => {
    try {
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return value;
};
