module.exports = {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            'primary': '#6b7280',
            'secondary': '#e5e7eb',
            'background': '#f3f4f6',

            // 'primary': '#474747',
            // 'secondary': '#f3f4f6',
            // 'background': '#e5e7eb',

            // 'primary': '#151921',
            // 'secondary': '#f28121',
            'secondary-green': '#00a450', // delete
            'dsalfkjdl': '#474747',

            'black': '#000000',
            'orange-300': '#fed7aa',

            'red-500': '#ef4444',

            'gray-200': '#e5e7eb',
            'gray-300': '#d1d5db',
            'gray-400': '#9ca3af',
            'gray-500': '#6b7280',
            'gray-600': '#4b5563',
            'gray-700': '#374151',

            // 'green': '#00a551',

            'white': '#FFFFFF',
            'button':'#2196f3',

            'red-700': '#D32F2F',
            'red-800': '#C62828',
        }
    },
    plugins: [],
}
