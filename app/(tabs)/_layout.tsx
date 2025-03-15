import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Image } from "react-native";
import { icons } from "../../constants/image";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2682FF",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#16171B",
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
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarItemStyle: { width: 80 },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.house}
              color={color}
              name="Home"
              focused={focused}
            />
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
              icon={icons.chartLine}
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
              icon={icons.send}
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
              icon={icons.list}
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
              icon={icons.circleUser}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="buyLoad"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="payBills"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="transactionDetails"
        options={{ href: null, headerShown: false }}
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
    <View className="items-center justify-center gap-1 flex-1 w-[5rem] relative">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
      {focused ? (
        <Image
          source={icons.dot}
          tintColor={color}
          className="w-7 h-7 absolute -bottom-4"
        />
      ) : (
        <></>
      )}
    </View>
  );
};
