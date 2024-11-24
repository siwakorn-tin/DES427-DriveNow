import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
export const getAllCars = async () => {
  const { data, error } = await supabase.from("cars").select();
  return await supabase.from("cars").select("*");
};

export const getCarDetail = async ({ id }: { id: string }) => {
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
export const searchAvailableCars = async ({
  city,
  endDate,
  startDate,
}: {
  startDate: string;
  endDate: string;
  city: string;
}) => {
  try {
    const { data: unavailableCars, error: rentalError } = await supabase
      .from("rental")
      .select("car_id")
      .or("status.eq.ongoing, status.eq.payment")
      .gte("returned_date", startDate)
      .lte("rented_date", endDate);
    if (rentalError) {
      throw new Error(
        `Error fetching unavailable cars: ${rentalError.message}`
      );
    }

    const unavailableCarIds = Array.from(
      unavailableCars?.map((rental) => rental.car_id) || []
    );
    const unavailableCarIdsString = `(${unavailableCarIds.join(",")})`;

    const { data: availableCars, error: carError } = await supabase
      .from("cars")
      .select("*")
      .eq("city", city)
      .eq("carstatus", "available")
      .not("id", "in", unavailableCarIdsString);
    if (carError) {
      throw new Error(`Error fetching available cars: ${carError.message}`);
    }

    return availableCars;
  } catch (error: any) {
    console.error("Error searching cars:", error.message);
    return null;
  }
};

export const createRentals = async ({
  session,
  carID,
  startDate,
  endDate,
}: {
  session: Session;
  carID: number;
  startDate: string;
  endDate: string;
}) => {
  // Fetch the user from the database
  const { data: user, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (userError || !user) {
    return { error: "User not found" };
  }

  // Check if the car is already rented for the given period
  const { data: rental, error: rentalError } = await supabase
    .from("rental")
    .select()
    .eq("car_id", carID)
    .or("status.eq.ongoing, status.eq.payment")
    .gte("returned_date", startDate)
    .lte("rented_date", endDate)
    .maybeSingle();

  if (rentalError) {
    return { error: rentalError.message };
  }

  if (rental && rental.id) {
    return { error: "Car is already rented for this period" };
  }

  // Insert the new rental record
  const { data, error } = await supabase
    .from("rental")
    .insert([
      {
        user_id: user.id,
        car_id: carID,
        rented_date: startDate,
        returned_date: endDate,
        status: "payment",
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
};
export const getRentalHistory = async ({ session }: { session: Session }) => {
  const { data, error } = await supabase
    .from("rental")
    .select("*")
    .eq("user_id", session.user.id);
  return data;
};
