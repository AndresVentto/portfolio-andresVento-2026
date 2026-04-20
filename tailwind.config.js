/** @type {import('tailwindcss').Config} */
export default {

  content: ["./*.html", "./src/**/*.{html,js}"],
  darkMode: "class",

  theme: {
    screens: {
      sm: "450px",
      md: "768px",
      lg: "976px",
      xl: "1400px",
    },

    extend: {
      colors: {
        sectionColor: "hsl(0 0% 92%)",
        darkBodyColor: "hsl(216, 100%, 4%)",
        ligthBodyColor: "hsl(220 16.7% 92.9%)",
        darkSectionColor: "hsl(211, 100%, 12%)",
        primaryColor: "hsl(209, 87%, 21%)",
        primaryColorLight: "hsl(209, 74%, 45%)",
        whiteColor: "hsl(0, 0%, 97%)",
        textColor: "hsl(0, 0%, 100%)",
        menuColor: "hsla(216, 100%, 5%, 0.75)",
        primary: "hsl(214, 89%, 52%)",
        primaryLight: "hsl(214, 89%, 65%)",
        colorCardProyect: "hsl(222 47.4% 11.2%)"

      },

      fontFamily: {
        poppins: ["sans-serif"],
        londrina: ["Londrina Outline", "sans-serif"],
        openSans: ["Open Sans", "Helvetica Neue", "Helvetica", "sans-serif"],
        ptSerif: ["PT Serif", "serif"],
        audiowide: ["Audiowide", "sans-serif"],
      },

      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(11deg)" },
          "20%": { transform: "rotate(-4deg)" },
          "30%": { transform: "rotate(11deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },

      animation: {
        wave: "wave 2s ease-in-out infinite",
      },
    },

    container: {
      center: true,
      padding: { DEFAULT: "10px", md: "30px" },
    },
  },

  plugins: [],
};