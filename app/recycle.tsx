import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Recycle() {
  const { id, name, steps, icon } = useLocalSearchParams();
  const stepsList = JSON.parse(steps as string);

  return (
    <SafeAreaView edges={["right", "left", "top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-[900px]">
          <Header>
            <View className="flex-row justify-between">
              <BackButton />
              <Text className="justify-center font-imedium text-xl text-white">
                How to Recycle:
              </Text>
              <View className="h-[30%] w-[15%]" />
            </View>
          </Header>
          <View className="h-[70%] w-full">
            <View className="mb-4 mt-4 h-[30%] w-full items-center justify-center p-2">
              <Image
                source={icon as ImageSourcePropType}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
            <View className="h-full w-full rounded-t-2xl border-l-2 border-r-2 border-t-2 border-[#D8D8D8] bg-white px-2">
              <View className="h-[10%] w-full items-center justify-center">
                <View className="w-[20%] rounded-xl bg-[#D9D9D9] p-2" />
              </View>

              <Text className="mb-1 font-ibold text-lg">
                How to recycle {name}
              </Text>
              <View className="h-[90%]">
                {stepsList.map((step: { key: number; value: string }) => (
                  <View className="flex-row" key={step.key}>
                    <Text className="pt-2 font-iregular text-base text-[#4169E1]">
                      {step.key}.
                    </Text>
                    <Text className="p-2 font-iregular text-base">
                      {step.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
