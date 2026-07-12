# 18 — คู่มือลงมือผลิต: นำ Prompt ไปสร้างใน AI แต่ละตัว (Step-by-Step)

> คู่มือปฏิบัติจริงสำหรับทุกตอน — ทำตามลำดับ STEP 0 → 7 ห้ามสลับ
> (เหตุผล: ภาพต้องรอตัวละครต้นแบบ, แอนิเมชันต้องรอความยาวเสียงจริง)

---

## 🗺️ ลำดับงานภาพรวม

```
STEP 0 เตรียมโฟลเดอร์ (ครั้งเดียวต่อตอน)
STEP 1 เสียงพูด      → ElevenLabs   (ทำก่อน เพื่อรู้ความยาวจริงของแต่ละช็อต)
STEP 2 เพลง + BGM    → Suno
STEP 3 ภาพนิ่ง       → Midjourney (หรือ Flux/SD)
STEP 4 แอนิเมชัน     → Runway (หรือ Veo/Sora)
STEP 5 ตัดต่อ + ซับ   → CapCut
STEP 6 Thumbnail     → Ideogram / Canva
STEP 7 อัปโหลด + SEO → YouTube Studio
```

---

## STEP 0 — เตรียมโฟลเดอร์ (5 นาที)

สร้างโฟลเดอร์ในเครื่องตามนี้ (แทน `EP___` ด้วยเลขตอน):

```
EP___/
├── 1-voice/        (เสียงพูดจาก ElevenLabs)
│   └── approved/   (เฉพาะไฟล์ที่ฟังแล้วผ่าน)
├── 2-music/        (เพลง + BGM จาก Suno)
├── 3-images/       (ภาพนิ่งจาก Midjourney)
│   └── approved/
├── 4-video/        (คลิปจาก Runway)
├── 5-edit/         (โปรเจกต์ CapCut + ไฟล์ export)
└── 6-thumbnail/
```

---

## STEP 1 — เสียงพูด: ElevenLabs (1-2 ชม.)

🌐 https://elevenlabs.io → ล็อกอิน

### ครั้งแรกของช่องเท่านั้น: สร้างเสียงประจำตัวละคร
1. เมนูซ้าย **Voices** → **Add a new voice** → **Voice Design**
2. คัดลอกคำอธิบายเสียงจากตาราง **ไฟล์ 11** (คอลัมน์ Voice Design Prompt) ของตัวละครทีละตัว → วางในช่อง description → **Generate**
3. ฟังตัวเลือกที่ระบบเสนอ เลือกอันที่ใกล้เคียงที่สุด → **Save voice** ตั้งชื่อ = ชื่อตัวละคร (เช่น `Dao`)
4. เปิดหน้า voice ที่เพิ่งสร้าง → คัดลอก **Voice ID** → จดลง `database/character-database.md` ทันที

### ทุกตอน: สร้างเสียงตามตารางในไฟล์ตอน (ส่วนที่ 8)
1. เมนู **Text to Speech**
2. มุมขวา เลือก Voice = ตัวละครของบรรทัดนั้น
3. ตั้งค่า Settings ตามคอลัมน์ในไฟล์ 11 (เช่น ดาว: Stability 45 / Similarity 80) | Model: **Eleven Multilingual v2** (รองรับภาษาไทย)
4. วางข้อความจากคอลัมน์ "ข้อความ" — ใส่ Emotion ช่วยได้โดยพิมพ์บริบทนำหน้าแล้วลบทีหลัง หรือปรับ Style slider ขึ้นเมื่อต้องการอารมณ์จัด
5. กด **Generate** → ฟัง → ถ้าไม่ผ่านกด Generate ซ้ำ (แต่ละครั้งเสียงต่างกัน)
6. ผ่านแล้วกด **Download** → เปลี่ยนชื่อไฟล์ตามคอลัมน์ "ไฟล์" (เช่น `EP001_dao_01.mp3`) → ย้ายเข้า `1-voice/approved/`
7. **สำคัญ:** เปิดไฟล์ดูความยาว (วินาที) → จดลงคอลัมน์ Dur ของ Storyboard — ถ้าเสียงยาวกว่าช็อต ให้ปรับ Dur ของช็อตนั้นตาม
8. บรรทัดที่มีหมายเหตุ **+silence 3s** → เว้นช่วงเงียบตอนตัดต่อ (ไม่ต้องทำใน ElevenLabs)

✅ เช็กก่อนไปต่อ: ไฟล์ครบทุกบรรทัด · ฟังแล้ว 100% · จด Dur ครบ

---

## STEP 2 — เพลง: Suno (30-60 นาที)

🌐 https://suno.com → ล็อกอิน

1. กด **Create** → เปิดสวิตช์ **Custom**
2. ช่อง **Lyrics**: วางเนื้อเพลงไทยจากไฟล์ตอน (ส่วนที่ 3) — คงป้าย `[Verse 1]` `[Hook]` `[Bridge]` ไว้ Suno เข้าใจโครงสร้างจากป้ายพวกนี้
3. ช่อง **Style of Music**: วาง Prompt ภาษาอังกฤษ (บรรทัด "Prompt Suno/Udio" ในไฟล์ตอน)
4. **Title**: ชื่อเพลง → กด **Create** (ได้ 2 เวอร์ชันต่อครั้ง)
5. ฟังทั้งคู่ ถ้ายังไม่ถูกใจ กด Create ซ้ำหรือปรับ Style (เช่น เติม `more playful`, `slower`)
6. เวอร์ชันที่ผ่าน → **⋯ → Download → MP3** → เซฟเป็น `EP____song_full.mp3` ใน `2-music/`
7. **ทำ BGM ประกอบฉาก** (ไม่มีเนื้อร้อง): Create ใหม่ ช่อง Style ใส่:
   `instrumental only, [mood ของฉากจาก Storyboard], [BPM], loopable, no vocals`
   ทำ 2-3 mood ต่อตอน (เปิดเรื่อง / ลุ้น / อบอุ่นปิดท้าย) → เซฟ `EP____bgm_[mood].mp3`
8. บันทึก Prompt ที่ได้ผลดีลง `database/prompt-database.md`

✅ เช็ก: เพลงหลัก 1 + BGM ครบทุก mood ที่ Storyboard ระบุ

---

## STEP 3 — ภาพนิ่ง: Midjourney (2-4 ชม.)

🌐 https://www.midjourney.com (เว็บ) หรือ Discord

### ครั้งแรกของช่องเท่านั้น: สร้างภาพต้นแบบตัวละคร
1. ช่อง Imagine พิมพ์ Master Prompt ของตัวละคร (จากไฟล์ 03) + `standing pose, neutral background, character sheet --ar 1:1`
2. Generate จนได้ตัวที่ถูกใจ → กด **Upscale**
3. เปิดภาพเต็ม → คลิกขวา **Copy image address** → ได้ URL สำหรับ `--cref`
4. จด URL ลง `database/character-database.md` (คอลัมน์ ภาพอ้างอิง) — **URL นี้ใช้ตลอดชีพช่อง**

### ทุกตอน: สร้างภาพตามตาราง Prompt (ส่วนที่ 6 ของไฟล์ตอน)
1. คัดลอก Prompt ทีละช็อต — **แทนตัวย่อก่อนวาง**: `{DAO}` → Master Prompt เต็ม, `{CONS}` → `--cref [URL จริง] --cw 100 --seed [เลขตอน]`
2. ต่อท้ายด้วย `--ar 16:9` ถ้ายังไม่มี
3. Generate → เลือก 1 จาก 4 → Upscale
4. **ตรวจก่อนเซฟ:** นิ้วครบ? หน้าตรงดีไซน์? สีประจำตัวถูก? ไม่มีของแปลกปลอม? — เพี้ยนให้กด **Vary (Subtle)** หรือ Generate ใหม่
5. เซฟเป็น `EP____shot01.png`, `EP____shot02.png`, ... เข้า `3-images/approved/`
6. ภาพที่ใช้ซ้ำได้ (ระบุท้าย Storyboard) ไม่ต้อง generate ใหม่ — copy ไฟล์เดิม

💡 ช็อตที่มีหลายตัวละคร: ใส่ `--cref URL1 URL2` ได้สูงสุด ~3 ตัว ถ้าเกินให้เลือกตัวเด่นของช็อต

✅ เช็ก: ภาพครบทุกช็อต · ผ่านเกณฑ์ QC ข้อ "ไม่มีภาพ AI เพี้ยน"

---

## STEP 4 — แอนิเมชัน: Runway (3-6 ชม.)

🌐 https://runwayml.com → ล็อกอิน

1. **Generate Video** → เลือกโมเดล **Gen-3 Alpha** (หรือใหม่กว่า)
2. อัปโหลดภาพช็อตแรกจาก `3-images/approved/` เป็น **First frame**
3. วาง **Motion Prompt** ของช็อตนั้น (ส่วนที่ 7 ของไฟล์ตอน) — อย่าลืมประโยคปิดท้ายกันเพี้ยน
4. Duration: เลือก 5s หรือ 10s ให้ **≥ Dur จริงในตารางเล็กน้อย** (เผื่อ trim ตอนตัดต่อ)
5. **Generate** → ดูผล:
   - ตัวละครเพี้ยน/มีของงอก → Generate ซ้ำ หรือลดความซับซ้อนของ motion (ตัดเหลือ action เดียว)
   - กล้องแกว่งเกิน (ตอนเด็กเล็ก) → เติม `static camera, minimal camera movement`
6. ดาวน์โหลด → `EP____shot01.mp4` เข้า `4-video/`
7. **ช็อต Lip Sync (คอลัมน์ LipSync = Y):** ใช้ Runway **Act-One** (หรือฟีเจอร์ lip sync ปัจจุบัน) → อัปโหลดวิดีโอช็อต + ไฟล์เสียง `approved/` ของบรรทัดนั้น → Generate
   - ทางเลือก: ทำ lip sync เฉพาะช็อต Close-up/Medium — ช็อต Wide ปากเล็กมาก ข้ามได้ ประหยัดเครดิต

✅ เช็ก: คลิปครบทุกช็อต · ความยาวพอ trim · lip sync ช็อตสำคัญแล้ว

---

## STEP 5 — ตัดต่อ: CapCut (2-4 ชม.)

💻 เปิดโปรแกรม CapCut (Desktop) → **New project** ตั้งค่า 1920×1080 (หรือ 4K)

1. **Import** ทุกไฟล์จาก `1-voice/approved/`, `2-music/`, `4-video/`
2. เรียงวิดีโอบน Timeline ตามลำดับ Shot ใน Storyboard → trim แต่ละช็อตให้ตรง Dur
3. วางเสียงพูดใต้ช็อตของตัวเอง (เทียบตารางเสียงส่วนที่ 8) — บรรทัด **+silence 3s** เว้นช่องว่างจริง 3 วิ
4. วางเพลง: ท่อนเพลงแทรกตรงช็อต montage / BGM ปูตลอด → คลิกแทร็ก BGM → ลดเสียงเหลือ **-18dB ใต้เสียงพูด** (หรือใช้ Auto ducking: คลิกขวา BGM → Audio → Ducking)
5. **SFX:** แถบ Audio → Sound effects → ค้นตามคอลัมน์ SFX (เช่น "ding", "pop", "whoosh") วางตามจุด
6. **ซับ:** แถบ Text → **Auto captions** → ภาษาไทย → ตรวจแก้คำผิด **ทุกบรรทัด** → ฟอนต์กลมหนา ขาวขอบดำ ขนาดใหญ่ ล่างกลางจอ
7. ใส่โลโก้ช่องมุมภาพ + jingle เปิด-ปิด
8. ดูรวดเดียวจบ 1 รอบเต็ม → รัน **QC Checklist ไฟล์ 15 หมวด D** → **Export** 1080p 30fps → `5-edit/EP____final.mp4`

---

## STEP 6 — Thumbnail: Ideogram + Canva (30 นาที)

**ทางที่ 1 — Ideogram** (เก่งตัวหนังสือบนภาพ): 🌐 https://ideogram.ai
1. วาง Prompt Thumbnail จากไฟล์ตอน (ส่วนที่ 9) → Aspect ratio **16:9** → Generate
2. ตัวหนังสือไทยอาจเพี้ยน — ถ้าเพี้ยนให้ generate ภาพ**ไม่มีข้อความ** แล้วไปเติมใน Canva

**ทางที่ 2 — Canva** (คุมเองได้ 100%): 🌐 https://canva.com
1. Create design → **YouTube Thumbnail** (1280×720)
2. อัปโหลดภาพตัวละครช็อตเด่น (จาก `3-images/`) → จัดวางหน้าตัวละครใหญ่ ๆ
3. เติมข้อความจากไฟล์ตอน (≤4 คำ) ฟอนต์กลมหนา + ขอบ/เงา → สีตามที่ระบุ
4. **ทดสอบ:** ย่อดูขนาดเล็ก (มุมมอง 25%) — ยังอ่านออก = ผ่าน
5. Download PNG → `6-thumbnail/EP____thumb.png`
6. ครั้งแรก: **Save as Brand Template** ไว้ใช้ทุกตอน ให้หน้าตาช่องสม่ำเสมอ

---

## STEP 7 — อัปโหลด: YouTube Studio (30 นาที)

🌐 https://studio.youtube.com → **Create → Upload videos**

1. เลือก `EP____final.mp4`
2. **Title:** เลือก 1 จาก 3 ตัวเลือกในไฟล์ตอน (ส่วนที่ 10)
3. **Description:** วางทั้งก้อน → แก้ timestamp ให้ตรงเวลาจริงหลังตัดต่อ → ใส่ลิงก์เพลย์ลิสต์จริง
4. **Thumbnail:** อัปโหลด `EP____thumb.png`
5. **Audience:** เลือก **"Yes, it's made for kids"** ← ห้ามลืม (กฎ COPPA)
6. **Show more:** Tags วางครบ 15 ตัว | Category ตามไฟล์ตอน | Language: Thai
7. **Playlists:** ติ๊กตามที่ไฟล์ตอนระบุ
8. **End screen:** ใส่ปุ่ม Subscribe + วิดีโอแนะนำ (ช่วงท้าย 20 วิ)
9. **Visibility → Schedule:** ตั้งเวลาตามตารางไฟล์ 13 (อังคาร/พฤหัส 17:00, เสาร์ 09:00)
10. หลังเผยแพร่: อัปเดตสถานะ + ลิงก์ใน `database/episode-database.md` → โพสต์ Caption โปรโมต (ส่วนที่ 11) ลง Facebook/TikTok

---

## ⏱️ สรุปเวลาต่อตอน (คนเดียว)

| STEP | งาน | เวลา |
|---|---|---|
| 1 | เสียง ElevenLabs | 1-2 ชม. |
| 2 | เพลง Suno | 0.5-1 ชม. |
| 3 | ภาพ Midjourney | 2-4 ชม. |
| 4 | แอนิเมชัน Runway | 3-6 ชม. |
| 5 | ตัดต่อ CapCut | 2-4 ชม. |
| 6-7 | Thumbnail + อัปโหลด | 1 ชม. |
| **รวม** | | **~10-18 ชม. = 2-3 วันทำงาน/ตอน** |

💡 เคล็ดลับเร่งสปีด: ทำแบบ batch — วันจันทร์ทำเสียง+เพลง 2-3 ตอนรวด, อังคารทำภาพรวด, ฯลฯ เร็วกว่าทำจบทีละตอน ~30%
