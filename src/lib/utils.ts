import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2,
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('ar-MA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Add Moroccan country code if not present
  if (cleaned.startsWith('0')) {
    return `+212${cleaned.slice(1)}`
  } else if (cleaned.startsWith('212')) {
    return `+${cleaned}`
  } else if (!cleaned.startsWith('+')) {
    return `+212${cleaned}`
  }
  
  return phone
}
