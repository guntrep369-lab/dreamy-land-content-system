# 08 — ระบบ Prompt สำหรับ AI ทุกตัว (Pipeline)

> แผนที่ว่า "ขั้นไหน ใช้ AI ตัวไหน ส่งงานต่อให้ใคร" — ทุก Prompt เชื่อมกันเป็นสายพานเดียว

---

## Pipeline ภาพรวม

```
[1] ไอเดีย+นิทาน+บท ──► Claude / ChatGPT / Gemini
        │
[2] ภาพตัวละคร+ฉาก ──► Midjourney / Flux / Stable Diffusion / Ideogram (ตัวหนังสือบนภาพ)
        │
[3] แอนิเมชัน ──► Runway / Veo / Sora (image-to-video จากภาพขั้น 2)
        │
[4] เสียงพูด ──► ElevenLabs   [4b] เพลง ──► Suno / Udio   [4c] พิธีกรจริง ──► HeyGen
        │
[5] ตัดต่อ+ซับ ──► CapCut AI
        │
[6] Thumbnail+โปสเตอร์ ──► Canva AI / Ideogram
        │
[7] SEO+อัปโหลด ──► Claude / ChatGPT (จากระบบข้อ 12)
```

---

## บทบาทของ AI แต่ละตัว + Prompt เริ่มต้น

### 1. Claude / ChatGPT / Gemini — สมองของระบบ
ใช้: นิทาน บท Storyboard SEO ตรวจ QC และ **แปลงบทเป็น Prompt ให้ AI ตัวอื่น**
```
คุณคือ Pipeline Manager ของช่อง "ดินแดนดรีมมี่"
Input: [Storyboard ตอน EP__]
Output: สร้าง Prompt แยกไฟล์สำหรับ (1) Midjourney ทุกช็อต (2) Runway ทุกช็อต
(3) ElevenLabs ทุกบทพูด (4) Suno เพลงประกอบ — ใช้ Master Prompt จากไฟล์ 09, 10, 11
```

### 2. Midjourney — ภาพหลัก (สวย สม่ำเสมอ)
```
[Character Master Prompt จาก 03] + [Background จาก Storyboard] + [Action + Expression]
--ar 16:9 --style raw --niji 6 (สไตล์อนิเมะ) หรือ --v 6 (สไตล์ 3D)
--cref [URL ภาพตัวละครอ้างอิง] --cw 100   ← หัวใจของความสม่ำเสมอ
```

### 3. Flux / Stable Diffusion — ภาพจำนวนมาก/รันในเครื่อง
```
Positive: [Master Prompt เดียวกับ MJ], LoRA: dreamy-land-characters (เทรนเองจากภาพ MJ 20-30 รูป)
Negative: ใช้ Negative Prompt มาตรฐานจากไฟล์ 09
```

### 4. Ideogram — ภาพที่มีตัวหนังสือ (Thumbnail, Title card)
```
Children's YouTube thumbnail, 3D Pixar style, [ตัวละคร+อารมณ์],
big bold Thai text "[ข้อความ 2-4 คำ]", bright yellow-red color pop, 16:9
```

### 5. Runway / Veo / Sora — แอนิเมชันจากภาพ
```
[อัปโหลดภาพจากขั้น 2] + Motion prompt จากไฟล์ 10
Runway: Gen-3 image-to-video, 5-10 วิ/ช็อต | Veo/Sora: ช็อตยาว+กล้องซับซ้อน
```

### 6. ElevenLabs — เสียงพูดทุกตัวละคร
สร้าง Voice ประจำตัวละคร 1 ครั้ง → ใช้ voice ID เดิมตลอดทั้งช่อง (ดูไฟล์ 11)

### 7. Suno / Udio — เพลงและ BGM
ใช้ Prompt จากไฟล์ 05 | สร้าง BGM แยก: `instrumental only, [mood], [BPM], loopable`

### 8. HeyGen — พิธีกร/ครูอวาตาร์ (คลิปสอนภาษา)
```
Avatar เด็กโต/ครูใจดี พูดไทย-อังกฤษ, ฉากหลังเขียว (คีย์เอาไปวางในฉากดรีมมี่)
Script: [จากไฟล์ 06] พร้อม emotion tags
```

### 9. CapCut AI — ตัดต่อ + Auto Caption
```
ลำดับ: วางวิดีโอตาม Storyboard → Auto captions (ไทย) ฟอนต์กลมใหญ่ ขอบขาว →
SFX ตามคอลัมน์ SFX → BGM ลดเสียงใต้บทพูด (Auto ducking -18dB) → Export 1080p/4K
```

### 10. Canva AI — Thumbnail + ปกเพลย์ลิสต์ + โพสต์โปรโมต
```
Magic Design: "YouTube thumbnail for kids cartoon, [ตัวละคร PNG], text '[ข้อความ]',
bright fun style, template ประจำช่อง (สร้างครั้งเดียว ใช้ Brand Kit)"
```

---

## กฎทอง Pipeline

1. **ภาพต้นทางเดียว** — ทุกวิดีโอเริ่มจากภาพนิ่งที่อนุมัติแล้ว ห้าม text-to-video ตรง ๆ (คุมตัวละครไม่ได้)
2. **ตั้งชื่อไฟล์ระบบเดียว:** `EP012_S03_shot05_dao-forest.png` (ตอน_ฉาก_ช็อต_เนื้อหา)
3. **Seed / Voice ID / Character Ref** จดลงฐานข้อมูล (ไฟล์ 17) ทุกครั้ง
4. **ทำเสียงก่อนแอนิเมชัน** — รู้ความยาวเสียงจริงก่อน แล้วค่อยสั่ง motion ให้พอดี
