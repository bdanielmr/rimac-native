import { useMemo, useState } from "react";

export type BeneficiaryType = "para-mi" | "para-alguien-mas";
export type PlanType = "casa" | "clinica" | "chequeo";

interface Plan {
  id: PlanType;
  name: string;
  icon: string;
  badge?: string;
  cost: number;
  costBefore?: number;
  benefits: string[];
}

const PLANS: Record<BeneficiaryType, Plan[]> = {
  "para-mi": [
    {
      id: "casa",
      name: "Plan en Casa",
      icon: "homeLight",
      cost: 39,
      benefits: [
        "**Médico general a domicilio** por S/20 y medicinas cubiertas al 100%.",
        "**Videoconsulta** y orientación telefónica al 100% en medicina general + pediatría.",
        "**Indemnización** de S/300 en caso de hospitalización por más de un día.",
      ],
    },
    {
      id: "clinica",
      name: "Plan en Casa y Clínica",
      icon: "hospitalLight",
      badge: "Plan recomendado",
      cost: 99,
      benefits: [
        "**Consultas en clínica** para cualquier especialidad.",
        "**Medicinas y exámenes** derivados cubiertos al 80%.",
        "Atención médica en **más de 200 clínicas del país.**",
      ],
    },
    {
      id: "chequeo",
      name: "Plan en Casa + Chequeo",
      icon: "homeLight",
      cost: 49,
      benefits: [
        "**Un Chequeo preventivo general** de manera presencial o virtual.",
        "Acceso a **Vacunas** en el Programa del MINSA en centros privados.",
        "**Incluye todos los beneficios del Plan en Casa.**",
      ],
    },
  ],
  "para-alguien-mas": [
    {
      id: "casa",
      name: "Plan en Casa",
      icon: "homeLight",
      cost: 37.05,
      costBefore: 39,
      benefits: [
        "**Médico general a domicilio** por S/20 y medicinas cubiertas al 100%.",
        "**Videoconsulta** y orientación telefónica al 100% en medicina general + pediatría.",
        "**Indemnización** de S/300 en caso de hospitalización por más de un día.",
      ],
    },
    {
      id: "clinica",
      name: "Plan en Casa y Clínica",
      icon: "hospitalLight",
      badge: "Plan recomendado",
      cost: 94.05,
      costBefore: 99,
      benefits: [
        "**Consultas en clínica** para cualquier especialidad.",
        "**Medicinas y exámenes** derivados cubiertos al 80%.",
        "Atención médica en **más de 200 clínicas del país.**",
      ],
    },
    {
      id: "chequeo",
      name: "Plan en Casa + Chequeo",
      icon: "homeLight",
      cost: 46.55,
      costBefore: 49,
      benefits: [
        "**Un Chequeo preventivo general** de manera presencial o virtual.",
        "Acceso a **Vacunas** en el Programa del MINSA en centros privados.",
        "**Incluye todos los beneficios del Plan en Casa.**",
      ],
    },
  ],
};

export const usePlanSelection = () => {
  const [beneficiaryType, setBeneficiaryType] = useState<BeneficiaryType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const currentPlans = useMemo(() => (beneficiaryType ? PLANS[beneficiaryType] : []), [beneficiaryType]);

  const selectedPlanDetails = useMemo(
    () => currentPlans.find((plan) => plan.id === selectedPlan) || null,
    [currentPlans, selectedPlan]
  );

  const handleBeneficiarySelect = (type: BeneficiaryType) => {
    setBeneficiaryType((prev) => (prev === type ? null : type));
  };

  const handlePlanSelect = (planId: PlanType) => setSelectedPlan(planId);

  const goBack = () => {
    setBeneficiaryType(null);
    setSelectedPlan(null);
  };

  return {
    beneficiaryType,
    selectedPlan,
    currentPlans,
    selectedPlanDetails,
    handleBeneficiarySelect,
    handlePlanSelect,
    goBack,
  };
};

