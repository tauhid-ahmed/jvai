import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface ConfigState {
  theme: "dark" | "light";
  isInitialized: boolean;
  preferredColorScheme: "auto" | "dark" | "light";
}

const STORAGE_KEY = "appConfig";
const DEFAULT_THEME = "light";
const DEFAULT_PREFERRED_COLOR_SCHEME = "auto";

const getSystemColorScheme = (): "dark" | "light" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

const getStoredConfig = (): Partial<ConfigState> | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch (error) {
    console.warn("Failed to parse appConfig from localStorage:", error);
    return null;
  }
};

const persistConfig = (config: ConfigState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Failed to persist appConfig to localStorage:", error);
  }
};

const storedConfig = getStoredConfig();
const initialState: ConfigState = {
  theme: storedConfig?.theme ?? DEFAULT_THEME,
  isInitialized: true,
  preferredColorScheme:
    storedConfig?.preferredColorScheme ?? DEFAULT_PREFERRED_COLOR_SCHEME,
};

const updateDocumentTheme = (theme: "dark" | "light"): void => {
  const html = document.documentElement;
  html.classList.remove("dark", "light");
  html.classList.add(theme);
};

const resolveThemeFromPreference = (
  preference: "auto" | "dark" | "light"
): "dark" | "light" => {
  if (preference === "auto") {
    return getSystemColorScheme();
  }
  return preference;
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
      state.preferredColorScheme = action.payload; // Update preferred color scheme to match
      updateDocumentTheme(action.payload);
      persistConfig(state);
    },

    toggleTheme: (state) => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = nextTheme;
      state.preferredColorScheme = nextTheme; // Update preferred color scheme to match
      updateDocumentTheme(nextTheme);

      persistConfig(state);
    },

    setPreferredColorScheme: (
      state,
      action: PayloadAction<"auto" | "dark" | "light">
    ) => {
      state.preferredColorScheme = action.payload;
      const resolvedTheme = resolveThemeFromPreference(action.payload);
      state.theme = resolvedTheme;
      updateDocumentTheme(resolvedTheme);
      persistConfig(state);
    },

    syncWithSystemColorScheme: (state) => {
      if (state.preferredColorScheme === "auto") {
        const systemTheme = getSystemColorScheme();
        state.theme = systemTheme;
        updateDocumentTheme(systemTheme);
        persistConfig(state);
      }
    },

    resetConfig: (state) => {
      state.theme = DEFAULT_THEME;
      state.isInitialized = true;
      state.preferredColorScheme = DEFAULT_PREFERRED_COLOR_SCHEME;
      updateDocumentTheme(DEFAULT_THEME);

      persistConfig(state);
    },

    initializeConfig: (state) => {
      state.isInitialized = true;
      document.documentElement.classList.add(initialState.theme);
      persistConfig(state);
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  resetConfig,
  initializeConfig,
  setPreferredColorScheme,
  syncWithSystemColorScheme,
} = appConfigSlice.actions;

// Selectors
export const selectTheme = (state: RootState) => state.config.theme;
export const selectIsConfigInitialized = (state: RootState) =>
  state.config.isInitialized;
export const selectIsDarkMode = (state: RootState) =>
  state.config.theme === "dark";
export const selectPreferredColorScheme = (state: RootState) =>
  state.config.preferredColorScheme;
export const selectIsAutoColorScheme = (state: RootState) =>
  state.config.preferredColorScheme === "auto";

export default appConfigSlice.reducer;
