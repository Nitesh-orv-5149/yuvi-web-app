import Logo from "../public/yuvilogo.png";

export default function manifest() {
  return {
    name: "Yuvi Collab",
    short_name: "Yuvi Collab",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src:  '/yuvilogo.png' ,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src:  '/yuvilogo.png' ,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
