import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────
// All times stored as UTC, displayed as +3 (KSA/Turkey time)
// ET + 7 = +3

const GROUPS = {
  A: {
    teams: ["المكسيك", "جنوب أفريقيا", "كوريا الجنوبية", "تشيكيا"],
    matches: [
      { home: "المكسيك",        away: "جنوب أفريقيا",    date: "11 يونيو", time: "22:00", venue: "أستاد أزتيكا، مكسيكو سيتي",   hg: null, ag: null },
      { home: "كوريا الجنوبية", away: "تشيكيا",           date: "12 يونيو", time: "05:00", venue: "أستاد أكرون، خالابا",           hg: null, ag: null },
      { home: "تشيكيا",         away: "جنوب أفريقيا",    date: "18 يونيو", time: "19:00", venue: "مرسيدس-بنز ستيديوم، أتلانتا",  hg: null, ag: null },
      { home: "المكسيك",        away: "كوريا الجنوبية",  date: "19 يونيو", time: "02:00", venue: "أستاد أكرون، خالابا",           hg: null, ag: null },
      { home: "تشيكيا",         away: "المكسيك",          date: "25 يونيو", time: "02:00", venue: "أستاد أزتيكا، مكسيكو سيتي",   hg: null, ag: null },
      { home: "جنوب أفريقيا",  away: "كوريا الجنوبية",  date: "25 يونيو", time: "02:00", venue: "أستاد BBVA، مونتيري",           hg: null, ag: null },
    ],
  },
  B: {
    teams: ["كندا", "البوسنة والهرسك", "قطر", "سويسرا"],
    matches: [
      { home: "كندا",              away: "البوسنة والهرسك", date: "12 يونيو", time: "22:00", venue: "BMO فيلد، تورنتو",              hg: null, ag: null },
      { home: "قطر",               away: "سويسرا",           date: "13 يونيو", time: "22:00", venue: "ملعب ليفايز، سانتا كلارا",     hg: null, ag: null },
      { home: "سويسرا",            away: "البوسنة والهرسك", date: "18 يونيو", time: "22:00", venue: "SoFi ستيديوم، إنجلوود",        hg: null, ag: null },
      { home: "كندا",              away: "قطر",               date: "19 يونيو", time: "01:00", venue: "BC بليس، فانكوفر",             hg: null, ag: null },
      { home: "سويسرا",            away: "كندا",              date: "24 يونيو", time: "22:00", venue: "BC بليس، فانكوفر",             hg: null, ag: null },
      { home: "البوسنة والهرسك",  away: "قطر",               date: "24 يونيو", time: "22:00", venue: "لومن فيلد، سياتل",             hg: null, ag: null },
    ],
  },
  C: {
    teams: ["البرازيل", "المغرب", "هاييتي", "أسكتلندا"],
    matches: [
      { home: "البرازيل",  away: "المغرب",   date: "13 يونيو", time: "01:00", venue: "ملعب ميتلايف، نيوجيرسي",       hg: null, ag: null },
      { home: "هاييتي",   away: "أسكتلندا", date: "14 يونيو", time: "02:00", venue: "جيليت ستيديوم، فوكسبورو",      hg: null, ag: null },
      { home: "أسكتلندا", away: "المغرب",   date: "19 يونيو", time: "01:00", venue: "جيليت ستيديوم، فوكسبورو",      hg: null, ag: null },
      { home: "البرازيل",  away: "هاييتي",   date: "20 يونيو", time: "03:30", venue: "لينكولن فاينانشيال، فيلاديلفيا", hg: null, ag: null },
      { home: "أسكتلندا", away: "البرازيل",  date: "24 يونيو", time: "01:00", venue: "هارد روك ستيديوم، ميامي",       hg: null, ag: null },
      { home: "المغرب",   away: "هاييتي",   date: "24 يونيو", time: "01:00", venue: "مرسيدس-بنز ستيديوم، أتلانتا",  hg: null, ag: null },
    ],
  },
  D: {
    teams: ["الولايات المتحدة", "باراغواي", "أستراليا", "تركيا"],
    matches: [
      { home: "الولايات المتحدة", away: "باراغواي", date: "13 يونيو", time: "04:00", venue: "SoFi ستيديوم، إنجلوود",     hg: null, ag: null },
      { home: "أستراليا",          away: "تركيا",    date: "14 يونيو", time: "19:00", venue: "BC بليس، فانكوفر",          hg: null, ag: null },
      { home: "الولايات المتحدة", away: "أستراليا", date: "19 يونيو", time: "22:00", venue: "لومن فيلد، سياتل",          hg: null, ag: null },
      { home: "تركيا",             away: "باراغواي", date: "20 يونيو", time: "04:00", venue: "ملعب ليفايز، سانتا كلارا",  hg: null, ag: null },
      { home: "تركيا",             away: "الولايات المتحدة", date: "26 يونيو", time: "05:00", venue: "SoFi ستيديوم، إنجلوود", hg: null, ag: null },
      { home: "باراغواي",          away: "أستراليا", date: "26 يونيو", time: "05:00", venue: "ملعب ليفايز، سانتا كلارا",  hg: null, ag: null },
    ],
  },
  E: {
    teams: ["ألمانيا", "كوراساو", "كوت ديفوار", "الإكوادور"],
    matches: [
      { home: "ألمانيا",    away: "كوراساو",    date: "14 يونيو", time: "20:00", venue: "NRG ستيديوم، هيوستن",            hg: null, ag: null },
      { home: "كوت ديفوار", away: "الإكوادور",  date: "15 يونيو", time: "02:00", venue: "لينكولن فاينانشيال، فيلاديلفيا", hg: null, ag: null },
      { home: "ألمانيا",    away: "كوت ديفوار", date: "20 يونيو", time: "23:00", venue: "BMO فيلد، تورنتو",                hg: null, ag: null },
      { home: "الإكوادور",  away: "كوراساو",    date: "21 يونيو", time: "03:00", venue: "أروهيد ستيديوم، كانساس سيتي",    hg: null, ag: null },
      { home: "الإكوادور",  away: "ألمانيا",    date: "25 يونيو", time: "23:00", venue: "ملعب ميتلايف، نيوجيرسي",          hg: null, ag: null },
      { home: "كوراساو",    away: "كوت ديفوار", date: "25 يونيو", time: "23:00", venue: "لينكولن فاينانشيال، فيلاديلفيا", hg: null, ag: null },
    ],
  },
  F: {
    teams: ["هولندا", "اليابان", "السويد", "تونس"],
    matches: [
      { home: "هولندا",  away: "اليابان", date: "14 يونيو", time: "23:00", venue: "AT&T ستيديوم، أرلينجتون",       hg: null, ag: null },
      { home: "السويد",  away: "تونس",    date: "15 يونيو", time: "05:00", venue: "أستاد BBVA، مونتيري",            hg: null, ag: null },
      { home: "هولندا",  away: "السويد",  date: "20 يونيو", time: "20:00", venue: "NRG ستيديوم، هيوستن",            hg: null, ag: null },
      { home: "تونس",    away: "اليابان", date: "21 يونيو", time: "07:00", venue: "أستاد BBVA، مونتيري",            hg: null, ag: null },
      { home: "اليابان", away: "السويد",  date: "25 يونيو", time: "02:00", venue: "AT&T ستيديوم، أرلينجتون",       hg: null, ag: null },
      { home: "تونس",    away: "هولندا",  date: "25 يونيو", time: "02:00", venue: "أروهيد ستيديوم، كانساس سيتي",  hg: null, ag: null },
    ],
  },
  G: {
    teams: ["بلجيكا", "مصر", "إيران", "نيوزيلندا"],
    matches: [
      { home: "بلجيكا",    away: "مصر",        date: "15 يونيو", time: "22:00", venue: "لومن فيلد، سياتل",           hg: null, ag: null },
      { home: "إيران",     away: "نيوزيلندا",  date: "16 يونيو", time: "04:00", venue: "SoFi ستيديوم، إنجلوود",      hg: null, ag: null },
      { home: "بلجيكا",    away: "إيران",       date: "21 يونيو", time: "22:00", venue: "SoFi ستيديوم، إنجلوود",      hg: null, ag: null },
      { home: "نيوزيلندا", away: "مصر",         date: "22 يونيو", time: "04:00", venue: "BC بليس، فانكوفر",           hg: null, ag: null },
      { home: "مصر",       away: "إيران",       date: "26 يونيو", time: "06:00", venue: "لومن فيلد، سياتل",           hg: null, ag: null },
      { home: "نيوزيلندا", away: "بلجيكا",      date: "26 يونيو", time: "06:00", venue: "BC بليس، فانكوفر",           hg: null, ag: null },
    ],
  },
  H: {
    teams: ["إسبانيا", "الرأس الأخضر", "السعودية", "أوروغواي"],
    matches: [
      { home: "إسبانيا",     away: "الرأس الأخضر", date: "15 يونيو", time: "19:00", venue: "مرسيدس-بنز ستيديوم، أتلانتا", hg: null, ag: null },
      { home: "السعودية",    away: "أوروغواي",      date: "16 يونيو", time: "01:00", venue: "هارد روك ستيديوم، ميامي",      hg: null, ag: null },
      { home: "إسبانيا",     away: "السعودية",      date: "21 يونيو", time: "19:00", venue: "مرسيدس-بنز ستيديوم، أتلانتا", hg: null, ag: null },
      { home: "أوروغواي",    away: "الرأس الأخضر", date: "21 يونيو", time: "01:00", venue: "هارد روك ستيديوم، ميامي",      hg: null, ag: null },
      { home: "الرأس الأخضر",away: "السعودية",      date: "26 يونيو", time: "03:00", venue: "NRG ستيديوم، هيوستن",          hg: null, ag: null },
      { home: "أوروغواي",    away: "إسبانيا",       date: "26 يونيو", time: "03:00", venue: "أستاد أكرون، خالابا",           hg: null, ag: null },
    ],
  },
  I: {
    teams: ["فرنسا", "السنغال", "العراق", "النرويج"],
    matches: [
      { home: "فرنسا",   away: "السنغال", date: "16 يونيو", time: "22:00", venue: "ملعب ميتلايف، نيوجيرسي",    hg: null, ag: null },
      { home: "العراق",  away: "النرويج", date: "17 يونيو", time: "01:00", venue: "جيليت ستيديوم، فوكسبورو",   hg: null, ag: null },
      { home: "فرنسا",   away: "العراق",  date: "22 يونيو", time: "00:00", venue: "لينكولن فاينانشيال، فيلاديلفيا", hg: null, ag: null },
      { home: "النرويج", away: "السنغال", date: "22 يونيو", time: "03:00", venue: "ملعب ميتلايف، نيوجيرسي",    hg: null, ag: null },
      { home: "النرويج", away: "فرنسا",   date: "26 يونيو", time: "22:00", venue: "جيليت ستيديوم، فوكسبورو",   hg: null, ag: null },
      { home: "السنغال", away: "العراق",  date: "26 يونيو", time: "22:00", venue: "BMO فيلد، تورنتو",           hg: null, ag: null },
    ],
  },
  J: {
    teams: ["الأرجنتين", "الجزائر", "النمسا", "الأردن"],
    matches: [
      { home: "الأرجنتين", away: "الجزائر", date: "17 يونيو", time: "04:00", venue: "أروهيد ستيديوم، كانساس سيتي", hg: null, ag: null },
      { home: "النمسا",    away: "الأردن",   date: "17 يونيو", time: "07:00", venue: "ملعب ليفايز، سانتا كلارا",   hg: null, ag: null },
      { home: "الأرجنتين", away: "النمسا",   date: "22 يونيو", time: "20:00", venue: "AT&T ستيديوم، أرلينجتون",    hg: null, ag: null },
      { home: "الأردن",    away: "الجزائر",  date: "23 يونيو", time: "06:00", venue: "ملعب ليفايز، سانتا كلارا",   hg: null, ag: null },
      { home: "الأرجنتين", away: "الأردن",   date: "27 يونيو", time: "02:00", venue: "AT&T ستيديوم، أرلينجتون",    hg: null, ag: null },
      { home: "الجزائر",   away: "النمسا",   date: "27 يونيو", time: "02:00", venue: "أروهيد ستيديوم، كانساس سيتي", hg: null, ag: null },
    ],
  },
  K: {
    teams: ["البرتغال", "الكونغو الديمقراطية", "أوزبكستان", "كولومبيا"],
    matches: [
      { home: "البرتغال",              away: "الكونغو الديمقراطية", date: "17 يونيو", time: "20:00", venue: "NRG ستيديوم، هيوستن",          hg: null, ag: null },
      { home: "أوزبكستان",             away: "كولومبيا",             date: "18 يونيو", time: "05:00", venue: "أستاد أزتيكا، مكسيكو سيتي",    hg: null, ag: null },
      { home: "البرتغال",              away: "أوزبكستان",            date: "23 يونيو", time: "20:00", venue: "NRG ستيديوم، هيوستن",          hg: null, ag: null },
      { home: "كولومبيا",              away: "الكونغو الديمقراطية", date: "24 يونيو", time: "05:00", venue: "أستاد أكرون، خالابا",           hg: null, ag: null },
      { home: "البرتغال",              away: "كولومبيا",             date: "27 يونيو", time: "22:00", venue: "NRG ستيديوم، هيوستن",          hg: null, ag: null },
      { home: "الكونغو الديمقراطية",  away: "أوزبكستان",            date: "27 يونيو", time: "22:00", venue: "مرسيدس-بنز ستيديوم، أتلانتا",  hg: null, ag: null },
    ],
  },
  L: {
    teams: ["إنجلترا", "كرواتيا", "غانا", "بنما"],
    matches: [
      { home: "إنجلترا", away: "كرواتيا", date: "17 يونيو", time: "23:00", venue: "AT&T ستيديوم، أرلينجتون",   hg: null, ag: null },
      { home: "غانا",    away: "بنما",    date: "18 يونيو", time: "02:00", venue: "BMO فيلد، تورنتو",          hg: null, ag: null },
      { home: "إنجلترا", away: "غانا",    date: "23 يونيو", time: "23:00", venue: "جيليت ستيديوم، فوكسبورو",  hg: null, ag: null },
      { home: "بنما",    away: "كرواتيا", date: "24 يونيو", time: "02:00", venue: "BMO فيلد، تورنتو",          hg: null, ag: null },
      { home: "بنما",    away: "إنجلترا", date: "28 يونيو", time: "00:00", venue: "ملعب ميتلايف، نيوجيرسي",   hg: null, ag: null },
      { home: "كرواتيا", away: "غانا",    date: "28 يونيو", time: "00:00", venue: "لينكولن فاينانشيال، فيلاديلفيا", hg: null, ag: null },
    ],
  },
};

const FLAGS = {
  "المكسيك":"🇲🇽","جنوب أفريقيا":"🇿🇦","كوريا الجنوبية":"🇰🇷","تشيكيا":"🇨🇿",
  "كندا":"🇨🇦","البوسنة والهرسك":"🇧🇦","قطر":"🇶🇦","سويسرا":"🇨🇭",
  "البرازيل":"🇧🇷","المغرب":"🇲🇦","هاييتي":"🇭🇹","أسكتلندا":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "الولايات المتحدة":"🇺🇸","باراغواي":"🇵🇾","أستراليا":"🇦🇺","تركيا":"🇹🇷",
  "ألمانيا":"🇩🇪","كوراساو":"🇨🇼","كوت ديفوار":"🇨🇮","الإكوادور":"🇪🇨",
  "هولندا":"🇳🇱","اليابان":"🇯🇵","السويد":"🇸🇪","تونس":"🇹🇳",
  "بلجيكا":"🇧🇪","مصر":"🇪🇬","إيران":"🇮🇷","نيوزيلندا":"🇳🇿",
  "إسبانيا":"🇪🇸","الرأس الأخضر":"🇨🇻","السعودية":"🇸🇦","أوروغواي":"🇺🇾",
  "فرنسا":"🇫🇷","السنغال":"🇸🇳","العراق":"🇮🇶","النرويج":"🇳🇴",
  "الأرجنتين":"🇦🇷","الجزائر":"🇩🇿","النمسا":"🇦🇹","الأردن":"🇯🇴",
  "البرتغال":"🇵🇹","الكونغو الديمقراطية":"🇨🇩","أوزبكستان":"🇺🇿","كولومبيا":"🇨🇴",
  "إنجلترا":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","كرواتيا":"🇭🇷","غانا":"🇬🇭","بنما":"🇵🇦",
};

const flag = n => FLAGS[n] || "🏳️";

const GC = ["#e74c3c","#e67e22","#f1c40f","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63","#00bcd4","#4caf50","#ff5722","#607d8b"];

// ─── Standings calc ──────────────────────────────────────────
function calcStandings(groupKey) {
  const { teams, matches } = GROUPS[groupKey];
  const st = teams.map(t => ({ name: t, p:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 }));
  matches.forEach(m => {
    if (m.hg === null || m.ag === null) return;
    const h = m.hg, a = m.ag;
    const ht = st.find(t => t.name === m.home);
    const at = st.find(t => t.name === m.away);
    if (!ht || !at) return;
    ht.p++; at.p++;
    ht.gf += h; ht.ga += a;
    at.gf += a; at.ga += h;
    if (h > a)      { ht.w++; ht.pts += 3; at.l++; }
    else if (a > h) { at.w++; at.pts += 3; ht.l++; }
    else            { ht.d++; ht.pts++; at.d++; at.pts++; }
  });
  st.sort((a,b) => b.pts - a.pts || (b.gf-b.ga)-(a.gf-a.ga) || b.gf - a.gf);
  return st;
}

// ─── KO data ─────────────────────────────────────────────────
const mk = id => ({ id, home:"؟", away:"؟", hg:null, ag:null });
const KO_INIT = {
  L_r32:[0,1,2,3,4,5,6,7].map(i=>mk(`Lr32_${i}`)),
  R_r32:[0,1,2,3,4,5,6,7].map(i=>mk(`Rr32_${i}`)),
  L_r16:[0,1,2,3].map(i=>mk(`Lr16_${i}`)),
  R_r16:[0,1,2,3].map(i=>mk(`Rr16_${i}`)),
  L_qf:[0,1].map(i=>mk(`Lqf_${i}`)),
  R_qf:[0,1].map(i=>mk(`Rqf_${i}`)),
  L_sf:[mk("Lsf_0")],
  R_sf:[mk("Rsf_0")],
  third:[mk("third_0")],
  final:[mk("final_0")],
};

const getWinner = m => {
  if (m.hg === null || m.ag === null) return null;
  if (m.hg > m.ag) return m.home;
  if (m.ag > m.hg) return m.away;
  return null;
};

// ─── Match Card (KO) ─────────────────────────────────────────
function KOCard({ match, accent }) {
  const ac = accent || "#4a9eff";
  const winner = getWinner(match);
  return (
    <div style={{ background:"#111827", border:"1px solid #1e2d4a", borderRadius:6, overflow:"hidden", minWidth:130 }}>
      {[{name:match.home, score:match.hg, isW:winner===match.home},
        {name:match.away, score:match.ag, isW:winner===match.away}].map((s,si)=>(
        <div key={si} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"5px 8px", borderBottom:si===0?"1px solid #0d1525":"none",
          background:s.isW?"#162840":"transparent" }}>
          <span style={{ fontSize:10, color:s.name==="؟"?"#2a3550":s.isW?"#e0e6f0":"#8a9db0",
            display:"flex", alignItems:"center", gap:3, overflow:"hidden", whiteSpace:"nowrap" }}>
            {s.name!=="؟"&&<span style={{flexShrink:0}}>{flag(s.name)}</span>}
            <span style={{overflow:"hidden",textOverflow:"ellipsis"}}>{s.name}</span>
          </span>
          <span style={{ fontSize:12, fontWeight:700, minWidth:14, textAlign:"center", marginRight:2,
            color:s.isW?ac:(s.score!==null?"#c0cfe0":"#2a3550") }}>
            {s.score !== null ? s.score : "–"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Bracket Column ──────────────────────────────────────────
function BracketCol({ matches, totalHeight, side, accent }) {
  const count = matches.length;
  const slotH = totalHeight / count;
  const CARD_H = 52;
  const LINE_W = 14;
  return (
    <div style={{ position:"relative", width:138, flexShrink:0, height:totalHeight }}>
      {matches.map((m,i) => {
        const topCenter = slotH*i + slotH/2;
        const cardTop = topCenter - CARD_H/2;
        const isEvenPair = i%2===0;
        return (
          <div key={m.id}>
            <div style={{ position:"absolute", top:cardTop, left:0, right:0, zIndex:2 }}>
              <KOCard match={m} accent={accent}/>
            </div>
            <div style={{ position:"absolute", top:topCenter,
              ...(side==="left"?{right:-LINE_W}:{left:-LINE_W}),
              width:LINE_W, height:1, background:"#1e3a5a", zIndex:1 }}/>
            {isEvenPair && (
              <div style={{ position:"absolute", top:topCenter,
                ...(side==="left"?{right:-LINE_W}:{left:-LINE_W}),
                width:1, height:slotH, background:"#1e3a5a", zIndex:1 }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Symmetric Bracket ───────────────────────────────────────
function SymmetricBracket({ ko }) {
  const TOTAL_H = 880;
  const GAP = 10;
  const CENTER_W = 155;
  const colW = 138;
  const leftRounds  = [{key:"L_r32",label:"دور الـ32"},{key:"L_r16",label:"دور الـ16"},{key:"L_qf",label:"ربع النهائي"},{key:"L_sf",label:"نصف النهائي"}];
  const rightRounds = [{key:"R_r32",label:"دور الـ32"},{key:"R_r16",label:"دور الـ16"},{key:"R_qf",label:"ربع النهائي"},{key:"R_sf",label:"نصف النهائي"}];
  const totalW = (colW+GAP)*4*2 + CENTER_W + GAP*2;
  return (
    <div style={{ overflowX:"auto", paddingBottom:16 }}>
      <div style={{ width:totalW, margin:"0 auto", direction:"ltr" }}>
        {/* Labels */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:8, direction:"ltr" }}>
          {leftRounds.map(({label},i)=>(
            <div key={i} style={{ width:colW, marginRight:GAP, textAlign:"center", fontSize:9, color:"#4a6080", fontWeight:600, whiteSpace:"nowrap" }}>{label}</div>
          ))}
          <div style={{ width:CENTER_W, marginLeft:GAP, marginRight:GAP }}/>
          {[...rightRounds].reverse().map(({label},i)=>(
            <div key={i} style={{ width:colW, marginLeft:GAP, textAlign:"center", fontSize:9, color:"#4a6080", fontWeight:600, whiteSpace:"nowrap" }}>{label}</div>
          ))}
        </div>
        {/* Columns */}
        <div style={{ display:"flex", alignItems:"flex-start", direction:"ltr" }}>
          {leftRounds.map(({key})=>(
            <div key={key} style={{ marginRight:GAP }}>
              <BracketCol matches={ko[key]} totalHeight={TOTAL_H} side="left"/>
            </div>
          ))}
          {/* Center */}
          <div style={{ width:CENTER_W, flexShrink:0, height:TOTAL_H, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:20, margin:`0 ${GAP}px` }}>
            <div style={{ textAlign:"center", fontSize:10, color:"#f1c40f", fontWeight:700 }}>🏆 النهائي</div>
            <KOCard match={ko.final[0]} accent="#f1c40f"/>
            <div style={{ width:"70%", height:1, background:"#1e2d4a" }}/>
            <div style={{ textAlign:"center", fontSize:10, color:"#cd7f32", fontWeight:600 }}>🥉 مباراة الثالث</div>
            <KOCard match={ko.third[0]} accent="#cd7f32"/>
          </div>
          {[...rightRounds].reverse().map(({key})=>(
            <div key={key} style={{ marginLeft:GAP }}>
              <BracketCol matches={ko[key]} totalHeight={TOTAL_H} side="right"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Group Card ──────────────────────────────────────────────
function GroupCard({ groupKey, color }) {
  const [open, setOpen] = useState(false);
  const { matches } = GROUPS[groupKey];
  const st = calcStandings(groupKey);

  return (
    <div style={{ background:"#111827", borderRadius:10, overflow:"hidden", border:"1px solid #1e2d4a" }}>
      {/* Header — clickable */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ background:color+"22", borderBottom:`2px solid ${color}`, padding:"9px 14px",
          display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", userSelect:"none" }}>
        <span style={{ fontWeight:700, color:color, fontSize:15 }}>المجموعة {groupKey}</span>
        <span style={{ color:color, fontSize:13, transition:"transform .2s", display:"inline-block",
          transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </div>

      {/* Standings */}
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr style={{ color:"#4a6080", borderBottom:"1px solid #1e2d4a" }}>
            <th style={{ padding:"6px 14px", textAlign:"right", fontWeight:500 }}>المنتخب</th>
            {["خ","ت","ف","نق"].map(h=><th key={h} style={{ padding:"6px 8px", textAlign:"center", fontWeight:500, width:28 }}>{h}</th>)}
            <th style={{ padding:"6px 8px", textAlign:"center", fontWeight:500, width:36 }}>فا</th>
          </tr>
        </thead>
        <tbody>
          {st.map((t,i)=>(
            <tr key={t.name} style={{ borderBottom:"1px solid #0d1525", background:i<2?color+"11":"transparent" }}>
              <td style={{ padding:"7px 14px" }}>
                <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:18, height:18, borderRadius:"50%", background:i<2?color:"#2a3550",
                    display:"inline-flex", alignItems:"center", justifyContent:"center",
                    fontSize:9, color:i<2?"#fff":"#6a85b0", fontWeight:700, flexShrink:0 }}>{i+1}</span>
                  <span>{flag(t.name)}</span>
                  <span style={{ color:i<2?"#e0e6f0":"#8a9db0" }}>{t.name}</span>
                </span>
              </td>
              <td style={{ textAlign:"center", color:"#6a85b0" }}>{t.l}</td>
              <td style={{ textAlign:"center", color:"#6a85b0" }}>{t.d}</td>
              <td style={{ textAlign:"center", color:"#6a85b0" }}>{t.w}</td>
              <td style={{ textAlign:"center", fontWeight:700, color }}>{t.pts}</td>
              <td style={{ textAlign:"center", color:"#4a6080", fontSize:11 }}>{t.gf}:{t.ga}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Matches accordion */}
      {open && (
        <div style={{ borderTop:"1px solid #1e2d4a", background:"#0d1525" }}>
          {matches.map((m,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", padding:"8px 14px",
              borderBottom: i < matches.length-1 ? "1px solid #1a2540" : "none", gap:8 }}>
              {/* Date/time */}
              <div style={{ flexShrink:0, textAlign:"center", minWidth:58 }}>
                <div style={{ fontSize:10, color:"#4a6080" }}>{m.date}</div>
                <div style={{ fontSize:11, color:"#6a85b0", fontWeight:600 }}>{m.time}</div>
              </div>
              {/* Home */}
              <div style={{ flex:1, textAlign:"right", fontSize:11, color:"#c0cfe0", display:"flex", alignItems:"center", justifyContent:"flex-end", gap:4 }}>
                <span>{m.home}</span><span>{flag(m.home)}</span>
              </div>
              {/* Score */}
              <div style={{ flexShrink:0, minWidth:48, textAlign:"center" }}>
                {m.hg !== null && m.ag !== null ? (
                  <span style={{ fontSize:14, fontWeight:700, color:color }}>{m.hg} – {m.ag}</span>
                ) : (
                  <span style={{ fontSize:12, color:"#2a3550", fontWeight:600 }}>vs</span>
                )}
              </div>
              {/* Away */}
              <div style={{ flex:1, textAlign:"left", fontSize:11, color:"#c0cfe0", display:"flex", alignItems:"center", gap:4 }}>
                <span>{flag(m.away)}</span><span>{m.away}</span>
              </div>
              {/* Venue */}
              <div style={{ flexShrink:0, fontSize:9, color:"#3a5070", textAlign:"left", maxWidth:120, lineHeight:1.3 }}>{m.venue}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("groups");

  return (
    <div dir="rtl" style={{ fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif", background:"#0a0e1a", minHeight:"100vh", color:"#e0e6f0" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1a1f35 0%,#0d1525 100%)", borderBottom:"1px solid #1e2d4a", padding:"18px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:30 }}>🏆</span>
          <div>
            <div style={{ fontSize:21, fontWeight:700, color:"#fff", letterSpacing:1 }}>كأس العالم 2026</div>
            <div style={{ fontSize:11, color:"#6a85b0" }}>كندا · المكسيك · الولايات المتحدة · 11 يونيو – 19 يوليو</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid #1e2d4a", background:"#0d1525" }}>
        {[["groups","دور المجموعات"],["knockout","شجرة الإقصاءات"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            padding:"12px 24px", border:"none", background:"none", cursor:"pointer",
            color:tab===k?"#4a9eff":"#6a85b0",
            borderBottom:tab===k?"2px solid #4a9eff":"2px solid transparent",
            fontFamily:"inherit", fontSize:14, fontWeight:tab===k?600:400, transition:"all .2s"
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding:"20px 16px", maxWidth:tab==="knockout"?1700:1100, margin:"0 auto" }}>
        {tab==="groups" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:16 }}>
            {Object.keys(GROUPS).map((g,gi) => (
              <GroupCard key={g} groupKey={g} color={GC[gi]}/>
            ))}
          </div>
        )}
        {tab==="knockout" && (
          <div>
            <div style={{ fontSize:11, color:"#4a6080", marginBottom:14, textAlign:"center" }}>
              يُحدَّث الجدول بعد كل مباراة
            </div>
            <SymmetricBracket ko={KO_INIT}/>
            <div style={{ marginTop:20, padding:"10px 16px", background:"#111827", borderRadius:8, border:"1px solid #1e2d4a", fontSize:11, color:"#4a6080", textAlign:"center" }}>
              أسماء المنتخبات في دور الإقصاء تُضاف تباعاً بعد انتهاء دور المجموعات
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
