import { useMemo, useState } from "react";
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
};

export const useQuoteForm = () => {
  const { dni, celular, aceptaPP, aceptaMkt, set } = useAppStore();
  const [tipoDocumento, setTipoDocumento] = useState("dni");
  const [loading, setLoading] = useState(false);

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
  };
};