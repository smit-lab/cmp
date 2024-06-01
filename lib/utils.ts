import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

type connection = { isConnected?: number };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Database connection //
let connectionState: connection = { isConnected: 0 };

export async function dbConnect(): Promise<void> {
  if (connectionState.isConnected === 1) {
    console.log("Database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connectionState.isConnected = db.connections[0].readyState;
    console.log("Database connection is successfull");
  } catch (error) {
    console.log("Error while connection database", error);
    process.exit(1);
  }
}

// Currency format //
export function formatCurrency(amount: number, currency = "INR"): string {
  let locale;
  if (currency === "INR") {
    locale = "en-IN";
  } else if (currency === "USD") {
    locale = "en-US";
  } else {
    return amount.toString();
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// Date format //
export function formatDate(date: Date, showTime = true): string {
  if (!date) {
    return "Null";
  }
  if (showTime) {
    return date.toLocaleString("en-IN");
  }
  return date.toLocaleDateString("en-IN");
}

export function formateDateWithMilliseconds(milliseconds: number): Date {
  const date = new Date(milliseconds * 1000);

  return date;
}

// Get data generic function //
export async function getD<T>(
  fetchFuntion: () => Promise<T | null>
): Promise<T> {
  try {
    const data = await fetchFuntion();
    if (!data) {
      console.error("Data not found");
      throw new Error("Data not found");
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}
