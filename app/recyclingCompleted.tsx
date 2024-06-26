import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";
import { Feather } from "@expo/vector-icons";
import { icons } from "@/constants";
import { wasteStats } from "@/constants/data";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { updateHistory } from "@/lib/useSupabase";
import { useGlobalContext } from "@/context/GlobalProvider";

const summary = { id: 1, recycling: "Textile", contribution: 1.2 };

export default function RecyclingCompleted() {
  const { location, rate, collecting, capacity } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const waste = wasteStats.filter((waste) => waste.name === collecting);
  const totalPoints = parseFloat(
    (summary.contribution * Number(rate)).toFixed(2)
  );

  useEffect(() => {
    updateHistory(
      location as string,
      new Date(),
      summary.contribution,
      collecting as string,
      totalPoints,
      Number(rate),
      user?.id as string
    );
  }, []);

  return (
    <SafeAreaView
      className="h-full bg-primary"
      edges={["right", "left", "top"]}
    >
      <View className="m-5 mt-10 h-[50px]">
        <BackButton route="/home" />
      </View>
      <View className="h-full">
        <View className="w-full items-center justify-center">
          <View className="w-[90%] rounded-xl bg-white p-2">
            <View className="items-center pt-3">
              <Feather name="check-circle" size={100} color="black" />
              <Text className="w-[80%] border-b-2 border-[#D8D8D8] pb-5 text-center font-ibold text-xl">
                Thank you for recycling!
              </Text>
            </View>
            <View className="h-[200px]">
              <Text className="mb-2 mt-2 font-ibold text-lg opacity-40">
                Summary:
              </Text>
              <View className="flex-row">
                <Text className="text-md font-iregular text-black">
                  Recycling:{" "}
                </Text>
                <Text
                  className="text-md font-ibold text-black"
                  style={{ color: waste[0].color }}
                >
                  {collecting}
                </Text>
                <Image
                  source={waste[0].icon}
                  resizeMode="contain"
                  className="ml-1 h-5 w-5"
                />
              </View>
              <View className="flex-row">
                <Text className="text-md font-iregular text-black">
                  Exchange Rate:{" "}
                </Text>
                <Text className="text-md font-ibold text-primary-100">
                  {rate}
                </Text>
                <Image
                  source={icons.sprouticon}
                  resizeMode="contain"
                  className="h-5 w-5"
                />
                <Text className="text-md font-ibold text-primary-100">/KG</Text>
              </View>
              <View className="flex-row">
                <Text className="text-md font-iregular text-black">
                  Contribution:{" "}
                </Text>
                <Text className="text-md font-ibold text-primary-100">
                  {summary.contribution} KG
                </Text>
              </View>
            </View>
            <View className="mb-2 items-end">
              <View className="flex-row">
                <Text className="text-md font-ibold text-black">
                  Est. Points Earned:
                </Text>
                <Text className="text-md font-ibold text-primary-100">
                  {totalPoints}
                </Text>
                <Image
                  source={icons.sprouticon}
                  resizeMode="contain"
                  className="h-4 w-4"
                />
              </View>
            </View>
            <View className="mb-2">
              <Text className="text-center font-ilight text-xs text-black">
                We will process your recyclable and update your points.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
