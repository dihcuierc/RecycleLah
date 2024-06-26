import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import { useGlobalContext } from "@/context/GlobalProvider";
import Dialog from "react-native-dialog";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateRedeem } from "@/lib/useSupabase";
import { icons } from "@/constants";
import { ScrollView } from "react-native-gesture-handler";
import { redemptions } from "@/constants/data";

function RedemptionItem({
  item,
  handlePress,
}: {
  item: { name: string; points: number; icon: ImageSourcePropType };
  handlePress: (points: number) => void;
}) {
  return (
    <Pressable
      className="my-4 flex-row items-center rounded-2xl border-2 border-[#D8D8D8] bg-white p-3 py-4"
      onPress={() => {
        handlePress(item.points);
      }}
    >
      <View className="w-[40%] items-center">
        <Image source={item.icon} resizeMode="contain" className="h-10" />
      </View>
      <View>
        <Text className="font-ibold text-lg text-black">{item.name}</Text>
        <View className="flex-row items-center">
          <Text className="text-md font-ibold text-black">{item.points}</Text>
          <Image
            source={icons.sprouticon}
            className="h-4 w-4"
            resizeMode="contain"
          />
        </View>
      </View>
    </Pressable>
  );
}

export default function RedemptionPage() {
  const { user } = useGlobalContext();
  const { totalPoints } = useLocalSearchParams();
  const [open, setOpen] = useState<boolean>(false);

  function handlePress(points: number) {
    if (points > Number(totalPoints)) {
      return;
    } else {
      setOpen(true);
    }
  }

  const onRedeem = async (points: number) => {
    router.replace({
      pathname: "/redemptionSuccess",
    });
    await updateRedeem(points, user?.id ?? "");
  };

  const sortedRedemptions = redemptions.sort((a, b) => b.points - a.points);
  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <ScrollView>
        <Header>
          <View className="flex-row items-center justify-between">
            <BackButton />
            <Text className="font-imedium text-lg text-white">
              Points Redemption
            </Text>
            <View className="w-[50px]" />
          </View>
        </Header>
        <View className="mx-5 my-5">
          {sortedRedemptions.map((redemption) => (
            <View key={redemption.id}>
              <RedemptionItem
                key={redemption.id}
                item={redemption}
                handlePress={() => handlePress(redemption.points)}
              />
              <Dialog.Container
                visible={open}
                onBackdropPress={() => setOpen(false)}
              >
                <Dialog.Title>Redeem</Dialog.Title>
                <Dialog.Description>Redeem this voucher?</Dialog.Description>
                <Dialog.Button label="No" onPress={() => setOpen(false)} />
                <Dialog.Button
                  label="Yes"
                  onPress={() => {
                    onRedeem(redemption.points);
                    setOpen(false);
                  }}
                />
              </Dialog.Container>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
