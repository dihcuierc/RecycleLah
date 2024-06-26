import { Image, TouchableOpacity } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

const ProfileButton = () => {
  const { user } = useGlobalContext();
  return (
    <TouchableOpacity
      onPress={() => router.push("/profile")}
      activeOpacity={0.5}
      className="h-[42px] w-[42px] items-center justify-center rounded-xl"
    >
      <Image
        source={{ uri: user?.avatar_url }}
        className="h-full w-full rounded-xl"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;
