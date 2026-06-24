/** @type {import('tailwindcss').Config} */
export default {

  content: [  "./*.html", "./src/**/*.{html,js}", "./assets/**/*.{html,js}", "./**/*.{html,js}"],
  darkMode: "class",

  safelist: [
    // HTML
    'bg-[#E34F26]/10', 'text-[#E34F26]', 'border-[#E34F26]/20',
    // CSS
    'bg-[#1572B6]/10', 'text-[#1572B6]', 'border-[#1572B6]/20',
    // Sass
    'bg-[#CC6699]/10', 'text-[#CC6699]', 'border-[#CC6699]/20',
    // JS / JavaScript
    'bg-[#F7DF1E]/10', 'text-[#D4B000]', 'dark:text-[#F7DF1E]', 'border-[#F7DF1E]/20',
    // React
    'bg-[#61DAFB]/10', 'text-[#00A7D6]', 'dark:text-[#61DAFB]', 'border-[#61DAFB]/20',
    // Tailwind
    'bg-[#06B6D4]/10', 'text-[#06B6D4]', 'border-[#06B6D4]/20',
    // PHP
    'bg-[#777BB4]/10', 'text-[#777BB4]', 'border-[#777BB4]/20',
    // Node.js
    'bg-[#539E43]/10', 'text-[#539E43]', 'border-[#539E43]/20',
    // Python
    'bg-[#3776AB]/10', 'text-[#3ba93b]', 'border-[#3776AB]/20',
    // Java
    'bg-[#F89820]/10', 'text-[#F89820]', 'border-[#F89820]/20',
    // C
    'bg-[#00599C]/10', 'text-[#00599C]', 'border-[#00599C]/20',
    // C#
    'bg-[#68217A]/10', 'text-[#9B4F96]', 'dark:text-[#B66FC2]', 'border-[#68217A]/20',
    // MySQL
    'bg-[#00758F]/10', 'text-[#00758F]', 'border-[#00758F]/20',
    // PostgreSQL
    'bg-[#336791]/10', 'text-[#336791]', 'border-[#336791]/20',
    // Supabase
    'bg-[#3ECF8E]/10', 'text-[#3ECF8E]', 'border-[#3ECF8E]/20',
    // Linux
    'bg-[#FCC624]/10', 'text-[#D9A404]', 'dark:text-[#FCC624]', 'border-[#FCC624]/20'
  ],

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