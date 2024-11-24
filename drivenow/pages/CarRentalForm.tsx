import React, { useState } from "react";
import { View ,ScrollView, XStack, YStack, Text, Input, Image, Button, Select } from "tamagui";
import { Alert } from "react-native";
import { CarData } from "./AvailableCar"
import SelectDropdown from "react-native-select-dropdown"; 
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProfileProps } from "../types/session";

type RootStackParamList = {
  CarRentalForm: { 
    car: CarData 
    location: string; 
    pickupDate: string; 
    dropoffDate: string
  };
};

// type CarRentalFormNavigationProp = NavigationProp<{
//   Confirmation: {
//     carModel: string,
//     brandName: string,
//     color: string
//     location: string,
//     pickupDate: string,
//     dropoffDate: string,
//     price: number,
//     name: string,
//     driverLicense: string,
//   };
// }>;

type CarRentalFormScreenRouteProp = RouteProp<RootStackParamList, 'CarRentalForm'>;

const CarRentalFormScreen = ({ navigation, session }: ProfileProps) => {
  const route = useRoute<CarRentalFormScreenRouteProp>();
  // const navigation = useNavigation<CarRentalFormNavigationProp>();
  const { car, location, pickupDate, dropoffDate } = route.params;
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [driverLicense, setDriverLicense] = React.useState<string>("");
  
  const colorOption = car.colors ? car.colors.map((color) => ({ title: color })) : [];

  // Function to calculate the rental duration in days
  const calculateDuration = (pickup: string, dropoff: string): number => {
    const pickupDateObj = new Date(pickup);
    const dropoffDateObj = new Date(dropoff);
    const timeDifference = dropoffDateObj.getTime() - pickupDateObj.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24); // Convert from milliseconds to days
    return Math.ceil(dayDifference); // Round up to account for partial days
  };

  const duration = calculateDuration(pickupDate, dropoffDate);
  const totalPrice = duration * car.price;

  const handleContinue = () => {
    if (!selectedColor || !name || !driverLicense) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }
  
    navigation.navigate('Confirmation', {
      carModel: car.model,
      brandName: car.brand,
      color: selectedColor,
      location,
      pickupDate,
      dropoffDate,
      price: totalPrice,
      name: name,
      driverLicense: driverLicense
    });
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
        src={car.image}
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
      <XStack space="$2" marginBottom="$4">
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
          value={dropoffDate} // Display the dropoff date
          editable={false} // Make it read-only
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
        Color Option
      </Text>

      <View 
        borderWidth={0}
        borderColor="$gray7"
        borderRadius="$10"
        paddingHorizontal="$3"
        marginBottom="$4"
        bg="$gray3"
        height="60"
        display="flex"
        justifyContent="center"
        paddingInline="$4"
      >
      <SelectDropdown
            data={colorOption} // The location options
            onSelect={(selectedItem, index) =>
              setSelectedColor(selectedItem.title)
            }
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text
                    style={[
                      styles.dropdownButtonTxtStyle,
                      { color: selectedItem ? "black" : "#808080" },
                    ]}
                  >
                    {(selectedItem && selectedItem.title) || "Color"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF"}),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            dropdownStyle={styles.centeredDropdownStyle}
            showsVerticalScrollIndicator={false}
          />
      </View>

      {/* Your Information Fields */}
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        Your Information
      </Text>
      <Input
        value={name}
        onChangeText={setName}
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
        value={driverLicense} 
        onChangeText={setDriverLicense}
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
          onPress={handleContinue}
        >
          Continue to Book
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