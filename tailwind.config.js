/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A2540", // Teal Blue (Primary)
        secondary: "#0077B6", // Dark Navy (Secondary)
        gray: {
          DEFAULT: "#f4f6fc", // Cool Gray (Background)
          text: "#5C677D", // Secondary Text
          border: "#D1D5DB", // Borders
        },
        success: "#2BA84A", // Success Green
        warning: "#F4A261", // Warning Orange
        error: "#D62828", // Error Red
        text: {
          primary: "#1C1C1C", // Primary Text
          secondary: "#5C677D", // Secondary Text
        },
      },
    },
  },
  plugins: [],
};
