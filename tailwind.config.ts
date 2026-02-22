
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
    extend: {
      colors: {
        background: "#F8F9FD", // Lighter, crisper background
        foreground: "#2D3748", // Softer dark text
        cosmic: {
          DEFAULT: "#8B5A2B", // Brown from logo
          dark: "#3D2914", // Darker brown for contrast
          light: "#FF5722", // Orange from logo
          accent: "#FF7043", // Lighter orange for accents
          text: "#8B5A2B", // Brown for text 
          highlight: "#FFF3E0", // Very light orange for highlights
        },
        sidebar: {
          DEFAULT: "#FFFFFF", // White background
          foreground: "#8B5A2B", // Brown from logo
          primary: "#8B5A2B", // Brown from logo
          'primary-foreground': "#FFFFFF", // White
          accent: "#FF5722", // Orange from logo
          border: "#E2E8F0", // Light gray border
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'pulse-star': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'card-hover': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(139, 90, 43, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(139, 90, 43, 0.5)' },
        },
        'button-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(139, 90, 43, 0.3)' },
          '50%': { borderColor: 'rgba(139, 90, 43, 0.8)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'pulse-star': 'pulse-star 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'card-float': 'card-hover 3s ease-in-out infinite',
        'soft-glow': 'glow 3s ease-in-out infinite',
        'button-pulse': 'button-pulse 2s ease-in-out infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #FFF9F5 0%, #FFF0E5 100%)',
        'card-gradient': 'linear-gradient(to right bottom, #FFFFFF, #FFF9F5)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
