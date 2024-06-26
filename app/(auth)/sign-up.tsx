import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/useSupabase";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submitForm = async () => {
    if (!form.email || !form.password || !form.username) {
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
      const user = await createUser(form.email, form.password, form.username);
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
        text2: "Error creating account",
        position: "bottom",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SafeAreaView className="mx-7 h-full">
        <BackButton />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View>
            <Text className="mb-6 font-ibold text-3xl text-black-100">
              Sign Up
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              placeholder="Your username"
            />
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
              otherStyles="mt-7"
              placeholder="********"
            />
            <Text className="mt-3 text-center font-imedium text-sm text-primary">
              Forgot Password?
            </Text>
            <CustomButton
              title="SIGN UP"
              handlePress={submitForm}
              containerStyles="mt-24"
              isLoading={isSubmitting}
            />
            <Text className="mt-8 text-center font-imedium text-sm text-black-200">
              Already have an account?
              <Text className="font-ibold text-sm text-primary">
                <Link href={"/sign-in"}>Login</Link>
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
