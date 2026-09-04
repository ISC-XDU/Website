import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 品牌色：沿用旧站浪潮蓝 + 西电红
        inspur: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd6ff',
          300: '#8dbbff',
          400: '#5794ff',
          500: '#2f6dff', // 主品牌蓝
          600: '#1a4ff5',
          700: '#153fdb',
          800: '#1836b0',
          900: '#1a338b',
          950: '#142055',
        },
        xidian: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // 西电红
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        ink: {
          50: '#f6f6f7',
          100: '#e7e8ea',
          200: '#d1d3d8',
          300: '#b0b4bd',
          400: '#878d99',
          500: '#696f7d',
          600: '#535862',
          700: '#41454d',
          800: '#2b2e35',
          900: '#1a1c21',
          950: '#0d0e11',
        },
      },
      fontFamily: {
        // 中文优先用系统字体（苹方/微软雅黑/PingFang/Microsoft YaHei）
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Hiragino Sans GB"',
          '"Source Han Sans CN"',
          'system-ui',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
