/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// RepsForReels brand colors
				background: '#0A0A0F',
				surface: '#16161F',
				'surface-light': '#1E1E2A',
				accent: '#00D4AA',
				'accent-dark': '#00B894',
				secondary: '#FF6B35',
				'secondary-dark': '#E55A2B',
				muted: '#6B7280',
				'text-primary': '#FFFFFF',
				'text-secondary': '#A0A0A0',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				display: ['Cal Sans', 'Inter', 'sans-serif'],
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.6s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.6)' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
