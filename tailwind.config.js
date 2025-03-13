/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2682FF",
        backgroundColor: "#101010",
        "light-black": "#161616",
      },
      fontFamily: {
        mBold: ["Manrope-Bold", "sans-serif"],
        mExtrabold: ["Manrope-ExtraBold", "sans-serif"],
        mExtralight: ["Manrope-ExtraLight", "sans-serif"],
        mLight: ["Manrope-Light", "sans-serif"],
        mRegular: ["Manrope-Regular", "sans-serif"],
        mSemibold: ["Manrope-SemiBold", "sans-serif"],
        rBold: ["Roboto-Bold", "sans-serif"],
        rExtrabold: ["Roboto-ExtraBold", "sans-serif"],
        rMedium: ["Roboto-Medium", "sans-serif"],
        rRegular: ["Roboto-Regular", "sans-serif"],
        rSemibold: ["Roboto-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
