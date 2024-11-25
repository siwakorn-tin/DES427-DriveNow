import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import CarBoxHistory from "../components/CarBoxHistory";
import { getRentalHistory } from "../utils/api";
import { ProfileProps } from "../types/session";

export default function RentalHistoryScreen({ session }: ProfileProps) {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const queryHistory = async () => {
    try {
      if (session) {
        const { data: rentalHistory, error } = await getRentalHistory({ session });

        if (error) {
          setError("Failed to load rental history.");
        } else {
          setRentals(rentalHistory || []);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDurationAndPrice = (rentedDate: string, returnedDate: string | null, rate: number) => {
    const startDate = new Date(rentedDate);
    const endDate = new Date(returnedDate || Date.now());
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = duration * rate;
    return { duration, totalPrice };
  };

  useEffect(() => {
    queryHistory();
  }, [session]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  if (rentals.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text>No rental history found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      {rentals.map((rental, index) => {
        const car = rental.cars;
        if (car) {
          const { duration, totalPrice } = calculateDurationAndPrice(
            rental.rented_date,
            rental.returned_date,
            car.rate
          );

          return (
            <CarBoxHistory
              key={index}
              rentalInfo={{ car, rental }}
              duration={duration}
              totalPrice={totalPrice}
              isClickable={true}
            />
          );
        }

        return (
          <View key={index} style={{ padding: 12, marginBottom: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Car information unavailable</Text>
            {/* <Text>Rented Date: {rental.rented_date || "N/A"}</Text>
            <Text>Expected Return Date: {rental.returned_date || "Not returned"}</Text>
            <Text>Status: {rental.status || "Unknown"}</Text> */}
          </View>
        );
      })}
    </ScrollView>
  );
}