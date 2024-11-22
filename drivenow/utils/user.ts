import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
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
