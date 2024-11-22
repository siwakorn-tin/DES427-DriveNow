import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const CarRentalConfirmation: React.FC = () => {
  const [carModel, setCarModel] = useState<string>("Model");
  const [brandName, setBrandName] = useState<string>("Toyota");
  const [color, setColor] = useState<string>("Orange");
  const [location, setLocation] = useState<string>("Bangkok");
  const [pickupDate, setPickupDate] = useState<string>("01/12/24");
  const [dropoffDate, setDropoffDate] = useState<string>("05/12/24");
  const [duration, setDuration] = useState<string>("4 Days");
  const [name, setName] = useState<string>("Anne Eiei");
  const [driverLicense, setDriverLicense] = useState<string>("123456789");
  const [price, setPrice] = useState<number>(2000);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Car Rental Confirmation</Text>

      {/* Car Image */}
      <Image
        style={styles.carImage}
        source={{ uri: "https://via.placeholder.com/300" }} // Replace with the actual car image URL
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
          <Text style={styles.label}>Duration:</Text> {duration}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
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