import { icons } from "@/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <>
      <View className="h-full">
        <ImageBackground
          source={icons.background}
          resizeMode="cover"
          className="h-full"
          blurRadius={2}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,1)"]}
            className="absolute left-0 right-0 top-0 h-full"
          />
          <View className="flex-1 items-center justify-center">
            <Image
              source={icons.frontpage}
              className="mb-[-20px] h-[200px] w-[200px]"
              resizeMode="contain"
            />
            <View className="mt-2 flex-row">
              <Text className="font-iextrabold text-4xl text-white">
                Recycle
              </Text>
              <Text className="font-iextrabold text-4xl text-primary">Lah</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => router.push("/sign-in")}
                className="m-auto mt-[80px] h-[54px] w-[315px] justify-center rounded-2xl border-[1px] border-white bg-gray-50/30 p-2"
              >
                <Text className="text-center font-imedium text-base text-white">
                  Continue with Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <StatusBar style="dark" />
    </>
  );
}
