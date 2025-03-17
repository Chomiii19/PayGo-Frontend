import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants/image";
import { useUser } from "../context/userContext";
import formatNumber from "../utils/formatNumber";

const Dropdown = ({
  lists,
  dropDown,
  setDropDown,
  setSelected,
}: {
  lists: string[];
  dropDown: boolean;
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useUser();
  const paymentSourcesAmount = [user?.checkingsBal || 0, user?.savingsBal || 0];

  if (lists.length > 2) {
    return (
      <View
        className="flex flex-col w-full absolute bg-light-black rounded-b-3xl z-10"
        style={{
          bottom: -195,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        {lists.map((list, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setDropDown(!dropDown);
              setSelected(list);
            }}
            className={`flex flex-row justify-between items-center w-full bg-light-black px-4 py-3 ${
              lists.length - 1 === i ? "rounded-b-xl" : ""
            }`}
            style={{
              borderBottomLeftRadius: lists.length - 1 === i ? 12 : 0,
              borderBottomRightRadius: lists.length - 1 === i ? 12 : 0,
            }}
          >
            <View className="flex flex-row items-center gap-2">
              <Image
                source={(icons as Record<string, any>)[list.toLowerCase()]}
                className="h-8 w-8"
              />
              <Text className="text-zinc-200 font-rBold text-lg">{list}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View
      className="flex flex-col w-full absolute bg-light-black rounded-b-3xl z-10"
      style={{
        bottom: -95,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      {lists.map((list, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            setDropDown(!dropDown);
            setSelected(list);
          }}
          className={`flex flex-row justify-between items-center w-full bg-light-black px-4 py-3 ${
            lists.length - 1 === i ? "rounded-b-xl" : ""
          }`}
          style={{
            borderBottomLeftRadius: lists.length - 1 === i ? 12 : 0,
            borderBottomRightRadius: lists.length - 1 === i ? 12 : 0,
          }}
        >
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-zinc-200 font-rBold text-lg">
              {list.charAt(0).toUpperCase() + list.slice(1)}
            </Text>

            <View className="flex flex-row gap-1 items-end">
              <Text className="text-zinc-500 font-rRegular text-xs">
                Balance:
              </Text>
              <Text className="text-zinc-200 font-rBold text-sm">
                ₱{formatNumber(paymentSourcesAmount[i])}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Dropdown;
