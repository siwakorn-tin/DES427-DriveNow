import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Text, Input, View } from 'tamagui';
import { useRoute, RouteProp } from '@react-navigation/native';
import CarBox from '../components/CarBox';
import { FontAwesome } from '@expo/vector-icons';
import { ProfileProps } from "../types/session";

const cars: CarData[] = [
  {
    id: 1,
    model: 'Model A',
    brand: 'Toyota',
    city: 'Bangkok',
    color: 'Red',
    created_at: '2024-11-24',
    description: 'A red Toyota Model A.',
    rate: 1000,
    carstatus: 'Available',
    image: 'https://link-to-image.com/toyota-model-a.jpg'
  },
  {
    id: 2,
    model: 'Model B',
    brand: 'Toyota',
    city: 'Bangkok',
    color: 'Blue',
    created_at: '2024-11-24',
    description: 'A blue Toyota Model B.',
    rate: 1200,
    carstatus: 'Available',
    image: 'https://link-to-image.com/toyota-model-b.jpg'
  },
  {
    id: 3,
    model: 'Model A',
    brand: 'BMW',
    city: 'Chiang Mai',
    color: 'Black',
    created_at: '2024-11-24',
    description: 'A black BMW Model A.',
    rate: 1500,
    carstatus: 'Available',
    image: 'https://link-to-image.com/bmw-model-a.jpg'
  },
  {
    id: 4,
    model: 'Model A',
    brand: 'Toyota',
    city: 'Bangkok',
    color: 'Blue',
    created_at: '2024-11-24',
    description: 'A blue Toyota Model A.',
    rate: 1000,
    carstatus: 'Available',
    image: 'https://link-to-image.com/toyota-model-a.jpg'
  },
];

export type CarData = {
  brand: string;
  carstatus: string;
  city: string;
  color: string;
  created_at: string;
  description: string;
  id: number;
  model: string;
  rate: number;
  image: string;
};

type AvailableCarsRouteProp = RouteProp<{
  AvailableCars: { 
    location: string; 
    pickupDate: string; 
    dropoffDate: string;
    // cars: CarData[];
  };
}, 'AvailableCars'>;

const AvailableCarsScreen = ({ navigation }: ProfileProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const route = useRoute<AvailableCarsRouteProp>();
  const { location, pickupDate, dropoffDate } = route.params;
  // const { location, pickupDate, dropoffDate, cars } = route.params;

  const filteredCars = cars.filter((car) => {
    const searchTerms = searchQuery.toLowerCase().replace(/\s+/g, '').split(''); // Remove spaces and split into terms
    const carString = `${car.brand} ${car.model} ${car.color}`.toLowerCase().replace(/\s+/g, ''); // Remove spaces from car properties
  
    return (
      car.city.toLowerCase().replace(/\s+/g, '') === location.toLowerCase().replace(/\s+/g, '') &&
      searchTerms.every((term) => carString.includes(term)) // Check if all terms match
    );
  });
  
  
  const handleCarClick = (car: CarData) => {
    navigation.navigate('RentalForm', { 
      car, 
      location, 
      pickupDate, 
      dropoffDate
    });
  };

  return (
    <View bg="white" height="100%">
    <ScrollView>
      <YStack paddingBlock="$6" paddingInline="$5">
        <Text fontSize={18} lineHeight="27" paddingInline="$2">
            Available cars in {location}{"\n"}from {pickupDate} to {dropoffDate}
        </Text>

        {/* Search Box */}
        <Input 
            borderRadius="$10"
            borderWidth="$1"
            borderColor="$gray7"
            backgroundColor="$gray1"
            height={60}
            marginBlock="$5"
            placeholder="Search by Brand, Model or Color"
            value={searchQuery}
            onChangeText={setSearchQuery}
            fontSize="$4"
        />

        {/* Display filtered cars */}
        {filteredCars.map((car, index) => (
          <CarBox
            key={index}
            model={car.model}
            brand={car.brand}
            location={car.city}
            price={car.rate}
            image={car.image}
            color={car.color}
            onPress={() => handleCarClick(car)}
          />
        ))}

      </YStack>
    </ScrollView>
      <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 30,
            right: 20,
            backgroundColor: 'black',
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 50,
            elevation: 5,
            alignItems: 'center',
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate("History")}
        >
          <FontAwesome name="history" size={24} color="white" />
        </TouchableOpacity>
        </View>
  );
};

export default AvailableCarsScreen;