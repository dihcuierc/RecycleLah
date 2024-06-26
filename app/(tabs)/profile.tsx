import Header from "@/components/Header";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Feather,
  Entypo,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { signOut } from "@/lib/useSupabase";
import { useGlobalContext } from "@/context/GlobalProvider";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/base";

type Profile = {
  id: string;
  username: string;
  points: number;
  level: number;
  CO2: number;
  Energy: number;
};

const Profile = () => {
  const { user } = useGlobalContext();

  const accountSettings = [
    {
      id: 1,
      name: "Change Address",
      icon: <Entypo name="location" size={20} color="black" />,
    },
    {
      id: 2,
      name: "Invite Friends",
      icon: <FontAwesome5 name="user-friends" size={20} color="black" />,
    },
    {
      id: 3,
      name: "Reward History",
      icon: <Ionicons name="ticket-outline" size={20} color="black" />,
    },
    {
      id: 4,
      name: "Deposit History",
      icon: <Entypo name="trash" size={20} color="black" />,
    },
  ];

  const settings = [
    {
      id: 1,
      name: "Settings",
      icon: <AntDesign name="setting" size={20} color="black" />,
    },
    {
      id: 2,
      name: "Notifications",
      icon: <Ionicons name="notifications" size={20} color="black" />,
    },
    {
      id: 3,
      name: "Language",
      icon: <Feather name="globe" size={20} color="black" />,
    },
  ];

  const onSignOut = async () => {
    await signOut();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Logged out successfully",
      position: "bottom",
    });
    router.replace("/sign-in");
  };

  if (!user) return <Skeleton></Skeleton>;

  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <Header>
        <View className="flex-row items-center justify-center">
          <Text className="font-imedium text-lg text-white">Profile</Text>
        </View>
      </Header>
      <View className="p-5">
        <View className="mb-2 h-[80px] items-center justify-center">
          <View className="h-full w-full flex-row items-center rounded-3xl border-2 bg-white">
            <Image
              src={`${user.avatar_url}`}
              className="mx-2 h-14 w-14 rounded-full"
            />
            <Text className="font-ibold text-xl text-black">
              {user?.username}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-iregular text-lg text-black">My Account</Text>
          <View className="rounded-2xl border-2 border-[#D8D8D8] bg-white p-2">
            {accountSettings.map((item) => (
              <TouchableOpacity
                className="mb-2 flex-row items-center justify-between"
                key={item.id}
                onPress={() => router.push("rewardHistory")}
              >
                <View className="flex-row items-center">
                  {item.icon}
                  <View className="border-bottom-2 border-[#D8D8D8]">
                    <Text className="text-md font-iregular text-black">
                      {item.name}
                    </Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="font-iregular text-lg text-black">Settings</Text>
          <View className="rounded-2xl border-2 border-[#D8D8D8] bg-white p-2">
            {settings.map((item) => (
              <Pressable
                className="mb-2 flex-row items-center justify-between"
                key={item.id}
                onPress={() => router.push("rewardHistory")}
              >
                <View className="flex-row items-center">
                  {item.icon}
                  <View className="border-bottom-2 border-[#D8D8D8]">
                    <Text className="text-md font-iregular text-black">
                      {item.name}
                    </Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color="black" />
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable
          className="h-[100px] w-full items-center justify-center"
          onPress={() => onSignOut()}
        >
          <Text className="font-ibold text-xl text-black">Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
