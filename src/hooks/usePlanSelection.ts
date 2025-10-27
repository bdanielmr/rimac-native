import { useMemo, useState } from "react";
import { useAppStore } from "../store/appStore";
import { BeneficiaryType, PlanType } from "../types";
import { calculateAge, transformApiPlansToFormat } from "../utils";


export const usePlanSelection = () => {
  const [beneficiaryType, setBeneficiaryType] = useState<BeneficiaryType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const { cachedUser, cachedPlans, dni, celular, setSelectedPlanInfo } = useAppStore();

  const userAge = useMemo(() => {
    if (!cachedUser?.birthDay) return 0;
    return calculateAge(cachedUser.birthDay);
  }, [cachedUser]);

  const filteredApiPlans = useMemo(() => {
    if (!cachedPlans || cachedPlans.length === 0) return [];
    
    const filtered = cachedPlans.filter((plan) => {
      const isEligible = userAge <= plan.age;
      return isEligible;
    });
    
    return filtered;
  }, [cachedPlans, userAge]);

  const formattedPlans = useMemo(() => {
    if (filteredApiPlans.length === 0) return null;
    
    const transformed = transformApiPlansToFormat(filteredApiPlans);
    return transformed;
  }, [filteredApiPlans]);

  const currentPlans = useMemo(() => {
    if (!beneficiaryType || !formattedPlans) return [];
    return formattedPlans[beneficiaryType];
  }, [beneficiaryType, formattedPlans]);

  const handleBeneficiarySelect = (type: BeneficiaryType) => {
    setBeneficiaryType((prev) => (prev === type ? null : type));
  };

  const handlePlanSelect = (planId: PlanType) => {
    setSelectedPlan(planId);
    
    const selectedPlanDetails = currentPlans.find((plan) => plan.id === planId);
    
    if (selectedPlanDetails && cachedUser && beneficiaryType) {

      const planInfo = {
        userName: cachedUser.name,
        userLastName: cachedUser.lastName,
        dni: dni,
        celular: celular,
        planName: selectedPlanDetails.name,
        planCost: selectedPlanDetails.cost,
        beneficiaryType: beneficiaryType,
        selectedAt: Date.now(),
      };
      
      setSelectedPlanInfo(planInfo);
    }
  };

  const goBack = () => {
    setBeneficiaryType(null);
    setSelectedPlan(null);
  };

  return {
    beneficiaryType,
    selectedPlan,
    currentPlans,
    selectedPlanDetails: currentPlans.find((plan) => plan.id === selectedPlan) || null,
    handleBeneficiarySelect,
    handlePlanSelect,
    goBack,
    userAge,
    userName: cachedUser ? cachedUser.name : "Usuario",
    hasPlans: currentPlans.length > 0,
  };
};