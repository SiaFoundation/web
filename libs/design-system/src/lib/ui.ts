import { type ClassValue, clsx } from 'clsx'
import { twMerge } from './tailwindMerge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
