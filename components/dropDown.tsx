import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants/image";

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
};

export default Dropdown;
