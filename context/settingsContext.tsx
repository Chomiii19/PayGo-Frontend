import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface SettingsContextType {
  enableBiometrics: boolean;
  hideAccountNumber: boolean;
  setEnableBiometrics: React.Dispatch<React.SetStateAction<boolean>>;
  setHideAccountNumber: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [enableBiometrics, setEnableBiometrics] = useState(false);
  const [hideAccountNumber, setHideAccountNumber] = useState(true);

  useEffect(() => {
    const fetchSettingsPreference = async () => {
      const settingsStr = await SecureStore.getItemAsync("settingsPreference");

      if (!settingsStr) {
        const defaultSettings = JSON.stringify({
          enableBiometrics,
          hideAccountNumber,
        });

        await SecureStore.setItemAsync("settingsPreference", defaultSettings);
      } else {
        const settings = JSON.parse(settingsStr);
        setEnableBiometrics(settings.enableBiometrics);
        setHideAccountNumber(settings.hideAccountNumber);
      }
    };

    fetchSettingsPreference();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      const settingsToSave = {
        enableBiometrics,
        hideAccountNumber,
      };
      await SecureStore.setItemAsync(
        "settingsPreference",
        JSON.stringify(settingsToSave)
      );
    };

    saveSettings();
  }, [enableBiometrics, hideAccountNumber]);

  return (
    <SettingsContext.Provider
      value={{
        enableBiometrics,
        hideAccountNumber,
        setEnableBiometrics,
        setHideAccountNumber,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useUser must be used within a TransactionProvider");
  return context;
};
