// Centralized Clinic Configurations
// Ensures no API keys or sensitive settings are exposed in frontend JavaScript.

export const API_CONFIG = {
  SCRIPT_URL: import.meta.env.VITE_SCRIPT_URL || '',
  
  // Doctor & Clinic Branding Info
  DOCTOR_NAME: "Dr. Aditi Jain",
  CLINIC_NAME: "Dr. Aditi Jain – Women’s Clinic",
  QUALIFICATIONS: "MBBS, MS (Obstetrics & Gynaecology)",
  SPECIALTY: "Consultant Obstetrician & Gynaecologist",
  
  // Location Details
  CLINIC_FACILITY: "Agarwal Clinic",
  CLINIC_ADDRESS: "Basement C, 99 Shivaji Marg, Tilak Nagar, Jaipur, Rajasthan 302004",
  MAPS_URL: "https://maps.app.goo.gl/wvmtEigQBwPn1A7T9",
  MAPS_EMBED_URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.077227447953!2d75.8315183!3d26.8995079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db66453678007%3A0xe543e49e29a9de12!2s99%2C%20Shivaji%20Marg%2C%20Suraj%20Nagar%2C%20Tilak%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302004!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  // Contacts
  PHONE: "+91 72968 97975",
  WHATSAPP: "917296897975",
  EMAIL: "draditijainclinic96@gmail.com",
  
  // Instagram Social Profile
  INSTAGRAM_HANDLE: "@draditi_explains_women",
  INSTAGRAM_URL: "https://www.instagram.com/draditi_explains_women/",
  
  // Timings
  TIMINGS: "Monday – Saturday: 5:00 PM – 8:00 PM",
  TIMEZONE: "Asia/Kolkata"
};
