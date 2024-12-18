import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Ensure this library is installed
import SelectDropdown from "react-native-select-dropdown"; // Import SelectDropdown
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ProfileProps } from "../types/session";
import { searchAvailableCars } from "../utils/api";

import { useNavigation, NavigationProp } from "@react-navigation/native";

type SearchNavigationProp = NavigationProp<{
  Available: { location: string; pickupDate: string; dropoffDate: string };
}>;

const CarRentalSearch: React.FC<ProfileProps> = ({ navigation, session }) => {
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [dropoffDate, setDropoffDate] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<
    "pickup" | "dropoff" | null
  >(null);

  const pickupLocations = [
    { title: "Bangkok", value: "Bangkok" },
    { title: "Chiang Mai", value: "Chiang Mai" },
    { title: "Phuket", value: "Phuket" },
    { title: "Kon Kaen", value: "Kon Kaen" },
  ];

  const showDatePicker = (picker: "pickup" | "dropoff") => {
    setCurrentPicker(picker);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setCurrentPicker(null);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    if (currentPicker === "pickup") {
      setPickupDate(formattedDate);
    } else if (currentPicker === "dropoff") {
      setDropoffDate(formattedDate);
    }
    hideDatePicker();
  };

  const handleSearch = async () => {
    if (!pickupLocation || !pickupDate || !dropoffDate) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }
    const cars = await searchAvailableCars({
      city: pickupLocation,
      startDate: pickupDate,
      endDate: dropoffDate,
    });
    console.log(cars?.length, cars);
    // Navigate to AvailableCars with the form data
    navigation.navigate("Available", {
      location: pickupLocation,
      pickupDate: pickupDate,
      dropoffDate: dropoffDate,
      cars: cars,
    });
  };

  const getMinimumDate = () => {
    if (currentPicker === "pickup") {
      return new Date();
    } else if (currentPicker === "dropoff") {
      return pickupDate ? new Date(new Date(pickupDate).getTime() + 24 * 60 * 60 * 1000) : new Date();
    }
    return undefined;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>for a car rental</Text>
          <Icon name="directions-car" size={24} color="black" />
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="place" size={20} color="gray" style={styles.icon} />
          <SelectDropdown
            data={pickupLocations}
            onSelect={(selectedItem, index) =>
              setPickupLocation(selectedItem.value)
            }
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text
                    style={[
                      styles.dropdownButtonTxtStyle,
                      { color: selectedItem ? "black" : "#808080" }, // Conditional font color
                    ]}
                  >
                    {(selectedItem && selectedItem.title) || "Pick-up location"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Date Pickers */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => showDatePicker("pickup")}
        >
          <Icon
            name="calendar-today"
            size={20}
            color="gray"
            style={styles.icon}
          />
          <Text style={pickupDate ? styles.input : styles.placeholderText}>
            {pickupDate || "Pick-up date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => showDatePicker("dropoff")}
        >
          <Icon
            name="calendar-today"
            size={20}
            color="gray"
            style={styles.icon}
          />
          <Text style={dropoffDate ? styles.input : styles.placeholderText}>
            {dropoffDate || "Drop-off date"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={getMinimumDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="black" // Set text color to black
      />
    </View>
  );
};

// Style Definitions
interface Styles {
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  subtitleContainer: ViewStyle;
  subtitle: TextStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  icon: TextStyle;
  input: TextStyle;
  placeholderText: TextStyle;
  searchButton: ViewStyle;
  searchButtonText: TextStyle;
  dropdownButtonStyle: ViewStyle;
  dropdownButtonIconStyle: TextStyle;
  dropdownButtonTxtStyle: TextStyle;
  dropdownItemStyle: ViewStyle;
  dropdownItemTxtStyle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 22,
    marginRight: 8,
    marginVertical: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 50,
    height: 60,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "black",
  },
  placeholderText: {
    flex: 1,
    fontSize: 18,
    color: "#808080",
  },
  searchButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  dropdownButtonIconStyle: {
    marginRight: 10,
    fontSize: 24,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    color: "gray",
  },
  dropdownItemStyle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 500,
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
  },
});

export default CarRentalSearch;
