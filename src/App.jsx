import { useState, useEffect, useRef, useCallback } from "react";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const DAYS_FULL = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

const EC = {
  pirate: "#f97316", five: "#22c55e", bisous: "#ec4899",
  running: "#3b82f6", gaming: "#8b5cf6", vieuxrocher: "#f59e0b", feria: "#f97316", padel: "#10b981", esterel: "#f43f5e", karting: "#ef4444", ydays: "#f59e0b", plage: "#06b6d4",
};

const PHASE_META = {
  "off": { label: "Repos" },
  "regular": { label: "Contenu", tagBg: "#f1f5f9", tagColor: "#64748b", darkTagBg: "#1e293b", darkTagColor: "#94a3b8" },
  "teasing-pirate": { label: "Teasing", tagBg: "#fff7ed", tagColor: "#ea580c", darkTagBg: "#431407", darkTagColor: "#fb923c" },
  "event-pirate": { label: "Jour J", tagBg: "#f97316", tagColor: "#fff", darkTagBg: "#f97316", darkTagColor: "#fff" },
  "recap-pirate": { label: "Recap", tagBg: "#ffedd5", tagColor: "#c2410c", darkTagBg: "#431407", darkTagColor: "#fdba74" },
  "teasing-five": { label: "Teasing", tagBg: "#f0fdf4", tagColor: "#16a34a", darkTagBg: "#052e16", darkTagColor: "#4ade80" },
  "event-five": { label: "Jour J", tagBg: "#22c55e", tagColor: "#fff", darkTagBg: "#22c55e", darkTagColor: "#fff" },
  "recap-five": { label: "Recap", tagBg: "#dcfce7", tagColor: "#15803d", darkTagBg: "#052e16", darkTagColor: "#86efac" },
  "teasing-bisous": { label: "Teasing", tagBg: "#fdf2f8", tagColor: "#db2777", darkTagBg: "#500724", darkTagColor: "#f472b6" },
  "event-bisous": { label: "Jour J", tagBg: "#ec4899", tagColor: "#fff", darkTagBg: "#ec4899", darkTagColor: "#fff" },
  "teasing-running": { label: "Teasing", tagBg: "#eff6ff", tagColor: "#2563eb", darkTagBg: "#1e3a5f", darkTagColor: "#60a5fa" },
  "event-running": { label: "Jour J", tagBg: "#3b82f6", tagColor: "#fff", darkTagBg: "#3b82f6", darkTagColor: "#fff" },
  "recap-running": { label: "Recap", tagBg: "#dbeafe", tagColor: "#1d4ed8", darkTagBg: "#1e3a5f", darkTagColor: "#93c5fd" },
  "teasing-gaming": { label: "Teasing", tagBg: "#f5f3ff", tagColor: "#7c3aed", darkTagBg: "#2e1065", darkTagColor: "#a78bfa" },
  "event-gaming": { label: "Jour J", tagBg: "#8b5cf6", tagColor: "#fff", darkTagBg: "#8b5cf6", darkTagColor: "#fff" },
  "recap-gaming": { label: "Recap", tagBg: "#ede9fe", tagColor: "#6d28d9", darkTagBg: "#2e1065", darkTagColor: "#c4b5fd" },
  "teasing-vieuxrocher": { label: "Teasing", tagBg: "#fffbeb", tagColor: "#d97706", darkTagBg: "#451a03", darkTagColor: "#fbbf24" },
  "event-vieuxrocher": { label: "Jour J", tagBg: "#f59e0b", tagColor: "#fff", darkTagBg: "#f59e0b", darkTagColor: "#fff" },
  "recap-vieuxrocher": { label: "Recap", tagBg: "#fef3c7", tagColor: "#b45309", darkTagBg: "#451a03", darkTagColor: "#fcd34d" },
  "teasing-feria": { label: "Teasing", tagBg: "#fff7ed", tagColor: "#ea580c", darkTagBg: "#431407", darkTagColor: "#fb923c" },
  "event-feria": { label: "Jour J", tagBg: "#f97316", tagColor: "#fff", darkTagBg: "#f97316", darkTagColor: "#fff" },
  "recap-feria": { label: "Recap", tagBg: "#ffedd5", tagColor: "#c2410c", darkTagBg: "#431407", darkTagColor: "#fdba74" },
  "teasing-padel": { label: "Teasing", tagBg: "#ecfdf5", tagColor: "#059669", darkTagBg: "#022c22", darkTagColor: "#34d399" },
  "event-padel": { label: "Jour J", tagBg: "#10b981", tagColor: "#fff", darkTagBg: "#10b981", darkTagColor: "#fff" },
  "recap-padel": { label: "Recap", tagBg: "#d1fae5", tagColor: "#047857", darkTagBg: "#022c22", darkTagColor: "#6ee7b7" },
  "teasing-esterel": { label: "Teasing", tagBg: "#fff1f2", tagColor: "#e11d48", darkTagBg: "#4c0519", darkTagColor: "#fb7185" },
  "event-esterel": { label: "Jour J", tagBg: "#f43f5e", tagColor: "#fff", darkTagBg: "#f43f5e", darkTagColor: "#fff" },
  "recap-esterel": { label: "Recap", tagBg: "#ffe4e6", tagColor: "#be123c", darkTagBg: "#4c0519", darkTagColor: "#fda4af" },
  "teasing-karting": { label: "Teasing", tagBg: "#fef2f2", tagColor: "#dc2626", darkTagBg: "#450a0a", darkTagColor: "#f87171" },
  "event-karting": { label: "Jour J", tagBg: "#ef4444", tagColor: "#fff", darkTagBg: "#ef4444", darkTagColor: "#fff" },
  "recap-karting": { label: "Recap", tagBg: "#fee2e2", tagColor: "#b91c1c", darkTagBg: "#450a0a", darkTagColor: "#fca5a5" },
  "teasing-ydays": { label: "Teasing", tagBg: "#fffbeb", tagColor: "#d97706", darkTagBg: "#451a03", darkTagColor: "#fbbf24" },
  "event-ydays": { label: "Jour J", tagBg: "#f59e0b", tagColor: "#fff", darkTagBg: "#f59e0b", darkTagColor: "#fff" },
  "recap-ydays": { label: "Recap", tagBg: "#fef3c7", tagColor: "#b45309", darkTagBg: "#451a03", darkTagColor: "#fcd34d" },
  "teasing-plage": { label: "Teasing", tagBg: "#ecfeff", tagColor: "#0891b2", darkTagBg: "#083344", darkTagColor: "#22d3ee" },
  "event-plage": { label: "Jour J", tagBg: "#06b6d4", tagColor: "#fff", darkTagBg: "#06b6d4", darkTagColor: "#fff" },
  "recap-plage": { label: "Recap", tagBg: "#cffafe", tagColor: "#0e7490", darkTagBg: "#083344", darkTagColor: "#67e8f9" },
};

const getEK = (p) => {
  if (!p || p === "off" || p === "regular") return null;
  return p.replace(/^(teasing|event|recap)-/, "");
};

// ══════ APRIL DATA ══════
const EVENTS_APRIL = {
  1: { phase: "off" }, 2: { phase: "off" }, 3: { phase: "off" }, 4: { phase: "off" }, 5: { phase: "off" }, 6: { phase: "off" }, 7: { phase: "off" }, 8: { phase: "off" }, 9: { phase: "off" }, 10: { phase: "off" }, 11: { phase: "off" }, 12: { phase: "off" }, 13: { phase: "off" }, 14: { phase: "off" },
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
  25: { phase: "off" }, 26: { phase: "off" },
  27: { phase: "teasing-bisous", platform: "Post + Story + TikTok", content: "ANNONCE OFFICIELLE 💋 Post visuel : Bisous Bisous, Mercredi 30 avril, 00h-5h, soirée interBDE.\n\nStory facecam excitée \"La dernière soirée d'avril va être INCROYABLE\" — TikTok teaser avec le son trending du moment", time: "18h00", tip: "⚠️ Visuel à créer. Gros post = likes + saves + partages. Annoncer tôt pour laisser 3 jours de teasing", format: "Post annonce + Facecam + TikTok" },
  28: { phase: "teasing-bisous", platform: "Instagram Story", content: "Story sondage : \"Before ou pas before ? 🍹\" — Si before confirmé : annoncer le lieu/heure.\n\nStory compte à rebours J-2 + \"Avec qui tu viens ? 💋\" Tag ton/ta pote", time: "19h00", tip: "Le sondage before donne un signal sur la demande. Compte à rebours = rappel auto. Le tag = viralité organique", format: "Sondage Before + Countdown + Tag" },
  29: { phase: "teasing-bisous", platform: "Story + TikTok", content: "Story GRWM \"Get Ready With Me\" pour Bisous Bisous 💋 — Un membre du BDE se prépare pour la soirée.\n\n\"Demain on finit le mois en beauté 🪩\" — Rappel infos pratiques (lieu, heure, before). TikTok du même contenu", time: "19h00", tip: "GRWM veille de soirée = format très engageant. Rappeler toutes les infos pratiques une dernière fois", format: "GRWM + Dernier rappel" },
  30: { phase: "event-bisous", platform: "Insta Story ×6 min.", content: "JOUR J 💋\n• Après-midi : Story \"Ce soir c'est la dernière soirée du mois, on finit en beauté\"\n• 20h : Si before → stories du before (ambiance, arrivées)\n• 23h : Story facecam \"On arrive à Bisous Bisous 🪩\"\n• Pendant : Stories live du dancefloor, DJ, ambiance, lumières\n• Fin : Story \"Avril c'était incroyable, merci à tous 💋\"\n\n📸 Penser à filmer un max pour le recap du 1er mai !", time: "Toute la journée", tip: "GROSSE SOIRÉE = maximum de contenu. Filmer pour TikTok aussi. Minimum 6-8 stories. Le recap sera posté le 1er mai", format: "Multi-story jour J", event: "BISOUS BISOUS", eventSub: "00h–5h · InterBDE · Before possible" },
};

const RECAP_APRIL = [
  { key: "pirate", emoji: "🏴‍☠️", name: "Soirée Pirate", date: "Jeudi 17 avril", time: "21h30 – 2h30", lieu: "Bar Barracuda", type: "Soirée interBDE", theme: "Pirate", capacite: "À confirmer", prix: "Tarif étudiant (à confirmer)", inscription: "Libre", part: "Costumes encouragés · Musique à thème", teasing: "15 → 16 avril (2 jours)", visuels: "1 post annonce + stories" },
  { key: "five", emoji: "⚽", name: "Five Football", date: "Mercredi 23 avril", time: "19h00", lieu: "À confirmer", type: "Match de foot à 5", theme: "—", capacite: "10 personnes", prix: "Payant (à confirmer)", inscription: "Obligatoire (DM ou lien)", part: "Mixte · Places limitées = FOMO", teasing: "19 → 22 avril (4 jours)", visuels: "1 post annonce + stories" },
  { key: "bisous", emoji: "💋", name: "Bisous Bisous", date: "Mercredi 30 avril", time: "00h00 – 5h00", lieu: "Bisous Bisous (boîte)", type: "Soirée interBDE", theme: "À définir", capacite: "À confirmer", prix: "À confirmer", inscription: "Libre", part: "Before possible · Dernière soirée du mois · Recap le 1er mai", teasing: "21 → 29 avril (teasing croisé dès le 21)", visuels: "1 post annonce + stories + TikTok" },
];

// ══════ MAY DATA ══════
const EVENTS_MAY = {
  1: { phase: "teasing-gaming", secondaryPhase: "teasing-vieuxrocher", platform: "Insta Story + WhatsApp", content: "🎮 Save the date Tournoi Jeux Vidéo : mercredi 6 mai, 18h30, sur le campus. Story simple avec sticker compte à rebours + question \"Tu viens jouer à quoi ?\"\n\n🪨 Vieux Rocher J-8 : rappeler que la soirée du 9 mai arrive. Repartager le post Insta déjà publié en story + message court sur le canal WhatsApp.", time: "18h00", tip: "Début de mois = poser les deux premières dates. Pour Vieux Rocher, ne pas refaire de post annonce : le post existe déjà, on le remet en avant en story.", format: "Save the date Gaming + Vieux Rocher" },
  2: { phase: "teasing-vieuxrocher", secondaryPhase: "teasing-gaming", platform: "Insta Story + WhatsApp", content: "🪨 Vieux Rocher J-7 : story rappel une semaine avant avec lieu, date, heure à confirmer et sticker compte à rebours. Canal WhatsApp : message \"bloquez votre samedi 9 mai\" + lien/post déjà existant.\n\n🎮 Tournoi Jeux Vidéo J-4 : story rappel rapide campus 18h30 + sondage \"solo ou avec ta team ?\"", time: "18h00", tip: "Le rappel J-7 est important pour la soirée Vieux Rocher. Bien préciser que le post Insta annonce a déjà été fait.", format: "Rappel J-7 Vieux Rocher" },
  3: { phase: "regular", platform: "Instagram Story", content: "🤝 Story partenariat #1 : Eva and Co. Faire 2-3 slides propres : présentation du partenaire, avantage étudiant/BDE, comment en profiter.\n\nFinir par une slide très courte \"Cette semaine : Tournoi Jeux Vidéo mercredi + Vieux Rocher samedi\".", time: "17h00", tip: "Story partenaire à garder lisible et directe. Ne pas mélanger trop d'infos : partenaire d'abord, rappel events en dernière slide seulement.", format: "Story partenariat Eva and Co" },
  4: { phase: "teasing-gaming", platform: "Insta Story + WhatsApp", content: "🎮 Tournoi Jeux Vidéo J-2 : story rappel avec les infos utiles : campus, mercredi 6 mai, 18h30. Ajouter un sondage sur les jeux attendus + sticker question pour les inscriptions.\n\nCanal WhatsApp : rappel court + préciser s'il faut venir avec une manette, une équipe ou s'inscrire en DM.", time: "18h30", tip: "Quelques jours avant, il faut rendre l'event concret : heure, lieu, format du tournoi, inscription.", format: "Rappel Gaming J-2" },
  5: { phase: "teasing-gaming", secondaryPhase: "teasing-vieuxrocher", platform: "Insta Story + WhatsApp", content: "🎮 Tournoi Jeux Vidéo J-1 : dernier rappel en story avec compte à rebours. Story facecam d'un membre BDE : \"demain 18h30 sur le campus\" + rappel des jeux/inscriptions.\n\n🪨 Vieux Rocher J-4 : repartager le post Insta déjà fait en story + rappel WhatsApp discret.", time: "19h00", tip: "La veille du tournoi, faire simple et clair. Pour Vieux Rocher, continuer les rappels sans refaire un post feed.", format: "Dernier rappel Gaming + Vieux Rocher" },
  6: { phase: "event-gaming", platform: "Insta Story ×5 + WhatsApp", content: "JOUR J TOURNOI JEUX VIDÉO 🎮\n• Matin : message WhatsApp \"ce soir 18h30 sur le campus\"\n• 16h : story rappel avec compte à rebours\n• 18h : story installation, écrans, manettes, arrivée des joueurs\n• Pendant : stories live des matchs, réactions, scores, finale\n• Fin : story podium + gagnant(s)", time: "Toute la soirée", tip: "Filmer les réactions et la finale. Garder de quoi faire un petit recap le lendemain.", format: "Multi-story jour J", event: "TOURNOI JEUX VIDÉO", eventSub: "Campus · 18h30" },
  7: { phase: "recap-gaming", secondaryPhase: "teasing-feria", platform: "Insta Post + Story + WhatsApp", content: "🎮 Recap tournoi : post carrousel ou mini montage avec les meilleurs moments, podium, gagnant(s). Story best-of + tags.\n\n🎉 Feria J-7 : annonce officielle de la soirée bar du 14 mai. Post Insta visuel + story + message WhatsApp canal avec thème Feria, date et infos pratiques.", time: "16h + 18h30", tip: "Double contenu : recap du tournoi tant que c'est frais, puis lancement Feria une semaine avant.", format: "Recap Gaming + Annonce Feria" },
  8: { phase: "teasing-vieuxrocher", secondaryPhase: "teasing-feria", platform: "Insta Story + WhatsApp", content: "🪨 Vieux Rocher J-1 : dernier rappel en story. Repartager le post Insta déjà publié, ajouter le sticker compte à rebours et une slide \"demain soir\" avec les infos pratiques.\n\n🎉 Feria J-6 : story reminder simple + canal WhatsApp pour rappeler le thème Feria.", time: "18h30", tip: "Veille du Vieux Rocher : pas besoin de nouveau post feed, la priorité est story + WhatsApp.", format: "Dernier rappel Vieux Rocher" },
  9: { phase: "event-vieuxrocher", platform: "Insta Story ×5 + WhatsApp", content: "JOUR J VIEUX ROCHER 🪨\n• Matin : message WhatsApp avec les infos de la soirée\n• Après-midi : story rappel \"ce soir au Vieux Rocher\"\n• Début de soirée : story arrivée / ambiance\n• Pendant : stories live, groupe, musique, moments forts\n• Fin : story merci + annoncer qu'un petit montage arrive demain", time: "Toute la soirée", tip: "Les posts Insta annonce sont déjà faits : aujourd'hui on mise sur le live et on filme assez pour le montage du lendemain.", format: "Multi-story jour J", event: "SOIRÉE VIEUX ROCHER", eventSub: "Samedi 9 mai · Soirée" },
  10: { phase: "recap-vieuxrocher", secondaryPhase: "teasing-running", platform: "Insta Post + Story + WhatsApp", content: "🪨 Post recap Vieux Rocher : petit montage vidéo de la soirée en Reel ou post vidéo. Story best-of + republication des stories où le BDE est tagué.\n\n🏃 Running Club J-7 : première annonce en story + canal WhatsApp. Donner le dimanche 17 mai, lieu/heure de RDV à confirmer, niveau accessible.", time: "16h + 18h", tip: "Le montage du lendemain est parfait ici. Pour le Running Club, lancer une semaine avant minimum avec un ton accessible.", format: "Montage Vieux Rocher + Annonce Running" },
  11: { phase: "teasing-feria", secondaryPhase: "teasing-running", platform: "Insta Story + WhatsApp", content: "🎉 Feria J-3 : story rappel thème Feria, tenue conseillée, infos bar, heure à confirmer. Ajouter un sondage \"team rouge/blanc ou full Feria ?\"\n\n🏃 Running Club J-6 : petit rappel WhatsApp + story \"dimanche on court ensemble\".", time: "18h00", tip: "Feria doit rester visible plusieurs jours après le post annonce. Garder le Running Club dans un coin sans saturer.", format: "Rappel Feria + Running" },
  12: { phase: "regular", platform: "Instagram Story + WhatsApp", content: "🤝 Story partenariat #2 : Les Plages Electro. Faire 2-3 slides : présentation, avantage/bon plan si disponible, appel à suivre le partenaire.\n\nDernière slide : rappel rapide Feria jeudi 14 mai + Running Club dimanche 17 mai. Canal WhatsApp : uniquement le rappel events, pas besoin de reprendre toute la story partenaire.", time: "17h00", tip: "Deuxième mise en avant partenaire du mois. Garder une story propre, puis terminer avec les prochains rendez-vous.", format: "Story partenariat Plages Electro" },
  13: { phase: "teasing-feria", secondaryPhase: "teasing-karting", platform: "Insta Story + WhatsApp", content: "🎉 Feria J-1 : dernier rappel story avec compte à rebours, infos bar, thème Feria, heure à confirmer. Story facecam : \"demain on sort\".\n\n🏎️ Karting J-8 : save the date sur le canal WhatsApp + story courte \"jeudi 21 mai, préparez-vous\" avec places limitées à venir.", time: "19h00", tip: "La veille Feria doit être très claire. Profiter aussi de cette journée pour ouvrir le teasing Karting en avance.", format: "Dernier rappel Feria + Teaser Karting" },
  14: { phase: "event-feria", platform: "Insta Story ×6 + WhatsApp", content: "JOUR J SOIRÉE BAR FERIA 🎉\n• Matin : message WhatsApp avec toutes les infos pratiques\n• Après-midi : story rappel thème Feria + compte à rebours\n• 20h : story facecam avant départ\n• Pendant : stories live au bar, ambiance, tenues, musique\n• Fin : story merci + annoncer le recap du lendemain", time: "Toute la soirée", tip: "Soirée à thème = filmer les tenues et l'ambiance. Minimum 5-6 stories pendant la soirée.", format: "Multi-story jour J", event: "SOIRÉE BAR FERIA", eventSub: "Jeudi 14 mai · Thème Feria" },
  15: { phase: "recap-feria", secondaryPhase: "teasing-karting", platform: "Insta Post + Story + WhatsApp", content: "🎉 Recap Feria : post carrousel ou Reel avec les meilleurs moments de la soirée bar. Story best-of + repost des tags.\n\n🏎️ Karting J-6 : post annonce Insta + story + WhatsApp canal. Préciser jeudi 21 mai, places limitées, inscription obligatoire, prix/lieu à confirmer.", time: "16h + 18h30", tip: "Après le recap Feria, basculer clairement sur le Karting. Mettre la notion de places limitées très tôt.", format: "Recap Feria + Annonce Karting" },
  16: { phase: "teasing-running", secondaryPhase: "teasing-karting", platform: "Insta Story + WhatsApp", content: "🏃 Running Club J-1 : dernier rappel story + WhatsApp avec heure/lieu de RDV, niveau, tenue conseillée, eau. Ajouter un sticker question \"qui vient courir ?\"\n\n🏎️ Karting J-5 : story rappel inscription/places limitées.", time: "18h00", tip: "La veille du Running Club, enlever toute ambiguïté : où, quand, quoi apporter.", format: "Dernier rappel Running + Karting" },
  17: { phase: "event-running", platform: "Insta Story ×4 + WhatsApp", content: "JOUR J RUNNING CLUB 🏃\n• Matin : message WhatsApp \"RDV dans 1h\" avec lieu exact\n• Avant départ : selfie groupe / story ambiance\n• Pendant : courte story parcours\n• Arrivée : story photo de groupe + bravo à tous\n• Après : remercier et demander les photos des participants", time: "Toute la matinée", tip: "Running = contenu humain et accessible. Montrer que tous les niveaux sont bienvenus.", format: "Multi-story jour J", event: "RUNNING CLUB", eventSub: "Dimanche 17 mai · Course en groupe" },
  18: { phase: "recap-running", secondaryPhase: "teasing-karting", platform: "Story + WhatsApp", content: "🏃 Recap Running Club : story best-of avec photos/vidéos des participants + repost des tags. Pas forcément de post feed sauf belles photos de groupe.\n\n🏎️ Karting J-3 : rappel story + WhatsApp, places restantes, inscription, heure/lieu à confirmer.", time: "16h00", tip: "Gardez le Running léger, puis remettez le Karting devant car l'event arrive vite.", format: "Recap Running + Rappel Karting" },
  19: { phase: "teasing-karting", secondaryPhase: "teasing-padel", platform: "Insta Post + Story + WhatsApp", content: "🏎️ Karting J-2 : story rappel places limitées + canal WhatsApp avec infos pratiques et inscription.\n\n🎾 Padel J-7 : annonce officielle soirée padel du mardi 26 mai. Post Insta visuel + story + WhatsApp canal, avec inscription et niveau débutant accepté.", time: "18h00", tip: "Le Padel doit partir une semaine avant. Pour Karting, mettre l'urgence sur les places restantes.", format: "Rappel Karting + Annonce Padel" },
  20: { phase: "teasing-karting", platform: "Insta Story + WhatsApp", content: "🏎️ Karting J-1 : dernier rappel en story avec compte à rebours. Canal WhatsApp : heure de RDV, lieu, transport, prix, inscription, ce qu'il faut prévoir.\n\nStory facecam : \"demain on voit qui est le plus rapide\".", time: "19h00", tip: "Dernier rappel très pratique. Les participants doivent avoir toutes les infos sans devoir chercher.", format: "Dernier rappel Karting" },
  21: { phase: "event-karting", platform: "Insta Story ×5 + WhatsApp", content: "JOUR J KARTING 🏎️\n• Matin : WhatsApp infos finales\n• Avant départ : story groupe / trajet\n• Sur place : story circuit, casques, karts\n• Pendant : stories live départs, dépassements, podium\n• Fin : story classement + champion du jour", time: "Toute la journée", tip: "Filmer départs, virages et podium. Le classement donne un très bon angle de recap.", format: "Multi-story jour J", event: "KARTING", eventSub: "Jeudi 21 mai · Places limitées" },
  22: { phase: "recap-karting", secondaryPhase: "teasing-plage", platform: "Insta Post + Story + WhatsApp", content: "🏎️ Recap Karting : post carrousel ou Reel podium, pilotes, meilleurs moments. Story montage + tags.\n\n🏖️ Soirée Plage J-7 : annonce officielle de la soirée plage publique du vendredi 29 mai. Post Insta + story + WhatsApp canal avec date, lieu à confirmer et infos pratiques.", time: "16h + 18h30", tip: "Le recap Karting va être très partageable. Ensuite lancer la Plage une semaine avant, en insistant sur le côté public.", format: "Recap Karting + Annonce Plage" },
  23: { phase: "teasing-padel", platform: "Insta Story + WhatsApp", content: "🎾 Padel J-3 : story rappel avec infos inscription, horaire à confirmer, niveau accessible. Ajouter un sondage \"déjà joué au padel ?\"\n\nCanal WhatsApp : rappel court + places restantes si limitées.", time: "18h00", tip: "Rassurer les débutants : l'objectif est la soirée conviviale, pas un tournoi fermé.", format: "Rappel Padel J-3" },
  24: { phase: "teasing-plage", secondaryPhase: "teasing-padel", platform: "Insta Story + WhatsApp", content: "🏖️ Soirée Plage J-5 : story ambiance summer/public + rappel vendredi 29 mai. Ajouter \"envoie à ton groupe\".\n\n🎾 Padel J-2 : rappel WhatsApp + story courte sur les inscriptions restantes.", time: "18h00", tip: "La Plage doit commencer à tourner tôt car elle est publique. Le Padel reste en rappel pratique.", format: "Rappel Plage + Padel" },
  25: { phase: "teasing-padel", secondaryPhase: "teasing-plage", platform: "Insta Story + WhatsApp", content: "🎾 Padel J-1 : dernier rappel story + compte à rebours, heure/lieu/inscription. Story facecam : \"demain soirée padel\".\n\n🏖️ Plage J-4 : story rappel simple + WhatsApp canal.", time: "19h00", tip: "Veille Padel : informations pratiques en priorité. Pour Plage, garder une présence régulière.", format: "Dernier rappel Padel + Plage" },
  26: { phase: "event-padel", secondaryPhase: "teasing-plage", platform: "Insta Story ×4 + WhatsApp", content: "JOUR J SOIRÉE PADEL 🎾\n• Matin : WhatsApp infos finales\n• Avant : story terrain/raquettes/arrivée\n• Pendant : stories échanges, points, ambiance\n• Après : story photo de groupe + merci\n\n🏖️ Plage J-3 : en fin de journée, une story rappel pour vendredi 29 mai.", time: "Toute la soirée", tip: "Filmer les échanges courts et les réactions. Ne pas oublier un rappel Plage car le 29 arrive vite.", format: "Jour J Padel + Rappel Plage", event: "SOIRÉE PADEL", eventSub: "Mardi 26 mai · Soirée sportive" },
  27: { phase: "recap-padel", secondaryPhase: "teasing-plage", platform: "Story + WhatsApp", content: "🎾 Recap Padel : story best-of, photo de groupe, repost des tags. Post feed seulement si vous avez assez de belles images.\n\n🏖️ Plage J-2 : story rappel + WhatsApp canal avec infos pratiques, public, lieu/heure à confirmer.", time: "16h + 18h", tip: "Plage doit être le sujet principal de fin de semaine. Garder le recap Padel court et propre.", format: "Recap Padel + Rappel Plage" },
  28: { phase: "teasing-plage", platform: "Insta Story + WhatsApp", content: "🏖️ Soirée Plage J-1 : dernier rappel complet. Story avec compte à rebours + infos lieu, heure, accès, public, ce qu'il faut prévoir.\n\nCanal WhatsApp : message final clair, prêt à transférer dans les groupes.", time: "19h00", tip: "Dernière ligne droite : toutes les infos doivent être dans une seule story et un message WhatsApp très lisible.", format: "Dernier rappel Plage" },
  29: { phase: "event-plage", platform: "Insta Story ×6 + WhatsApp", content: "JOUR J SOIRÉE PLAGE PUBLIQUE 🏖️\n• Matin : WhatsApp infos finales\n• Après-midi : story rappel public + compte à rebours\n• Début : story arrivée/installation/coucher de soleil si possible\n• Pendant : stories ambiance, groupe, musique, moments forts\n• Fin : story merci + annoncer le recap du lendemain", time: "Toute la soirée", tip: "Soirée publique = bien rappeler que les étudiants peuvent venir avec leur groupe. Filmer assez pour un montage dynamique.", format: "Multi-story jour J", event: "SOIRÉE PLAGE PUBLIQUE", eventSub: "Vendredi 29 mai · Public" },
  30: { phase: "recap-plage", platform: "Insta Post + Story + WhatsApp", content: "🏖️ Recap Soirée Plage : post carrousel ou Reel montage avec les meilleurs moments, ambiance, groupe, sunset si vous avez.\n\nStory best-of + repost des tags. Canal WhatsApp : merci à tous + lien vers le post recap.", time: "16h00", tip: "Poster le lendemain pendant que tout le monde a encore la soirée en tête. Taguer les participants et encourager les partages.", format: "Montage vidéo + Carrousel" },
  31: { phase: "recap-plage", platform: "Instagram Story + WhatsApp", content: "📊 Story bilan de mai : rappeler les 7 events du mois : Tournoi Jeux Vidéo, Vieux Rocher, Feria, Running Club, Karting, Padel, Soirée Plage.\n\nAjouter une slide remerciements + teaser léger pour juin. Canal WhatsApp : message de clôture du mois.", time: "18h00", tip: "Clôturer le mois proprement renforce la communauté et prépare le mois suivant.", format: "Bilan du mois" },
};

const RECAP_MAY = [
  { key: "gaming", emoji: "🎮", name: "Tournoi Jeux Vidéo", date: "Mercredi 6 mai", time: "18h30", lieu: "Campus", type: "Tournoi gaming", theme: "Jeux vidéo", capacite: "À confirmer", prix: "À confirmer", inscription: "DM / lien / sur place", part: "Quelques jours de rappels · Story + canal WhatsApp", teasing: "1 → 5 mai", visuels: "Post annonce + stories + WhatsApp" },
  { key: "vieuxrocher", emoji: "🪨", name: "Soirée Vieux Rocher", date: "Samedi 9 mai", time: "Soirée", lieu: "Vieux Rocher", type: "Soirée", theme: "—", capacite: "À confirmer", prix: "À confirmer", inscription: "Libre", part: "Post Insta annonce déjà fait · Montage vidéo le lendemain", teasing: "1 → 8 mai", visuels: "Stories rappels + WhatsApp + post recap vidéo" },
  { key: "feria", emoji: "🎉", name: "Soirée Bar Feria", date: "Jeudi 14 mai", time: "Soirée", lieu: "Bar à confirmer", type: "Soirée bar", theme: "Feria", capacite: "À confirmer", prix: "À confirmer", inscription: "Libre", part: "Thème Feria · Rappels réguliers dès J-7", teasing: "7 → 13 mai", visuels: "Post annonce + stories + WhatsApp" },
  { key: "running", emoji: "🏃", name: "Running Club", date: "Dimanche 17 mai", time: "Matin", lieu: "RDV à confirmer", type: "Sport collectif", theme: "—", capacite: "Illimité", prix: "Gratuit", inscription: "Libre", part: "Tous niveaux · Rappels une semaine avant", teasing: "10 → 16 mai", visuels: "Stories + WhatsApp" },
  { key: "karting", emoji: "🏎️", name: "Karting", date: "Jeudi 21 mai", time: "À confirmer", lieu: "Circuit à confirmer", type: "Activité", theme: "—", capacite: "Places limitées", prix: "À confirmer", inscription: "Obligatoire", part: "Places limitées · Classement et podium", teasing: "13 → 20 mai", visuels: "Post annonce + stories + WhatsApp" },
  { key: "padel", emoji: "🎾", name: "Soirée Padel", date: "Mardi 26 mai", time: "Soirée", lieu: "À confirmer", type: "Sport / soirée", theme: "Padel", capacite: "À confirmer", prix: "À confirmer", inscription: "Obligatoire", part: "Débutants bienvenus · Rappels J-7 à J-1", teasing: "19 → 25 mai", visuels: "Post annonce + stories + WhatsApp" },
  { key: "plage", emoji: "🏖️", name: "Soirée Plage Publique", date: "Vendredi 29 mai", time: "Soirée", lieu: "Plage à confirmer", type: "Soirée publique", theme: "Plage", capacite: "Public", prix: "À confirmer", inscription: "Libre", part: "Public · Dernière soirée du mois", teasing: "22 → 28 mai", visuels: "Post annonce + stories + WhatsApp" },
];

// ══════ MONTHS CONFIG ══════
const MONTHS = [
  { key: "april", name: "Avril", year: 2026, days: 30, offset: 2, monthIndex: 3, events: EVENTS_APRIL, recap: RECAP_APRIL },
  { key: "may", name: "Mai", year: 2026, days: 31, offset: 4, monthIndex: 4, events: EVENTS_MAY, recap: RECAP_MAY },
];

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

function DetailContent({ ev, pm, selected, accent, dark, onClose, monthData, hideClose }) {
  const dow = (monthData.offset + selected - 1) % 7;
  const secMeta = ev.secondaryPhase ? PHASE_META[ev.secondaryPhase] : null;
  const secEk = ev.secondaryPhase ? getEK(ev.secondaryPhase) : null;
  const secAccent = secEk ? EC[secEk] : null;
  return (
    <>
      <div className="detail-header" style={{ padding: "22px 28px 18px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-xfaint)", fontFamily: "'JetBrains Mono', monospace", margin: "0 0 4px" }}>{DAYS_FULL[dow]} {selected} {monthData.name.toLowerCase()} {monthData.year}</p>
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
        {!hideClose && <button onClick={onClose} style={{ background: "var(--close-btn-bg)", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "var(--text-faint)" }}>✕</button>}
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
          <div className="detail-content-box" style={{ background: "var(--bg-card-alt)", borderRadius: 10, padding: "16px 20px", fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)", borderLeft: `3px solid ${accent}`, whiteSpace: "pre-line" }}>{ev.content}</div>
        </div>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-xxfaint)", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 8px", fontFamily: "'JetBrains Mono', monospace" }}>Conseil</p>
          <div style={{ background: "var(--tip-bg)", borderRadius: 10, padding: "12px 18px", fontSize: 13, color: "var(--tip-color)", lineHeight: 1.6, border: "1px solid var(--tip-border)" }}>{ev.tip}</div>
        </div>
      </div>
    </>
  );
}

function SwipeModal({ onClose, children }) {
  const sheetRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = useCallback((e) => {
    dragging.current = true;
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
    if (sheetRef.current) sheetRef.current.style.transition = "none";
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!dragging.current) return;
    const dy = e.touches[0].clientY - startY.current;
    currentY.current = Math.max(0, dy);
    if (sheetRef.current) sheetRef.current.style.transform = `translateY(${currentY.current}px)`;
  }, []);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
    if (!sheetRef.current) return;
    sheetRef.current.style.transition = "transform 0.25s ease";
    if (currentY.current > 100) {
      sheetRef.current.style.transform = "translateY(100%)";
      setTimeout(onClose, 200);
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
  }, [onClose]);

  return (
    <div className="mobile-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mobile-modal-content" ref={sheetRef}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="mobile-modal-handle" />
        {children}
      </div>
    </div>
  );
}

function MonthArrow({ direction, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--text-faint)", display: "flex", alignItems: "center", transition: "color 0.15s" }} onMouseEnter={e => e.target.style.color = "var(--text-primary)"} onMouseLeave={e => e.target.style.color = "var(--text-faint)"}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

export default function App() {
  const [monthIdx, setMonthIdx] = useState(1);
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

  useEffect(() => { localStorage.setItem("bde-dark-mode", dark); }, [dark]);
  useEffect(() => {
    if (selected && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [selected]);

  const month = MONTHS[monthIdx];
  const EVENTS = month.events;
  const EVENT_RECAP = month.recap;

  const weeks = [];
  let w = Array(month.offset).fill(null);
  for (let d = 1; d <= month.days; d++) { w.push(d); if (w.length === 7) { weeks.push(w); w = []; } }
  if (w.length) { while (w.length < 7) w.push(null); weeks.push(w); }

  const ev = selected ? EVENTS[selected] : null;
  const pm = ev ? PHASE_META[ev.phase] : null;

  const switchMonth = (dir) => {
    const next = monthIdx + dir;
    if (next >= 0 && next < MONTHS.length) { setMonthIdx(next); setSelected(null); }
  };

  return (
    <div className={dark ? "dark" : ""} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "var(--bg)", minHeight: "100vh", color: "var(--text)", transition: "background 0.3s, color 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <header style={{ background: "var(--bg-header)", borderBottom: "1px solid var(--border)", transition: "background 0.3s" }}>
        <div className="app-header-inner" style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 28px 0" }}>
          <div className="header-top-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p className="app-subtitle" style={{ fontSize: 12, color: "var(--text-xfaint)", margin: "0 0 2px", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Planning communication</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {monthIdx > 0 && <MonthArrow direction="left" onClick={() => switchMonth(-1)} />}
                <h1 className="app-title" style={{ fontSize: 42, fontWeight: 400, margin: 0, fontFamily: "'Instrument Serif', serif", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                  {month.name} <span style={{ fontStyle: "italic" }}>{month.year}</span>
                </h1>
                {monthIdx < MONTHS.length - 1 && <MonthArrow direction="right" onClick={() => switchMonth(1)} />}
              </div>
            </div>
            <button className="dark-toggle" onClick={() => setDark(!dark)} aria-label={dark ? "Mode clair" : "Mode sombre"}>
              {dark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
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
                  borderBottom: tab === id ? "2px solid var(--text-primary)" : "2px solid transparent", marginBottom: -1, transition: "all 0.15s",
                }}>{labels[id]}</button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="app-main" style={{ maxWidth: 1060, margin: "0 auto", padding: "28px 28px 80px" }}>

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
                  const now = new Date(); const isToday = now.getMonth() === month.monthIndex && now.getFullYear() === month.year && day === now.getDate();
                  const dow = (month.offset + day - 1) % 7;
                  const hasDual = !!secMeta;

                  return (
                    <div key={di} className={`calendar-cell${isOff ? " calendar-cell-off" : ""}`} onClick={() => !isOff && setSelected(isSel ? null : day)} style={{
                      borderRight: di < 6 ? "1px solid var(--border-light)" : "none", minHeight: 128,
                      padding: 10, cursor: isOff ? "default" : "pointer", position: "relative",
                      background: isSel ? (accent ? `${accent}15` : (dark ? "#1e1e2e" : "#f8f8ff")) : isEv ? `${accent}${dark ? "20" : "06"}` : "var(--bg-card)",
                      borderLeft: `3px solid ${isEv ? accent : isSel ? (accent || "#888") : "transparent"}`,
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
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 9, fontWeight: 600, letterSpacing: 0.3, background: dark ? meta.darkTagBg : meta.tagBg, color: dark ? meta.darkTagColor : meta.tagColor, padding: "2px 7px", borderRadius: 4 }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block" }} />
                              {meta.label}
                            </span>
                          )}
                          {secMeta && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 9, fontWeight: 600, letterSpacing: 0.3, background: dark ? secMeta.darkTagBg : secMeta.tagBg, color: dark ? secMeta.darkTagColor : secMeta.tagColor, padding: "2px 7px", borderRadius: 4 }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: secAccent, display: "inline-block" }} />
                              {secMeta.label}
                            </span>
                          )}
                        </div>
                        {d?.event && <div style={{ fontSize: 11, fontWeight: 700, color: accent, lineHeight: 1.2, marginBottom: 3 }}>{d.event}</div>}
                        {d?.format && <div style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.4, marginBottom: 2 }}>{d.format}</div>}
                        {d?.platform && <div className="cell-platform" style={{ fontSize: 9, color: "var(--text-xxfaint)", fontFamily: "'JetBrains Mono', monospace", position: "absolute", bottom: 8, left: 13 }}>{d.platform}</div>}
                      </>)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {ev && ev.phase !== "off" && (() => {
            const ek = getEK(ev.phase); const accent = ek ? EC[ek] : "#6366f1";
            return (
              <div className="detail-panel-desktop" style={{ marginTop: 20, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", animation: "su .2s ease" }}>
                <DetailContent ev={ev} pm={pm} selected={selected} accent={accent} dark={dark} onClose={() => setSelected(null)} monthData={month} />
              </div>
            );
          })()}

          {ev && ev.phase !== "off" && (() => {
            const ek = getEK(ev.phase); const accent = ek ? EC[ek] : "#6366f1";
            return (
              <SwipeModal onClose={() => setSelected(null)}>
                  <DetailContent ev={ev} pm={pm} selected={selected} accent={accent} dark={dark} onClose={() => setSelected(null)} monthData={month} hideClose />
              </SwipeModal>
            );
          })()}

          {!selected && <p style={{ textAlign: "center", color: "var(--text-xxxfaint)", fontSize: 12, marginTop: 24, fontStyle: "italic" }}>Clique sur un jour pour voir le détail</p>}
        </>)}

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
