// /app/teacher/page.js
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function TeacherPage() {
  const portfolios = usePortfolioStore((s) => s.portfolios);
  const [sortKey, setSortKey] = useState("createdAt"); // createdAt, name, gpa
  const [order, setOrder] = useState("desc"); // asc | desc

  const sorted = useMemo(() => {
    const copy = [...portfolios];
    copy.sort((a, b) => {
      if (sortKey === "gpa") {
        return order === "asc" ? a.gpa - b.gpa : b.gpa - a.gpa;
      }
      if (sortKey === "name") {
        const na = (a.firstName + " " + a.lastName).toLowerCase();
        const nb = (b.firstName + " " + b.lastName).toLowerCase();
        if (na < nb) return order === "asc" ? -1 : 1;
        if (na > nb) return order === "asc" ? 1 : -1;
        return 0;
      }
      // default: createdAt
      const da = new Date(a.createdAt || 0).getTime();
      const db = new Date(b.createdAt || 0).getTime();
      return order === "asc" ? da - db : db - da;
    });
    return copy;
  }, [portfolios, sortKey, order]);

  return (
    <div>
      <h1>หน้าสำหรับอาจารย์ — รายชื่อนักเรียน</h1>

      <div style={{ margin: "12px 0" }}>
        <label>เรียงลำดับ: </label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="createdAt">ล่าสุด</option>
          <option value="name">ชื่อ</option>
          <option value="gpa">GPA</option>
        </select>
        <button onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))} style={{ marginLeft: 8 }}>
          {order === "asc" ? "A → Z / 小 → 大" : "Z → A / 大 → 小"}
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>ชื่อ-สกุล</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>โรงเรียน</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>GPA</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>ดูรายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id}>
              <td style={{ border: "1px solid #eee", padding: 8 }}>{p.firstName} {p.lastName}</td>
              <td style={{ border: "1px solid #eee", padding: 8 }}>{p.school}</td>
              <td style={{ border: "1px solid #eee", padding: 8 }}>{p.gpa}</td>
              <td style={{ border: "1px solid #eee", padding: 8 }}>
                <Link href={`/teacher/${p.id}`}>รายละเอียด</Link>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr><td colSpan={4} style={{ padding: 16, textAlign: "center" }}>ยังไม่มีข้อมูล</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
