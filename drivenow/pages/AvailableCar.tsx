import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Input } from 'tamagui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import CarBox from '../components/CarBox';

// Type for the car data
export type CarData = {
  model: string;
  brand: string;
  location: string;
  price: string;
  image: string;
};

type AvailableCarsNavigationProp = NavigationProp<{
    RentalForm: { car: CarData
        location: string; pickupDate: string; dropoffDate: string
     };
  }>;

type AvailableCarsRouteProp = RouteProp<{
  AvailableCars: { location: string; pickupDate: string; dropoffDate: string };
}, 'AvailableCars'>;

// Sample car data
const cars: CarData[] = [
  {
    model: 'AAAAA',
    brand: 'Toyota',
    location: 'Bangkok',
    price: '1,000',
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
  },
  {
    model: 'BBBB',
    brand: 'BMW',
    location: 'Bangkok',
    price: '1,500',
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
  },
  {
    model: 'CCCCCC',
    brand: 'Nissan',
    location: 'Bangkok',
    price: '2,000',
    image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
  },
];

const AvailableCarsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<AvailableCarsNavigationProp>();

  const route = useRoute<AvailableCarsRouteProp>();
  const { location, pickupDate, dropoffDate } = route.params;
  

  // Filter cars based on search query (brand or model)
  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
    const handleCarClick = (car: CarData) => {
      navigation.navigate('RentalForm', { car, location, pickupDate, dropoffDate});
    };

  return (
    <ScrollView>
      <YStack paddingBlock="$6" paddingInline="$5">
        <Text fontSize={18} lineHeight="27" paddingInline="$2">
            {/* Available cars {"\n"}during the selected dates */}
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
  );
};

export default AvailableCarsScreen;

// import React, { useState } from 'react';
// import { ScrollView } from 'react-native';
// import { YStack, Text, Input } from 'tamagui';
// import CarBox from '../components/CarBox';

// type CarData = {
//   model: string;
//   brand: string;
//   location: string;
//   price: string;
//   image: string;
// };

// const cars: CarData[] = [
//   {
//     model: 'AAAAA',
//     brand: 'Toyota',
//     location: 'Bangkok',
//     price: '1,000',
//     image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
//   },
//   {
//     model: 'BBBB',
//     brand: 'BMW',
//     location: 'Bangkok',
//     price: '1,500',
//     image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
//   },
//   {
//     model: 'CCCCCC',
//     brand: 'Nissan',
//     location: 'Bangkok',
//     price: '2,000',
//     image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
//   },
// ];

// export default function AvailableCarsScreen() {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter cars based on search query
//   const filteredCars = cars.filter(
//     (car) =>
//       car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       car.model.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <ScrollView>
//       <YStack paddingInline="$5">
//         {/* <Text fontSize={18} marginBottom="30" lineHeight="27">
//           Available cars {"\n"}during the selected dates
//         </Text> */}

//         {/* Search Box */}
//         <Input 
//             borderRadius="$10"
//             borderWidth="$1"
//             borderColor="$gray7"
//             backgroundColor="$gray1"
//             height={60}
//             marginBlock="$5"
//             placeholder="Search by Brand or Model"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//         />

//         {/* Display filtered cars */}
//         {filteredCars.map((car, index) => (
//           <CarBox
//             key={index}
//             model={car.model}
//             brand={car.brand}
//             location={car.location}
//             price={car.price}
//             image={car.image}
//           />
//         ))}
//       </YStack>
//     </ScrollView>
//   );
// }

// import React from 'react';
// import { ScrollView } from 'react-native';
// import { YStack, Text } from 'tamagui';
// import CarBox from '../components/CarBox';

// type CarData = {
//   model: string;
//   brand: string;
//   location: string;
//   price: string;
//   image: string;
// };

// const cars: CarData[] = [
//     {
//       model: 'Model',
//       brand: 'Name of Brand',
//       location: 'Bangkok',
//       price: '1,000',
//       image: 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
//     },
//     // Add more car data here
//   ];

// export default function AvailableCarsScreen(){
//     return (
//         <ScrollView>
//         <YStack paddingBlock="$6" paddingInline="$5">
//         <Text fontSize={18} marginBottom="30" lineHeight="27">
//         Available cars {"\n"}during the selected dates
//         </Text>
//           {cars.map((car, index) => (
//             <CarBox
//               key={index}
//               model={car.model}
//               brand={car.brand}
//               location={car.location}
//               price={car.price}
//               image={car.image}
//             />
//           ))}
//         </YStack>
//       </ScrollView>
//     );
//   }