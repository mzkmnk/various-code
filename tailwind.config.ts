/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
				sans: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
			  },
      animation:{
        'x-shape-animation':'x-shape-keyframe 1.5s'
      },
      keyframes: {
        'x-shape-keyframe': {
					'0%': {
						transform: 'translate(0px, 2px)',
					},
					'5%': {
						transform: 'translate(0px, -2px)',
					},
					'10%': {
						transform: 'translate(0px, 2px)',
					},
					'15%': {
						transform: 'translate(0px, -2px)',
					},
					'20%': {
						transform: 'translate(0px, 2px)',
					},
					'25%': {
						transform: 'translate(0px, -2px)',
					},
					'30%': {
						transform: 'translate(0px, 0px)',
					},
				},
      },
    },
  },
  plugins: [
    plugin(function({ addBase , theme  }) {
      addBase({
        h1 : { fontSize: theme('fontSize.3xl') },
        h2 : { fontSize: theme('fontSize.2xl') },
        h3 : { fontSize: theme('fontSize.xl') },
        h4 : { fontSize: theme('fontSize.lg') },
      })
    })
  ],
}

