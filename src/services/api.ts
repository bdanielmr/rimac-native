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

interface PlansResponse {
  list: Plan[];
}

const BASE_URL = "https://rimac-front-end-challenge.netlify.app/api";

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/user.json`);
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchPlans = async (): Promise<PlansResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/plans.json`);
    if (!response.ok) {
      throw new Error(`Error fetching plans: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};