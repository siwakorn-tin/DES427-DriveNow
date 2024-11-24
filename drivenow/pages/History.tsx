import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { YStack } from 'tamagui';
import { getRentalHistory } from "../utils/api";
import { ProfileProps } from "../types/session";

type RentalData = {
  car_id: number;
  expected_returned_date: string;
  id: number;
  rented_date: string;
  returned_date: string;
  status: string;
  user_id: number;
};

export default function RentalHistoryScreen({ navigation, session }: ProfileProps) {
  const [rentals, setRentals] = useState<RentalData[]>([]); // State to store rental data
  const [loading, setLoading] = useState<boolean>(true); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling

  const fetchRentals = async () => {
      const history = await getRentalHistory({ 
        session 
      });
      console.log(history?.length, history);
    }
      
  fetchRentals();

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <ScrollView>
        {rentals.length === 0 ? (
          <Text>No rentals found</Text> // Show message if no rentals found
        ) : (
          rentals.map((rental, index) => (
            <View
              key={index}
              style={{
                padding: 12,
                marginBottom: 12,
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Car ID: {rental.car_id}</Text>
              <Text>Status: {rental.status}</Text>
              <Text>Rented Dates: {rental.rented_date} - {rental.returned_date}</Text>
              <Text>Expected Return: {rental.expected_returned_date}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
// import React, { useEffect, useState } from 'react';
// import { ScrollView, Text, View } from 'react-native';
// import { getRentalHistory } from "../utils/api";
// import { ProfileProps } from "../types/session";

// type RentalData = {
//   car_id: number;
//   expected_returned_date: string;
//   id: number;
//   rented_date: string;
//   returned_date: string;
//   status: string;
//   user_id: number;
// };

// export default function RentalHistoryScreen({ navigation, session }: ProfileProps) {
//   const [rentals, setRentals] = useState<RentalData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRentals = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const history = await getRentalHistory({ session });
//       if (history) {
//         setRentals(history);
//       } else {
//         setError("No rental history found.");
//       }
//     } catch (err) {
//       setError("Failed to fetch rental history. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRentals();
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : error ? (
//         <Text style={{ color: 'red' }}>{error}</Text>
//       ) : rentals.length === 0 ? (
//         <Text>No rentals found</Text>
//       ) : (
//         <ScrollView>
//           {rentals.map((rental, index) => (
//             <View
//               key={index}
//               style={{
//                 padding: 12,
//                 marginBottom: 12,
//                 borderBottomWidth: 1,
//                 borderColor: '#eee',
//               }}
//             >
//               <Text style={{ fontWeight: 'bold' }}>Car ID: {rental.car_id}</Text>
//               <Text>Status: {rental.status}</Text>
//               <Text>Rented Dates: {rental.rented_date} - {rental.returned_date}</Text>
//               <Text>Expected Return: {rental.expected_returned_date}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// }

