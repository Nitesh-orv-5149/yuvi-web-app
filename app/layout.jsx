import { Poppins } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import AuthSessionProvider from "@/providers/AuthSessionProvider";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Yuvi",
  description: "Query Raising app",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000"
}

export default async function RootLayout({ children }) {

  let session = null;
  try {
    session = await getServerSession(authOptions);
    console.log("SESSION FETCHED:", session);
  } catch (err) {
    console.error("SESSION FETCH FAILED:", err);
  }

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthSessionProvider session={session}>
        {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
