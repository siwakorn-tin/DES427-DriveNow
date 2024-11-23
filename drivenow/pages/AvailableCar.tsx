import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Text, Input, View } from 'tamagui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import CarBox from '../components/CarBox';
import { FontAwesome } from '@expo/vector-icons';

// Sample car data
const cars: CarData[] = [
  {
    model: 'AAAAA',
    brand: 'Toyota',
    location: 'Bangkok',
    price: 1000,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Red', 'Green', 'Blue']
  },
  {
    model: 'BBBB',
    brand: 'BMW',
    location: 'Bangkok',
    price: 1500,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Silver', 'Gold', 'Blonde']
  },
  {
    model: 'CCCCCC',
    brand: 'Nissan',
    location: 'Bangkok',
    price: 2000,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Red', 'Green', 'Blue']
  },
  {
    model: 'DDDDD',
    brand: 'Honda',
    location: 'Chiang Mai',
    price: 2000,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Black', 'White', 'Gray']
  },
  {
    model: 'EEEEE',
    brand: 'Mazda',
    location: 'Chiang Mai',
    price: 2000,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Blue', 'Yellow', 'Orange']
  },
  {
    model: 'FFFFF',
    brand: 'Ford',
    location: 'Phuket',
    price: 2000,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Red', 'White', 'Black']
  },
  {
    model: 'GGGGG',
    brand: 'Chevrolet',
    location: 'Phuket',
    price: 1700,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Gray', 'Silver', 'Green']
  },
  {
    model: 'HHHHH',
    brand: 'Mercedes',
    location: 'Kon Kaen',
    price: 2500,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Gold', 'Black', 'White']
  },
  {
    model: 'IIIII',
    brand: 'Hyundai',
    location: 'Kon Kaen',
    price: 1300,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['Red', 'Blue', 'Silver']
  },
  {
    model: 'JJJJJ',
    brand: 'Kia',
    location: 'Bangkok',
    price: 1600,
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
    colors: ['White', 'Green', 'Black']
  }
];

export type CarData = {
  model: string;
  brand: string;
  location: string;
  price: number;
  image: string;
  colors: string[];
};

type AvailableCarsNavigationProp = NavigationProp<{
    RentalForm: { 
      car: CarData
      location: string; 
      pickupDate: string; 
      dropoffDate: string
    };
    History: undefined;
  }>;

type AvailableCarsRouteProp = RouteProp<{
  AvailableCars: { 
    location: string; 
    pickupDate: string; 
    dropoffDate: string 
  };
}, 'AvailableCars'>;

const AvailableCarsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<AvailableCarsNavigationProp>();

  const route = useRoute<AvailableCarsRouteProp>();
  const { location, pickupDate, dropoffDate } = route.params;
  

  // Filter cars based on search query (brand or model)
  const filteredCars = cars.filter(
    (car) =>
      car.location.toLowerCase() === location.toLowerCase() && (
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  
    const handleCarClick = (car: CarData) => {
      navigation.navigate('RentalForm', { car, location, pickupDate, dropoffDate});
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
            placeholder="Search by Brand or Model"
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
            location={car.location}
            price={car.price}
            image={car.image}
            onPress={() => handleCarClick(car)} // OnClick event to navigate
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