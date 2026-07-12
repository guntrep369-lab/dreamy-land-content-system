# 09 — ระบบสร้างภาพ (Image Prompt System)

> สูตรประกอบ Prompt ภาพ 6 ชั้น — ใช้กับ Midjourney / Flux / SD / Ideogram

---

## สูตรประกอบ Prompt (เรียงตามลำดับเสมอ)

```
[1 Character Prompt] + [2 Background Prompt] + [3 Style Prompt] +
[4 Lighting Prompt] + [5 Consistency Prompt] | [6 Negative Prompt]
```

---

## 1. Character Prompt
ดึงจาก Character Consistency Sheet (ไฟล์ 03) **ห้ามพิมพ์ใหม่เอง** แล้วต่อท้ายด้วย Action + Expression:
```
{Master Prompt ตัวละคร}, {action: jumping with joy / pointing at the sky / hugging friend},
{expression: wide sparkling eyes / worried frown / proud smile}
```

## 2. Background Prompt (9 โซนมาตรฐาน)

| โซน | Background Prompt (EN) |
|---|---|
| เมืองดรีมมี่ | `whimsical candy-colored town, cupcake-shaped buildings, rainbow tile street, floating heart island in sky` |
| โรงเรียนเมฆฟู | `school built on fluffy clouds, color-changing chalkboard, rainbow slide entrance, soft sky-blue palette` |
| บ้านอบอุ่น | `cozy Thai grandmother's wooden house, warm kitchen with steaming pots, backyard garden, golden afternoon` |
| ป่ามหัศจรรย์ | `magical glowing forest, giant mushrooms, bioluminescent flowers, friendly fireflies, emerald tones` |
| ฟาร์มแสนสุข | `cheerful farm with rainbow vegetable rows, windmill, red barn, rolling green hills` |
| ทะเลระยิบ | `vibrant underwater world, neon coral reef, mermaid city in distance, god rays through water` |
| อวกาศจิ๋ว | `cute candy-planet space, paper rocket, sparkling stars, pastel nebula, floating asteroids with faces` |
| หุบเขาไดโนะ | `friendly dinosaur valley, brick-red mountains, volcano puffing soap bubbles, prehistoric jungle plants` |
| แดนเวทมนตร์ | `floating castle, wishing shooting stars, lavender sky, sparkling magic dust in air` |

## 3. Style Prompt (มาตรฐานช่อง — ใช้ทุกภาพ)
```
3D Pixar animation style, chibi proportions, big expressive eyes, soft rounded shapes,
vibrant saturated colors, kid-friendly, high detail render, 16:9
```
(ทางเลือก 2D: `2D flat cartoon, thick clean outlines, flat bright colors, kawaii style`)

## 4. Lighting Prompt
เลือกจากคู่มือ Lighting ในไฟล์ 07 แปลงเป็น EN เช่น:
```
soft morning daylight, gentle ambient occlusion, warm golden rim light
```

## 5. Consistency Prompt (สำคัญที่สุด)
```
Midjourney:  --cref [URL ภาพตัวละครต้นแบบ] --cw 100 --sref [URL ภาพฉากต้นแบบ] --seed [เลขประจำตอน]
Flux/SD:     ใช้ LoRA "dreamy-land" + seed เดิม + prompt ตัวละครคำต่อคำ
Ideogram:    แนบภาพอ้างอิง + "same character design as reference"
```

## 6. Negative Prompt (มาตรฐานช่อง)
```
scary, horror, violence, blood, weapons, dark shadows, realistic human,
distorted face, extra fingers, deformed hands, text artifacts, watermark,
adult content, creepy eyes, sad ending imagery, cluttered background
```

---

## 🔮 MASTER PROMPT — แปลง Storyboard เป็นชุด Prompt ภาพ

```
คุณคือ Prompt Engineer ของช่อง "ดินแดนดรีมมี่"
Input: Storyboard EP__ [แปะตาราง]
สำหรับทุกช็อต ให้สร้าง Prompt ภาพเต็มสูตร 6 ชั้นตามไฟล์ 09-image-prompts.md:
- Character (ดึงจาก Consistency Sheet คำต่อคำ) + action + expression ของช็อตนั้น
- Background (ดึงจากตาราง 9 โซน) + รายละเอียดเฉพาะช็อต
- Style + Lighting + Consistency (--cref --seed) + Negative
Output เป็นตาราง: Shot | Full Prompt | หมายเหตุ (ภาพใช้ซ้ำจากช็อตไหนได้)
```
