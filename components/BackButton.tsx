import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { icons } from "@/constants";

const BackButton = ({ route }: { route?: string }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (route) router.replace(route, );
        else if (router.canGoBack()) router.back();
        else router.replace("/");
      }}
    >
      <View className="h-[50px] w-[50px] items-center justify-center">
        <Image
          source={icons.backarrow}
          className="h-[100%] w-[100%]"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
