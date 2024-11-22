import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { CarData } from "./AvailableCar"

// Define the param list for the stack navigation
type RootStackParamList = {
  CarRentalForm: { car: CarData 
    location: string; pickupDate: string; dropoffDate: string
  }; // Car data as param
};

// Define the route type for this screen
type CarRentalFormScreenRouteProp = RouteProp<RootStackParamList, 'CarRentalForm'>;

const CarRentalFormScreen = () => {
  // Get the car data from route params
  const route = useRoute<CarRentalFormScreenRouteProp>();
  const { car } = route.params;
  const { location, pickupDate, dropoffDate } = route.params;

  return (
    <View>
        <Text>{car.model}</Text>
        <Text>{car.brand}</Text>
        <Image source={{ uri: car.image }} style={{ width: '100%', height: 200 }} />
        <Text>Car Rental Form</Text>

      
        <Text>Price: {car.price} THB / Day</Text>
        <Text>Pickup Date: {pickupDate}</Text>
        <Text>Dropoff Date: {dropoffDate}</Text>
        <Text>Location: {car.location}</Text>
        <Text>Your Information</Text>

      {/* Rental Form */}
      <Button title="Rent this Car" onPress={() => {/* Handle rental logic */}} />
    </View>
  );
};

export default CarRentalFormScreen;
