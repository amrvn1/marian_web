import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "about": "About",
      "schools": "Schools",
      "login": "Login",
      "signup": "Sign Up",
      "logout": "Logout",
      "dashboard": "Dashboard",
      
      // Homepage
      "welcome": "Welcome to LvlUp",
      "tagline": "Find your perfect school and book interviews easily",
      "search_placeholder": "Search schools by name or location",
      "search_button": "Search Schools",
      "featured_schools": "Featured Schools",
      "view_details": "View Details",
      
      // School Details
      "school_profile": "School Profile",
      "location": "Location",
      "interview_fee": "Interview Fee",
      "available_slots": "Available Interview Slots",
      "book_now": "Book Now",
      "contact_info": "Contact Information",
      "about_school": "About School",
      
      // Booking Form
      "book_interview": "Book Interview",
      "student_name": "Student Name",
      "date_of_birth": "Date of Birth",
      "prior_school": "Prior School",
      "parent_email": "Parent Email",
      "parent_phone": "Parent Phone",
      "upload_photo": "Upload Student Photo",
      "select_slot": "Select Interview Date",
      "submit": "Submit",
      "cancel": "Cancel",
      
      // Payment
      "payment": "Payment",
      "payment_summary": "Payment Summary",
      "interview_fee_label": "Interview Fee",
      "platform_fee": "Platform Fee",
      "transaction_fee": "Transaction Fee",
      "total_amount": "Total Amount",
      "select_provider": "Select Payment Provider",
      "phone_number": "Mobile Money Phone Number",
      "confirm_payment": "Confirm & Pay",
      "processing": "Processing...",
      
      // Confirmation
      "booking_confirmed": "Booking Confirmed!",
      "booking_id": "Booking ID",
      "download_pdf": "Download Confirmation",
      "interview_date": "Interview Date",
      "school_name": "School Name",
      
      // School Admin Dashboard
      "my_schools": "My Schools",
      "add_school": "Add School",
      "edit_school": "Edit School",
      "manage_slots": "Manage Slots",
      "view_applicants": "View Applicants",
      "total_applicants": "Total Applicants",
      "paid_applicants": "Paid Applicants",
      "pending_payments": "Pending Payments",
      "total_revenue": "Total Revenue",
      
      // Forms
      "required_field": "This field is required",
      "invalid_email": "Invalid email address",
      "invalid_phone": "Invalid phone number",
      "password_min": "Password must be at least 8 characters",
      "save": "Save",
      "update": "Update",
      "delete": "Delete",
      
      // Messages
      "success": "Success",
      "error": "Error",
      "loading": "Loading...",
      "no_results": "No results found",
      "try_again": "Please try again",
      
      // Auth
      "email": "Email",
      "password": "Password",
      "full_name": "Full Name",
      "confirm_password": "Confirm Password",
      "forgot_password": "Forgot Password?",
      "no_account": "Don't have an account?",
      "have_account": "Already have an account?",
      "sign_in": "Sign In",
      "sign_up": "Sign Up",
      
      // Language
      "language": "Language",
      "english": "English",
      "swahili": "Swahili"
    }
  },
  sw: {
    translation: {
      // Navigation
      "home": "Nyumbani",
      "about": "Kuhusu",
      "schools": "Shule",
      "login": "Ingia",
      "signup": "Jisajili",
      "logout": "Toka",
      "dashboard": "Dashibodi",
      
      // Homepage
      "welcome": "Karibu kwenye Jukwaa la Mahojiano ya Shule",
      "tagline": "Tafuta shule yako bora na ufanye mahojiano kwa urahisi",
      "search_placeholder": "Tafuta shule kwa jina au eneo",
      "search_button": "Tafuta Shule",
      "featured_schools": "Shule Maarufu",
      "view_details": "Angalia Maelezo",
      
      // School Details
      "school_profile": "Wasifu wa Shule",
      "location": "Eneo",
      "interview_fee": "Ada ya Mahojiano",
      "available_slots": "Nafasi Zinazopatikana za Mahojiano",
      "book_now": "Weka Sasa",
      "contact_info": "Maelezo ya Mawasiliano",
      "about_school": "Kuhusu Shule",
      
      // Booking Form
      "book_interview": "Weka Mahojiano",
      "student_name": "Jina la Mwanafunzi",
      "date_of_birth": "Tarehe ya Kuzaliwa",
      "prior_school": "Shule ya Awali",
      "parent_email": "Barua pepe ya Mzazi",
      "parent_phone": "Simu ya Mzazi",
      "upload_photo": "Pakia Picha ya Mwanafunzi",
      "select_slot": "Chagua Tarehe ya Mahojiano",
      "submit": "Wasilisha",
      "cancel": "Ghairi",
      
      // Payment
      "payment": "Malipo",
      "payment_summary": "Muhtasari wa Malipo",
      "interview_fee_label": "Ada ya Mahojiano",
      "platform_fee": "Ada ya Jukwaa",
      "transaction_fee": "Ada ya Muamala",
      "total_amount": "Jumla",
      "select_provider": "Chagua Mtoa Huduma ya Malipo",
      "phone_number": "Nambari ya Simu ya Pesa Mtandaoni",
      "confirm_payment": "Thibitisha na Lipa",
      "processing": "Inachakata...",
      
      // Confirmation
      "booking_confirmed": "Hifadhi Imethibitishwa!",
      "booking_id": "Nambari ya Hifadhi",
      "download_pdf": "Pakua Uthibitisho",
      "interview_date": "Tarehe ya Mahojiano",
      "school_name": "Jina la Shule",
      
      // School Admin Dashboard
      "my_schools": "Shule Zangu",
      "add_school": "Ongeza Shule",
      "edit_school": "Hariri Shule",
      "manage_slots": "Simamia Nafasi",
      "view_applicants": "Angalia Waombaji",
      "total_applicants": "Jumla ya Waombaji",
      "paid_applicants": "Waombaji Waliolipa",
      "pending_payments": "Malipo Yanayosubiri",
      "total_revenue": "Mapato Jumla",
      
      // Forms
      "required_field": "Sehemu hii inahitajika",
      "invalid_email": "Barua pepe si sahihi",
      "invalid_phone": "Nambari ya simu si sahihi",
      "password_min": "Nenosiri lazima liwe na angalau herufi 8",
      "save": "Hifadhi",
      "update": "Sasisha",
      "delete": "Futa",
      
      // Messages
      "success": "Imefanikiwa",
      "error": "Hitilafu",
      "loading": "Inapakia...",
      "no_results": "Hakuna matokeo",
      "try_again": "Tafadhali jaribu tena",
      
      // Auth
      "email": "Barua pepe",
      "password": "Nenosiri",
      "full_name": "Jina Kamili",
      "confirm_password": "Thibitisha Nenosiri",
      "forgot_password": "Umesahau Nenosiri?",
      "no_account": "Huna akaunti?",
      "have_account": "Tayari una akaunti?",
      "sign_in": "Ingia",
      "sign_up": "Jisajili",
      
      // Language
      "language": "Lugha",
      "english": "Kiingereza",
      "swahili": "Kiswahili"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
