import React from 'react';
import { ScrollView } from 'react-native';
import { YStack } from 'tamagui';
import CarBox from '../components/CarBox';

type RentalData = {
  model: string;
  brand: string;
  location: string;
  price: string;
  image: string;
  color: string;
  rentalDates: string;
};

const rentals: RentalData[] = [
    {
      model: 'Model',
      brand: 'Name of Brand',
      location: 'Bangkok',
      price: '1,000',
      image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
      color: 'Orange',
      rentalDates: '01/12/24 - 03/12/24',
    },
    {
        model: 'Model',
        brand: 'Name of Brand',
        location: 'Bangkok',
        price: '1,000',
        image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
        color: 'Orange',
        rentalDates: '01/12/24 - 03/12/24',   
    },
    {
        model: 'Model',
        brand: 'Name of Brand',
        location: 'Bangkok',
        price: '1,000',
        image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
        color: 'Orange',
        rentalDates: '01/12/24 - 03/12/24',   
    }
];

export default function RentalHistoryScreen(){
    return (
        <ScrollView>
        <YStack paddingBlock="$6" paddingInline="$5">
          {rentals.map((rental, index) => (
            <CarBox
              key={index}
              model={rental.model}
              brand={rental.brand}
              location={rental.location}
              price={rental.price}
              image={rental.image}
              color={rental.color}
              rentalDates={rental.rentalDates}
              isClickable={false}
            />
          ))}
        </YStack>
      </ScrollView>
    );
}

