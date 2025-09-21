// /app/teacher/[id]/page.js
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const portfolios = usePortfolioStore((s) => s.portfolios);
  const student = portfolios.find((p) => p.id === id);

  if (!student) {
    return <div>ไม่พบข้อมูลนักเรียน <button onClick={() => router.push("/teacher")}>กลับ</button></div>;
  }

  return (
    <div>
      <button onClick={() => router.push("/teacher")} style={{ marginBottom: 12 }}>◀ กลับ</button>
      <h1>รายละเอียด: {student.firstName} {student.lastName}</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          {student.studentPhoto ? (
            <img src={student.studentPhoto} alt="photo" style={{ width: 200, height: 200, objectFit: "cover" }} />
          ) : <div style={{ width:200, height:200, background:"#eee", display:"flex", alignItems:"center", justifyContent:"center" }}>No Photo</div>}
          <p><strong>โรงเรียน:</strong> {student.school}</p>
          <p><strong>GPA:</strong> {student.gpa}</p>
          <p><strong>โทรศัพท์:</strong> {student.phone}</p>
          <p><strong>ที่อยู่:</strong> {student.address}</p>
        </div>

        <div style={{ flex: 2 }}>
          <h3>เหตุผลในการสมัคร</h3>
          <p>{student.reason}</p>

          <h3>ความสามารถพิเศษ</h3>
          <p>{student.skills}</p>

          <h3>กิจกรรม</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {student.activities?.length ? student.activities.map((a, idx) => (
              <img key={idx} src={a} alt={`activity-${idx}`} style={{ width: 120, height: 80, objectFit: "cover", border: "1px solid #ccc" }} />
            )) : <p>ไม่มี</p>}
          </div>

          <h3>รางวัล / ผลงาน</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {student.awards?.length ? student.awards.map((a, idx) => (
              <img key={idx} src={a} alt={`award-${idx}`} style={{ width: 120, height: 80, objectFit: "cover", border: "1px solid #ccc" }} />
            )) : <p>ไม่มี</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
