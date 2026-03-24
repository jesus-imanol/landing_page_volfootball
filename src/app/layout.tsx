import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VolFootball — Gestiona tu liga como un pro",
  description:
    "Plataforma SaaS para administrar ligas de fútbol amateur. Torneos, pagos, árbitros y equipos en un solo lugar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" toastOptions={{ style: { background: "#131929", color: "#fff", border: "1px solid #232D45" } }} />
      </body>
    </html>
  );
}
