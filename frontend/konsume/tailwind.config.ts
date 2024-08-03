import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      "base-white": "#FAFAFA",
      "base-black": "#0A0B0A",
      "primarygtext": "#0C2503",
      "primarytext": "#030A00",
      "success": {
        DEAFULT: "#8DCF38",
        100: "#D9EFBD",
        200: "#B3DF7A",
        300: "#639424"
      },
      "primary-bg": {
        DEFAULT: "#EDFAE7",
        100: "#D6FBC4",
        "main": "#EDFAE7",
        300: "#A1FF7F",
        400: "#D6FBC4",
        500: "66FF30",
        600: "#49FF08",
        700: "#3AE000",
        800: "#30B800"
      },
      "secondary": {
        DEFAULT: "#8C77EC",
        100: "#E8E4FB",
        200: "#D1C9F7",
        300: "#BAADF4",
        400: "#A392F0",
        500: "#6D53E7",
        600: "#4F2FE2",
        700: "#3C1CCB",
        800: "#3117A7",
        900: "#261283",
        1000: "#1C0D5F"
      },
      "warning": {
        DEFAULT: "#F4C790",
        100: "#F4C790",
        200: "#EDA145",
        300: "#CC7914"
      },
      "error": {
        DEFAULT: "#FF0000",
        100: "#FFAAAA",
        200: "#FF5555",
        300: "#B30000"
      },
      "color8": {
        DEFAULT: "#FFFFFF",
        100: "#FFFFFF",
        200: "#E9E9E9",
        300: "#D3D3D3",
        400: "#BDBDBD",
        500: "#A7A7A7",
        600: "#919191",
        700: "#7B7B7B",
        800: "#656565",
        900: "#4F4F4F",
        1000: "#393939"
      },
      "neutrals": {
        DEFAULT: "#FFFFFF",
        100: "#FFC400",
        200: "#D6FBC4",
        300: "#B0D2C1",
        400: "#9F9C9C",
        500: "#898483",
        600: "#726C6C",
        700: "#5A5555",
        800: "#433F3E",
        900: "#2B2928",
        1000: "#151413"
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config