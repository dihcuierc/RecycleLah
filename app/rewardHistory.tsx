import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserRedeem } from "@/lib/useSupabase";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function FilterBar({
  filters,
  selectFilter,
  setSelectFilter,
}: {
  filters: string[];
  selectFilter: string;
  setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View className="p-5">
      <View className="flex-row items-center justify-center rounded-full bg-primary-200">
        {filters.map((filter, index) => (
          <Pressable
            onPress={() => setSelectFilter(filter)}
            key={index}
            className={`${selectFilter === filter ? "bg-primary-100" : "bg-primary-200"} w-1/3 items-center justify-center rounded-full py-3`}
          >
            <Text
              className={`${
                selectFilter === filter ? "text-white" : "text-black"
              } font-iregular text-lg`}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function RewardHistoryItem({ points, date }: { points: number; date: string }) {
  return (
    <View className="items-space-between m-1 h-[70px] w-[90%] flex-row items-center justify-between rounded-xl bg-[#F5F5F5]">
      <View className="flex-row items-center">
        <View
          className={`mx-5 h-[50px] w-[5px] rounded-full p-1 ${points > 0 ? "bg-primary-100" : "bg-[#ED9F4B]"}`}
        />
        <View>
          <Text className="text-md font-ibold text-black">
            You have {points > 0 ? "earned" : "redeemed"}
          </Text>
          <Text className="text-md font-iregular text-black">
            {date.split("T")[0]}
          </Text>
        </View>
      </View>
      <View className="mr-5 items-center justify-center">
        <Text
          className={`font-ibold text-xl ${points > 0 ? "text-primary-100" : "text-[#ED9F4B]"}`}
        >
          {points > 0 && "+"}
          {points}
        </Text>
        <Text className="text-md font-iregular text-black">Points</Text>
      </View>
    </View>
  );
}

type Redeem = {
  id: number;
  points: number;
  date: string;
};

export default function RewardHistory() {
  const [selectFilter, setSelectFilter] = useState<string>("All");
  const [redeem, setRedeem] = useState<Redeem[]>([]);

  const { user, history, refetch } = useGlobalContext();
  const filters = ["All", "Earned", "Redeemed"];

  const allHistory = history
    .map((item) => {
      return {
        id: item.id,
        points_earned: item.points_earned,
        date: item.date,
      };
    })
    .concat(
      redeem.map((item) => {
        return {
          id: item.id,
          points_earned: -item.points,
          date: item.date,
        };
      })
    );

  const fetchData = async () => {
    const data = await getUserRedeem(user?.id ?? "");
    if (data) {
      setRedeem(data);
    }
    refetch();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = allHistory
    .filter((item) => {
      if (selectFilter === "All") {
        return true;
      } else if (selectFilter === "Earned") {
        return item.points_earned > 0;
      } else if (selectFilter === "Redeemed") {
        return item.points_earned < 0;
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["right", "left", "top"]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <View className="flex-row items-center justify-between">
            <BackButton />
            <Text className="font-imedium text-lg text-white">
              Rewards History
            </Text>
            <View className="w-[50px]" />
          </View>
        </Header>
        <View className="h-[160px] p-5">
          <View className="h-[90%] items-center justify-center rounded-2xl border-2 border-[#D8D8D8] bg-white">
            <Text className="font-iregular text-lg text-black">My Balance</Text>
            <View className="flex-row">
              <Text className="font-ibold text-3xl text-black">
                {user?.points}
              </Text>
              <Image
                source={icons.sprouticon}
                resizeMode="contain"
                className="h-8 w-8"
              />
            </View>
            <Pressable
              className="absolute w-[40%] items-center justify-center rounded-full bg-primary-100 p-2"
              style={{ bottom: -20 }}
              onPress={() => {
                router.replace({
                  pathname: "redemptionPage",
                  params: {
                    totalPoints: user?.points,
                  },
                });
              }}
            >
              <Text className="font-ibold text-xl text-white">Redeem</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-1 rounded-t-2xl bg-white">
          <FilterBar
            selectFilter={selectFilter}
            filters={filters}
            setSelectFilter={setSelectFilter}
          />
        </View>
        <View className="items-center bg-white pb-5">
          {filteredData.map((item) => (
            <RewardHistoryItem
              key={item.id}
              points={item.points_earned}
              date={item.date.split("T")[0]}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
