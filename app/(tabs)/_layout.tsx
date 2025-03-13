import { Tabs, useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { Image } from "react-native";
import {
  back,
  chartLine,
  circleUser,
  house,
  list,
  send,
} from "../../constants/image";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2682FF",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#181818",
          borderTopWidth: 0,
          borderTopColor: "#161616",
          height: 60,
          padding: 0,
          paddingTop: 14,
          width: "70%",
          flexDirection: "row",
          justifyContent: "center",
          bottom: 19,
          borderRadius: 40,
          position: "absolute",
          marginHorizontal: 60,
          elevation: 7,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.8,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarItemStyle: { width: 80 },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={house} color={color} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarItemStyle: { width: 80 },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={chartLine}
              color={color}
              name="Dashboard"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sendTransaction"
        options={{
          title: "SendTransaction",
          headerShown: false,
          tabBarItemStyle: { width: 80 },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={send}
              color={color}
              name="SendTransaction"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactionHistory"
        options={{
          title: "TransactionHistory",
          headerShown: false,
          tabBarItemStyle: { width: 80 },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={list}
              color={color}
              name="TransactionHistory"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarItemStyle: { width: 80 },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={circleUser}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center gap-1 flex-1 w-[5rem]">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
    </View>
  );
};
