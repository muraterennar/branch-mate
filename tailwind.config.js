/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#6366F1',
        'dark-secondary': '#7C3AED',
        'dark-accent': '#FACC15',
        'dark-background': '#1E1E2F',
        'dark-surface': '#27293D',
        'dark-error': '#F87171',
        'dark-on-primary': '#FFFFFF',
        'dark-on-secondary': '#000000',
        'dark-on-background': '#F4F4F5',
        'dark-on-surface': '#E5E7EB',
        'primary': '#6366F1',
        'secondary': '#06B6D4',
        'accent': '#F59E0B',
        'background': '#F9FAFB',
        'surface': '#FFFFFF',
        'error': '#EF4444',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-background': '#1F2937',
        'on-surface': '#374151',
      }
    },
  },
  plugins: [],
}

