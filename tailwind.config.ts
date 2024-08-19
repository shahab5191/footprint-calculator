import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            primary: "white",
            secondary: "#ccebee",
            accent: "#008290",
            foreground: "#004050",
            seperator: "#00718D",
            gray: {
                200: "#c5c7cf",
                400: "#3d404a",
                700: "#2c2e36",
                800: "#263238",
            },
            innerShaddow: "rgba(38,50,56,0.16)",
            suspend: "rgba(255,255,255, 0.5)"
        },
        fontSize: {
            "2xl": "48px",
            xl: "40px",
            md: "24px",
            sm: "18px",
            xs: "16px",
        },
        spacing: {
            "3xl": "64px",
            "2xl": "40px",
            xl: "32px",
            md: "24px",
            sm: "16px",
            s: "12px",
            xs: "8px",
            '2xs': "2px"
        },
        borderRadius: {
            s: '4px'
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            width:{
                primary: '330px'
            },
            lineHeight:{
                '12': '56px'
            }
        },
    },
    plugins: [],
};
export default config;
