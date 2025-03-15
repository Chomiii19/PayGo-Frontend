import { useRouter } from "expo-router";
import { Image, Pressable, View, Text } from "react-native";
import { icons } from "../constants/image";

export default function Header({ name }: { name: string }) {
  const router = useRouter();
  return (
    <View className="w-full  justify-between items-center flex flex-row fixed py-2 px-2 border-b border-b-zinc-800">
      <Pressable className="z-10" onPress={() => router.back()}>
        <Image source={icons.back} />
      </Pressable>

      <View className="absolute flex items-center w-full">
        <Text className="font-mBold text-zinc-200 text-lg">{name}</Text>
      </View>

      <Pressable className="z-10">
        <Image className="w-10 h-10" source={icons.ellipsis} />
      </Pressable>
    </View>
  );
}
