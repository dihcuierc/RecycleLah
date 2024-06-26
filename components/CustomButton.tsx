import { TouchableOpacity, Text } from "react-native";
import React from "react";

type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
  isLoading?: boolean;
  textStyles?: string;
};

const CustomButton = ({
  title,
  containerStyles,
  handlePress,
  isLoading,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`mt-auto h-[60px] w-[300px] items-center justify-center self-center rounded-[100px] bg-primary ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`font-isemibold text-base text-white ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
