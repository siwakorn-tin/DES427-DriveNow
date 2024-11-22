import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, YStack, XStack, Button } from 'tamagui';
// import {MapPin} from '@tamagui/lucide-icons';
// import * as Icon from '@tamagui/lucide-icons';
import { FontAwesome } from '@expo/vector-icons';

type CarBoxProps = {
  model: string;
  brand: string;
  location: string;
  price: string;
  image: string;
  color?: string;
  rentalDates?: string;
  onPress?: () => void;
  isClickable?: boolean;
};

const CarBox: React.FC<CarBoxProps> = ({
  model,
  brand,
  location,
  price,
  image,
  color,
  rentalDates,
  onPress,
  isClickable = true
}) => {
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
            <YStack flex={1} space="$2">
            {/* Car Details */}
            <Text fontWeight="800" fontSize="$6">
                {model}
            </Text>

            <Text color="$black" fontSize="$3">
                {brand}
            </Text>

            <XStack>
            {color && (
                <Text fontSize="$1">
                    Color {color}
                </Text>
            )}
            </XStack>

            <XStack alignItems="center" space="$1">
                <XStack
                width={20} // Set the same width for both icons' container
                height={16} // Set the height of the container
                justifyContent="center"
                alignItems="center"
                >
                <FontAwesome name="map-marker" size={16} color="gray" />
                </XStack>
                <Text fontSize="$1" color="$gray9">
                    {location}
                </Text>
            </XStack>

            <XStack>
            {rentalDates && (
                <XStack alignItems="center" space="$1">
                <XStack
                width={20} // Set the same width for both icons' container
                height={16} // Set the height of the container
                justifyContent="center"
                alignItems="center"
                >
                <FontAwesome name="calendar" size={16} color="gray" />
                </XStack>
                <Text fontSize="$1" color="$gray9">
                    {rentalDates}
                </Text>
                </XStack>
            )}
            </XStack>
            
            <Text fontWeight="600" fontSize="$4">{price} THB / Day

            </Text>
            </YStack>
            
            {/* Car Image */}
            <Image
            source={{ uri: image }}
            style={{ width: 120, height: 120}}
            resizeMode="cover"
            />
        </XStack>
    </YStack>
  );
    // Only wrap in TouchableOpacity if isClickable is true
    if (isClickable && onPress) {
        return (
          <TouchableOpacity onPress={onPress}>
            {renderContent}
          </TouchableOpacity>
        );
      }
    else {
        return (
            <YStack>
            {renderContent}
          </YStack>
          );
    }
};

export default CarBox;