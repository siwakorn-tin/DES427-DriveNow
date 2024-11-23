import { Database } from "../types/database.types";
import { supabase } from "./supabase";
import { faker } from "@faker-js/faker";
const cityEnumValues: Database["public"]["Enums"]["city"][] = [
  "Bangkok",
  "Chiang Mai",
  "Kon Kaen",
  "Phuket",
];
const carstatusEnumValues: Database["public"]["Enums"]["carstatus"][] = [
  "available",
  "broken",
  "maintainance",
];
const colorEnumValues: Database["public"]["Enums"]["carcolor"][] = [
  "black",
  "blue",
  "brown",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "white",
  "yellow",
];
const generateCar: () => Database["public"]["Tables"]["cars"]["Row"] = () => {
  return {
    brand: faker.vehicle.manufacturer(),
    carstatus: faker.helpers.arrayElement(carstatusEnumValues),
    city: faker.helpers.arrayElement(cityEnumValues),
    color: faker.helpers.arrayElement(colorEnumValues),
    created_at: new Date().toDateString(),
    description: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    rate: faker.helpers.arrayElement([700, 1000, 1200, 1800]),
    id: faker.helpers.rangeToNumber({ min: 1, max: 1000 }),
  };
};
console.log(generateCar());
// const car = supabase.from("cars").insert(generateCar());
