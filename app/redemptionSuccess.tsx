import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function RedemptionSuccess() {
  const { name, points, totalPoints } = useLocalSearchParams();

  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <View className="h-full bg-primary">
        <Header>
          <View className="h-full justify-end">
            <BackButton route="/home" />
          </View>
        </Header>
        <View className="m-5 mt-10 h-[40%] items-center justify-center rounded-2xl bg-white">
          <Feather name="check-circle" size={100} color="black" />
          <Text className="mb-2 mt-5 font-ibold text-xl text-black">
            {points} points claimed
          </Text>
          <Text className="text-md font-iregular text-black">
            Redemption Successful
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
