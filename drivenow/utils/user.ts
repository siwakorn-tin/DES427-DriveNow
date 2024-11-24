import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Database } from "../types/database.types";
export const getUser = async (session: Session) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", session.user.id)
    .single();
  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }
  return data;
};
export const getRecord = async (session: Session) => {
  const user = await getUser(session);
  const { data, error } = await supabase
    .from("rental")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return data;
};
export const createAccount = async (
  firstName: string,
  lastName: string,
  driverLicense: string,
  email: string,
  password: string
): Promise<Database["public"]["Tables"]["user"]["Row"] | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return null;
    }
    const userId = data?.user?.id;
    const { data: userData, error: upsertError } = await supabase
      .from("user")
      .upsert([
        {
          user_id: userId,
          fullname: `${firstName} ${lastName}`,
          license_number: driverLicense,
        },
      ])
      .select();

    if (upsertError) {
      console.error("Error upserting user data:", upsertError.message);
      return null;
    }

    return userData ? userData[0] : null;
  } catch (error) {
    console.error("Unexpected error creating account:", error);
    return null;
  }
};
