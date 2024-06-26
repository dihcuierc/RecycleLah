import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Header from "@/components/Header";
import { ScrollView } from "react-native-gesture-handler";
import ShadowProp from "@/components/ShadowProp";
import { getUserHistory } from "@/lib/useSupabase";
import { useGlobalContext } from "@/context/GlobalProvider";
import { History, Stat, wasteStats } from "@/constants/data";
import { Skeleton } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";

const stats = [
  {
    id: 1,
    name: "Saved CO2",
    value: "350g",
    icon: icons.co2,
    color: "#4DA5FF",
  },
  {
    id: 2,
    name: "Energy Saved",
    value: "5.6 kWh",
    icon: icons.electricity,
    color: "#4BAB3F",
  },
  {
    id: 3,
    name: "Most Recycled",
    value: "Paper",
    icon: icons.paper,
    color: "#51D3FC",
  },
];

function Contribution({ history }: { history: History[] }) {
  const totals = [
    {
      name: "Plastic",
      weight: 0,
      color: "",
    },
    {
      name: "Paper",
      weight: 0,
      color: "",
    },
    {
      name: "General",
      weight: 0,
      color: "",
    },
    {
      name: "E-waste",
      weight: 0,
      color: "",
    },
    {
      name: "Textile",
      weight: 0,
      color: "",
    },
  ];
  const totalWeight = history.reduce((total, item) => {
    return total + parseFloat(item.weight);
  }, 0);

  history.forEach((item) => {
    const numericWeight = parseFloat(item.weight);
    totals.filter((stat) => stat.name === item.type)[0].weight += numericWeight;
  });

  totals.forEach((stat) => {
    stat.weight = (stat.weight / totalWeight) * 100;
    stat.color = wasteStats.filter(
      (waste) => waste.name === stat.name
    )[0].color;
  });

  const filteredTotals = totals
    .filter((stat) => stat.weight > 0)
    .sort((a, b) => a.weight - b.weight);

  return (
    <View className="h-[100%] w-[60%] items-center justify-center p-1">
      <ShadowProp style={{ borderRadius: 8 }}>
        <View className="h-full w-full flex-row items-center justify-center rounded-lg border-2 border-[#D8D8D8] bg-white">
          <View className="w-[40%] items-center justify-center rounded-lg p-2">
            <View className="h-full w-full items-center justify-center rounded-xl bg-white">
              {filteredTotals.map((stat, index) => (
                <View
                  key={stat.color}
                  className={`w-full items-center justify-center bg-primary ${index === 0 ? "rounded-t-lg" : ""} ${index === filteredTotals.length - 1 ? "rounded-b-lg" : ""}`}
                  style={{
                    height: `${stat.weight}%`,
                    backgroundColor: stat.color,
                  }}
                />
              ))}
            </View>
          </View>
          <View className="h-full w-[60%] items-center rounded-lg p-2">
            <Text className="font-ibold text-xs opacity-40">
              Total Contrbution:
            </Text>
            <View className="shadow-b-sm mb-2 mt-2 w-full items-center justify-center rounded-2xl border-2 border-[#D8D8D8]">
              <Text className="font-ibold text-2xl text-[#4169E1]">
                {Math.round(totalWeight * 100) / 100}kg
              </Text>
            </View>
            <View>
              {totals.map((stat) => (
                <View key={stat.color} className="flex-row">
                  <View
                    className="m-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                  <Text
                    className="font-ibold text-sm"
                    style={{ color: stat.color }}
                  >
                    {Math.round(stat.weight)}% {stat.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ShadowProp>
    </View>
  );
}

function StatComponent({
  stat,
}: {
  stat: {
    id: number;
    name: string;
    value: string;
    icon: ImageSourcePropType;
    color: string;
  };
}) {
  return (
    <View key={stat.id} className="w-full p-1">
      <View className="w-full flex-row items-center justify-center rounded-2xl border-2 border-[#D8D8D8]">
        <Image source={stat.icon} resizeMode="contain" className="h-7 w-7" />
        <View className="items-center justify-center p-1">
          <Text className="text-md font-ibold" style={{ color: stat.color }}>
            {stat.value}
          </Text>
          <Text className="font-ibold text-xs text-black opacity-50">
            {stat.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Stats() {
  return (
    <View className="h-[100%] w-[40%] items-center justify-center p-1">
      <ShadowProp style={{ borderRadius: 16 }}>
        <View className="h-full w-full rounded-2xl border-2 border-[#D8D8D8] bg-white">
          <Text className="text-md p-1 font-ibold text-black opacity-40">
            Stats:{" "}
          </Text>
          <View className="justify-space-evenly">
            {stats.map((stat) => (
              <StatComponent key={stat.id} stat={stat} />
            ))}
          </View>
        </View>
      </ShadowProp>
    </View>
  );
}

function RecycleSteps({ stat }: { stat: Stat }) {
  return (
    <Pressable
      className="m-1 items-center justify-center p-2"
      onPress={() => {
        router.push({
          pathname: "/recycle",
          params: {
            id: stat.id,
            name: stat.name,
            steps: JSON.stringify(stat.steps),
            icon: String(stat.icon),
          },
        });
      }}
    >
      <View className="mb-1 items-center justify-center rounded-2xl border-2 border-[#D8D8D8] bg-white p-2">
        <Image source={stat.icon} resizeMode="contain" className="h-10 w-10" />
      </View>
      <Text className="font-iregular text-xs">{stat.name}</Text>
    </Pressable>
  );
}

function Recycle() {
  return (
    <View className="p-1">
      <Text className="text-md font-ibold opacity-40">How to Recycle:</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="justify-space-between"
      >
        {wasteStats.map((stat) => (
          <RecycleSteps key={stat.id} stat={stat} />
        ))}
      </ScrollView>
    </View>
  );
}

function HistoryItem({ item }: { item: History }) {
  const waste = wasteStats.find((waste) => waste.name === item.type);
  return (
    <View className="m-1 mb-2 flex-row items-center justify-between rounded-lg border-2 border-[#D8D8D8] bg-white p-2">
      <View className="flex-row">
        <Image
          source={waste?.icon}
          resizeMode="contain"
          className="mr-2 h-8 w-8"
        />
        <View>
          <Text className="font-ibold text-sm text-black">{item.location}</Text>
          <Text className="font-ilight text-sm text-black opacity-50">
            {item.date.split("T")[0]}
          </Text>
        </View>
      </View>
      <Text
        className="mr-1 font-ibold text-lg text-black"
        style={{ color: waste?.color }}
      >
        {item.weight}kg
      </Text>
    </View>
  );
}

function RecentHistory({ history }: { history: History[] }) {
  const filteredHistory = history.filter((item) => {
    const itemDate = new Date(item.date);
    const currentDate = new Date();
    return (
      Math.abs(currentDate.getMonth() - itemDate.getMonth()) < 1 &&
      currentDate.getFullYear() - itemDate.getFullYear() < 1 &&
      item
    );
  });
  return (
    <View className="p-1">
      <Text className="text-md font-ibold text-black opacity-40">
        Recent Contributions:
      </Text>
      {filteredHistory.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </View>
  );
}

const Home = () => {
  const {
    user,
    setHistory,
    history,
    refetch: refetchUser,
  } = useGlobalContext();

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getUserHistory();
      setHistory(history);
    };
    fetchHistory();
    refetchUser();
  }, []);

  if (!history) {
    return (
      <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="wave"
        style={{
          height: 250,
          borderRadius: 16,
          marginTop: 20,
        }}
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top", "bottom"]}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Header>
          <Text className="font-imedium text-2xl text-white">Hello!</Text>
          <View className="flex-row">
            <View className="w-[60%]">
              <Text className="font-ibold text-3xl text-white">
                {user.username}
              </Text>
            </View>
            <View className="w-[40%] pr-2">
              <Pressable
                className="w-full flex-row items-center justify-evenly rounded-full border-2 bg-white p-1"
                onPress={() => router.push("/profile")}
              >
                <Image
                  src={user.avatar_url}
                  resizeMode="contain"
                  className="h-7 w-7 rounded-full"
                />
                <Text className="font-ibold text-xl text-black">
                  {user.points}
                </Text>
                <Image
                  source={icons.sprouticon}
                  resizeMode="contain"
                  className="h-5 w-5"
                />
              </Pressable>
            </View>
          </View>
        </Header>
        <View className="m-1 h-[200px] flex-row">
          <Contribution history={history} />
          <Stats />
        </View>
        <View className="m-1 h-[120px]">
          <Recycle />
        </View>
        <View className="h-full w-full">
          <RecentHistory history={history} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
