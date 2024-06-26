import { View } from "react-native";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  containerStyles?: string;
}

export default function Header({ children, containerStyles }: HeaderProps) {
  return (
    <View className="h-[120px]">
      <View
        className={`h-[80%] justify-end bg-primary pl-4 pr-4 ${containerStyles}`}
      >
        {children}
      </View>
      <View className="h-[20%] rounded-b-full bg-primary" />
    </View>
  );
}
