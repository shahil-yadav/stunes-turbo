import localFont from "next/font/local";

export const localFonts = localFont({
  src: [
    { path: "./Pais-Black.otf", weight: "900", style: "normal" },
    { path: "./Pais-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "./Pais-Bold.otf", weight: "700", style: "normal" },
    { path: "./Pais-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./Pais-Medium.otf", weight: "500", style: "normal" },
    { path: "./Pais-Regular.otf", weight: "400", style: "normal" },
    { path: "./Pais-Light.otf", weight: "300", style: "normal" },
    { path: "./Pais-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "./Pais-Thin.otf", weight: "100", style: "normal" },
  ],
});
