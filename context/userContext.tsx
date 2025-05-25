import * as Updates from "expo-updates";
import { createContext, useContext, useEffect, useState } from "react";
import IUser from "../@types/userInterfaces";
import axios from "axios";
import getTokenFromStorage from "../utils/getTokenFromStorage";
import * as SecureStore from "expo-secure-store";
import { AppState } from "react-native";

interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  let logoutTimer: NodeJS.Timeout | null = null;

  const fetchUserData = async () => {
    try {
      const authToken = await getTokenFromStorage();
      console.log("AUTHTOKEN:", authToken);
      const res = await axios.get(
        "https://paygo-backend-1y0p.onrender.com/api/v1/user/get-user",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const userData = res.data.data.user;
      setUser(userData);
      console.log("Fetched user:", userData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError("Failed to fetch user");
      console.log("Error fetching user: ", err);
    }
  };

  const resetUser = async () => {
    console.log("User logged out after inactivity");
    setUser(null);
    await Updates.reloadAsync();
  };

  const logout = async () => {
    console.log("Logging out user...");
    await SecureStore.deleteItemAsync("authToken");
    setUser(null);
    await Updates.reloadAsync();
  };

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === "background") {
      console.log("App moved to background, starting logout timer...");
      // @ts-ignore
      logoutTimer = setTimeout(() => {
        resetUser();
      }, 2 * 60 * 1000);
    } else if (nextAppState === "active") {
      if (logoutTimer) {
        console.log("User returned before 2 minutes, canceling logout");
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    }
  };

  useEffect(() => {
    fetchUserData();

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser: fetchUserData, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
