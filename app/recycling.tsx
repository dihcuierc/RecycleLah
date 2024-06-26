import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";

export default function Recycling() {
  const { location, rate, collecting, capacity } = useLocalSearchParams();

  const handlePress = () => {
    router.push({
      pathname: "/recyclingCompleted",
      params: {
        location: location,
        rate: rate,
        collecting: collecting,
        capacity: capacity,
      },
    });
  };

  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <Header>
        <View className="flex-row items-center justify-between">
          <BackButton />
          <Text className="font-imedium text-xl text-white">{location}</Text>
          <View className="w-[50px]" />
        </View>
      </Header>
      <View>
        <View className="h-[300px] items-center justify-center">
          <Image
            source={icons.recyclingbin}
            resizeMode="contain"
            className="h-full"
          />
        </View>
        <View className="mt-5 h-full items-center rounded-2xl border-2 border-[#D8D8D8] pl-5 pr-5 pt-8">
          <Text className="text-center font-ibold text-2xl">
            Recycling Bin Ready for Deposit
          </Text>
          <Text className="mt-5 text-center font-iregular">
            Please wrap your recyclable in a plastic bag to prevent
            contamination
          </Text>
          <TouchableOpacity
            className="mt-5 w-full rounded-full border-2 border-[#D8D8D8] p-3"
            onPress={handlePress}
          >
            <Text className="text-center font-ibold text-xl text-black">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
