import * as SecureStore from "expo-secure-store";

const getTokenFromStorage = async () => {
  const token = await SecureStore.getItemAsync("authToken");
  return token;
};

export default getTokenFromStorage;
