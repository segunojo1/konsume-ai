import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
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
    fontFamily: {
      playfair: "Playfair Display",
      satoshi: "Satoshi",
      worksans: "Work Sans",
      jakarta: "Plus Jakarta Sans"
    },
    fontSize: {
      "desktop-display1": ["144px", "120%"],
      "desktop-display2": ["96px", "120%"],
      "desktop-display3": ["64px", "120%"],
      "desktop-heading1": ["56px", "120%"],
      "desktop-heading2": ["48px", "120%"],
      "desktop-heading3": ["40px", "120%"],
      "desktop-heading4": ["32px", "120%"],
      "desktop-hero": ["28px", "120%"],
      "desktop-feature": ["24px", "120%"],
      "desktop-highlight": ["18px", "120%"],
      "desktop-content": ["16px", "120%"],
      "desktop-caption": ["14px", "120%"],
      "mobile-display1": ["44px", "120%"],
      "mobile-display2": ["40px", "120%"],
      "mobile-display3": ["32px", "120%"],
      "mobile-heading1": ["28px", "120%"],
      "mobile-heading2": ["24px", "120%"],
      "mobile-heading3": ["20px", "120%"],
      "mobile-heading4": ["18px", "120%"],
      "mobile-feature": ["18px", "120%"],
      "mobile-highlight": ["16px", "120%"],
      "mobile-content": ["14px", "120%"],
      "mobile-caption": ["12px", "120%"],
      "mobile-footnote": ["10px", "120%"],
    },
    extend: {
      boxShadow: {
        shad: 'inset 0px 2.18px 2.18px -1.09px rgba(74, 74, 104, 0.10)',
        focusshad: '0px 0px 0px 4px rgba(75, 77, 237, 0.20)',
        bordershad: 'inset 1px 0 0 0 #F2F3F4'
      },
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
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
        "caret-blink": "caret-blink 1.25s ease-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config