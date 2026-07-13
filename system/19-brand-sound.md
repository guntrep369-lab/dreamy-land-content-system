# 19 — Brand Sound Package (เสียงประจำช่อง)

> ⚠️ ชุดเสียงนี้ถูกอ้างถึงใน**ทุกตอน** (เพลงเปิดประตู, jingle ปิด) — ต้องผลิต**ครั้งเดียวก่อนตอนแรก** แล้วใช้ซ้ำตลอดชีพช่อง
> เสียงซ้ำ ๆ เดิม ๆ คือสิ่งที่ทำให้เด็กเล็ก "จำช่องได้" เร็วกว่าโลโก้ภาพ

---

## 1. เพลงธีมช่อง "ดรีมมี่แลนด์" (45 วินาที)

ใช้: Channel Trailer / ท่อน 10 วิแรกใช้เป็น Intro ตอนยาว (ถ้าต้องการ) / Compilation / ท้ายคลิปรวมเพลง
**BPM:** 112 | **Key:** A Major | **Mood:** อบอุ่น ผจญภัย เชิญชวน

```
[Verse]
มาเถอะมา จับมือกัน           ไปดินแดนดรีมมี่
ต้นไม้ใหญ่ มีประตู             เก้าสีแสนวิเศษ

[Hook]
ดรีมมี่! ดรีมมี่แลนด์! (เย้!)
สนุกคิด สนุกฝัน เรียนรู้ไปด้วยกัน
ดาว โมจิ และผองเพื่อน รอเราอยู่ตรงนั้น
ดรีมมี่! ดรีมมี่แลนด์~ ไปกันเลย!
```

**Prompt Suno:**
```
Warm inviting Thai children's channel theme song, 112 BPM, A major,
ukulele + glockenspiel + light drums + kids choir singing along,
adventurous but cozy, memorable 4-note hook motif on "Dreamy Land",
clean bright mix, 45 seconds, ends with a sparkle chime
[แปะเนื้อเพลงด้านบน]
```

## 2. เพลงเปิดประตู (15 วินาที) — Ritual ทุกตอน ⭐สำคัญที่สุด

ใช้: ทุกตอนตอนเปิดประตูสู่โซน — **มีช่องให้เด็กตะโกนตอบสีประตู** = Interaction ประจำช่อง
ผลิต **9 เวอร์ชัน** (เปลี่ยนแค่คำสี) ครั้งเดียวจบ

```
♪ ประตูวิเศษ เปิดได้ด้วยเพลง~
  (เคาะ เคาะ เคาะ!) หนึ่ง สอง สาม!
  ประตูสีอะไรเอ่ย? ...(เว้น 2 วิ ให้เด็กตอบ)...
  สี[เขียว]! วิ้ง~ เปิดแล้ว ไปกันเลย!
```

**Prompt Suno (ทำทีละสี แทนคำใน [ ]):**
```
Short magical 15-second Thai children's door-opening jingle, 112 BPM, A major
(same motif family as channel theme), music-box + chime + three knock sounds,
child voice asking "what color?", 2-second answer gap, resolves with sparkling
"whoosh" door-opening sound, color word: [green/สีเขียว]
```
> เคล็ดลับ: generate เวอร์ชันแรกให้เพอร์เฟกต์ก่อน แล้วใช้ Suno "Cover/Extend" หรืออัดเสียงเปลี่ยนเฉพาะคำสีใน ElevenLabs มาทับ — ทำนองจะเหมือนกันทั้ง 9 บาน

## 3. Jingle ปิดท้าย (6 วินาที)

ใช้: หลัง CTA ทุกตอน พร้อมโลโก้
```
♪ ดรีมมี่ ดรีมมี่แลนด์~ แล้วเจอกันใหม่นะ! (ปิ๊ง!)
```
**Prompt Suno:** `6-second cheerful Thai children's outro jingle, same 4-note motif as channel theme, kids voices waving goodbye feeling, ends with single bright chime`

## 4. Opening Ident (4 วินาที)

ใช้: ก่อนเข้า Hook ของตอนยาว (หลัง 10 วิแรก) หรือเปิด Shorts แบบไม่กินเวลา
```
เสียงเด็กพร้อมกัน: "ดรีมมี่แลนด์!" + วิ้ง~ (โลโก้ระยิบ)
```
**Prompt ElevenLabs:** เสียงเด็ก 2-3 คน (ใช้ voice ดาว+ภูมิ+น้ำใส ผสม) พูดพร้อมกัน + SFX chime

## 5. Signature SFX Set (คลังเสียงประจำช่อง — เลือกครั้งเดียว ใช้ตลอด)

| เสียง | ใช้เมื่อ | สเปก |
|---|---|---|
| วิ้งประตู (door whoosh + chime) | ประตูวิเศษเปิด ทุกตอน | นุ่ม ไม่แหลม |
| ปิ๊ง! (idea sparkle) | ตัวละครปิ๊งไอเดีย | สั้น 0.5 วิ |
| ป็อปนับเลข | ไฮไลต์นับทีละชิ้น/ขา/ลูก | โทนเดียวกันทุกตอน |
| Jingle sting เศร้า→หวัง | จุด low point ของเรื่อง | 2 วิ |
| แตะถูก/เก่งมาก (success ding) | หลังเด็กตอบ Interaction | อบอุ่น ให้กำลังใจ |

> **กฎ:** เลือกไฟล์ SFX ชุดนี้ใน CapCut ครั้งแรก → บันทึกลง `database/voice-database.md` → ห้ามเปลี่ยนไฟล์ (เด็กจำเสียงได้)

---

## Checklist ผลิต Brand Sound (ทำครั้งเดียว ~2-3 ชม.)

- [ ] Suno: เพลงธีม 45 วิ → generate จนได้ hook ติดหู (ทดสอบ: ฟังแล้วฮัมตามได้ใน 2 รอบ)
- [ ] Suno: เพลงเปิดประตูเวอร์ชันแรก (สีเขียว) → อนุมัติทำนอง → ทำครบ 9 สี
- [ ] Suno: Jingle ปิด 6 วิ (motif เดียวกับธีม)
- [ ] ElevenLabs: Ident "ดรีมมี่แลนด์!" เสียงเด็กประสาน
- [ ] CapCut: เลือก Signature SFX 5 เสียง → ทดสอบความดังไม่แสบหู
- [ ] เก็บทุกไฟล์ใน `brand-sound/` + จด Prompt ที่ใช้จริงลง `database/prompt-database.md`
