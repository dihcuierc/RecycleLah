import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { Profile, achievements, awards } from "@/constants/data";
import { AntDesign } from "@expo/vector-icons";
import { getAllUsers } from "@/lib/useSupabase";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Skeleton } from "@rneui/base";

function FilterBar({
  categories,
  categorySelected,
  setCategory,
}: {
  categories: string[];
  categorySelected: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View className="mt-5 h-[60px] w-full items-center justify-center">
      <View className="h-full flex-row items-center justify-center rounded-full border-2 border-[#D8D8D8] bg-primary-200">
        {categories.map((category) => (
          <Pressable
            key={category}
            className={`h-full w-1/4 items-center justify-center ${category === categorySelected && "rounded-full bg-primary-100"}`}
            onPress={() => setCategory(category)}
          >
            <Text
              className={`text-md font-ibold ${category === categorySelected ? "text-white" : "text-black opacity-40"}`}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function Rankings({
  item,
  index,
  selectedFilter,
  user,
}: {
  item: Profile;
  index: number;
  selectedFilter: "CO2" | "Energy";
  user: Profile;
}) {
  return (
    <View
      className={`mb-2 flex-row items-center justify-between rounded-full p-2 ${index === 0 && "bg-[#FDD500]"} ${index === 1 && "bg-[#C0C0C0]"} ${index === 2 && "bg-[#CD7F32]"} ${user.username === item.username && "bottom-0 border-2 border-black"}`}
    >
      <View className="flex-row items-center pl-2">
        <Text className="mr-2 font-ibold text-lg text-black">{index + 1}</Text>
        <Image
          src={`${item.avatar_url}`}
          className="mr-1 h-11 w-11 rounded-full"
        />
        <Text className="font-ibold text-lg">{item.username}</Text>
      </View>
      <View className="flex-row items-center pr-2">
        <Text className="font-ibold text-lg text-black">
          {item[selectedFilter]}
          {selectedFilter === "CO2" ? "kg" : "kWh"}
        </Text>
      </View>
    </View>
  );
}

function Leaderboard({ user }: { user: Profile }) {
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const users = await getAllUsers();
    if (users) {
      setAllUsers(users);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const [selectedFilter, setSelectedFilter] = useState<"CO2" | "Energy">("CO2");
  const filters = ["CO2", "Energy"];

  const filteredData = allUsers
    .filter((d) => d[selectedFilter])
    .sort((a, b) => b[selectedFilter] - a[selectedFilter]);

  const LeaderFilter = () => {
    return (
      <View className="ml-10 mr-10 mt-5 flex-row items-center justify-center rounded-full border-2 border-[#D8D8D8] bg-primary-200">
        {filters.map((filter) => (
          <Pressable
            key={filter}
            className={`h-[40px] w-1/2 items-center justify-center rounded-full ${filter === selectedFilter ? "bg-primary-100" : "bg-primary-200"}`}
            onPress={() => setSelectedFilter(filter as "CO2" | "Energy")}
          >
            <Text
              className={`text-md font-ibold ${filter === selectedFilter ? "text-white" : "text-black"}`}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View>
      <LeaderFilter />
      {isLoading && (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          style={{
            height: 250,
            borderRadius: 16,
            marginTop: 20,
          }}
        />
      )}
      {filteredData.length !== 0 && !isLoading && (
        <View className="position-relative m-5">
          {filteredData.map((item, index) => (
            <Rankings
              item={item}
              index={index}
              selectedFilter={selectedFilter}
              key={item.username}
              user={user}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function Badges({ user }: { user: Profile }) {
  return (
    <View>
      <View className="w-[100%] p-5">
        <Text className="font-ibold text-lg text-primary-100">
          Challenge Board
        </Text>
        <Text className="text-md font-ibold text-black">
          Collect badges and get rewarded
        </Text>
      </View>
      <View className="w-[100%] flex-row flex-wrap items-center justify-center">
        {awards.map((award) => (
          <View
            key={award.id}
            className={`m-1 h-[120px] w-[30%] items-center p-2 ${award.id <= user.badges ? "opacity-100" : "opacity-40"}`}
          >
            <View
              className={`p-2 ${award.id <= user.badges && "rounded-full border-2 border-[#D8D8D8] bg-white"}`}
            >
              <Image source={award.icon} className="h-10 w-10" />
            </View>
            <Text
              className="text-md mt-1 font-iregular text-black"
              style={{ textAlign: "center" }}
            >
              {award.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Level({
  item,
  user,
  index,
}: {
  item: {
    level: number;
    name: string;
    desciption: string;
    image: any;
  };
  user: Profile;
  index: number;
}) {
  return (
    <View className="flex-row items-center">
      <View
        className={`mr-2 h-[60px] w-[60px] items-center justify-center rounded-full border-2 ${item.level <= user.level ? "border-primary-100 bg-white" : "border-[#D8D8D8]"}`}
      >
        <Image
          source={item.image}
          resizeMode="contain"
          className={`h-10 w-10 ${index < user.level ? "opacity-100" : "opacity-20"}`}
        />
      </View>
      <View className="w-[70%]">
        <Text className="text-md font-ibold text-[#AFAFAF]">
          Level {item.level}
        </Text>
        <Text className="text-md font-ibold text-black">{item.name}</Text>
        <Text className="text-md font-iregular text-black">
          {item.desciption}
        </Text>
      </View>
      {item.level <= user.level ? (
        <AntDesign name="checkcircle" size={24} color="#4BAB3F" />
      ) : (
        <View className="h-[24px] w-[24px] rounded-full bg-[#DDDDDD]" />
      )}
    </View>
  );
}
function Levels({ user }: { user: Profile }) {
  return (
    <View className="mb-7 mt-5 w-full px-2">
      {achievements.map((item, index) => (
        <View className="" key={item.level.toString()}>
          <Level item={item} user={user} index={index} />
          {item.level < user.level && index < 4 && (
            <View className="ml-7 h-[40px] w-[4px] bg-primary-100" />
          )}
          {item.level >= user.level && index < 4 && (
            <View className="ml-7 h-[40px] w-[4px] bg-[#D8D8D8]" />
          )}
        </View>
      ))}
    </View>
  );
}

const Challenge = () => {
  const [categorySelected, setCategory] = useState<string>("Levels");
  const { user } = useGlobalContext();

  const categories = ["Levels", "Leaderboard", "Badges"];
  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <View className="items-center">
            <Text className="font-imedium text-xl text-white">Challenge</Text>
          </View>
        </Header>
        <FilterBar
          categories={categories}
          categorySelected={categorySelected}
          setCategory={setCategory}
        />
        {user && categorySelected === "Levels" && <Levels user={user} />}
        {user && categorySelected === "Leaderboard" && (
          <Leaderboard user={user} />
        )}
        {user && categorySelected === "Badges" && <Badges user={user} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Challenge;
