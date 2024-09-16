module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que Tailwind procese archivos dentro de la carpeta src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
        secondary: "#fbbc05",
        danger: "#ea4335",
        success: "#34a853",
      },
    },
  },
  plugins: [],
};
