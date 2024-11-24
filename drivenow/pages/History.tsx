import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getRentalHistory } from "../utils/api";
import { ProfileProps } from "../types/session";

export default function RentalHistoryScreen({ navigation, session }: ProfileProps) {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function queryHistory() {
    try {
      if (session) {
        const { data: rentalHistory, error } = await getRentalHistory({ session });

        if (error) {
          console.error("Error fetching rental history:", error);
          setError("Failed to load rental history.");
        } else if (rentalHistory) {
          setRentals(rentalHistory);
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  // Function to calculate duration and total price
  const calculateDurationAndPrice = (rentedDate: string, returnedDate: string | null, rate: number) => {
    const startDate = new Date(rentedDate);
    const endDate = new Date(returnedDate || Date.now()); // Use current date if not returned
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Convert ms to days
    const totalPrice = duration * rate;
    return { duration, totalPrice };
  };

  useEffect(() => {
    queryHistory();
  }, [session]);

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : rentals.length === 0 ? (
          <Text>No rental history found</Text>
        ) : (
          rentals.map((rental, index) => {
            const car = rental.cars;
            if (car) {
              const { duration, totalPrice } = calculateDurationAndPrice(
                rental.rented_date,
                rental.returned_date,
                car.rate
              );

              return (
                <View
                  key={index}
                  style={{
                    padding: 12,
                    marginBottom: 12,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {`${car.brand || "Unknown"} ${car.model || ""}`.trim()}
                  </Text>
                  <Text>Color: {car.color || "N/A"}</Text>
                  <Text>Rented Date: {rental.rented_date || "N/A"}</Text>
                  <Text>
                    Expected Return Date: {rental.returned_date || "Not returned"}
                  </Text>
                  <Text>Duration: {duration} days</Text>
                  <Text>Rate: ฿{car.rate || "N/A"}/day</Text>
                  <Text>Total Price: ฿{totalPrice}</Text>
                  <Text>Status: {rental.status || "Unknown"}</Text>
                </View>
              );
            } else {
              return (
                <View
                  key={index}
                  style={{
                    padding: 12,
                    marginBottom: 12,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Car information unavailable
                  </Text>
                  <Text>Rented Date: {rental.rented_date || "N/A"}</Text>
                  <Text>
                    Expected Return Date: {rental.returned_date || "Not returned"}
                  </Text>
                  <Text>Status: {rental.status || "Unknown"}</Text>
                </View>
              );
            }
          })
        )}
      </ScrollView>
    </View>
  );
}
