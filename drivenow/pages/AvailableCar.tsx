import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Text, Input, View } from 'tamagui';
import { useRoute, RouteProp } from '@react-navigation/native';
import CarBox from '../components/CarBox';
import { FontAwesome } from '@expo/vector-icons';
import { ProfileProps } from "../types/session";
import useUserData from "../hooks/useUserData";

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
    cars: CarData[];
  };
}, 'AvailableCars'>;

const AvailableCarsScreen = ({ navigation, session }: ProfileProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: user, loading } = useUserData(session);
  const route = useRoute<AvailableCarsRouteProp>();
  const { location, pickupDate, dropoffDate, cars } = route.params;

  const filteredCars = cars.filter((car) => {
    const searchTerms = searchQuery.toLowerCase().replace(/\s+/g, '').split('');
    const carString = `${car.brand} ${car.model} ${car.color}`.toLowerCase().replace(/\s+/g, '');
  
    return (
      car.city.toLowerCase().replace(/\s+/g, '') === location.toLowerCase().replace(/\s+/g, '') &&
      searchTerms.every((term) => carString.includes(term))
    );
  });
  
  
  const handleCarClick = (car: CarData) => {
    navigation.navigate('RentalForm', { 
      car, 
      location, 
      pickupDate, 
      dropoffDate,
      user,
    });
  };

  return (
    <View bg="white" height="100%">
    <ScrollView>
      <YStack paddingBlock="$6" paddingInline="$5">
        <Text fontSize={18} lineHeight="27" paddingInline="$2">
            Available cars in {location}{"\n"}from {pickupDate} to {dropoffDate}
        </Text>

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

        {filteredCars.map((car, index) => (
          <CarBox
            key={index}
            model={car.model}
            brand={car.brand}
            location={car.city}
            price={car.rate}
            image={"https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg"}
            // image={car.image}
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