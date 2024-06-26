import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText?: (e: any) => void;
  otherStyles?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  textStyles?: string;
  editable?: boolean;
};

const FormField = ({
  title,
  value,
  otherStyles,
  textStyles,
  keyboardType,
  handleChangeText,
  placeholder,
  editable,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-imedium text-base text-gray-300">{title}</Text>
      <View className="h-16 w-full flex-row items-center rounded-2xl border-2 border-gray-100 bg-white px-4 focus:border-primary-200">
        <TextInput
          className={`flex-1 font-isemibold text-base text-black ${textStyles}`}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          placeholderTextColor={"#C4C7D0"}
          textContentType="oneTimeCode"
          autoCapitalize="none"
          editable={editable ?? true}
          keyboardType={keyboardType}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {!showPassword ? (
              <AntDesign name="eye" size={24} color="black" />
            ) : (
              <AntDesign name="eyeo" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
