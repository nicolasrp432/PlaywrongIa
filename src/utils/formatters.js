/**
 * Utility functions for formatting data in the application
 */

/**
 * Format a date string to a localized format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} locale - Locale for formatting (default: 'es-ES')
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, locale = 'es-ES') => {
  if (!dateString) return 'Fecha desconocida';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format movie runtime from minutes to hours and minutes
 * @param {number} minutes - Runtime in minutes
 * @returns {string} - Formatted runtime string
 */
export const formatRuntime = (minutes) => {
  if (!minutes) return 'Duración desconocida';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Format currency amount
 * @param {number} amount - Amount in dollars
 * @param {string} locale - Locale for formatting (default: 'es-ES')
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, locale = 'es-ES', currency = 'USD') => {
  if (!amount) return 'No disponible';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `$${amount.toLocaleString()}`;
  }
};

/**
 * Truncate text to a specified length and add ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format a rating value to a specified number of decimal places
 * @param {number} rating - Rating value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} - Formatted rating
 */
export const formatRating = (rating, decimals = 1) => {
  if (rating === undefined || rating === null) return 'N/A';
  
  return (Math.round(rating * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
};
