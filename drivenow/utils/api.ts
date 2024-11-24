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
  endDate,
  startDate,
}: {
  session: Session;
  carID: number;
  startDate: string;
  endDate: string;
}) => {
  try {
    const checkRental = await supabase
      .from("rental")
      .select()
      .eq("car_id", carID)
      .or("status.eq.ongoing,status.eq.payment")
      .gte("returned_date", startDate)
      .lte("rented_date", endDate)
      .single();

    if (checkRental && checkRental.data && checkRental.data.id) {
      return { error: "Car is already rented for this period" };
    }

    const { error } = await supabase.from("rental").insert([
      {
        user_id: Number(session.user.id),
        expected_returned_date: endDate,
        car_id: carID,
        rented_date: startDate,
        returned_date: endDate,
        status: "payment",
      },
    ]);

    if (error) {
      console.error("Error inserting rental:", error);
      return { error: "Failed to create rental" };
    }

    return { success: true }; // Indicate success
  } catch (error) {
    console.error("Error in createRentals:", error);
    return { error: "An unexpected error occurred" };
  }
};
export const getRentalHistory = async ({ session }: { session: Session }) => {
  const { data, error } = await supabase
    .from("rental")
    .select("*")
    .eq("user_id", session.user.id);
  return data;
};
