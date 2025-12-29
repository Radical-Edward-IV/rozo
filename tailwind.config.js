/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  
  darkMode: 'class',
  
  theme: {
    extend: {
      fontFamily: {
        content: ['var(--font-content)', 'sans-serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
        code: ['var(--font-code)', 'monospace'],
      },

      colors: {
        /* main.css의 변수와 1:1 매핑하여 중복 느낌 제거 */
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },

      spacing: {
        // 프로젝트 전역 간격 시스템이 필요할 때 추가
      },

      borderRadius: {
        // 공통 라운딩 값이 필요할 때 추가
      },
    },
  },
  
  plugins: [],
}
