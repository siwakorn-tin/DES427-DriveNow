export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cars: {
        Row: {
          brand: string;
          carstatus: Database["public"]["Enums"]["carstatus"];
          city: Database["public"]["Enums"]["city"];
          color: Database["public"]["Enums"]["carcolor"];
          created_at: string;
          description: string;
          id: number;
          model: string;
          rate: number;
        };
        Insert: {
          brand: string;
          carstatus: Database["public"]["Enums"]["carstatus"];
          city?: Database["public"]["Enums"]["city"];
          color: Database["public"]["Enums"]["carcolor"];
          created_at?: string;
          description: string;
          id?: number;
          model: string;
          rate: number;
        };
        Update: {
          brand?: string;
          carstatus?: Database["public"]["Enums"]["carstatus"];
          city?: Database["public"]["Enums"]["city"];
          color?: Database["public"]["Enums"]["carcolor"];
          created_at?: string;
          description?: string;
          id?: number;
          model?: string;
          rate?: number;
        };
        Relationships: [];
      };
      rental: {
        Row: {
          car_id: number;
          expected_returned_date: string;
          id: number;
          rented_date: string;
          returned_date: string;
          staff_returned_id: number | null;
          status: Database["public"]["Enums"]["rental_status"];
          user_id: number;
        };
        Insert: {
          car_id: number;
          expected_returned_date: string;
          id?: number;
          rented_date: string;
          returned_date: string;
          staff_returned_id?: number | null;
          status: Database["public"]["Enums"]["rental_status"];
          user_id: number;
        };
        Update: {
          car_id?: number;
          expected_returned_date?: string;
          id?: number;
          rented_date?: string;
          returned_date?: string;
          staff_returned_id?: number | null;
          status?: Database["public"]["Enums"]["rental_status"];
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rental_car_id_fkey";
            columns: ["car_id"];
            isOneToOne: false;
            referencedRelation: "cars";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rental_staff_returned_id_fkey";
            columns: ["staff_returned_id"];
            isOneToOne: false;
            referencedRelation: "staff";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rental_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      staff: {
        Row: {
          fullname: string;
          id: number;
          role: string;
        };
        Insert: {
          fullname: string;
          id?: number;
          role: string;
        };
        Update: {
          fullname?: string;
          id?: number;
          role?: string;
        };
        Relationships: [];
      };
      user: {
        Row: {
          fullname: string;
          id: number;
          license_number: string;
          user_id: string | null;
        };
        Insert: {
          fullname: string;
          id?: number;
          license_number: string;
          user_id?: string | null;
        };
        Update: {
          fullname?: string;
          id?: number;
          license_number?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      carcolor:
        | "red"
        | "yellow"
        | "blue"
        | "green"
        | "orange"
        | "purple"
        | "white"
        | "black"
        | "pink"
        | "brown";
      carstatus: "maintainance" | "available" | "broken";
      city: "Bangkok" | "Chiang Mai" | "Phuket" | "Kon Kaen";
      rental_status: "booking" | "payment" | "successful" | "refunded";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
