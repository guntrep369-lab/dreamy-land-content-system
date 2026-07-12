# 10 — ระบบสร้าง Animation (Motion Prompt System)

> ใช้กับ Runway Gen-3 / Veo / Sora แบบ **image-to-video** จากภาพที่อนุมัติแล้วเท่านั้น

---

## สูตร Motion Prompt

```
[Character Motion] + [Camera Motion] + [Emotion] + [Environment Motion] +
[Lighting Change] + [Particle] + [Physics], duration [x]s
```

## คลังคำสั่งแต่ละหมวด

### Character Motion
| ต้องการ | Prompt |
|---|---|
| เดิน/วิ่ง | `character walks cheerfully / runs excitedly across frame, bouncy cartoon gait` |
| กระโดดดีใจ | `jumps up with joy, arms raised, small anticipation squash before jump` |
| พูดคุย | `talking with lively hand gestures, head tilts, natural blinking` |
| ตกใจ | `startled hop backward, eyes widen, ears/hair spring up` |
| กอด | `warm hug, characters lean in slowly, gentle sway` |
| เต้น (เพลง) | `dances in rhythm, side-step and clap, loopable motion` |

### Lip Sync
```
Runway/Act-One หรือ HeyGen: อัปโหลดเสียงจาก ElevenLabs → sync กับภาพตัวละคร
Prompt: "character mouth moves naturally matching speech, subtle jaw and cheek movement,
expressive eyebrows following intonation"
```

### Camera Motion (จำกัดตามวัย — เด็กเล็กใช้แถวบนเท่านั้น)
| ระดับ | Prompt |
|---|---|
| นุ่ม (2-5 ปี) | `static camera` / `slow gentle push-in` / `slow pan left to right` |
| กลาง (6-8 ปี) | `smooth tracking shot following character` / `slow orbit` |
| ไดนามิก (9-10 ปี) | `dynamic follow cam` / `crane up reveal` / `quick whip pan (comedy beat)` |

### Emotion (บรรยากาศทั้งช็อต)
`joyful and bouncy` / `warm and tender` / `curious and wondrous` / `gentle suspense (kid-safe)` / `calm bedtime mood`

### Environment Motion
`leaves swaying in breeze` / `clouds drifting slowly` / `water ripples and rising bubbles` / `twinkling stars` / `wheat field waves`

### Lighting
`consistent soft daylight` / `light gradually warms to golden sunset` / `magical glow pulses softly` / `god rays shimmer through water`

### Particle
`floating sparkle dust` / `soap bubbles rising` / `fireflies drifting` / `flower petals falling gently` / `confetti burst (celebration)` / `soft rain drops (no storm)`

### Physics
`soft bouncy cartoon physics, squash and stretch, no realistic gravity` /
`floaty low-gravity motion (space zone)` / `underwater slow drift physics`

---

## ตัวอย่าง Prompt เต็ม 1 ช็อต

```
Input image: EP012_S03_shot05_dao-forest.png
Prompt: Dao jumps up with joy, arms raised, bouncy squash-and-stretch;
Moji's tail wags quickly beside her. Slow gentle push-in camera.
Joyful and bouncy mood. Giant mushrooms sway slightly, fireflies drift
in background. Consistent soft emerald forest light. Floating sparkle dust.
Soft cartoon physics. Duration 6s. No new characters enter frame.
```

**เคล็ดลับกันภาพเพี้ยน:** ปิดท้ายทุก Prompt ด้วย
`maintain exact character design from input image, no morphing, no new elements`

---

## 🔮 MASTER PROMPT — แปลง Storyboard เป็นชุด Motion Prompt

```
คุณคือ Animation Director ของช่อง "ดินแดนดรีมมี่"
Input: Storyboard EP__ + รายชื่อไฟล์ภาพต่อช็อต
สำหรับทุกช็อต สร้าง Motion Prompt ตามสูตรไฟล์ 10-animation-prompts.md
- Camera จำกัดตาม AGE_MODE: [___]
- Duration ตรงกับคอลัมน์ Duration ใน Storyboard
- ช็อตพูด: ระบุ "lip sync required" + ชื่อไฟล์เสียง
- ปิดท้ายทุก Prompt ด้วยประโยคกันภาพเพี้ยน
Output ตาราง: Shot | Input Image | Motion Prompt | Duration | Lip Sync (Y/N)
```
