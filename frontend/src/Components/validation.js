// validation.js
export function validateEmail(email) {
    // Use a regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  export function validatePassword(password) {
    // Perform your password format validation here
    // Example: Check if password is at least 8 characters long
    return password.length >= 8;
  }
  
  export function validatePhoneNumber(phoneNumber) {
    // Perform your phone number format validation here
    // Example: Check if it's a valid US phone number
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  }
  