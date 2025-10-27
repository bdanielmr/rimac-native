import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";

interface User {
  name: string;
  lastName: string;
  birthDay: string;
}

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

interface SelectedPlanInfo {
  userName: string;
  userLastName: string;
  dni: string;
  celular: string;
  planName: string;
  planCost: number;
  beneficiaryType: "para-mi" | "para-alguien-mas";
  selectedAt: number;
}

type AppState = {
  dni: string;
  celular: string;
  aceptaPP: boolean;
  aceptaMkt: boolean;
  cachedUser: User | null;
  cachedPlans: Plan[];
  lastFetchedDni: string | null;
  cacheTimestamp: number;
  
  selectedPlanInfo: SelectedPlanInfo | null;
  
  set: (p: Partial<AppState>) => void;
  setCachedData: (user: User, plans: Plan[], dni: string) => void;
  shouldFetchData: (dni: string) => boolean;
  setSelectedPlanInfo: (planInfo: SelectedPlanInfo) => void;
  reset: () => void;
  loadFromStorage: () => Promise<void>;
};

const CACHE_DURATION = 5 * 60 * 1000;
const STORAGE_KEY = "rimac-app-storage";

const saveToStorage = async (state: Partial<AppState>) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

const loadFromStorage = async (): Promise<Partial<AppState> | null> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    
    if (data.cacheTimestamp) {
      const now = Date.now();
      const cacheExpired = now - data.cacheTimestamp > CACHE_DURATION;
      
      if (cacheExpired) {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error loading from storage:", error);
  }
  return null;
};

export const useAppStore = create<AppState>((set, get) => ({
  dni: "",
  celular: "",
  aceptaPP: false,
  aceptaMkt: false,
  cachedUser: null,
  cachedPlans: [],
  lastFetchedDni: null,
  cacheTimestamp: 0,
  selectedPlanInfo: null,
  
  set: (p) => {
    set(p);
    const state = get();
    saveToStorage(state);
  },
  
  setCachedData: (user, plans, dni) => {
    const newState = {
      cachedUser: user,
      cachedPlans: plans,
      lastFetchedDni: dni,
      cacheTimestamp: Date.now(),
    };
    set(newState);
    saveToStorage({ ...get(), ...newState });
  },
  
  shouldFetchData: (dni) => {
    const state = get();
    const now = Date.now();
    const cacheExpired = now - state.cacheTimestamp > CACHE_DURATION;
    const dniChanged = state.lastFetchedDni !== dni;
    
    return !state.cachedUser || dniChanged || cacheExpired;
  },
  
  setSelectedPlanInfo: (planInfo) => {
    set({ selectedPlanInfo: planInfo });
    const state = get();
    saveToStorage(state);
  },
  
  reset: () => {
    const resetState = {
      dni: "",
      celular: "",
      aceptaPP: false,
      aceptaMkt: false,
      cachedUser: null,
      cachedPlans: [],
      lastFetchedDni: null,
      cacheTimestamp: 0,
      selectedPlanInfo: null,
    };
    set(resetState);
    saveToStorage(resetState);
  },
  
  loadFromStorage: async () => {
    const stored = await loadFromStorage();
    if (stored) {
      set(stored as Partial<AppState>);
    }
  },
}));

useAppStore.getState().loadFromStorage();