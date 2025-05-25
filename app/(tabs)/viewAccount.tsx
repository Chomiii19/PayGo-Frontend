import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import { icons, images } from "../../constants/image";
import { useRouter } from "expo-router";
import axios from "axios";

const ViewAccount = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <View className="flex-1 bg-backgroundColor flex-col">
      <Header isEdit={isEdit} setIsEdit={setIsEdit} />

      <BasicInformation isEdit={isEdit} setIsEdit={setIsEdit} />
    </View>
  );
};

function Header({
  isEdit,
  setIsEdit,
}: {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <View className="w-full  justify-between items-center flex flex-row fixed py-2 px-3  border-b border-b-zinc-800 mb-2">
      <TouchableOpacity className="z-10" onPress={() => router.back()}>
        <Image source={icons.back} />
      </TouchableOpacity>

      <View className="absolute flex items-center w-full">
        <Text className="font-mBold text-zinc-200 text-lg">Your Account</Text>
      </View>

      <TouchableOpacity
        onPress={() => setIsEdit(!isEdit)}
        className={`px-2 rounded-md flex flex-row items-center gap-1 ${
          isEdit ? "bg-red-500" : "bg-primary"
        }`}
      >
        <Text className="text-zinc-200 font-mBold text-sm">
          {isEdit ? "Cancel" : "Edit"}
        </Text>
        <Image className="w-4 h-4" source={icons.pen} />
      </TouchableOpacity>
    </View>
  );
}

function BasicInformation({
  isEdit,
  setIsEdit,
}: {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!user)
    return (
      <View className="flex-1 bg-backgroundColor justify-center items-center">
        <Image source={icons.icon} className="w-16 h-16" />
      </View>
    );

  const handleUpdate = async () => {
    try {
      await axios.patch(
        "https://paygo-backend-1y0p.onrender.com/api/v1/user/update",
        {
          name,
          email,
          password,
        }
      );
      Alert.alert("Success", "Account successfully updated");
      setIsEdit(false);
    } catch (error) {
      console.error("Update error", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View className="px-5">
      <View className="flex w-full items-center justify-center">
        {user?.profilePictureUrl ? (
          <Image className="h-44 w-44 rounded-full" source={images.profile} />
        ) : (
          <View className="h-44 w-44 rounded-full bg-lighter-black flex items-center justify-center">
            <Text className="font-mBold text-zinc-200 text-5xl">
              {user?.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <Text className="font-mRegular text-zinc-200">Name</Text>
      {isEdit ? (
        <TextInput
          value={name}
          onChangeText={setName}
          className="w-48 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2"
        />
      ) : (
        <Text className="w-48 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2">
          {name}
        </Text>
      )}

      <Text className="font-mRegular text-zinc-200">Email</Text>
      {isEdit ? (
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2"
        />
      ) : (
        <Text className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2">
          {email}
        </Text>
      )}

      <Text className="font-mRegular text-zinc-200">Password</Text>
      {isEdit ? (
        <View className="relative w-52 flex justify-center">
          <TextInput
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            className="w-52 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2"
          />

          <TouchableOpacity
            className="absolute right-2"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Image
              source={showPassword ? icons.eyeOff : icons.eye}
              className="h-6 w-6 opacity-80"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="w-52 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2">
          *************
        </Text>
      )}

      {isEdit && (
        <TouchableOpacity
          className="bg-primary px-4 py-2 rounded-md mt-4"
          onPress={handleUpdate}
        >
          <Text className="text-white font-mBold text-center">
            Save Changes
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ViewAccount;
