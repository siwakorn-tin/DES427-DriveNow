import { supabase } from "./supabase";
export const getAllCars = async () => {
  const { data, error } = await supabase.from("cars").select();
  return await supabase.from("cars").select("*");
};

export const getCar = async ({ id }: { id: string }) => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching car:", error.message);
    return null;
  }
  return data;
};
