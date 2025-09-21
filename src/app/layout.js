// /app/layout.js
import "./globals.css"; // optional
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Portfolio TCAS69",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        <main style={{ padding: 20 }}>{children}</main>
      </body>
    </html>
  );
}
