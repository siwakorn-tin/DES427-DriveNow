import React, { useState } from "react";
import { useRoute, RouteProp } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { ProfileProps } from "../types/session";

type CarRentalRouteProp = RouteProp<
{
  CarRentalConfirmation: {
    carModel: string;
    brandName: string;
    carImage: string
    color: string;
    location: string;
    pickupDate: string;
    dropoffDate: string;
    price: number;
    name: string;
    driverLicense: string;
  };
  },
  'CarRentalConfirmation'
>;

const CarRentalConfirmation: React.FC <ProfileProps>= ({navigation,session}) => {
  const route = useRoute<CarRentalRouteProp>();
  const {
    carModel,
    brandName,
    carImage,
    color,
    location,
    pickupDate,
    dropoffDate,
    price,
    name,
    driverLicense,
  } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
      {/* Header */}
      <Text style={styles.header}>Car Rental Confirmation</Text>

      {/* Car Image */}
      <Image
        style={styles.carImage}
        source={{ uri: carImage }} // Replace with the actual car image URL
      />

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Car Model:</Text> {carModel}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Name of Brand:</Text> {brandName}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Color:</Text>
          <Text style={[styles.colorDot, { backgroundColor: color.toLowerCase() }]} /> {color}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Location:</Text> {location}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Pick-up Date:</Text> {pickupDate}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Drop-off Date:</Text> {dropoffDate}
        </Text>
        <Text style={styles.detailText}>
        <Text style={styles.label}>
          Duration: {(
            (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 3600 * 24)
          ).toFixed(0)} days
        </Text>
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Name:</Text> {name}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Driver License:</Text> {driverLicense}
        </Text>
        <TextInput
          style={styles.priceInput}
          value={"฿ " + price}
          editable={false}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // padding: 20,
    paddingInline: 50
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  carImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  detailsContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  priceInput: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginRight: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#B0B0B0",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CarRentalConfirmation;