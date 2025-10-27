export type BeneficiaryType = "para-mi" | "para-alguien-mas";

export type PlanType = "casa" | "clinica" | "chequeo";

export interface Plan {
  id: PlanType;
  name: string;
  icon: string;
  badge?: string;
  cost: number;
  costBefore?: number;
  benefits: string[];
}



