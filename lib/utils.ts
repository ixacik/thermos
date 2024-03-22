import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function getMealType() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "breakfast";
  } else if (currentHour < 18) {
    return "lunch";
  } else {
    return "dinner";
  }
}
