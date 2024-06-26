import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/useSupabase";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill up all the fields",
        position: "bottom",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged in successfully",
      });
      router.replace("/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid email or password",
        position: "bottom",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="mx-7 h-full">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View>
            <Text className="mb-6 font-ibold text-3xl text-black-100">
              Login
            </Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder="Your email address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-10"
              placeholder="********"
            />
            <Text className="mt-3 text-center font-imedium text-sm text-primary">
              Forgot Password?
            </Text>
            <CustomButton
              title="LOGIN"
              handlePress={submitForm}
              containerStyles="mt-24"
              isLoading={isSubmitting}
            />
            <Text className="mt-8 text-center font-imedium text-sm text-black-200">
              Don't have an account? {""}
              <Text className="font-ibold text-sm text-primary">
                <Link href={"/sign-up"}>Sign up</Link>
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
