
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Playfair Display', 'serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'blue-gray': {
					300: '#94a3b8',
					400: '#64748b',
					500: '#475569',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Enhanced "Unleashed" animation with subtle entrance
				'unleashed': {
					'0%': {
						transform: 'scale(0.98) translateY(3px)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1) translateY(0)',
						opacity: '1'
					}
				},
				// Brushstroke reveal animation (text overlay)
				'brushstroke': {
					'0%': {
						transform: 'scaleX(1)',
						'transform-origin': 'left'
					},
					'100%': {
						transform: 'scaleX(0)',
						'transform-origin': 'right'
					}
				},
				// New brushstroke drawing animation for the SVG
				'brushstroke-draw': {
					'0%': {
						opacity: '0',
						transform: 'scaleX(0)',
						'transform-origin': 'left'
					},
					'20%': {
						opacity: '1'
					},
					'100%': {
						opacity: '1',
						transform: 'scaleX(1)',
						'transform-origin': 'left'
					}
				},
				// Subtle metallic shimmer effect
				'shimmer': {
					'0%, 100%': {
						filter: 'brightness(1) contrast(1)'
					},
					'50%': {
						filter: 'brightness(1.2) contrast(1.1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'33%': {
						transform: 'translateY(-8px) rotate(0.5deg)'
					},
					'66%': {
						transform: 'translateY(-4px) rotate(-0.5deg)'
					}
				},
				'bounce': {
					'0%, 20%, 50%, 80%, 100%': {
						transform: 'translateY(0)'
					},
					'40%': {
						transform: 'translateY(-8px)'
					},
					'60%': {
						transform: 'translateY(-4px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'unleashed': 'unleashed 1.2s ease-out',
				'brushstroke': 'brushstroke 1.5s ease-out',
				'brushstroke-draw': 'brushstroke-draw 1.5s ease-out',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'bounce': 'bounce 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
