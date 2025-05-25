import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

const AddContacts = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const authToken = await getTokenFromStorage();
      await axios.post(
        "https://paygo-backend-1y0p.onrender.com/api/v1/user/add-contact",
        {
          name,
          contactNumber,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      Alert.alert("Success", "Contact successfully added");

      setContactNumber("");
      setName("");
    } catch (error) {
      console.error("Update error", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View className="flex-1 bg-backgroundColor flex-col">
      <Header name="Add Contact" />

      <View className="px-5 mt-5">
        <Text className="font-mRegular text-zinc-200 mb-1">Contact Number</Text>
        <TextInput
          value={contactNumber}
          onChangeText={setContactNumber}
          className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2"
        />
      </View>

      <View className="px-5 mt-1">
        <Text className="font-mRegular text-zinc-200 mb-1">Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mBold px-[10px] py-1 mb-2"
        />
      </View>

      <View className="px-5 mt-1">
        <TouchableOpacity
          className="bg-primary px-4 py-2 rounded-md mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white font-mBold text-center">Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddContacts;
