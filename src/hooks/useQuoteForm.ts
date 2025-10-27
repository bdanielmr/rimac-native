import { useEffect, useMemo, useState } from "react";
import { fetchPlans, fetchUser } from "../services/api";
import { useAppStore } from "../store/appStore";

interface ValidationRules {
  dni: RegExp;
  celular: RegExp;
}

const VALIDATION_RULES: ValidationRules = {
  dni: /^\d{8}$/,
  celular: /^9\d{8}$/,
};

const ERROR_MESSAGES = {
  dni: "Debe tener 8 dígitos",
  celular: "Empieza en 9 y tiene 9 dígitos",
  fetchUser: "Error al obtener datos del usuario",
  fetchPlans: "Error al obtener planes disponibles",
  dniRequired: "DNI no proporcionado",
};

export const useQuoteForm = () => {
  const { 
    dni, 
    celular, 
    aceptaPP, 
    aceptaMkt, 
    set, 
    shouldFetchData, 
    setCachedData,
    loadFromStorage
  } = useAppStore();
  
  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  useEffect(() => {
    const initStorage = async () => {
      try {
        await loadFromStorage();
      } catch (err) {
        console.error("error cargando storage:", err);
      } finally {
        setIsStorageLoaded(true);
      }
    };
    initStorage();
  }, [loadFromStorage]);

  const dniError = useMemo(() => {
    if (!dni) return undefined;
    return VALIDATION_RULES.dni.test(dni) ? undefined : ERROR_MESSAGES.dni;
  }, [dni]);

  const celError = useMemo(() => {
    if (!celular) return undefined;
    return VALIDATION_RULES.celular.test(celular)
      ? undefined
      : ERROR_MESSAGES.celular;
  }, [celular]);

  const isFormValid = useMemo(
    () => !!dni && !dniError && !!celular && !celError && !!aceptaPP,
    [dni, dniError, celular, celError, aceptaPP]
  );

  const handleDniChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, "").slice(0, 8);
    set({ dni: cleanedText });
  };

  const handleCelularChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, "").slice(0, 9);
    set({ celular: cleanedText });
  };

  const handleAceptaPPChange = (value: boolean) => {
    set({ aceptaPP: value });
  };

  const handleAceptaMktChange = (value: boolean) => {
    set({ aceptaMkt: value });
  };

  const fetchData = async (): Promise<boolean> => {
    if (!dni) {
      setError(ERROR_MESSAGES.dniRequired);
      return false;
    }

    if (dniError) {
      setError(dniError);
      return false;
    }

    if (!shouldFetchData(dni)) {
      return true;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchUser();
      
      if (!userData) {
        throw new Error(ERROR_MESSAGES.fetchUser);
      }
      
      const plansData = await fetchPlans();
      
      if (!plansData || !plansData.list) {
        throw new Error(ERROR_MESSAGES.fetchPlans);
      }
      
      setCachedData(userData, plansData.list, dni);

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "error desconocido";
      setError(errorMessage);
      console.error("error fetching data:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    dni,
    celular,
    aceptaPP,
    aceptaMkt,
    tipoDocumento,
    setTipoDocumento,
    dniError,
    celError,
    isFormValid,
    handleDniChange,
    handleCelularChange,
    handleAceptaPPChange,
    handleAceptaMktChange,
    loading,
    setLoading,
    error,
    fetchData,
    isStorageLoaded,
  };
};