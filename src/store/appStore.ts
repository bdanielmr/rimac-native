import { create } from "zustand";

type AppState = {
  dni: string;
  celular: string;
  aceptaPP: boolean;
  aceptaMkt: boolean;
  set: (p: Partial<AppState>) => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  dni: "",
  celular: "",
  aceptaPP: false,
  aceptaMkt: false,
  set: (p) => set(p),
  reset: () =>
    set({ dni: "", celular: "", aceptaPP: false, aceptaMkt: false }),
}));
