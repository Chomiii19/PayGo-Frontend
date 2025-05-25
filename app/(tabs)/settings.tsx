import { View, Text, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import { useSettings } from "../../context/settingsContext";

const Settings = () => {
  const {
    enableBiometrics,
    hideAccountNumber,
    setEnableBiometrics,
    setHideAccountNumber,
  } = useSettings();

  return (
    <View className="flex-1 bg-backgroundColor flex-col">
      <Header name="Security Settings" />

      <View className="w-full flex flex-row justify-between items-center px-5">
        <Text
          className={`font-mBold ${
            enableBiometrics ? "text-zinc-200" : "text-zinc-600"
          }`}
        >
          Enable Fingerprint Authentication
        </Text>
        <Switch
          trackColor={{ false: "#444", true: "#2682FF" }}
          thumbColor={enableBiometrics ? "#2682FF" : "#ccc"}
          onValueChange={() => setEnableBiometrics((prev) => !prev)}
          value={enableBiometrics}
        />
      </View>

      <View className="w-full flex flex-row justify-between items-center px-5">
        <Text
          className={`font-mBold ${
            enableBiometrics ? "text-zinc-200" : "text-zinc-600"
          }`}
        >
          Hide Account Number
        </Text>
        <Switch
          trackColor={{ false: "#444", true: "#2682FF" }}
          thumbColor={hideAccountNumber ? "#2682FF" : "#ccc"}
          onValueChange={() => setHideAccountNumber((prev) => !prev)}
          value={hideAccountNumber}
        />
      </View>

      <View className="w-full flex flex-row justify-between mt-2 items-center px-5">
        <Text className={`font-mBold text-zinc-200`}>Delete My Account</Text>
        <TouchableOpacity className="border px-2 py-0.5 rounded-full border-red-500 bg-red-500/10">
          <Text className="text-xs font-mSemibold font-bold text-red-500">
            DELETE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
