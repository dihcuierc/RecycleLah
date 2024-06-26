import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { History, Profile } from "@/constants/data";
import {
  getCurrentUser,
  getUserHistory,
  getUserRedeem,
} from "@/lib/useSupabase";

type GlobalContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<Profile | null>>;
  isLoading: boolean;
  refetch: () => Promise<void>;
  history: History[];
  setHistory: React.Dispatch<React.SetStateAction<History[]>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<History[]>([]);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    try {
      const history = await getUserHistory();
      setHistory(history);
    } catch (error) {}
  };

  useEffect(() => {
    checkUser();
  }, []);

  const refetch = () => checkUser();

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        refetch,
        history,
        setHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
