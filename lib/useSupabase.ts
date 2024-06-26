import { supabase } from "./supabase";

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email,
          username,
          password,
        },
      },
    });
    if (!newAccount) {
      throw new Error("Failed to create user");
    }
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getAllUsers() {
  const { data, error } = await supabase.from("profiles").select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    const id = data.user.id;
    const user = (await supabase.from("profiles").select().eq("id", id)).data;
    return user ? user[0] : {};
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getUserHistory() {
  const user = await getCurrentUser();
  const { data: history, error } = await supabase
    .from("History")
    .select()
    .eq("user_id", user.id);
  if (error) {
    throw new Error(error.message);
  } else {
    const transformedHistory = history
      .map((item) => ({
        location: item.bin_location,
        weight: item.weight,
        date: item.date,
        type: item.type,
        points_earned: item.points_earned,
        id: item.id,
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
    return transformedHistory;
  }
}

export async function getUserRedeem(user_id: string) {
  const { data: redeem, error } = await supabase
    .from("Redeem")
    .select()
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  } else {
    return redeem;
  }
}

export async function updateRedeem(points: number, user_id: string) {
  const { error: redeemError } = await supabase
    .from("Redeem")
    .insert({ points: points, user_id: user_id });
  if (redeemError) {
    throw new Error(redeemError.message);
  }
  const user = await getCurrentUser();
  const { error: userError } = await supabase
    .from("profiles")
    .update({ points: user.points - points })
    .eq("id", user_id);
  if (userError) {
    throw new Error(userError.message);
  }
}

export async function updateHistory(
  bin_location: string,
  date: Date,
  weight: number,
  type: string,
  points_earned: number,
  rate: number,
  user_id: string
) {
  const { error: historyError } = await supabase
    .from("History")
    .insert({ bin_location, date, weight, type, points_earned, rate, user_id });
  if (historyError) {
    throw new Error(historyError.message);
  }
  const user = await getCurrentUser();
  const { error: userError } = await supabase
    .from("profiles")
    .update({ points: user.points + points_earned })
    .eq("id", user_id);
  if (userError) {
    throw new Error(userError.message);
  }
}
