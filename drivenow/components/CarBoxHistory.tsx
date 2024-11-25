import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text, YStack, XStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

type RentalInfo = {
  car: {
    brand: string;
    model: string;
    color?: string;
    rate: number;
    image: string;
  };
  rental: {
    rented_date: string;
    returned_date?: string;
    status: string;
  };
};

type CarBoxProps = {
  rentalInfo: RentalInfo;
  duration: number;
  totalPrice: number;
  onPress?: () => void;
  isClickable?: boolean;
};

const CarBoxHistory: React.FC<CarBoxProps> = ({
  rentalInfo,
  duration,
  totalPrice,
  onPress,
  isClickable = true,
}) => {
  const { car, rental } = rentalInfo;

  const textStyle = {
    fontSize: 14, // Consistent font size
    color: "black", // Set color to black
  };

  const renderContent = (
    <YStack
      paddingBlock="$5"
      paddingInline="$4.5"
      borderRadius="$10"
      borderWidth="$1"
      borderColor="$gray7"
      marginBottom="$5"
      width="100%"
      backgroundColor="$gray1"
    >
      <XStack alignItems="center" space="$3">
        {/* Car Details */}
        <YStack flex={1} space="$2">
          <Text fontWeight="800" style={{ ...textStyle, fontSize: 18 }}>
            {`${car.brand || "Unknown"} ${car.model || ""}`.trim()}
          </Text>

          <Text style={textStyle}>Color: {car.color || "N/A"}</Text>
          <XStack alignItems="center" space="$1">
            {/* <FontAwesome name="calendar" size={16} color="gray" /> */}
            <Text style={textStyle}>
              {`Rented Date: ${rental.rented_date || "N/A"}`}
            </Text>
          </XStack>

          <Text style={textStyle}>
            {`Expected Return Date: ${rental.returned_date || "Not returned"}`}
          </Text>
          <Text style={textStyle}>{`Duration: ${duration} days`}</Text>
          <Text style={textStyle}>{`Rate: ฿${car.rate || "N/A"}/day`}</Text>
          <Text style={textStyle}>{`Total Price: ฿${totalPrice}`}</Text>
          <Text style={textStyle}>{`Status: ${
            rental.status || "Unknown"
          }`}</Text>
        </YStack>

        {/* Car Image */}
        <Image
          source={require("../assets/car.png")} // Correctly import the local image
          style={{ width: 120, height: 120 }}
          resizeMode="cover"
        />
      </XStack>
    </YStack>
  );

  // Only wrap in TouchableOpacity if isClickable is true
  if (isClickable && onPress) {
    return (
      <TouchableOpacity onPress={onPress}>{renderContent}</TouchableOpacity>
    );
  } else {
    return <YStack>{renderContent}</YStack>;
  }
};

export default CarBoxHistory;
