import { Shadow } from "react-native-shadow-2";
import { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";

interface ShadowProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ShadowProp({ children, style }: ShadowProps) {
  return (
    <Shadow
      style={style}
      sides={{ top: false, start: false, end: true, bottom: true }}
      corners={{
        topStart: false,
        bottomStart: false,
        topEnd: false,
        bottomEnd: true,
      }}
      stretch={true}
      distance={4}
    >
      {children}
    </Shadow>
  );
}
