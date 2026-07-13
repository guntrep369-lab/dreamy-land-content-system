# 🎙️ ใบสั่งงานสร้าง Voice ID ทุกตัวละคร (ElevenLabs)

> ทำครั้งเดียวใช้ตลอดชีพช่อง · คู่กับ system/11-voice-prompts.md
> ทุกช่อง **คัดลอกวางได้ทันที** — Design prompt (อังกฤษ) + ประโยคทดสอบ (ไทย) + ค่า Settings

---

## ก่อนเริ่ม (สำคัญ)

1. **แพ็กเกจ:** ใช้แพ็กเกจเสียเงิน (Creator ขึ้นไป) เพราะ (ก) ได้สิทธิ์ใช้เชิงพาณิชย์ (ข) มี "voice slot" พอสำหรับ ~15 เสียง — free/Starter มักไม่พอ
2. **โมเดล:** ตั้ง Model = **Eleven Multilingual v2** หรือใหม่กว่า (v3) — รองรับภาษาไทย · โมเดล English-only จะพูดไทยไม่ได้
3. **ทำตามลำดับความสำคัญ:** สร้าง 5 เสียงหลักก่อน (Narrator, ดาว, ภูมิ, โมจิ, บัดดี้ — โผล่บ่อยสุด) แล้วค่อยที่เหลือตามที่ตอนต้องใช้

---

## ขั้นตอน (ทำซ้ำทุกตัวละคร)

1. เข้า **elevenlabs.io** → เมนูซ้าย **Voices** → **Create / Add a new voice** → เลือก **Voice Design** (สร้างเสียงจากคำอธิบาย)
2. ช่อง **Describe the voice** → วาง "Design Prompt" (อังกฤษ) ของตัวละครจากตารางล่าง
3. ช่อง **Preview text** → วาง "ประโยคทดสอบ" (ไทย) ของตัวละคร → กด **Generate** (ได้ 3 ตัวเลือก)
4. ฟังทั้ง 3 → เลือกอันที่ (ก) บุคลิกตรง (ข) **พูดไทยชัด ไม่มีสำเนียงต่างชาติ** → **Save voice** ตั้งชื่อ = ชื่อตัวละคร
5. เปิดหน้า voice ที่เพิ่งสร้าง → **คัดลอก Voice ID** (สตริงยาว ๆ) → จดลงตารางด้านล่าง + `database/character-database.md`
6. ทดสอบใน **Text to Speech**: เลือก voice นั้น → ตั้ง Stability/Similarity ตามค่าในตาราง → พิมพ์ประโยคไทยยาว ๆ ฟังอีกรอบ

---

## ตารางสร้างเสียง (15 เสียง)

### 🎯 กลุ่มหลัก — ทำก่อน

| ตัวละคร | Design Prompt (วางช่อง Describe) | ประโยคทดสอบ (วางช่อง Preview) | Stability / Similarity | Voice ID |
|---|---|---|---|---|
| **Narrator** | `Warm gentle Thai female storyteller, clear and articulate, motherly kindergarten-teacher tone, medium-slow pace, friendly and soothing` | `กาลครั้งหนึ่ง ในดินแดนดรีมมี่ มีเด็ก ๆ ที่ชอบผจญภัยและเรียนรู้สิ่งใหม่ทุกวัน` | 60 / 75 | `________` |
| **ดาว** | `Bright energetic Thai girl child voice, around 6 years old, curious and cheerful, slightly high pitch, very clear diction` | `ว้าว! อยากรู้จังเลย ไปดูด้วยกันเถอะ!` | 45 / 80 | `________` |
| **ภูมิ** | `Calm thoughtful Thai boy child voice, around 7 years old, measured pace, friendly and smart, gentle` | `เดี๋ยวนะ... ภูมิมีแผน! เราลองทำแบบนี้กันดีกว่า` | 55 / 80 | `________` |
| **โมจิ** | `Playful squeaky cartoon cat voice, mischievous and quick, cute and silly, light and bouncy` | `เมี้ยว~ โมจิขอชิมสักหน่อยได้มั้ยน้า?` | 35 / 70 | `________` |
| **บัดดี้** | `Cute friendly robot voice, even steady rhythm, slight electronic flatness, warm not cold, small beep inflections` | `ข้อมูลพบแล้ว ปิ๊บ-ปิ๊บ! กำลังแสดงผลลัพธ์` | 75 / 70 | `________` |

### 🌟 กลุ่มรอง

| ตัวละคร | Design Prompt | ประโยคทดสอบ | Stability / Similarity | Voice ID |
|---|---|---|---|---|
| **น้ำใส** | `Soft shy Thai little girl voice, around 5 years old, gentle and breathy, sweet and quiet` | `น้ำใส...ขอวาดรูปให้ดูนะคะ` | 60 / 80 | `________` |
| **ย่าหอม** | `Elderly warm Thai grandmother voice, slow loving pace, slight raspiness, storytelling cadence` | `มานั่งใกล้ ๆ ย่าสิจ๊ะ เดี๋ยวย่าจะเล่านิทานให้ฟัง` | 65 / 80 | `________` |
| **เจ้าเขียว** | `Big goofy but childlike voice, slightly deep for a kid, clumsy and sweet, high energy` | `อุ๊บส์! เขียวขอโทษนะ เดี๋ยวเขียวช่วยเก็บเอง!` | 45 / 75 | `________` |
| **ฟ้าใส** | `Confident sparkly Thai girl voice, around 8 years old, dramatic flair, musical intonation` | `บิ๊บบิดี้บ๊า! เอ๊ะ ทำไมได้แค่ครึ่งเดียวล่ะ!` | 50 / 80 | `________` |
| **กัปตันโต** | `Deep slow wise old male voice, calm ocean-like rhythm, grandfatherly warmth` | `ใจเย็น ๆ หนูน้อย ทะเลสอนเราให้รู้จักรอคอย` | 70 / 80 | `________` |
| **ลุงตูมตาม** | `Hearty booming friendly male voice, big warm laugh, cheerful countryside energy` | `ฮ่า ๆ ตูมตาม! ปลูกวันนี้ ได้กินวันหน้านะหลาน ๆ` | 50 / 75 | `________` |
| **ปีโป้** | `Tiny curious alien child voice, pitch-shifted up, wonder-filled and innocent, occasional soft ping sounds` | `ปิ๊ง-ปิ๊ง? บนดาวปีโป้ไม่มีแบบนี้เลยนะ!` | 40 / 70 | `________` |

### 🎭 แขกรับเชิญ (สร้างเมื่อผลิตตอนนั้น)

| ตัวละคร | ตอน | Design Prompt | ประโยคทดสอบ | Stab / Sim | Voice ID |
|---|---|---|---|---|---|
| **น้องจี๊ด** | EP001 | `Tiny squeaky baby squirrel voice, very high pitch, fast and chittery but clear` | `อย่าเอาไปนะ พวกเราไม่มีอะไรกินเลย` | 40 / 70 | `________` |
| **แม่ปีโป้** | EP002 | `Gentle warm alien mother voice, slightly ethereal echo, loving tone, medium pitch` | `ขึ้นมาสิจ๊ะทุกคน มาดูฝนดาวตกด้วยกันบนยานเลย` | 60 / 75 | `________` |
| **อ๊อกกี้** | EP004 | `Tiny bashful bubbly voice, very soft and small, underwater bloop quality, slow shy pace` | `บุ๋ง...บุ๋ง... อ๊อกกี้กลัวคนเยอะ ๆ นี่นา` | 55 / 70 | `________` |

---

## 💡 เคล็ดลับสำคัญ

1. **สำเนียงไทยเพี้ยน?** Voice Design บางเสียงพูดไทยติดสำเนียงฝรั่ง → กด Generate ใหม่ 2-3 รอบเลือกอันที่ไทยชัดสุด หรือลองโมเดล v3
2. **ทางเลือกเสียงคนเหมือนจริง:** ตัวละครที่เป็น "คน" (ดาว ภูมิ น้ำใส ย่าหอม) ถ้าอยากได้ไทยเป๊ะ ลองไปที่ **Voice Library** กรอง Language = Thai เลือกเสียงที่ใกล้เคียง แล้ว Add เข้าคลัง (มักได้สำเนียงไทยเจ้าของภาษาดีกว่า Design)
3. **ตัวละครไม่ใช่คน** (โมจิแมว บัดดี้หุ่น ปีโป้เอเลี่ยน เจ้าเขียวไดโน) → ใช้ **Voice Design** ดีที่สุด เพราะไม่มีในคลัง
4. **Settings ปรับได้ตามอารมณ์:** ค่าในตารางคือค่าเริ่มต้น — ฉากอารมณ์จัด (ตื่นเต้น/ตกใจ) ลด Stability ลง ~10, ฉากสงบเพิ่มขึ้น ~10
5. **ล็อกแล้วห้ามเปลี่ยน:** เมื่อได้ Voice ID แล้ว ใช้ตัวเดิมตลอด — เปลี่ยนเสียงกลางคัน เด็กจะรู้สึกว่า "ไม่ใช่ตัวเดิม"

## ✅ ปิดงาน

- [ ] สร้างครบ 12 เสียงหลัก + Narrator (แขกรับเชิญทำตามตอน)
- [ ] จด Voice ID ทุกตัวลงตารางนี้ **และ** `database/character-database.md`
- [ ] ทดสอบทุกเสียงกับประโยคไทยยาว ๆ — ชัด ไม่เพี้ยน
- [ ] คัดลอก Design prompt ที่ได้ผลดีเก็บไว้ (เผื่อต้องสร้างใหม่)
