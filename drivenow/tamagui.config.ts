import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui"; // or '@tamagui/core'

const appConfig = createTamagui(config);

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
