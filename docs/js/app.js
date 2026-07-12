/* ═══ Dreamy Land Studio — app.js ═══ */
"use strict";

/* ── helpers ─────────────────────────────────────────────── */
const $  = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const zoneOf = id => ZONES.find(z => z.id === id);
const tint = (hex, pct=13) => `color-mix(in srgb, ${hex} ${pct}%, var(--surface))`;

function toast(msg){
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(t._h); t._h = setTimeout(() => t.hidden = true, 1800);
}
function copyText(text, label="คัดลอกแล้ว!"){
  const done = () => toast("📋 " + label);
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
function fallbackCopy(text, done){
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch(e){ toast("คัดลอกไม่สำเร็จ"); }
  ta.remove();
}
const store = {
  get k(){ return "dreamyland_v1"; },
  read(){ try { return JSON.parse(localStorage.getItem(this.k)) || {}; } catch(e){ return {}; } },
  write(d){ localStorage.setItem(this.k, JSON.stringify(d)); },
  get(path, def){ const d = this.read(); return path in d ? d[path] : def; },
  set(path, val){ const d = this.read(); d[path] = val; this.write(d); },
};

/* ── badges ──────────────────────────────────────────────── */
const zoneChip = id => {
  const z = zoneOf(id); if (!z) return "";
  return `<span class="chip" style="background:${tint(z.color)}"><span class="dot" style="background:${z.color}"></span>${z.emoji} ${esc(z.name)}</span>`;
};
const ageChip  = a => `<span class="chip">👶 ${esc(a)} ปี</span>`;
const plainChip = (t, ico="") => `<span class="chip">${ico ? ico + " " : ""}${esc(t)}</span>`;

/* ── checklist progress ──────────────────────────────────── */
const epProgress = ep => {
  const done = ep.checklist.filter((_, i) => store.get(`chk_${ep.id}_${i}`, false)).length;
  return Math.round(done / ep.checklist.length * 100);
};
const progressBar = pct => `
  <div class="progress-row">
    <div class="progress"><i style="width:${pct}%"></i></div><b>${pct}%</b>
  </div>`;

const statusPills = ep => {
  const pct = epProgress(ep);
  const stages = [
    ["💡 แนวคิด", true],
    ["🎬 ผลิต", pct >= 100 ? "done" : pct > 0 ? "now" : "todo"],
    ["✅ QC", "todo"],
    ["📤 เผยแพร่", "todo"],
  ];
  return stages.map(([label, st]) => {
    const cls = st === true ? "done" : st;
    const ico = cls === "done" ? "✓ " : cls === "now" ? "⏳ " : "";
    return `<span class="pill ${cls}">${ico}${label}</span>`;
  }).join("");
};

/* ═══ TAB: HOME ═══════════════════════════════════════════ */
function renderHome(){
  const vocabCount = EPISODES.reduce((n, e) => n + e.vocab.length, 0);
  const slots = [
    ["อังคาร 17:00", "EP003"], ["พฤหัส 17:00", "EP001"], ["เสาร์ 09:00", "EP002"],
  ];
  $("#tab-home").innerHTML = `
    <div class="hero">
      <div class="stars">
        <i style="top:12%;left:6%">✦</i><i style="top:60%;left:16%;animation-delay:1s">☁️</i>
        <i style="top:18%;right:10%;animation-delay:.5s">⭐</i><i style="bottom:14%;right:22%;animation-delay:1.6s">✦</i>
      </div>
      <h1>🌈 ดินแดนดรีมมี่ Studio</h1>
      <p>ศูนย์บัญชาการระบบผลิตคอนเทนต์การ์ตูนเพื่อพัฒนาเด็ก 2-10 ปี — ส่งเสริม IQ · EQ · EF · ภาษา · คุณธรรม · จินตนาการ สร้างตอนใหม่ได้ไม่จำกัดด้วยสูตร 9 โซน × 11 ตัวละคร × 12 บทเรียน × 7 โครงเรื่อง</p>
      <div class="hero-actions">
        <button class="btn btn-white" data-go="random">🎲 สุ่มไอเดียตอนใหม่</button>
        <button class="btn btn-line" data-go="episodes">🎬 ดูตอนทั้งหมด</button>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><div class="n">${EPISODES.length}</div><div class="l">ตอนในสต๊อก</div><div class="s">ครบสัปดาห์ที่ 1</div></div>
      <div class="stat"><div class="n">${CHARACTERS.filter(c=>!c.guest).length}<span style="font-size:16px;color:var(--muted)"> +${CHARACTERS.filter(c=>c.guest).length}</span></div><div class="l">ตัวละครหลัก + แขกรับเชิญ</div></div>
      <div class="stat"><div class="n">9</div><div class="l">โซนผจญภัย</div></div>
      <div class="stat"><div class="n">${SONGS_MADE.length}<span style="font-size:16px;color:var(--muted)">/${SONG_CATALOG.length}</span></div><div class="l">เพลงที่แต่งแล้ว / แผนเพลง</div></div>
      <div class="stat"><div class="n">${vocabCount}</div><div class="l">คำศัพท์ที่สอนแล้ว</div></div>
    </div>

    <div class="section-title">📅 ตารางออกอากาศสัปดาห์ที่ 1 <span class="chip">ธีมเดือน ก.ค. — อวกาศ ความฝัน 🚀</span></div>
    <div class="week-strip">
      ${slots.map(([day, id]) => {
        const ep = EPISODES.find(e => e.id === id);
        return `<div class="week-day" style="border-top-color:${zoneOf(ep.zone).color}">
          <div class="d">${day}</div>
          <div class="t">${ep.emoji} ${esc(ep.title)}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">${ageChip(ep.age)}${zoneChip(ep.zone)}</div>
        </div>`;
      }).join("")}
    </div>

    <div class="section-title">🏭 สายพานผลิต <span style="font-size:12px;color:var(--muted);font-weight:300">คลิกเพื่อเปิดรายละเอียด + Checklist</span></div>
    <div class="board">
      ${EPISODES.map(ep => `
        <div class="board-row" data-ep="${ep.id}">
          <div class="board-emoji">${ep.emoji}</div>
          <div class="board-main">
            <div class="board-title">${ep.id} · ${esc(ep.title)} ${ep.note ? '<span class="chip" style="background:var(--warn-bg);color:var(--warn)">⭐ ผลิตก่อน</span>' : ""}</div>
            <div class="board-sub">${esc(ep.lesson)} · ${esc(ep.slot)}</div>
            <div style="margin-top:6px;display:flex;gap:5px;flex-wrap:wrap">${statusPills(ep)}</div>
          </div>
          <div class="board-right">${progressBar(epProgress(ep))}</div>
        </div>`).join("")}
    </div>

    <div class="section-title">⚡ ทางลัด</div>
    <div class="grid g3">
      <div class="card" style="cursor:pointer" data-go="guide"><b>🛠️ คู่มือผลิต STEP 0-7</b><p style="font-size:13px;color:var(--ink-2);margin-top:5px">เข้าเว็บไหน กดอะไร ตั้งค่าเท่าไหร่ — ทีละขั้นจนอัปโหลด</p></div>
      <div class="card" style="cursor:pointer" data-go="qc"><b>✅ QC ก่อนเผยแพร่</b><p style="font-size:13px;color:var(--ink-2);margin-top:5px">Checklist ความปลอดภัยเด็ก 24 ข้อ ติ๊กแล้วระบบจำให้</p></div>
      <div class="card" style="cursor:pointer" data-go="prompts"><b>📋 Prompt กลางของช่อง</b><p style="font-size:13px;color:var(--ink-2);margin-top:5px">Style / Negative / Consistency — กดคัดลอกได้เลย</p></div>
    </div>`;
}

/* ═══ TAB: EPISODES ═══════════════════════════════════════ */
function renderEpisodes(){
  $("#tab-episodes").innerHTML = `
    <div class="page-head"><h1>🎬 ตอนทั้งหมด</h1><p>คลิกการ์ดเพื่อดูเรื่องย่อ เพลง Checklist ผลิต และ SEO — ความคืบหน้าบันทึกในเครื่องอัตโนมัติ</p></div>
    <div class="grid g2">
      ${EPISODES.map(ep => `
        <div class="card ep-card" data-ep="${ep.id}" id="card-${ep.id}">
          <div class="ep-top">
            <div class="ep-emoji">${ep.emoji}</div>
            <div style="flex:1;min-width:0">
              <div class="ep-id">${ep.id} · ${ep.minutes} นาที</div>
              <div class="ep-title">${esc(ep.title)}</div>
              <div class="ep-en">${esc(ep.en)}</div>
            </div>
          </div>
          <p class="ep-log">${esc(ep.logline)}</p>
          ${ep.note ? `<div class="ep-note">${esc(ep.note)}</div>` : ""}
          <div class="ep-chips">${ageChip(ep.age)}${zoneChip(ep.zone)}${plainChip(ep.lesson, "🎯")}${plainChip(ep.song, "🎵")}</div>
          ${progressBar(epProgress(ep))}
        </div>`).join("")}
    </div>`;
}

/* ── Episode modal ── */
let modalEp = null, modalTab = "story";
function openEpisode(id){
  modalEp = EPISODES.find(e => e.id === id); modalTab = "story";
  drawModal(); $("#modalBackdrop").hidden = false; document.body.style.overflow = "hidden";
}
function closeModal(){
  $("#modalBackdrop").hidden = true; document.body.style.overflow = "";
  modalEp = null;
  // refresh progress bars ที่หน้าอื่น
  renderHome(); renderEpisodes(); bindTabContent();
}
function drawModal(){
  const ep = modalEp; if (!ep) return;
  const z = zoneOf(ep.zone);
  const tabs = [["story","📖 เรื่องย่อ"],["produce","🛠️ Checklist ผลิต"],["seo","🔍 SEO"],["cast","🧸 ตัวละคร"]];
  let body = "";

  if (modalTab === "story") {
    body = `
      <div class="kv"><b>Logline</b><span>${esc(ep.logline)}</span></div>
      <div class="kv"><b>บทเรียน</b><span>${esc(ep.lesson)} <span style="color:var(--muted)">· ${esc(ep.sub)}</span></span></div>
      <div class="kv"><b>เพลงในตอน</b><span>🎵 ${esc(ep.song)}</span></div>
      <div class="section-title" style="margin-top:18px">โครงเรื่อง</div>
      ${ep.beats.map(([k, v]) => `<div class="beat"><span class="bn">${esc(k)}</span><span class="bt">${esc(v)}</span></div>`).join("")}
      <div class="section-title">💡 Interaction Points (เว้นจังหวะให้เด็กตอบ)</div>
      ${ep.interactions.map(i => `<div class="beat"><span class="bn">💬</span><span class="bt">${esc(i)}</span></div>`).join("")}
      <div class="section-title">🔤 คำศัพท์ใหม่</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${ep.vocab.map(v => plainChip(v)).join("")}</div>`;
  }
  if (modalTab === "produce") {
    const pct = epProgress(ep);
    body = `
      ${progressBar(pct)}
      <p style="font-size:12.5px;color:var(--muted);margin:8px 0 14px">📦 ${ep.shots} ช็อต · 🎙️ ${ep.voiceLines} บรรทัดเสียง · 🖼️ ~${ep.images} ภาพ — ติ๊กแล้วระบบจำให้อัตโนมัติ (เก็บในเครื่องนี้)</p>
      ${ep.checklist.map((item, i) => {
        const on = store.get(`chk_${ep.id}_${i}`, false);
        return `<label class="check-item ${on ? "checked" : ""}">
          <input type="checkbox" data-chk="${ep.id}_${i}" ${on ? "checked" : ""}>
          <span>${esc(item)}</span></label>`;
      }).join("")}
      <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost" data-reset="${ep.id}">↺ ล้าง Checklist</button>
        <a class="btn btn-primary" style="text-decoration:none" target="_blank" rel="noopener" href="${REPO_URL}/blob/main/${ep.file}">📄 เปิดไฟล์ตอนฉบับเต็ม (Prompt ทุกช็อต)</a>
      </div>`;
  }
  if (modalTab === "seo") {
    body = `
      <div class="section-title" style="margin-top:4px">Title 3 ตัวเลือก (กดคัดลอก)</div>
      ${ep.seoTitles.map(t => `
        <div class="copy-row"><span>${esc(t)}</span><button class="btn-copy" data-copy="${esc(t)}">คัดลอก</button></div>`).join("")}
      <div class="section-title">Hashtag</div>
      <div class="copy-row"><span>${esc(ep.hashtags)}</span><button class="btn-copy" data-copy="${esc(ep.hashtags)}">คัดลอก</button></div>
      <div class="section-title">Thumbnail</div>
      <p style="font-size:13.5px;color:var(--ink-2)">${esc(ep.thumb)}</p>
      <div class="kv" style="margin-top:12px"><b>สล็อตเผยแพร่</b><span>${esc(ep.slot)} · Made for Kids ✅</span></div>`;
  }
  if (modalTab === "cast") {
    const names = [...ep.leads, ...ep.guests];
    body = `<div class="grid" style="grid-template-columns:1fr">
      ${names.map(n => {
        const c = CHARACTERS.find(x => x.name === n);
        if (!c) return "";
        return `<div class="copy-row" style="align-items:center">
          <span style="font-size:24px">${c.emoji}</span>
          <span><b>${esc(c.name)}</b> <span style="color:var(--muted);font-size:12px">${esc(c.role)}</span><br>
          <span style="font-size:12.5px;color:var(--ink-2)">"${esc(c.quote)}"</span></span>
          <button class="btn-copy" data-copy="${esc(c.prompt)}">คัดลอก Prompt</button>
        </div>`;
      }).join("")}</div>`;
  }

  $("#modalBody").innerHTML = `
    <div class="m-head">
      <div class="m-emoji">${ep.emoji}</div>
      <div>
        <div class="ep-id">${ep.id} · ${ep.minutes} นาที · ${esc(ep.plot)}</div>
        <h2 style="font-size:20px">${esc(ep.title)}</h2>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">${ageChip(ep.age)}${zoneChip(ep.zone)}${plainChip(ep.mood,"🎭")}</div>
      </div>
    </div>
    <div class="m-tabs">${tabs.map(([id, l]) => `<button class="${modalTab === id ? "on" : ""}" data-mtab="${id}">${l}</button>`).join("")}</div>
    ${body}`;
}

/* ═══ TAB: CHARACTERS ═════════════════════════════════════ */
function renderCharacters(){
  $("#tab-characters").innerHTML = `
    <div class="page-head"><h1>🧸 ตัวละคร (Character Bible)</h1><p>สี บุคลิก คำพูดติดปาก ห้ามเปลี่ยน — กดคัดลอก Master Prompt ไปใช้ใน Midjourney ได้เลย</p></div>
    <div class="grid g3">
      ${CHARACTERS.map((c, i) => `
        <div class="card char-card" id="char-${i}">
          <div class="char-head" style="background:linear-gradient(140deg, ${c.color}, color-mix(in srgb, ${c.color} 62%, #20304A))">
            ${c.guest ? `<span class="guest-tag">แขกรับเชิญ</span>` : ""}
            <span class="char-age">${esc(c.age)}</span>
            <div class="big">${c.emoji}</div>
            <div class="char-name">${esc(c.name)} <span style="font-size:12px;font-weight:400;opacity:.9">${esc(c.en)}</span></div>
            <div class="char-role">${esc(c.role)}</div>
          </div>
          <div class="char-quote">${esc(c.quote)}</div>
          <div class="char-body">
            <div class="char-line"><b>บุคลิก:</b> ${esc(c.personality)}</div>
            <div class="char-line"><b>จุดเด่น:</b> ${esc(c.strength)}</div>
            <div class="char-line"><b>จุดอ่อน:</b> ${esc(c.weakness)}</div>
            <div class="char-line"><b>เด็กเรียนรู้:</b> ${esc(c.lesson)}</div>
            <div class="char-foot">
              <button class="btn-copy" data-copy="${esc(c.prompt)}">📋 คัดลอก Master Prompt</button>
            </div>
          </div>
        </div>`).join("")}
    </div>`;
}

/* ═══ TAB: ZONES ══════════════════════════════════════════ */
function renderZones(){
  $("#tab-zones").innerHTML = `
    <div class="page-head"><h1>🗺️ ดินแดนดรีมมี่ — 9 โซน</h1><p>ต้นดรีมมี่มีประตู 9 บาน แต่ละบานคือ "ห้องเรียนธีม" — สูตรไม่จำกัดตอน: 9 โซน × 11 ตัวละคร × 12 บทเรียน × 7 โครงเรื่อง</p></div>
    <div class="grid g3">
      ${ZONES.map((z, i) => `
        <div class="card zone-card" id="zone-${i}">
          <div class="zone-head" style="background:${z.rainbow
            ? "linear-gradient(120deg,#F26B8A,#E8A80C,#2E9E5B,#1F8FD6,#8E6FD1)"
            : `linear-gradient(140deg, ${z.color}, color-mix(in srgb, ${z.color} 60%, #1E2C44))`}">
            <span class="ze">${z.emoji}</span>
            <div><div class="zone-name">${esc(z.name)}</div><div class="zone-en">${esc(z.en)} · ประตูสี${esc(z.door)}</div></div>
          </div>
          <div class="zone-body">
            <div>${esc(z.vibe)}</div>
            <div><b>เหมาะสอน:</b> ${esc(z.teach)}</div>
            <div><b>ตัวละครประจำ:</b> ${esc(z.chars)}</div>
          </div>
        </div>`).join("")}
    </div>
    <div class="card" style="margin-top:18px">
      <b>📜 กฎของโลก (ห้ามละเมิด)</b>
      <ol style="margin:10px 0 0 22px;font-size:13.5px;color:var(--ink-2);display:grid;gap:5px">
        <li>ประตูเปิดเมื่อร้อง "เพลงเปิดประตู" (jingle ประจำช่อง 15 วิ)</li>
        <li>เวทมนตร์ต้องแลกด้วยความพยายาม — ไม่มีการเสกแก้ปัญหาฟรี</li>
        <li>ไม่มีตัวร้ายถาวร — มีแต่ "ตัวป่วน" ที่เข้าใจผิดหรือเหงา และกลับตัวได้เสมอ</li>
        <li>ทุกโซนมีของวิเศษประจำโซน 1 ชิ้นที่โผล่ซ้ำได้</li>
        <li>เวลาในดรีมมี่ = กลางวันเสมอ ยกเว้นตอนสอนเรื่องการนอน/ดวงดาว</li>
        <li>จบทุกตอนใต้ต้นดรีมมี่ — Ritual สรุปบทเรียนที่เด็กจดจำ</li>
      </ol>
    </div>`;
}

/* ═══ TAB: SONGS ══════════════════════════════════════════ */
function renderSongs(){
  $("#tab-songs").innerHTML = `
    <div class="page-head"><h1>🎵 โรงงานเพลง</h1><p>เพลงที่แต่งเสร็จแล้ว ${SONGS_MADE.length} เพลง + แผนเพลง 18 หมวด — โครงเพลง: ฮุกภายใน 30 วิ ซ้ำ 3 รอบ มีท่าเต้นประจำ</p></div>
    <div class="grid g3" style="margin-bottom:22px">
      ${SONGS_MADE.map((s, i) => `
        <div class="card song-made" id="song-${i}">
          <div class="song-name">🎶 ${esc(s.name)}</div>
          <div class="song-meta">${plainChip(s.cat,"📂")}${plainChip(s.bpm + " BPM","🥁")}${plainChip("Key " + s.key,"🎹")}${plainChip(s.ep,"🎬")}</div>
          <div class="song-line"><b style="font-weight:500;color:var(--ink)">Mood:</b> ${esc(s.mood)} · ${esc(s.inst)}</div>
          <div class="song-line" style="margin-top:5px"><b style="font-weight:500;color:var(--ink)">ท่าเต้นฮุก:</b> ${esc(s.dance)}</div>
        </div>`).join("")}
    </div>
    <div class="section-title">📋 แผนเพลง 18 หมวด (✅ = แต่งแล้ว)</div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>หมวด</th><th>ชื่อเพลง</th><th>BPM</th><th>Mood</th><th>ท่าเต้นฮุก</th></tr></thead>
      <tbody>${SONG_CATALOG.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${r[2]}</td><td>${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`).join("")}</tbody>
    </table></div>`;
}

/* ═══ TAB: RANDOMIZER ═════════════════════════════════════ */
const randState = { locks:{}, value:{} };
function pickRandom(){
  const last = EPISODES[EPISODES.length - 1];
  const recentLeads = new Set(EPISODES.slice(-2).flatMap(e => e.leads));
  const recentLessons = new Set(EPISODES.map(e => e.lesson));
  const v = randState.value, lk = randState.locks;

  if (!lk.zone){
    const pool = ZONES.filter(z => z.id !== last.zone);
    v.zone = pool[Math.floor(Math.random() * pool.length)];
  }
  if (!lk.age){
    const bag = [];
    AGE_MODES.forEach(a => { for (let i = 0; i < a.quota; i++) bag.push(a.id); });
    v.age = bag[Math.floor(Math.random() * bag.length)];
  }
  if (!lk.lesson){
    const pool = LESSONS.filter(l => ![...recentLessons].some(r => r.includes(l.split(" ")[0])));
    v.lesson = (pool.length ? pool : LESSONS)[Math.floor(Math.random() * (pool.length ? pool.length : LESSONS.length))];
  }
  if (!lk.chars){
    const mains = CHARACTERS.filter(c => !c.guest && !recentLeads.has(c.name));
    const n = v.age === "2-3" ? 2 : v.age === "4-5" ? 2 : 3;
    const shuffled = [...mains].sort(() => Math.random() - .5);
    v.chars = shuffled.slice(0, Math.min(n, shuffled.length)).map(c => c.name);
  }
  if (!lk.plot) v.plot = PLOTS[Math.floor(Math.random() * PLOTS.length)];
  if (!lk.mood) v.mood = MOODS[Math.floor(Math.random() * MOODS.length)];
}
function randCommand(){
  const v = randState.value;
  if (!v.zone) return "";
  return `สร้างตอนใหม่\nอายุ: ${v.age} | โซน: ${v.zone.name} | บทเรียน: ${v.lesson} | ตัวละคร: ${v.chars.join(", ")} | โครงเรื่อง: ${v.plot} | อารมณ์ตอน: ${v.mood}`;
}
function renderRandom(){
  const v = randState.value, lk = randState.locks;
  const slot = (key, label, val) => `
    <div class="rand-slot">
      <button class="rand-lock ${lk[key] ? "locked" : ""}" data-lock="${key}" title="ล็อกค่านี้ไว้ตอนสุ่มใหม่">${lk[key] ? "🔒" : "🔓"}</button>
      <div class="k">${label}</div><div class="v">${val || "—"}</div>
    </div>`;
  $("#tab-random").innerHTML = `
    <div class="page-head"><h1>🎲 เครื่องสุ่มตอนใหม่</h1><p>สุ่มตามกฎกันซ้ำของระบบ: ไม่ใช้โซนล่าสุด · ไม่ใช้ตัวนำจาก 2 ตอนล่าสุด · ถ่วงน้ำหนักช่วงวัยตามโควตา — กด 🔒 เพื่อล็อกค่าที่ชอบแล้วสุ่มที่เหลือ</p></div>
    <div class="card rand-hero" id="randHero">
      <span class="dice">🎲</span>
      <div style="margin-top:10px"><button class="btn btn-primary" id="rollBtn" style="font-size:16px;padding:12px 28px">สุ่มไอเดียตอนใหม่!</button></div>
      <div class="rand-grid">
        ${slot("age", "ช่วงวัย", v.age ? v.age + " ปี" : "")}
        ${slot("zone", "โซน", v.zone ? v.zone.emoji + " " + v.zone.name : "")}
        ${slot("lesson", "บทเรียน", v.lesson)}
        ${slot("chars", "ตัวละครนำ", v.chars ? v.chars.join(" · ") : "")}
        ${slot("plot", "โครงเรื่อง", v.plot)}
        ${slot("mood", "อารมณ์ตอน", v.mood)}
      </div>
      ${v.zone ? `
        <div class="rand-out">${esc(randCommand())}</div>
        <div style="margin-top:12px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" data-copy-cmd="1">📋 คัดลอกคำสั่งไปให้ Claude</button>
        </div>
        <p style="font-size:12px;color:var(--muted);margin-top:10px">นำคำสั่งไปวางในแชต Claude ที่เปิดโปรเจกต์นี้อยู่ → ระบบไฟล์ 16 จะสร้างแพ็กเกจครบ 12 ส่วนให้อัตโนมัติ</p>` : ""}
    </div>`;
}

/* ═══ TAB: CALENDAR ═══════════════════════════════════════ */
function renderCalendar(){
  $("#tab-calendar").innerHTML = `
    <div class="page-head"><h1>📅 ปฏิทินคอนเทนต์ 365 วัน</h1><p>สูตร: หมุนเวียนรายสัปดาห์ × ธีมรายเดือน × วันสำคัญ = 156 คลิป/ปี (3 คลิป/สัปดาห์) — ตอนวันสำคัญ ⭐ ผลิตล่วงหน้า 3 สัปดาห์</p></div>
    <div class="section-title">🔁 สูตรหมุนเวียนรายสัปดาห์</div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>สัปดาห์</th><th>อังคาร 17:00 (เพลง)</th><th>พฤหัส 17:00 (นิทาน)</th><th>เสาร์ 09:00 (ความรู้)</th></tr></thead>
      <tbody>${WEEKLY_ROTATION.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <div class="section-title">🗓️ ธีมรายเดือน + วันสำคัญ</div>
    <div class="grid g3">
      ${MONTHS.map(m => {
        const z = zoneOf(m.zone);
        return `<div class="card month-card ${m.current ? "now" : ""}" style="border-top-color:${z.color}">
          ${m.current ? '<span class="now-tag">เดือนนี้</span>' : ""}
          <div class="mm">${esc(m.m)}</div>
          <div class="mt">${esc(m.theme)}</div>
          <div style="margin:6px 0">${zoneChip(m.zone)}</div>
          <div class="me">📌 ${esc(m.events)}</div>
        </div>`;
      }).join("")}
    </div>
    <div class="card" style="margin-top:18px">
      <b>⚖️ กฎกันซ้ำ + สมดุล (ตรวจทุกเดือน)</b>
      <ul style="margin:10px 0 0 22px;font-size:13.5px;color:var(--ink-2);display:grid;gap:5px">
        <li>ตัวละครหลักทุกตัวได้เด่นอย่างน้อย 1 ตอน/เดือน · โซนเดียวกันห้ามติดกันเกิน 2 ตอน</li>
        <li>12 หมวดบทเรียนครบทุกหมวดภายใน 6 สัปดาห์</li>
        <li>สัดส่วนวัยต่อเดือน: 2-3 ปี 25% · 4-5 ปี 35% · 6-8 ปี 30% · 9-10 ปี 10%</li>
      </ul>
    </div>`;
}

/* ═══ TAB: QC ═════════════════════════════════════════════ */
let qcEp = EPISODES[0].id;
function renderQC(){
  const total = QC_GROUPS.reduce((n, g) => n + g.items.length, 0);
  let done = 0;
  QC_GROUPS.forEach((g, gi) => g.items.forEach((_, ii) => { if (store.get(`qc_${qcEp}_${gi}_${ii}`, false)) done++; }));
  const pct = Math.round(done / total * 100);
  $("#tab-qc").innerHTML = `
    <div class="page-head"><h1>✅ QC Checklist ก่อนเผยแพร่</h1><p>ตอบ "ใช่" ครบทุกข้อจึงอัปโหลดได้ — เลือกตอนแล้วติ๊ก ระบบจำสถานะของแต่ละตอนแยกกัน</p></div>
    <div class="ep-select">
      ${EPISODES.map(e => `<button class="${qcEp === e.id ? "on" : ""}" data-qcep="${e.id}">${e.emoji} ${e.id}</button>`).join("")}
    </div>
    <div class="card" style="margin-bottom:16px">${progressBar(pct)}
      <p style="font-size:12.5px;color:var(--muted);margin-top:6px">${done}/${total} ข้อ ${pct === 100 ? "— 🎉 พร้อมเผยแพร่!" : ""}</p>
    </div>
    ${QC_GROUPS.map((g, gi) => `
      <div class="card qc-group">
        <h3>${esc(g.name)}</h3>
        ${g.items.map((item, ii) => {
          const key = `qc_${qcEp}_${gi}_${ii}`;
          const on = store.get(key, false);
          return `<label class="check-item ${on ? "checked" : ""}">
            <input type="checkbox" data-qc="${key}" ${on ? "checked" : ""}><span>${esc(item)}</span></label>`;
        }).join("")}
      </div>`).join("")}`;
}

/* ═══ TAB: GUIDE ══════════════════════════════════════════ */
function renderGuide(){
  $("#tab-guide").innerHTML = `
    <div class="page-head"><h1>🛠️ คู่มือลงมือผลิต STEP 0-7</h1><p>ทำตามลำดับ ห้ามสลับ — เสียงก่อนภาพ ภาพก่อนแอนิเมชัน · รวม ~10-18 ชม./ตอน (เคล็ดลับ: ทำแบบ batch เร็วขึ้น ~30%)</p></div>
    ${GUIDE_STEPS.map((s, i) => `
      <div class="acc ${i === 0 ? "open" : ""}">
        <button class="acc-head" data-acc="${i}">
          <span class="ico">${s.icon}</span><span>${esc(s.name)}</span>
          <span class="tt">⏱ ${esc(s.time)}</span><span class="arr">▸</span>
        </button>
        <div class="acc-body">
          <span class="acc-tool">🔧 ${esc(s.tool)}</span>
          <p>${esc(s.detail)}</p>
        </div>
      </div>`).join("")}
    <div class="card" style="margin-top:16px">
      <b>🔑 กฎทอง Pipeline</b>
      <ul style="margin:10px 0 0 22px;font-size:13.5px;color:var(--ink-2);display:grid;gap:5px">
        <li>ทุกวิดีโอเริ่มจากภาพนิ่งที่อนุมัติแล้ว — ห้าม text-to-video ตรง ๆ (คุมตัวละครไม่ได้)</li>
        <li>ตั้งชื่อไฟล์ระบบเดียว: <code>EP012_S03_shot05_dao-forest.png</code></li>
        <li>Seed / Voice ID / Character Ref จดลงฐานข้อมูลทุกครั้ง</li>
        <li>ทำเสียงก่อนแอนิเมชัน — รู้ความยาวจริงก่อนสั่ง motion</li>
      </ul>
    </div>`;
}

/* ═══ TAB: PROMPTS ════════════════════════════════════════ */
function renderPrompts(){
  $("#tab-prompts").innerHTML = `
    <div class="page-head"><h1>📋 Prompt กลางของช่อง</h1><p>ชุด Prompt ที่ใช้ซ้ำทุกตอน — กดคัดลอกแล้วนำไปประกอบกับ Prompt เฉพาะช็อตจากไฟล์ตอน</p></div>
    <div class="grid g2">
      ${COMMON_PROMPTS.map(p => `
        <div class="card prompt-card">
          <b style="font-size:14.5px">${esc(p.name)}</b>
          <pre>${esc(p.text)}</pre>
          <button class="btn-copy" data-copy="${esc(p.text)}" style="align-self:flex-start">📋 คัดลอก</button>
        </div>`).join("")}
    </div>
    <div class="section-title">👶 กติกาต่อช่วงวัย (สรุปย่อ)</div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>วัย</th><th>ความยาวคลิป</th><th>ความเร็วพูด</th><th>ตัวละคร</th><th>กฎสำคัญ</th></tr></thead>
      <tbody>${AGE_MODES.map(a => `<tr><td><b>${a.label}</b></td><td>${a.clip}</td><td>${a.speech}</td><td>${a.chars}</td><td>${esc(a.rule)}</td></tr>`).join("")}</tbody>
    </table></div>`;
}

/* ═══ SEARCH ══════════════════════════════════════════════ */
function buildIndex(){
  const idx = [];
  EPISODES.forEach(e => idx.push({ label:`${e.emoji} ${e.title}`, type:"ตอน", tab:"episodes", target:`card-${e.id}`, hay:`${e.title} ${e.en} ${e.lesson} ${e.song} ${e.id}` }));
  CHARACTERS.forEach((c, i) => idx.push({ label:`${c.emoji} ${c.name}`, type:"ตัวละคร", tab:"characters", target:`char-${i}`, hay:`${c.name} ${c.en} ${c.role} ${c.quote}` }));
  ZONES.forEach((z, i) => idx.push({ label:`${z.emoji} ${z.name}`, type:"โซน", tab:"zones", target:`zone-${i}`, hay:`${z.name} ${z.en} ${z.teach}` }));
  SONGS_MADE.forEach((s, i) => idx.push({ label:`🎶 ${s.name}`, type:"เพลง", tab:"songs", target:`song-${i}`, hay:`${s.name} ${s.cat} ${s.mood}` }));
  return idx;
}
const SEARCH_INDEX = buildIndex();

/* ═══ NAVIGATION & EVENTS ═════════════════════════════════ */
const RENDERERS = {
  home:renderHome, episodes:renderEpisodes, characters:renderCharacters, zones:renderZones,
  songs:renderSongs, random:renderRandom, calendar:renderCalendar, qc:renderQC,
  guide:renderGuide, prompts:renderPrompts,
};
let currentTab = "home";
function goTab(tab, focusId){
  currentTab = tab;
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  $$(".tab").forEach(s => s.hidden = s.id !== `tab-${tab}`);
  RENDERERS[tab]();
  $("#sidebar").classList.remove("open");
  window.scrollTo({ top:0 });
  if (focusId) setTimeout(() => {
    const el = document.getElementById(focusId);
    if (el){ el.scrollIntoView({ behavior:"smooth", block:"center" }); el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 1700); }
  }, 60);
}
function bindTabContent(){ /* re-render current tab (หลังปิด modal) */ }

document.addEventListener("click", e => {
  const t = e.target;
  const closest = s => t.closest(s);

  const nav = closest(".nav-item");       if (nav) return goTab(nav.dataset.tab);
  const go  = closest("[data-go]");       if (go) return goTab(go.dataset.go);
  const ep  = closest("[data-ep]");       if (ep) return openEpisode(ep.dataset.ep);
  const mt  = closest("[data-mtab]");     if (mt){ modalTab = mt.dataset.mtab; return drawModal(); }
  const cp  = closest("[data-copy]");     if (cp) return copyText(cp.dataset.copy);
  const cc  = closest("[data-copy-cmd]"); if (cc) return copyText(randCommand(), "คัดลอกคำสั่งแล้ว — วางในแชต Claude ได้เลย!");
  const rs  = closest("[data-reset]");    if (rs){
    EPISODES.find(x => x.id === rs.dataset.reset).checklist.forEach((_, i) => store.set(`chk_${rs.dataset.reset}_${i}`, false));
    drawModal(); return;
  }
  const qcb = closest("[data-qcep]");     if (qcb){ qcEp = qcb.dataset.qcep; return renderQC(); }
  const acc = closest("[data-acc]");      if (acc) return acc.closest(".acc").classList.toggle("open");
  const lock= closest("[data-lock]");     if (lock){
    randState.locks[lock.dataset.lock] = !randState.locks[lock.dataset.lock];
    return renderRandom();
  }
  if (t.id === "rollBtn"){
    pickRandom(); renderRandom();
    const hero = $("#randHero"); if (hero){ hero.classList.add("rolling"); setTimeout(() => hero.classList.remove("rolling"), 550); }
    return;
  }
  if (t.id === "menuBtn") return $("#sidebar").classList.toggle("open");
  if (t.id === "themeBtn") return toggleTheme();
  if (t.id === "modalClose" || t.id === "modalBackdrop") return closeModal();
  if (!closest(".search-wrap")) $("#searchResults").hidden = true;
});

document.addEventListener("change", e => {
  const chk = e.target.closest("[data-chk]");
  if (chk){
    store.set(`chk_${chk.dataset.chk}`, chk.checked);
    chk.closest(".check-item").classList.toggle("checked", chk.checked);
    if (modalEp) drawModal();
    return;
  }
  const qc = e.target.closest("[data-qc]");
  if (qc){ store.set(qc.dataset.qc, qc.checked); renderQC(); }
});

document.addEventListener("keydown", e => { if (e.key === "Escape" && modalEp) closeModal(); });

/* search */
$("#searchBox").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  const box = $("#searchResults");
  if (q.length < 1){ box.hidden = true; return; }
  const hits = SEARCH_INDEX.filter(x => x.hay.toLowerCase().includes(q)).slice(0, 8);
  box.innerHTML = hits.length
    ? hits.map((h, i) => `<button class="sr-item" data-si="${SEARCH_INDEX.indexOf(h)}"><span>${esc(h.label)}</span><small>${h.type}</small></button>`).join("")
    : `<div style="padding:14px;font-size:13px;color:var(--muted)">ไม่พบ "${esc(q)}"</div>`;
  box.hidden = false;
});
$("#searchResults").addEventListener("click", e => {
  const b = e.target.closest("[data-si]"); if (!b) return;
  const item = SEARCH_INDEX[+b.dataset.si];
  $("#searchResults").hidden = true; $("#searchBox").value = "";
  goTab(item.tab, item.target);
});

/* theme */
function applyTheme(mode){
  document.documentElement.dataset.theme = mode;
  $("#themeBtn").textContent = mode === "dark" ? "☀️" : "🌙";
}
function toggleTheme(){
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  store.set("theme", next); applyTheme(next);
}

/* ═══ INIT ════════════════════════════════════════════════ */
(function init(){
  applyTheme(store.get("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("#repoLink").href = REPO_URL;
  $("#footRepo").href = REPO_URL;
  renderHome();
})();
