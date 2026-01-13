import { apiFetch } from "./api";
import { RegisterFormValues } from "../utils/types/register.types";

export const registerUser = async (data: RegisterFormValues) => {
  try {
    const response = await apiFetch("auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};