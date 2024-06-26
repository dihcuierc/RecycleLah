import { Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabBar = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 2,
          borderTopColor: "#E5E5E5",
          display: route.name === "camera" ? "none" : "flex",
        },
        tabBarActiveTintColor: "#005629",
        tabBarInactiveTintColor: "#005629",
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="binlocation"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          tabBarShowLabel: false,
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View className="mb-[20px] h-[70px] w-[70px] items-center justify-center rounded-full border border-2 border-[#E5E5E5] bg-white shadow-sm shadow-black">
              <Ionicons
                name={focused ? "camera" : "camera-outline"}
                size={50}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="challenge"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "podium" : "podium-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};
const StackLayout = () => {
  return (
    <>
      {/* <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="location" options={{ headerShown: false }} />
        <Stack.Screen name="challenge" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack> */}
      <TabBar />
      <StatusBar backgroundColor="#fff" style="dark" />
    </>
  );
};

export default StackLayout;
