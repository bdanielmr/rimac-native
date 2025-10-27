import { BeneficiaryType, Plan, PlanType } from "../types";

export const calculateAge = (birthDay: string): number => {
  const [day, month, year] = birthDay.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};


export const generatePlanId = (planName: string): PlanType => {
  const nameLower = planName.toLowerCase();
  if (nameLower.includes("clínica") || nameLower.includes("clinica")) {
    return "clinica";
  }
  if (nameLower.includes("chequeo")) {
    return "chequeo";
  }
  return "casa";
};

export const getPlanIcon = (planId: PlanType): string => {
  if (planId === "clinica") return "hospitalLight";
  return "homeLight";
};

export const formatBenefit = (benefit: string): string => {
  const patterns = [
    { regex: /Médico general a domicilio/gi, replacement: "**Médico general a domicilio**" },
    { regex: /Videoconsulta y orientación telefónica/gi, replacement: "**Videoconsulta**" },
    { regex: /Indemnización/gi, replacement: "**Indemnización**" },
    { regex: /Consultas en clínica/gi, replacement: "**Consultas en clínica**" },
    { regex: /Medicinas y exámenes/gi, replacement: "**Medicinas y exámenes**" },
    { regex: /más de \d+ clínicas del país/gi, replacement: (match: string) => `**${match}**` },
    { regex: /Un Chequeo preventivo general/gi, replacement: "**Un Chequeo preventivo general**" },
    { regex: /Vacunas/gi, replacement: "**Vacunas**" },
    { regex: /Incluye todos los beneficios del Plan en Casa/gi, replacement: "**Incluye todos los beneficios del Plan en Casa**" },
  ];

  let formatted = benefit;
  patterns.forEach(({ regex, replacement }) => {
    formatted = formatted.replace(regex, replacement as any);
  });

  return formatted;
};

export const transformApiPlansToFormat = (apiPlans: any[]): Record<BeneficiaryType, Plan[]> => {
  const DISCOUNT_PERCENTAGE = 0.05;

  const paraMiPlans: Plan[] = apiPlans.map((plan) => {
    const planId = generatePlanId(plan.name);
    const icon = getPlanIcon(planId);
    
    return {
      id: planId,
      name: plan.name.trim(),
      icon: icon,
      badge: planId === "clinica" ? "Plan recomendado" : undefined,
      cost: plan.price,
      benefits: plan.description.map((benefit: string) => formatBenefit(benefit)),
    };
  });

  const paraAlguienMasPlans: Plan[] = apiPlans.map((plan) => {
    const planId = generatePlanId(plan.name);
    const icon = getPlanIcon(planId);
    const originalPrice = plan.price;
    const discountedPrice = originalPrice * (1 - DISCOUNT_PERCENTAGE);
    
    return {
      id: planId,
      name: plan.name.trim(),
      icon: icon,
      badge: planId === "clinica" ? "Plan recomendado" : undefined,
      cost: Number(discountedPrice.toFixed(2)),
      costBefore: originalPrice,
      benefits: plan.description.map((benefit: string) => formatBenefit(benefit)),
    };
  });

  return {
    "para-mi": paraMiPlans,
    "para-alguien-mas": paraAlguienMasPlans,
  };
};
