// /components/Navbar.js
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd" }}>
      <Link href="/">Home</Link>
      <Link href="/add">เพิ่ม Portfolio</Link>
      <Link href="/teacher">หน้าครู/อาจารย์</Link>
    </nav>
  );
}
