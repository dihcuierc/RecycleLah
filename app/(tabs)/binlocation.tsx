import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { icons } from "@/constants";
import Header from "@/components/Header";
import { Bin, bins, filters, wasteStats } from "@/constants/data";

function SearchBar({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View className="m-3 h-[50px] flex-row items-center rounded-full border-2 border-[#D8D8D8] bg-white pl-2">
      <Pressable>
        <AntDesign name="search1" size={24} color="black" />
      </Pressable>
      <TextInput
        className="flex-1 p-2 font-iregular text-sm text-black"
        placeholder="Search"
        autoCapitalize="none"
        onChangeText={(text) => setSearch(text)}
      />
    </View>
  );
}

function FilterItem({
  item,
  selected,
  setSelected,
}: {
  item: { id: number; name: string };
  selected: { id: number; name: string };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
}) {
  return (
    <Pressable
      className={`ml-2 h-[40px] w-[80px] items-center justify-center rounded-full border-2 border-[#D8D8D8] ${selected.id === item.id ? "bg-primary-100" : "bg-white"}`}
      onPress={() => setSelected(item)}
    >
      <Text
        className={`font-iregular text-sm ${selected.id === item.id ? "text-white" : "text-black"}`}
      >
        {item.name}
      </Text>
    </Pressable>
  );
}

function FilterBar({
  selected,
  setSelected,
}: {
  selected: { id: number; name: string };
  setSelected: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }>
  >;
}) {
  return (
    <View className="ml-3 mr-3 h-[40px] flex-row items-center">
      <FlatList
        data={filters}
        renderItem={({ item }) => (
          <FilterItem
            item={item}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function BinItem({
  bin,
  location,
}: {
  bin: Bin;
  location: { longitude: number; latitude: number };
}) {
  const [star, setStar] = useState<boolean>(bin.starred);

  const starOnPress = () => {
    bins.filter((item) => item.id === bin.id)[0].starred = !star;
    setStar(!star);
  };
  const wasteItem = wasteStats.filter(
    (item) => item.name === bin.collecting
  )[0];

  return (
    <View
      className="m-2 h-[110px] flex-row items-center rounded-2xl border-2 border-[#D8D8D8]"
      style={{ backgroundColor: "white" }}
    >
      <View className="justify-space-between h-full w-[70%] p-2">
        <Text className="text-md font-ibold text-black">{bin.address}</Text>
        <View className="flex-row">
          <View className="rounded-full border-2 border-[#D8D8D8] p-1">
            <Text className="font-iregular text-sm text-[#C3C3C3]">
              {bin.distance} KM
            </Text>
          </View>
          <View className="ml-2 flex-row rounded-full border-2 border-[#D8D8D8] p-1">
            <Text className="font-ibold text-sm text-black">{bin.rate}</Text>
            <Image
              source={icons.sprouticon}
              resizeMode="contain"
              className="ml-1 h-4 w-4"
            />
            <Text className="font-ibold text-sm text-black">/KG</Text>
          </View>
        </View>
        <View className="flex-row">
          <View className="w-[50%] flex-row items-center">
            <Image
              source={wasteItem.icon}
              resizeMode="contain"
              className="mr-1 h-7 w-7"
            />
            <View>
              <Text className="font-ibold text-xs text-[#C3C3C3]">
                Collecting
              </Text>
              <Text
                className="font-ibold text-sm text-black"
                style={{ color: wasteItem.color }}
              >
                {bin.collecting}
              </Text>
            </View>
          </View>
          <View>
            <Text className="font-ibold text-xs text-[#C3C3C3]">Capacity:</Text>
            <View className="items-center">
              <Text
                className={`font-ibold text-sm ${bin.capacity > 80 ? "text-secondary" : bin.capacity > 50 ? "text-yellow-400" : "text-primary"}`}
              >
                {bin.capacity}%
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="h-full w-[30%] items-end">
        <Pressable className="h-[40%] p-1" onPress={starOnPress}>
          {bin.starred ? (
            <AntDesign name="star" size={24} color="#FFC107" />
          ) : (
            <AntDesign name="staro" size={24} color="black" />
          )}
        </Pressable>
        <View className="w-full items-end justify-end">
          <View
            className={`mb-1 mr-1 w-[90%] items-center justify-center rounded-full p-1 ${bin.status === "Online" ? "bg-primary-100" : bin.status === "Offline" ? "bg-gray-100" : "bg-secondary-200"}`}
          >
            <Text className="font-ibold text-xs text-white">{bin.status}</Text>
          </View>
          <Pressable
            className="mr-1 w-[90%] flex-row items-center justify-center rounded-full border-2 border-[#D8D8D8] p-1"
            onPress={() =>
              router.push({
                pathname: "/directions",
                params: {
                  id: bin.id,
                  address: bin.address,
                  distance: bin.distance,
                  rate: bin.rate,
                  collecting: bin.collecting,
                  capacity: bin.capacity,
                  status: bin.status,
                  starred: String(bin.starred),
                  icon: wasteItem.icon,
                  color: wasteItem.color,
                  user_longitude: location.longitude,
                  user_latitude: location.latitude,
                  bin_longitude: bin.longitude,
                  bin_latitude: bin.latitude,
                },
              })
            }
          >
            <Text className="font-ilight text-xs text-black">
              Get Directions
            </Text>
            <AntDesign name="arrowright" size={12} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const BinLocation = () => {
  const [selected, setSelected] = useState<{ id: number; name: string }>({
    id: 1,
    name: "All",
  });
  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<{
    longitude: number;
    latitude: number;
  }>({
    longitude: 0,
    latitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string
  ) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  const filteredBins = bins
    .map((bin) => {
      return {
        ...bin,
        distance:
          Math.round(
            distance(
              bin.latitude,
              bin.longitude,
              location.latitude,
              location.longitude,
              "K"
            ) * 100
          ) / 100,
      };
    })
    .filter((bin) => {
      if (selected.id === 1) return true;
      if (selected.id === 2 && bin.starred) return true;
      if (selected.id === 3 && bin.collecting === "General") return true;
      if (selected.id === 4 && bin.collecting === "Paper") return true;
      if (selected.id === 5 && bin.collecting === "E-waste") return true;
      if (selected.id === 6 && bin.collecting === "Plastic") return true;
      if (selected.id === 7 && bin.collecting === "Textile") return true;
      return false;
    })
    .sort((a, b) => a.distance - b.distance);

  const searchFilteredBins = filteredBins.filter((bin) => {
    return bin.address.toLowerCase().includes(search.toLowerCase());
  });

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return (
        <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
          <Text className="text-center font-iregular text-lg text-black">
            {errorMsg}
          </Text>
        </View>
      );
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation({ longitude: coords.longitude, latitude: coords.latitude });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <Header>
        <View className="items-center justify-center pb-2">
          <Text className="font-imedium text-lg text-white">
            Find Nearby Recycling Corner
          </Text>
        </View>
      </Header>
      {location ? (
        <View className="flex-1">
          <SearchBar setSearch={setSearch} />
          <FilterBar selected={selected} setSelected={setSelected} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mb-5 pb-5"
          >
            {searchFilteredBins.map((bin) => (
              <BinItem key={bin.id} bin={bin} location={location} />
            ))}
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default BinLocation;
