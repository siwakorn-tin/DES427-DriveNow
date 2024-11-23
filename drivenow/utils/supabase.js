"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
require("react-native-url-polyfill/auto");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var supabase_js_1 = require("@supabase/supabase-js");
var react_native_1 = require("react-native");
exports.supabase = (0, supabase_js_1.createClient)(process.env.EXPO_PUBLIC_SUPABASE_URL || "", process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "", {
    auth: {
        storage: async_storage_1.default,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
react_native_1.AppState.addEventListener("change", function (state) {
    if (state === "active") {
        exports.supabase.auth.startAutoRefresh();
    }
    else {
        exports.supabase.auth.stopAutoRefresh();
    }
});
