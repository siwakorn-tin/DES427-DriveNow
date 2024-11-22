import { Session } from "@supabase/supabase-js";
import { NavigationProp } from "@react-navigation/native";
export interface ProfileProps {
  navigation: NavigationProp<any>;
  session: Session | null;
}
