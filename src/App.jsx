import { useState, useEffect } from "react";

const EVENTS = {
  1: { phase: "off" },
  2: { phase: "off" },
  3: { phase: "off" },
  4: { phase: "off" },
  5: { phase: "off" },
  6: { phase: "off" },
  7: { phase: "off" },
  8: { phase: "off" },
  9: { phase: "off" },
  10: { phase: "off" },
  11: { phase: "off" },
  12: { phase: "off" },
  13: { phase: "off" },
  14: { phase: "off" },
  15: { phase: "teasing-pirate", platform: "Insta Post + Story", content: "ANNONCE OFFICIELLE 🏴‍☠️ Post visuel soirée pirate : Bar Barracuda, Jeudi 17 avril, 21h30-2h30, thème pirate + prix étudiant.\n\nStory facecam d'un membre BDE déguisé en pirate qui annonce la soirée + sondage \"Ton costume pirate est prêt ?\" avec inspi costumes (chapeau, bandana, eye-patch).\n\nAjouter un sticker compte à rebours J-2.", time: "18h00", tip: "⚠️ Visuel à créer. Facecam = x3 engagement vs visuel statique. Sticker countdown = rappel auto pour les abonnés", format: "Post annonce + Facecam + Countdown" },
  16: { phase: "teasing-pirate", platform: "Story + TikTok", content: "Story GRWM (Get Ready With Me) version pirate par un membre du BDE 🏴‍☠️ — TikTok du même contenu.\n\n\"Demain c'est la guerre, moussaillons ⚔️\" + rappel horaire/lieu", time: "19h00", tip: "GRWM = format très engageant, parfait veille d'event. Rappeler infos pratiques", format: "GRWM vidéo" },
  17: { phase: "event-pirate", platform: "Insta Story ×5 min.", content: "JOUR J 🏴‍☠️\n• Matin : Story compte à rebours \"Ce soir on envahit le Barracuda\"\n• 17h : Story rappel infos (lieu, heure, prix)\n• 20h : Story facecam \"On est en route, vous êtes où ?\"\n• Pendant : Stories live de la soirée (ambiance, foule, musique)\n• Fin : Story \"Merci à tous, vous êtes des pirates incroyables\"", time: "Toute la journée", tip: "Minimum 4-5 stories. Filmer un max pendant la soirée pour le recap du lendemain", format: "Multi-story jour J", event: "SOIRÉE PIRATE", eventSub: "Bar Barracuda · 21h30–2h30 · Thème Pirate" },
  18: { phase: "recap-pirate", platform: "Story + Post", content: "Story best-of de la soirée pirate 🏴‍☠️ — Vidéo montage des meilleurs moments + Post carrousel \"Retour sur la soirée pirate\" avec les meilleures photos", time: "16h00", tip: "Poster le lendemain tant que c'est frais. Taguer les gens = plus de partages", format: "Montage vidéo + Carrousel" },
  19: { phase: "recap-pirate", secondaryPhase: "teasing-five", platform: "Instagram Story", content: "🏴‍☠️ Story \"Vos plus belles photos de la soirée\" — Republier les stories où le BDE est tagué + vote meilleur costume pirate.\n\n⚽ Teaser transition : \"La pirate night c'était fou 🏴‍☠️ mais c'est pas fini... quelque chose arrive mercredi ⚽\" — Premier teaser Five en fin de journée", time: "14h + 20h", tip: "Double contenu : capitaliser sur la pirate + lancer le teasing Five. Le momentum post-soirée est parfait pour annoncer la suite", format: "Repost UGC + Teaser Five" },
  20: { phase: "teasing-five", platform: "Insta Post + Story", content: "ANNONCE FIVE ⚽ Post visuel : Mercredi 23 avril, 19h, Five mixte, 10 places, inscription obligatoire, payant.\n\nStory facecam : un membre BDE avec un ballon explique le concept + comment s'inscrire (DM ou lien)", time: "18h00", tip: "⚠️ Visuel à créer. Mettre le lien/contact inscription en story (sticker lien ou DM). Lancer les inscriptions dès maintenant", format: "Post annonce + Facecam" },
  21: { phase: "teasing-five", secondaryPhase: "teasing-bisous", platform: "Story + Story", content: "⚽ Story \"Plus que quelques places ⚽🔥\" — Montrer le nombre d'inscrits (ex: 7/10). \"DM pour réserver ta place\". Sondage : \"Qui va mettre le but de la victoire ?\"\n\n💋 Story mystère en soirée : fond noir + texte \"Quelque chose de gros arrive fin avril... 💋🪩\" — Premier teaser Bisous Bisous", time: "12h30 + 21h", tip: "Matin = urgence FOMO Five avec places limitées. Soir = planter la graine Bisous Bisous. 2 events promus = 2 raisons de regarder les stories", format: "FOMO Five + Teaser Bisous" },
  22: { phase: "teasing-five", secondaryPhase: "teasing-bisous", platform: "Story + Story", content: "⚽ Story rappel veille de match : \"Demain 19h, c'est la guerre ⚽🔥\" — Liste des inscrits / équipes si possible. Compte à rebours J-1.\n\n💋 Story teaser Bisous : \"Jeudi 30 avril... la nuit la plus folle du mois arrive 💋\" — Musique house en fond, texte progressif", time: "18h + 21h", tip: "Dernier rappel Five = confirmer les joueurs. Continuer à faire monter la hype Bisous en parallèle", format: "Rappel Five + Teaser Bisous" },
  23: { phase: "event-five", platform: "Insta Story ×4 min.", content: "JOUR J FIVE ⚽\n• Midi : Story rappel \"Ce soir 19h, soyez chauds\"\n• 18h : Story facecam en tenue de sport \"On se retrouve dans 1h\"\n• Pendant : Stories live du match (buts, ambiance, célébrations)\n• Après : Story résultat final + MVP du match", time: "Toute la journée", tip: "Filmer les buts et les célébrations ! Parfait pour TikTok aussi", format: "Multi-story jour J", event: "FIVE FOOTBALL", eventSub: "19h · 10 joueurs · Mixte · Sur inscription" },
  24: { phase: "recap-five", secondaryPhase: "teasing-bisous", platform: "Story + Post + Story", content: "⚽ Story best-of du five — Montage vidéo des meilleurs moments + Post photo d'équipe avec score final. Taguer tous les joueurs.\n\n💋 Story teaser Bisous en soirée : \"Le five c'était incroyable ⚽ mais la semaine prochaine c'est un autre niveau... 💋🪩\" — Transition vers Bisous Bisous", time: "16h + 21h", tip: "Enchaîner recap Five + teaser Bisous pour garder le momentum. Les gens qui ont aimé le five voudront la suite", format: "Recap Five + Teaser Bisous" },
  25: { phase: "off" },
  26: { phase: "off" },
  27: { phase: "teasing-bisous", platform: "Post + Story + TikTok", content: "ANNONCE OFFICIELLE 💋 Post visuel : Bisous Bisous, Mercredi 30 avril, 00h-5h, soirée interBDE.\n\nStory facecam excitée \"La dernière soirée d'avril va être INCROYABLE\" — TikTok teaser avec le son trending du moment", time: "18h00", tip: "⚠️ Visuel à créer. Gros post = likes + saves + partages. Annoncer tôt pour laisser 3 jours de teasing", format: "Post annonce + Facecam + TikTok" },
  28: { phase: "teasing-bisous", platform: "Instagram Story", content: "Story sondage : \"Before ou pas before ? 🍹\" — Si before confirmé : annoncer le lieu/heure.\n\nStory compte à rebours J-2 + \"Avec qui tu viens ? 💋\" Tag ton/ta pote", time: "19h00", tip: "Le sondage before donne un signal sur la demande. Compte à rebours = rappel auto. Le tag = viralité organique", format: "Sondage Before + Countdown + Tag" },
  29: { phase: "teasing-bisous", platform: "Story + TikTok", content: "Story GRWM \"Get Ready With Me\" pour Bisous Bisous 💋 — Un membre du BDE se prépare pour la soirée.\n\n\"Demain on finit le mois en beauté 🪩\" — Rappel infos pratiques (lieu, heure, before). TikTok du même contenu", time: "19h00", tip: "GRWM veille de soirée = format très engageant. Rappeler toutes les infos pratiques une dernière fois", format: "GRWM + Dernier rappel" },
  30: { phase: "event-bisous", platform: "Insta Story ×6 min.", content: "JOUR J 💋\n• Après-midi : Story \"Ce soir c'est la dernière soirée du mois, on finit en beauté\"\n• 20h : Si before → stories du before (ambiance, arrivées)\n• 23h : Story facecam \"On arrive à Bisous Bisous 🪩\"\n• Pendant : Stories live du dancefloor, DJ, ambiance, lumières\n• Fin : Story \"Avril c'était incroyable, merci à tous 💋\"\n\n📸 Penser à filmer un max pour le recap du 1er mai !", time: "Toute la journée", tip: "GROSSE SOIRÉE = maximum de contenu. Filmer pour TikTok aussi. Minimum 6-8 stories. Le recap sera posté le 1er mai", format: "Multi-story jour J", event: "BISOUS BISOUS", eventSub: "00h–5h · InterBDE · Before possible" },
};

const PHASE_META = {
  "regular": { label: "Contenu", tagBg: "#f1f5f9", tagColor: "#64748b", darkTagBg: "#1e293b", darkTagColor: "#94a3b8" },
  "off": { label: "Repos" },
  "teasing-pirate": { label: "Teasing", tagBg: "#fff7ed", tagColor: "#ea580c", darkTagBg: "#431407", darkTagColor: "#fb923c" },
  "event-pirate": { label: "Jour J", tagBg: "#f97316", tagColor: "#fff", darkTagBg: "#f97316", darkTagColor: "#fff" },
  "recap-pirate": { label: "Recap", tagBg: "#ffedd5", tagColor: "#c2410c", darkTagBg: "#431407", darkTagColor: "#fdba74" },
  "teasing-five": { label: "Teasing", tagBg: "#f0fdf4", tagColor: "#16a34a", darkTagBg: "#052e16", darkTagColor: "#4ade80" },
  "event-five": { label: "Jour J", tagBg: "#22c55e", tagColor: "#fff", darkTagBg: "#22c55e", darkTagColor: "#fff" },
  "recap-five": { label: "Recap", tagBg: "#dcfce7", tagColor: "#15803d", darkTagBg: "#052e16", darkTagColor: "#86efac" },
  "teasing-bisous": { label: "Teasing", tagBg: "#fdf2f8", tagColor: "#db2777", darkTagBg: "#500724", darkTagColor: "#f472b6" },
  "event-bisous": { label: "Jour J", tagBg: "#ec4899", tagColor: "#fff", darkTagBg: "#ec4899", darkTagColor: "#fff" },
};

const EC = { pirate: "#f97316", five: "#22c55e", bisous: "#ec4899" };
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const DAYS_FULL = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

const IDEAS = [
  { icon: "📹", name: "Facecam / Talking Head", desc: "Un membre parle face caméra pour annoncer un event. Authentique, humain, beaucoup plus engageant qu'un visuel statique. Ton décontracté.", when: "Annonce, rappel veille, jour J" },
  { icon: "🎬", name: "GRWM (Get Ready With Me)", desc: "Se préparer en vidéo pour la soirée — maquillage, costume, tenue. Format très populaire TikTok/Reels. Parfait pour les soirées à thème.", when: "Veille d'une soirée à thème" },
  { icon: "📊", name: "Sondage / Quiz en Story", desc: "Poser une question avec 2-3 options. Booste l'engagement et l'algorithme Instagram. Simple et efficace.", when: "2-3 fois par semaine" },
  { icon: "⏳", name: "Compte à rebours", desc: "Sticker countdown avec date/heure de l'event. Les abonnés activent le rappel = notification automatique le jour J.", when: "Dès l'annonce de chaque event" },
  { icon: "🔥", name: "Teaser mystère", desc: "Fond noir + texte progressif. Ne pas tout révéler. Créer suspense et curiosité. Musique en fond.", when: "3-4 jours avant l'annonce officielle" },
  { icon: "🎥", name: "Behind the scenes", desc: "Montrer les coulisses de l'organisation : repérage du lieu, préparation déco, essai costume. Montre le travail du BDE.", when: "Pendant la préparation d'un event" },
  { icon: "📸", name: "Recap carrousel", desc: "Post avec 5-10 photos/vidéos des meilleurs moments. Les gens se cherchent dessus = engagement et partages.", when: "Lendemain de chaque event" },
  { icon: "🗳️", name: "\"Tag ton pote\"", desc: "Story avec texte \"Tag la personne avec qui tu viens\" ou \"Envoie ça à ton crew\". Viralité organique garantie.", when: "48h avant un event" },
  { icon: "🏆", name: "Défi / Challenge", desc: "Mini-défi lié à l'event (\"Le meilleur costume pirate gagne une conso\", \"MVP du five gagne...\"). Motive la participation.", when: "Phase teasing" },
  { icon: "📱", name: "Repost UGC", desc: "Republier les stories des participants qui taguent le BDE. Les gens adorent être repostés = plus de tags futurs.", when: "Pendant et après chaque event" },
  { icon: "🎵", name: "TikTok Trend", desc: "Reprendre un son/format trending avec les membres du BDE. Adaptation au contexte BDE/soirée. Potentiel viral.", when: "1-2 fois par mois" },
  { icon: "💬", name: "Confession / Anecdote", desc: "\"Mon pire moment en event\" par les membres du BDE. Format authentique et drôle qui humanise le BDE.", when: "Semaine calme entre 2 events" },
];

const EVENT_RECAP = [
  { key: "pirate", emoji: "🏴‍☠️", name: "Soirée Pirate", date: "Jeudi 17 avril", time: "21h30 – 2h30", lieu: "Bar Barracuda", type: "Soirée interBDE", theme: "Pirate", capacite: "À confirmer", prix: "Tarif étudiant (à confirmer)", inscription: "Libre", part: "Costumes encouragés · Musique à thème", teasing: "15 → 16 avril (2 jours)", visuels: "1 post annonce + stories" },
  { key: "five", emoji: "⚽", name: "Five Football", date: "Mercredi 23 avril", time: "19h00", lieu: "À confirmer", type: "Match de foot à 5", theme: "—", capacite: "10 personnes", prix: "Payant (à confirmer)", inscription: "Obligatoire (DM ou lien)", part: "Mixte · Places limitées = FOMO", teasing: "19 → 22 avril (4 jours)", visuels: "1 post annonce + stories" },
  { key: "bisous", emoji: "💋", name: "Bisous Bisous", date: "Mercredi 30 avril", time: "00h00 – 5h00", lieu: "Bisous Bisous (boîte)", type: "Soirée interBDE", theme: "À définir", capacite: "À confirmer", prix: "À confirmer", inscription: "Libre", part: "Before possible · Dernière soirée du mois · Recap le 1er mai", teasing: "21 → 29 avril (teasing croisé dès le 21)", visuels: "1 post annonce + stories + TikTok" },
];

const getEK = (p) => { if (!p) return null; if (p.includes("pirate")) return "pirate"; if (p.includes("five")) return "five"; if (p.includes("bisous")) return "bisous"; return null; };

function DetailContent({ ev, pm, selected, accent, dark, onClose }) {
  const dow = (2 + selected - 1) % 7;
  const secMeta = ev.secondaryPhase ? PHASE_META[ev.secondaryPhase] : null;
  const secEk = ev.secondaryPhase ? getEK(ev.secondaryPhase) : null;
  const secAccent = secEk ? EC[secEk] : null;
  return (
    <>
      <div className="detail-header" style={{ padding: "22px 28px 18px", borderBottom: `1px solid var(--border-light)`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-xfaint)", fontFamily: "'JetBrains Mono', monospace", margin: "0 0 4px" }}>{DAYS_FULL[dow]} {selected} avril 2026</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span className="detail-title" style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'Instrument Serif', serif" }}>{ev.format || "Contenu du jour"}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: dark ? pm.darkTagBg : pm.tagBg, color: dark ? pm.darkTagColor : pm.tagColor }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent }} />
              {pm.label}
            </span>
            {secMeta && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: dark ? secMeta.darkTagBg : secMeta.tagBg, color: dark ? secMeta.darkTagColor : secMeta.tagColor }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: secAccent }} />
                {secMeta.label}
              </span>
            )}
          </div>
          {ev.event && <p style={{ fontSize: 14, fontWeight: 500, color: accent, margin: "6px 0 0" }}>{ev.event} — {ev.eventSub}</p>}
        </div>
        <button onClick={onClose} style={{ background: "var(--close-btn-bg)", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "var(--text-faint)" }}>✕</button>
      </div>
      <div className="detail-body" style={{ padding: "22px 28px 28px" }}>
        <div className="detail-meta-row" style={{ display: "flex", gap: 32, marginBottom: 22, flexWrap: "wrap" }}>
          {[["Plateforme", ev.platform], ["Heure de publication", ev.time]].map(([l, v]) => (
            <div key={l}>
              <p style={{ fontSize: 10, color: "var(--text-xxfaint)", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 4px", fontFamily: "'JetBrains Mono', monospace" }}>{l}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text-secondary)", margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 10, color: "var(--text-xxfaint)", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 8px", fontFamily: "'JetBrains Mono', monospace" }}>Contenu à publier</p>
          <div className="detail-content-box" style={{ background: "var(--bg-card-alt)", borderRadius: 10, padding: "16px 20px", fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)", borderLeft: secMeta ? "3px solid transparent" : `3px solid ${accent}`, borderImage: secMeta ? `linear-gradient(to bottom, ${accent} 50%, ${secAccent} 50%) 1` : undefined, whiteSpace: "pre-line" }}>{ev.content}</div>
        </div>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-xxfaint)", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 8px", fontFamily: "'JetBrains Mono', monospace" }}>Conseil</p>
          <div style={{ background: "var(--tip-bg)", borderRadius: 10, padding: "12px 18px", fontSize: 13, color: "var(--tip-color)", lineHeight: 1.6, border: "1px solid var(--tip-border)" }}>{ev.tip}</div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("calendar");
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bde-dark-mode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("bde-dark-mode", dark);
  }, [dark]);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (selected && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [selected]);

  const weeks = [];
  let w = [null, null];
  for (let d = 1; d <= 30; d++) { w.push(d); if (w.length === 7) { weeks.push(w); w = []; } }
  if (w.length) { while (w.length < 7) w.push(null); weeks.push(w); }

  const ev = selected ? EVENTS[selected] : null;
  const pm = ev ? PHASE_META[ev.phase] : null;

  return (
    <div className={dark ? "dark" : ""} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "var(--bg)", minHeight: "100vh", color: "var(--text)", transition: "background 0.3s, color 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ── HEADER ── */}
      <header style={{ background: "var(--bg-header)", borderBottom: "1px solid var(--border)", transition: "background 0.3s" }}>
        <div className="app-header-inner" style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 28px 0" }}>
          <div className="header-top-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p className="app-subtitle" style={{ fontSize: 12, color: "var(--text-xfaint)", margin: "0 0 2px", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Planning communication</p>
              <h1 className="app-title" style={{ fontSize: 42, fontWeight: 400, margin: 0, fontFamily: "'Instrument Serif', serif", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                Avril <span style={{ fontStyle: "italic" }}>2026</span>
              </h1>
            </div>
            <button className="dark-toggle" onClick={() => setDark(!dark)} aria-label={dark ? "Mode clair" : "Mode sombre"}>
              {dark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          <div className="event-pills" style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            {EVENT_RECAP.map(e => (
              <span key={e.key} className="event-pill" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 100, padding: "5px 14px 5px 10px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: EC[e.key], display: "inline-block" }} />
                {e.name} <span style={{ color: "var(--text-xfaint)", fontSize: 12 }}>·</span> <span className="event-pill-date" style={{ color: "var(--text-faint)", fontSize: 12 }}>{e.date}</span>
              </span>
            ))}
          </div>

          <nav className="app-nav" style={{ display: "flex", gap: 0, marginTop: 22 }}>
            {["calendar", "events", "ideas"].map(id => {
              const labels = { calendar: "Calendrier", events: "Fiches events", ideas: "Boîte à idées" };
              return (
                <button key={id} onClick={() => { setTab(id); setSelected(null); }} style={{
                  background: "none", border: "none", cursor: "pointer", padding: "10px 20px", fontSize: 13,
                  fontWeight: tab === id ? 600 : 400, color: tab === id ? "var(--text-primary)" : "var(--text-faint)",
                  borderBottom: tab === id ? `2px solid var(--text-primary)` : "2px solid transparent", marginBottom: -1, transition: "all 0.15s",
                }}>{labels[id]}</button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="app-main" style={{ maxWidth: 1060, margin: "0 auto", padding: "28px 28px 80px" }}>

        {/* ═══ CALENDAR ═══ */}
        {tab === "calendar" && (<>
          <div className="calendar-days-header" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 2 }}>
            {DAYS.map((d, i) => (
              <div key={i} style={{ textAlign: "center", padding: "10px 0 6px", fontSize: 10, fontWeight: 500, color: "var(--text-xxfaint)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{d}</div>
            ))}
          </div>

          <div className="calendar-grid" style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {weeks.map((wk, wi) => (
              <div key={wi} className="calendar-week" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: wi < weeks.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                {wk.map((day, di) => {
                  if (!day) return <div key={di} className="calendar-cell-empty" style={{ borderRight: di < 6 ? "1px solid var(--border-light)" : "none", minHeight: 128, background: "var(--bg-card-alt)" }} />;
                  const d = EVENTS[day]; const meta = d ? PHASE_META[d.phase] : null;
                  const secMeta = d?.secondaryPhase ? PHASE_META[d.secondaryPhase] : null;
                  const isOff = d?.phase === "off"; const isEv = d?.phase?.startsWith("event-");
                  const isSel = selected === day; const ek = getEK(d?.phase);
                  const secEk = d?.secondaryPhase ? getEK(d.secondaryPhase) : null;
                  const accent = ek ? EC[ek] : null; const secAccent = secEk ? EC[secEk] : null;
                  const isToday = day === 14;
                  const dow = (2 + day - 1) % 7;
                  const hasDual = !!secMeta;
                  const borderLeftStyle = hasDual
                    ? `3px solid ${accent}` // primary color, gradient via pseudo-element in CSS
                    : isEv ? `3px solid ${accent}` : isSel ? `3px solid ${accent || "#888"}` : "3px solid transparent";

                  return (
                    <div key={di} className={`calendar-cell${isOff ? " calendar-cell-off" : ""}${hasDual ? " calendar-cell-dual" : ""}`} onClick={() => !isOff && setSelected(isSel ? null : day)} style={{
                      borderRight: di < 6 ? "1px solid var(--border-light)" : "none", minHeight: 128,
                      padding: 10, cursor: isOff ? "default" : "pointer", position: "relative",
                      background: isSel ? (accent ? `${accent}15` : (dark ? "#1e1e2e" : "#f8f8ff")) : isEv ? `${accent}${dark ? "20" : "06"}` : "var(--bg-card)",
                      borderLeft: "3px solid transparent",
                      borderImage: hasDual ? `linear-gradient(to bottom, ${accent} 50%, ${secAccent} 50%) 1` : isEv || isSel ? undefined : undefined,
                      borderLeftColor: !hasDual ? (isEv ? accent : isSel ? (accent || "#888") : "transparent") : undefined,
                      transition: "all 0.12s ease", opacity: isOff ? 0.45 : 1,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span className="cell-day-number" style={{
                          fontSize: 20, fontWeight: isEv ? 700 : 500, fontFamily: "'JetBrains Mono', monospace",
                          color: isOff ? "var(--text-off)" : isEv ? accent : isToday ? "#6366f1" : "var(--text-secondary)",
                        }}><span className="cell-day-name" style={{ display: "none" }}>{DAYS_FULL[dow]} </span>{day}</span>
                        {isToday && <span style={{ fontSize: 8, background: "#6366f1", color: "#fff", padding: "2px 6px", borderRadius: 3, fontWeight: 600, letterSpacing: 0.5 }}>Aujourd'hui</span>}
                      </div>

                      {isOff ? (
                        <span style={{ fontSize: 11, color: "var(--text-off)" }}>—</span>
                      ) : (<>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
                          {meta && (
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 3, fontSize: 9, fontWeight: 600, letterSpacing: 0.3,
                              background: dark ? meta.darkTagBg : meta.tagBg, color: dark ? meta.darkTagColor : meta.tagColor,
                              padding: "2px 7px", borderRadius: 4,
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block" }} />
                              {meta.label}
                            </span>
                          )}
                          {secMeta && (
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 3, fontSize: 9, fontWeight: 600, letterSpacing: 0.3,
                              background: dark ? secMeta.darkTagBg : secMeta.tagBg, color: dark ? secMeta.darkTagColor : secMeta.tagColor,
                              padding: "2px 7px", borderRadius: 4,
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: secAccent, display: "inline-block" }} />
                              {secMeta.label}
                            </span>
                          )}
                        </div>
                        {d?.event && <div style={{ fontSize: 11, fontWeight: 700, color: accent, lineHeight: 1.2, marginBottom: 3 }}>{d.event}</div>}
                        {d?.format && <div style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.4, marginBottom: 2 }}>{d.format}</div>}
                        {d?.platform && <div className="cell-platform" style={{ fontSize: 9, color: "var(--text-xxfaint)", fontFamily: "'JetBrains Mono', monospace", position: "absolute", bottom: 8, left: 13 }}>{d.platform}</div>}
                        {d?.time && <div className="cell-time" style={{ fontSize: 9, color: "var(--text-xfaint)", fontFamily: "'JetBrains Mono', monospace", position: "absolute", bottom: 8, right: 10 }}>{d.time}</div>}
                      </>)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Desktop Detail */}
          {ev && ev.phase !== "off" && (() => {
            const ek = getEK(ev.phase); const accent = ek ? EC[ek] : "#6366f1";
            return (
              <div className="detail-panel-desktop" style={{ marginTop: 20, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", animation: "su .2s ease" }}>
                <DetailContent ev={ev} pm={pm} selected={selected} accent={accent} dark={dark} onClose={() => setSelected(null)} />
              </div>
            );
          })()}

          {/* Mobile Modal */}
          {ev && ev.phase !== "off" && (() => {
            const ek = getEK(ev.phase); const accent = ek ? EC[ek] : "#6366f1";
            return (
              <div className="mobile-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
                <div className="mobile-modal-content">
                  <div className="mobile-modal-handle" />
                  <DetailContent ev={ev} pm={pm} selected={selected} accent={accent} dark={dark} onClose={() => setSelected(null)} />
                </div>
              </div>
            );
          })()}

          {!selected && <p style={{ textAlign: "center", color: "var(--text-xxxfaint)", fontSize: 12, marginTop: 24, fontStyle: "italic" }}>Clique sur un jour pour voir le détail</p>}
        </>)}

        {/* ═══ EVENTS ═══ */}
        {tab === "events" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EVENT_RECAP.map(e => {
              const c = EC[e.key];
              const rows = [["Date", e.date], ["Horaires", e.time], ["Lieu", e.lieu], ["Type", e.type], ["Thème", e.theme], ["Capacité", e.capacite], ["Prix", e.prix], ["Inscription", e.inscription], ["Particularité", e.part], ["Période teasing", e.teasing], ["Visuels à créer", e.visuels]];
              return (
                <div key={e.key} style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="event-card-header" style={{ padding: "22px 28px", borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 4, height: 36, borderRadius: 2, background: c }} />
                    <div>
                      <h2 style={{ fontSize: 22, fontWeight: 400, margin: 0, fontFamily: "'Instrument Serif', serif", color: "var(--text-primary)" }}>{e.emoji} {e.name}</h2>
                      <p style={{ fontSize: 13, color: "var(--text-faint)", margin: "2px 0 0" }}>{e.date} · {e.time}</p>
                    </div>
                  </div>
                  <div className="event-card-grid" style={{ padding: "18px 28px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px 28px" }}>
                    {rows.map(([l, v]) => (
                      <div key={l}>
                        <p style={{ fontSize: 10, color: "var(--text-xxfaint)", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 3px", fontFamily: "'JetBrains Mono', monospace" }}>{l}</p>
                        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, fontWeight: 450 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ IDEAS ═══ */}
        {tab === "ideas" && (<>
          <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px", fontStyle: "italic" }}>12 formats créatifs à utiliser pour tes stories et posts tout au long du mois.</p>
          <div className="ideas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
            {IDEAS.map((idea, i) => (
              <div key={i} style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                  <span style={{ fontSize: 20 }}>{idea.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{idea.name}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{idea.desc}</p>
                <p style={{ fontSize: 11, color: "var(--text-faint)", background: "var(--idea-when-bg)", padding: "5px 10px", borderRadius: 6, margin: "6px 0 0", fontFamily: "'JetBrains Mono', monospace" }}>{idea.when}</p>
              </div>
            ))}
          </div>
        </>)}
      </main>
    </div>
  );
}
