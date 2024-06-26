import {
  View,
  Text,
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import Header from "@/components/Header";
import MapViewDirections from "react-native-maps-directions";
import BackButton from "@/components/BackButton";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { icons } from "@/constants";
import { useState } from "react";

export default function Directions() {
  const {
    id,
    address,
    distance,
    rate,
    collecting,
    capacity,
    status,
    starred,
    icon,
    color,
    user_longitude,
    user_latitude,
    bin_longitude,
    bin_latitude,
  } = useLocalSearchParams();

  const origin = {
    latitude: Number(user_latitude),
    longitude: Number(user_longitude),
  };
  const destination = {
    latitude: Number(bin_latitude),
    longitude: Number(bin_longitude),
  };
  
  const GOOGLE_MAPS_APIKEY = "";
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;

  const [closed, setClosed] = useState<boolean>(false);

  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <Header>
        <View className="flex-row items-center justify-between">
          <BackButton />
          <Text className="font-imedium text-lg text-white">{address}</Text>
          <View className="w-[50px]" />
        </View>
      </Header>
      <MapView
        className="h-full w-full"
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01 * ASPECT_RATIO,
        }}
        showsUserLocation={true}
        loadingEnabled={true}
        userLocationUpdateInterval={1000}
        region={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01 * ASPECT_RATIO,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="green"
          mode="WALKING"
        />
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
          />
        )}
      </MapView>
      {!closed ? (
        <View className="absolute bottom-0 h-[250px] w-full">
          <View className="m-5 h-[200px] rounded-xl border-2 border-[#D8D8D8] bg-white">
            <Pressable
              className="absolute left-0 top-0 m-3"
              onPress={() => setClosed(true)}
            >
              <AntDesign name="closecircleo" size={30} color="black" />
            </Pressable>
            <View className="absolute right-0 top-0 m-3">
              <AntDesign name="star" size={30} color="#FFC107" />
            </View>
            <View className="h-full w-full items-center">
              <View
                className={`mb-4 mt-5 w-[100px] items-center justify-center rounded-full ${status === "Online" ? "bg-primary-100" : status === "Offline" ? "bg-gray-100" : "bg-secondary-200"} px-5 py-1`}
              >
                <Text className="text-md justify-center font-iregular text-white">
                  {status}
                </Text>
              </View>
              <View className="mb-3 w-full flex-row items-center justify-evenly">
                <Image
                  source={icon as ImageSourcePropType}
                  className="h-12 w-12"
                  resizeMode="contain"
                />
                <View className="items-center justify-center">
                  <Text className="font-ibold text-2xl text-primary-100">
                    {distance}KM
                  </Text>
                  <Text className="font-ibold text-2xl text-black opacity-40">
                    away
                  </Text>
                </View>
                <View className="w-[10%]" />
              </View>
              <View className="w-full flex-row justify-center">
                <View className="items-center justify-center">
                  <Text className="text-md font-ibold text-black opacity-40">
                    Collecting
                  </Text>
                  <Text
                    className="text-md my-1 rounded-full border-2 border-[#D8D8D8] px-2 font-ibold"
                    style={{ color: color as string }}
                  >
                    {collecting}
                  </Text>
                </View>
                <View className="mx-5 items-center justify-center">
                  <Text className="text-md font-ibold text-black opacity-40">
                    Capacity
                  </Text>
                  <Text
                    className={`text-md my-1 rounded-full border-2 border-[#D8D8D8] px-2 font-ibold ${Number(capacity) > 80 ? "text-secondary" : Number(capacity) > 50 ? "text-yellow-400" : "text-primary"}`}
                  >
                    {capacity}%
                  </Text>
                </View>
                <View className="items-center justify-center">
                  <Text className="text-md font-ibold text-black opacity-40">
                    Rate
                  </Text>
                  <View className="my-1 flex-row items-center rounded-full border-2 border-[#D8D8D8] px-1">
                    <Text className="text-md rounded-full font-ibold text-black">
                      {rate}
                    </Text>
                    <Image source={icons.sprouticon} className="h-4 w-4" />
                    <Text className="text-md rounded-full font-ibold text-black">
                      /KG
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View className="absolute bottom-0 h-[80px] w-full justify-end">
          <Pressable
            className="mx-5 h-[50px] items-center justify-center rounded-t-full border-2 border-b-0 border-[#D8D8D8] bg-white"
            onPress={() => setClosed(false)}
          >
            <View className="h-[50%] w-[20%] rounded-full bg-[#E5E5E5]" />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
