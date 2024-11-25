import React, { useState } from "react";
import { View ,ScrollView, XStack, YStack, Text, Input, Image, Button, Select } from "tamagui";
import { Alert } from "react-native";
import { CarData } from "./AvailableCar"
import SelectDropdown from "react-native-select-dropdown"; 
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useRoute, RouteProp} from "@react-navigation/native";
import { ProfileProps } from "../types/session";
import useUserData from "../hooks/useUserData";
import { UserData } from "../types/userData";
import { createRentals, getRentalHistory } from "../utils/api";

type RootStackParamList = {
  CarRentalForm: { 
    car: CarData 
    location: string; 
    pickupDate: string; 
    dropoffDate: string
    user: UserData
  };
};

type CarRentalFormScreenRouteProp = RouteProp<RootStackParamList, 'CarRentalForm'>;

const CarRentalFormScreen: React.FC<ProfileProps> = ({ navigation, session }) => {
  const route = useRoute<CarRentalFormScreenRouteProp>();
  const { car, location, pickupDate, dropoffDate, user } = route.params;
  const [name, setName] = React.useState<string>("");
  const [driverLicense, setDriverLicense] = React.useState<string>("");

  const calculateDuration = (pickup: string, dropoff: string): number => {
    const pickupDateObj = new Date(pickup);
    const dropoffDateObj = new Date(dropoff);
    const timeDifference = dropoffDateObj.getTime() - pickupDateObj.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(dayDifference);
  };

  const duration = calculateDuration(pickupDate, dropoffDate);
  const totalPrice = duration * car.rate;

  const rentalDuration = (
    (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) /
    (1000 * 3600 * 24)
  ).toFixed(0);

  const handleConfirmBooking = async () => {
    try {
      const rentalData = await createRentals({
        session,
        carID: car.id,
        startDate: pickupDate,
        endDate: dropoffDate,
      });
    
      if (rentalData?.success) {
        console.log("Data inserted successfully", rentalData);
        Alert.alert("Success", "Booking confirmed successfully");
        navigation.navigate("Home");
        return;
      }
    
      if (rentalData?.error) {
        Alert.alert("Error", rentalData.error);
        return;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
    
  };

  return (
    <ScrollView>
    <YStack flex={1} padding="$6" bg="white">
      {/* Car Details */}
      <Text fontSize="$8" fontWeight="bold" marginVertical="$2">
        {car.model}
      </Text>
      <Text fontSize="$6" color="gray">
        {car.brand}
      </Text>
      <Image
        src={'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg'}
        // src={car.image}
        width="100%"
        height={200}
        resizeMode="contain"
        marginVertical="$4"
      />

      <Text fontSize="$6" fontWeight="bold" marginBottom="$4">
        Car Rental Form
      </Text>

      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Location
      </Text>

      <Input
        value={location}
        editable={false}
        borderWidth={0}
        borderColor="$gray7"
        borderRadius="$10"
        paddingHorizontal="$3"
        marginBottom="$4"
        bg="$gray3"
        height="60"
        paddingInline="$4"
        fontSize="$4"
      />

      {/* Date Fields */}
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Date
      </Text>
      <XStack gap="$2" marginBottom="$4">
        <Input
          value={pickupDate}
          editable={false}
          flex={1}
          borderWidth={0}
          borderRadius="$10"
          paddingHorizontal="$3"
          bg="$gray3"
          height="60"
          paddingInline="$4"
          fontSize="$4"
        />
        <Input
          value={dropoffDate}
          editable={false}
          flex={1}
          borderWidth={0}
          borderRadius="$10"
          paddingHorizontal="$3"
          bg="$gray3"
          height="60"
          paddingInline="$4"
          fontSize="$4"
        />
      </XStack>

      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Duration
      </Text>

      <Input
        value={`${duration} Days`}
        editable={false}
        borderWidth={0}
        borderColor="$gray7"
        borderRadius="$10"
        paddingHorizontal="$3"
        marginBottom="$4"
        bg="$gray3"
        height="60"
        paddingInline="$4"
        fontSize="$4"
      />

      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Total Price
      </Text>
      <Input
          value={`${totalPrice} THB`}
          editable={false}
          borderWidth={0}
          borderColor="$gray7"
          borderRadius="$10"
          paddingHorizontal="$3"
          marginBottom="$4"
          bg="$gray3"
          height="60"
          paddingInline="$4"
          fontSize="$4"
      />

      {/* Option Field */}
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Color
      </Text>
      <Input
          value={car.color}
          editable={false}
          borderWidth={0}
          borderColor="$gray7"
          borderRadius="$10"
          paddingHorizontal="$3"
          marginBottom="$4"
          bg="$gray3"
          height="60"
          paddingInline="$4"
          fontSize="$4"
      />
      
      {/* Your Information Fields */}
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Your Information
      </Text>
      <Input
        value={user.fullname}
        editable={false}
        placeholder="Name"
        borderWidth={0}
        borderRadius="$10"
        paddingHorizontal="$3"
        marginBottom="$4"
        bg="$gray3"
        height="60"
        paddingInline="$5"
        fontSize="$4"
      />
      <Input
        value={user.license_number} 
        editable={false}
        placeholder="Driver License"
        borderWidth={0}
        borderRadius="$10"
        paddingHorizontal="$3"
        marginBottom="$4"
        bg="$gray3"
        height="60"
        paddingInline="$4"
        fontSize="$4"
      />

      {/* Continue Button */}
      <Button
          bg="black"
          color="white"
          borderRadius="$10"
          padding="$3"
          fontSize="$4"
          alignSelf="center"
          marginTop="$4"
          height="60"
          width="100%"
          onPress={handleConfirmBooking}
        >
          Confirm Booking
        </Button>
    </YStack>
    </ScrollView>
  );
};

interface Styles {
  inputContainer: ViewStyle;
  dropdownBtnStyle: ViewStyle;
  dropdownStyle: ViewStyle;
  dropdownRowStyle: ViewStyle;
  dropdownButtonStyle: ViewStyle;
  dropdownButtonTxtStyle: TextStyle;
  dropdownButtonArrowStyle: TextStyle;
  dropdownItemStyle: ViewStyle;
  dropdownItemIconStyle: TextStyle;
  dropdownItemTxtStyle: TextStyle;
  centeredDropdownStyle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 50,
    height: 60,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  dropdownBtnStyle: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    height: 50,
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 10,
  },
  dropdownRowStyle: {
    backgroundColor: "#f4f4f4",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  dropdownButtonTxtStyle: {
    fontSize: 15,
    color: "gray",
    paddingInline: 8
  },
  dropdownButtonArrowStyle: {
    marginLeft: 10,
    fontSize: 18,
  },
  dropdownItemStyle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 500,
  },
  dropdownItemIconStyle: {
    marginRight: 10,
    fontSize: 24,
  },
  dropdownItemTxtStyle: {
    fontSize: 15,
  },
  centeredDropdownStyle: {
    height: "auto",
    backgroundColor: "white",
    borderRadius: 8,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -150 }],
    zIndex: 1000,
  },
});
export default CarRentalFormScreen;