import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text
          style={{ textAlign: "center" }}
          className="font-iregular text-2xl text-black"
        >
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const handleScanned = (scanningResult: BarcodeScanningResult) => {
    if (!scanned) {
      const data = JSON.parse(scanningResult.data);
      setScanned(true);
      console.log("scanned");
      router.push({
        pathname: "/recycling",
        params: {
          location: data.address,
          rate: data.rate,
          collecting: data.collecting,
          capacity: data.capacity,
        },
      });
    }
  };
  return (
    <SafeAreaView className="h-full" edges={["right", "left", "top"]}>
      <CameraView
        className="flex-1"
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        enableTorch={torch}
        onBarcodeScanned={handleScanned}
      >
        <Header>
          <View className="w-[100%] flex-row items-center justify-between">
            <BackButton />
            <Text className="font-imedium text-2xl text-white">
              QR scanning
            </Text>
            <View className="w-[50px]" />
          </View>
        </Header>
        <View className="h-[400px] items-center justify-center">
          <View className="h-[80%] w-[75%] items-center justify-center rounded-2xl border-2 border-black bg-white opacity-30" />
        </View>
        <View className="h-[80px] flex-row">
          <Pressable
            className="w-[50%] items-start justify-center p-3 pl-10"
            onPress={() => setTorch(!torch)}
          >
            {torch ? (
              <MaterialIcons
                name="flashlight-on"
                size={24}
                color="black"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
            ) : (
              <MaterialIcons
                name="flashlight-off"
                size={24}
                color="black"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
            )}
          </Pressable>
          <View className="w-[50%] items-end justify-center p-3 pr-10">
            <FontAwesome
              name="photo"
              size={24}
              color="black"
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            />
          </View>
        </View>
        <View>
          <View
            className="h-[50px] items-center justify-center"
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
            }}
          >
            <Text className="font-ibold text-lg text-black">Scan QR Code</Text>
          </View>
          <View className="h-full items-center bg-white pt-2">
            <Text className="text-md font-iregular text-black">
              Align camera with QR code on the recycle bin
            </Text>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}
