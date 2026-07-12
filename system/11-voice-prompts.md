# 11 — ระบบสร้างเสียง (Voice System)

> สร้าง Voice ประจำตัวละคร 1 ครั้งใน ElevenLabs → บันทึก Voice ID ลงฐานข้อมูล → ใช้ตลอดชีพช่อง

---

## ตาราง Voice Design ต่อตัวละคร

| ตัวละคร | เพศ/วัยเสียง | ElevenLabs Voice Design Prompt | Settings แนะนำ |
|---|---|---|---|
| Narrator | หญิงผู้ใหญ่ อบอุ่น | `Warm gentle Thai female storyteller, clear articulate, motherly kindergarten-teacher tone, medium-slow pace` | Stability 60 / Similarity 75 |
| ดาว | เด็กหญิง 6 ปี | `Bright energetic Thai girl child voice, curious and cheerful, slightly high pitch, clear diction` | Stability 45 / Similarity 80 |
| ภูมิ | เด็กชาย 7 ปี | `Calm thoughtful Thai boy child voice, measured pace, friendly and smart tone` | Stability 55 / Similarity 80 |
| น้ำใส | เด็กหญิง 5 ปี | `Soft shy Thai little girl voice, gentle breathy, sweet and quiet` | Stability 60 / Similarity 80 |
| โมจิ | แมว (เสียงการ์ตูน) | `Playful squeaky cartoon cat voice, mischievous, quick pace, adds meow sounds` | Stability 35 / Similarity 70 |
| บัดดี้ | หุ่นยนต์ | `Cute robotic voice, even rhythm, slight electronic flatness but friendly, beep inflections` | Stability 75 / Similarity 70 |
| ย่าหอม | หญิงสูงวัย | `Elderly warm Thai grandmother voice, slow loving pace, slight raspiness, storytelling cadence` | Stability 65 / Similarity 80 |
| เจ้าเขียว | เด็ก (ตัวใหญ่) | `Big goofy but childlike voice, slightly deep for a kid, clumsy sweet energy` | Stability 45 / Similarity 75 |
| ฟ้าใส | เด็กหญิง 8 ปี | `Confident sparkly Thai girl voice, dramatic flair, musical intonation` | Stability 50 / Similarity 80 |
| กัปตันโต | ชายสูงวัย | `Deep slow wise old male voice, calm ocean-like rhythm, grandfatherly warmth` | Stability 70 / Similarity 80 |
| ลุงตูมตาม | ชายวัยกลาง | `Hearty booming friendly male voice, big laugh, countryside cheerfulness` | Stability 50 / Similarity 75 |
| ปีโป้ | เอเลี่ยน | `Tiny curious alien child voice, pitch-shifted up, wonder-filled, occasional "ping" sounds` | Stability 40 / Similarity 70 |

---

## ตาราง Emotion Direction (ต่อท้ายทุกบทพูด)

| Emotion | วิธีสั่ง (แทรกใน text หรือปรับ delivery) |
|---|---|
| Happy | `[cheerfully]` น้ำเสียงยิ้ม จังหวะเด้ง |
| Excited | `[excitedly]` เร็วขึ้น 10-15% เสียงสูงขึ้น |
| Sad | `[sadly, softly]` ช้าลง เสียงต่ำ เว้นจังหวะ |
| Whisper | `[whispers]` สำหรับฉากลับ ๆ / ก่อนนอน |
| Scared (แบบเด็ก) | `[nervously]` เสียงสั่นนิด ๆ ห้ามน่ากลัวจริง |
| Proud | `[proudly]` ชัด หนักแน่น จบประโยคขึ้นเสียง |
| Curious | `[wondering]` ลากท้ายคำ ถามเสียงสูง |
| Comforting | `[gently]` นุ่ม ช้า อบอุ่น |

**กฎเสียงเด็กเล็ก (2-3 ปี):** Narrator พูดช้า 80-100 คำ/นาที, เว้น 2-3 วิ หลังคำถาม, ออกเสียงคำสำคัญชัดและซ้ำ

---

## Workflow เสียงต่อตอน

1. แตกบทจากไฟล์ 06 → แยกไฟล์ต่อตัวละครต่อบรรทัด (`EP012_dao_line03.mp3`)
2. Generate ทีละบรรทัดพร้อม Emotion tag → ฟังตรวจ 100%
3. เสียงที่ใช้ได้ → โฟลเดอร์ `approved/` → จดความยาว (วินาที) ลง Storyboard
4. ส่งความยาวเสียงให้ขั้น Animation (ไฟล์ 10) กำหนด duration

---

## 🔮 MASTER PROMPT — เตรียมไฟล์เสียงทั้งตอน

```
คุณคือ Voice Director ของช่อง "ดินแดนดรีมมี่"
Input: บทคลิป EP__ [แปะบท]
Output: ตารางสั่งงาน ElevenLabs
| ลำดับ | ไฟล์ | ตัวละคร (Voice ID) | ข้อความ | Emotion tag | ความเร็ว | หมายเหตุ |
- แตกทุกบรรทัดพูด + Narrator
- ใส่ Emotion tag ตามคอลัมน์ Emotion ในบท
- AGE_MODE [___] → กำหนดคำ/นาทีตามไฟล์ 01
- ระบุบรรทัดที่ต้องเว้นจังหวะรอเด็กตอบ (silence 3s)
```
