// /app/add/page.js
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useRouter } from "next/navigation";
import { fileToDataUrl } from "@/lib/fileToDataUrl";

export default function AddPortfolioPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const addPortfolio = usePortfolioStore((s) => s.addPortfolio);
  const router = useRouter();

  const onSubmit = async (data) => {
    // data fields:
    // data.studentPhoto (FileList), data.activities (FileList), data.awards (FileList)
    // convert files to data URLs
    const photoFile = data.studentPhoto?.[0] ?? null;
    const activitiesFiles = data.activities ? Array.from(data.activities) : [];
    const awardsFiles = data.awards ? Array.from(data.awards) : [];
    try {
      const photoDataUrl = photoFile ? await fileToDataUrl(photoFile) : null;
      const activitiesUrls = await Promise.all(activitiesFiles.map(f => fileToDataUrl(f)));
      const awardsUrls = await Promise.all(awardsFiles.map(f => fileToDataUrl(f)));

      const portfolio = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone,
        school: data.school,
        gpa: data.gpa,
        skills: data.skills || "",
        reason: data.reason,
        major: data.major,
        university: data.university,
        studentPhoto: photoDataUrl,
        activities: activitiesUrls,
        awards: awardsUrls,
        createdAt: new Date().toISOString(),
      };

      addPortfolio(portfolio);
      router.push("/teacher");
    } catch (err) {
      console.error("Upload error:", err);
      alert("เกิดข้อผิดพลาดขณะอัปโหลดไฟล์");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1>เพิ่ม Portfolio</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 10 }}>
        <div>
          <label>ชื่อ*</label><br />
          <input {...register("firstName", { required: "กรุณากรอกชื่อ" })} />
          {errors.firstName && <div style={{ color: "red" }}>{errors.firstName.message}</div>}
        </div>

        <div>
          <label>นามสกุล*</label><br />
          <input {...register("lastName", { required: "กรุณากรอกนามสกุล" })} />
          {errors.lastName && <div style={{ color: "red" }}>{errors.lastName.message}</div>}
        </div>

        <div>
          <label>ที่อยู่</label><br />
          <textarea {...register("address")} />
        </div>

        <div>
          <label>หมายเลขโทรศัพท์*</label><br />
          <input {...register("phone", {
            required: "กรุณากรอกเบอร์",
            pattern: { value: /^[0-9]{10}$/, message: "เบอร์ต้องเป็นตัวเลข 10 หลัก" }
          })} />
          {errors.phone && <div style={{ color: "red" }}>{errors.phone.message}</div>}
        </div>

        <div>
          <label>โรงเรียน*</label><br />
          <input {...register("school", { required: "กรุณากรอกโรงเรียน" })} />
        </div>

        <div>
          <label>GPA*</label><br />
          <input type="number" step="0.01" {...register("gpa", {
            required: "กรุณากรอก GPA",
            valueAsNumber: true,
            min: { value: 0, message: "GPA ต้อง >= 0" },
            max: { value: 4, message: "GPA ต้อง <= 4" }
          })} />
          {errors.gpa && <div style={{ color: "red" }}>{errors.gpa.message}</div>}
        </div>

        <div>
          <label>ความสามารถพิเศษ</label><br />
          <input {...register("skills")} placeholder="เช่น ภาษา, โปรแกรม, กีฬา" />
        </div>

        <div>
          <label>เหตุผลในการสมัคร*</label><br />
          <textarea {...register("reason", { required: "กรุณากรอกเหตุผล" })} />
        </div>

        <div>
          <label>สาขาที่เลือก*</label><br />
          <input {...register("major", { required: true })} />
        </div>

        <div>
          <label>มหาวิทยาลัยที่สมัคร*</label><br />
          <input {...register("university", { required: true })} />
        </div>

        <div>
          <label>รูปนักเรียน (โปรไฟล์)</label><br />
          <input type="file" accept="image/*" {...register("studentPhoto")} />
        </div>

        <div>
          <label>รูปกิจกรรม (หลายไฟล์)</label><br />
          <input type="file" accept="image/*" multiple {...register("activities")} />
        </div>

        <div>
          <label>รางวัล / ผลงาน (หลายไฟล์)</label><br />
          <input type="file" accept="image/*" multiple {...register("awards")} />
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: "8px 12px" }}>
          บันทึก Portfolio
        </button>
      </form>
    </div>
  );
}
