import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sanitizeUUID = (uuid: string) => uuid.split('-')[0];

export function formatDate(date: Date, locale: string = 'en-US', options: Intl.DateTimeFormatOptions = {}): string {
	return new Intl.DateTimeFormat(locale, options).format(date);
}
