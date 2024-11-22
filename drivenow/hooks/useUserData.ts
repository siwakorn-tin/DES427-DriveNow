import { useState, useEffect, useCallback } from "react";
import { Session } from "@supabase/supabase-js";
import { getUser } from "../utils/user";
import { UserData } from "../types/userData";
import { useFocusEffect } from "@react-navigation/native";
import { TableRow } from "../types/database.types";

const useUserData = (session: Session) => {
  const [data, setData] = useState<TableRow<"user"> | null>(null);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const user = await getUser(session);
          if (user) {
            setData(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [session])
  );

  return { data, loading };
};

export default useUserData;
