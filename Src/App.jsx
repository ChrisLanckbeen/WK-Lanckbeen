import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyByfVq4kEFQEaXQHy8NewpPVtY22RuDPQ4",
  authDomain: "wk-lanckbeen.firebaseapp.com",
  projectId: "wk-lanckbeen",
  storageBucket: "wk-lanckbeen.firebasestorage.app",
  messagingSenderId: "378857669131",
  appId: "1:378857669131:web:331baa505caef16b727d0e",
};

const firebaseApp = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(firebaseApp, "(default)");
const storage = getStorage(firebaseApp);

const WK_GROUPS = {
  A: { teams: ["Mexico", "Zuid-Afrika", "Zuid-Korea", "Tsjechië"] },
  B: { teams: ["Canada", "Zwitserland", "Qatar", "Bosnië-Herzegovina"] },
  C: { teams: ["Brazilië", "Marokko", "Schotland", "Haïti"] },
  D: { teams: ["USA", "Paraguay", "Australië", "Turkije"] },
  E: { teams: ["Duitsland", "Curaçao", "Ivoorkust", "Ecuador"] },
  F: { teams: ["Nederland", "Japan", "Tunesië", "Zweden"] },
  G: { teams: ["België", "Egypte", "Iran", "Nieuw-Zeeland"] },
  H: { teams: ["Spanje", "Kaapverdië", "Saoedi-Arabië", "Uruguay"] },
  I: { teams: ["Frankrijk", "Senegal", "Noorwegen", "Irak"] },
  J: { teams: ["Argentinië", "Algerije", "Oostenrijk", "Jordanië"] },
  K: { teams: ["Portugal", "Colombia", "Oezbekistan", "Congo DR"] },
  L: { teams: ["Engeland", "Kroatië", "Ghana", "Panama"] },
};

function generateMatches() {
  const matches = [];
  let id = 1;

  matches.push({ id: id++, group: "A", home: "Mexico",      away: "Zuid-Afrika",        date: "11 jun", result: null });
  matches.push({ id: id++, group: "A", home: "Zuid-Korea",  away: "Tsjechië",           date: "12 jun", result: null });
  matches.push({ id: id++, group: "A", home: "Tsjechië",    away: "Zuid-Afrika",        date: "18 jun", result: null });
  matches.push({ id: id++, group: "A", home: "Mexico",      away: "Zuid-Korea",         date: "19 jun", result: null });
  matches.push({ id: id++, group: "A", home: "Tsjechië",    away: "Mexico",             date: "25 jun", result: null });
  matches.push({ id: id++, group: "A", home: "Zuid-Afrika", away: "Zuid-Korea",         date: "25 jun", result: null });

  matches.push({ id: id++, group: "B", home: "Canada",             away: "Bosnië-Herzegovina", date: "12 jun", result: null });
  matches.push({ id: id++, group: "B", home: "Qatar",              away: "Zwitserland",         date: "13 jun", result: null });
  matches.push({ id: id++, group: "B", home: "Zwitserland",        away: "Bosnië-Herzegovina", date: "18 jun", result: null });
  matches.push({ id: id++, group: "B", home: "Canada",             away: "Qatar",               date: "19 jun", result: null });
  matches.push({ id: id++, group: "B", home: "Zwitserland",        away: "Canada",              date: "24 jun", result: null });
  matches.push({ id: id++, group: "B", home: "Bosnië-Herzegovina", away: "Qatar",               date: "24 jun", result: null });

  matches.push({ id: id++, group: "C", home: "Brazilië",  away: "Marokko",   date: "14 jun", result: null });
  matches.push({ id: id++, group: "C", home: "Haïti",     away: "Schotland", date: "14 jun", result: null });
  matches.push({ id: id++, group: "C", home: "Schotland", away: "Marokko",   date: "20 jun", result: null });
  matches.push({ id: id++, group: "C", home: "Brazilië",  away: "Haïti",     date: "20 jun", result: null });
  matches.push({ id: id++, group: "C", home: "Schotland", away: "Brazilië",  date: "25 jun", result: null });
  matches.push({ id: id++, group: "C", home: "Marokko",   away: "Haïti",     date: "25 jun", result: null });

  matches.push({ id: id++, group: "D", home: "USA",       away: "Paraguay",  date: "13 jun", result: null });
  matches.push({ id: id++, group: "D", home: "Australië", away: "Turkije",   date: "14 jun", result: null });
  matches.push({ id: id++, group: "D", home: "USA",       away: "Australië", date: "19 jun", result: null });
  matches.push({ id: id++, group: "D", home: "Turkije",   away: "Paraguay",  date: "20 jun", result: null });
  matches.push({ id: id++, group: "D", home: "Turkije",   away: "USA",       date: "26 jun", result: null });
  matches.push({ id: id++, group: "D", home: "Paraguay",  away: "Australië", date: "26 jun", result: null });

  matches.push({ id: id++, group: "E", home: "Duitsland", away: "Curaçao",   date: "14 jun", result: null });
  matches.push({ id: id++, group: "E", home: "Ivoorkust", away: "Ecuador",   date: "15 jun", result: null });
  matches.push({ id: id++, group: "E", home: "Duitsland", away: "Ivoorkust", date: "20 jun", result: null });
  matches.push({ id: id++, group: "E", home: "Ecuador",   away: "Curaçao",   date: "21 jun", result: null });
  matches.push({ id: id++, group: "E", home: "Ecuador",   away: "Duitsland", date: "25 jun", result: null });
  matches.push({ id: id++, group: "E", home: "Curaçao",   away: "Ivoorkust", date: "25 jun", result: null });

  matches.push({ id: id++, group: "F", home: "Nederland", away: "Japan",     date: "14 jun", result: null });
  matches.push({ id: id++, group: "F", home: "Zweden",    away: "Tunesië",   date: "15 jun", result: null });
  matches.push({ id: id++, group: "F", home: "Tunesië",   away: "Japan",     date: "20 jun", result: null });
  matches.push({ id: id++, group: "F", home: "Nederland", away: "Zweden",    date: "20 jun", result: null });
  matches.push({ id: id++, group: "F", home: "Japan",     away: "Zweden",    date: "26 jun", result: null });
  matches.push({ id: id++, group: "F", home: "Tunesië",   away: "Nederland", date: "26 jun", result: null });

  matches.push({ id: id++, group: "G", home: "België",        away: "Egypte",        date: "15 jun", result: null });
  matches.push({ id: id++, group: "G", home: "Iran",          away: "Nieuw-Zeeland", date: "16 jun", result: null });
  matches.push({ id: id++, group: "G", home: "België",        away: "Iran",          date: "21 jun", result: null });
  matches.push({ id: id++, group: "G", home: "Nieuw-Zeeland", away: "Egypte",        date: "22 jun", result: null });
  matches.push({ id: id++, group: "G", home: "Egypte",        away: "Iran",          date: "27 jun", result: null });
  matches.push({ id: id++, group: "G", home: "Nieuw-Zeeland", away: "België",        date: "27 jun", result: null });

  matches.push({ id: id++, group: "H", home: "Spanje",        away: "Kaapverdië",    date: "15 jun", result: null });
  matches.push({ id: id++, group: "H", home: "Saoedi-Arabië", away: "Uruguay",       date: "16 jun", result: null });
  matches.push({ id: id++, group: "H", home: "Spanje",        away: "Saoedi-Arabië", date: "21 jun", result: null });
  matches.push({ id: id++, group: "H", home: "Uruguay",       away: "Kaapverdië",    date: "22 jun", result: null });
  matches.push({ id: id++, group: "H", home: "Kaapverdië",    away: "Saoedi-Arabië", date: "27 jun", result: null });
  matches.push({ id: id++, group: "H", home: "Uruguay",       away: "Spanje",        date: "27 jun", result: null });

  matches.push({ id: id++, group: "I", home: "Frankrijk", away: "Senegal",   date: "16 jun", result: null });
  matches.push({ id: id++, group: "I", home: "Irak",      away: "Noorwegen", date: "17 jun", result: null });
  matches.push({ id: id++, group: "I", home: "Frankrijk", away: "Irak",      date: "22 jun", result: null });
  matches.push({ id: id++, group: "I", home: "Noorwegen", away: "Senegal",   date: "23 jun", result: null });
  matches.push({ id: id++, group: "I", home: "Noorwegen", away: "Frankrijk", date: "26 jun", result: null });
  matches.push({ id: id++, group: "I", home: "Senegal",   away: "Irak",      date: "26 jun", result: null });

  matches.push({ id: id++, group: "J", home: "Oostenrijk", away: "Jordanië",   date: "16 jun", result: null });
  matches.push({ id: id++, group: "J", home: "Argentinië", away: "Algerije",   date: "17 jun", result: null });
  matches.push({ id: id++, group: "J", home: "Argentinië", away: "Oostenrijk", date: "22 jun", result: null });
  matches.push({ id: id++, group: "J", home: "Jordanië",   away: "Algerije",   date: "23 jun", result: null });
  matches.push({ id: id++, group: "J", home: "Algerije",   away: "Oostenrijk", date: "28 jun", result: null });
  matches.push({ id: id++, group: "J", home: "Jordanië",   away: "Argentinië", date: "28 jun", result: null });

  matches.push({ id: id++, group: "K", home: "Portugal",    away: "Congo DR",    date: "17 jun", result: null });
  matches.push({ id: id++, group: "K", home: "Oezbekistan", away: "Colombia",    date: "18 jun", result: null });
  matches.push({ id: id++, group: "K", home: "Portugal",    away: "Oezbekistan", date: "23 jun", result: null });
  matches.push({ id: id++, group: "K", home: "Colombia",    away: "Congo DR",    date: "24 jun", result: null });
  matches.push({ id: id++, group: "K", home: "Colombia",    away: "Portugal",    date: "28 jun", result: null });
  matches.push({ id: id++, group: "K", home: "Congo DR",    away: "Oezbekistan", date: "28 jun", result: null });

  matches.push({ id: id++, group: "L", home: "Engeland", away: "Kroatië",  date: "17 jun", result: null });
  matches.push({ id: id++, group: "L", home: "Ghana",    away: "Panama",   date: "18 jun", result: null });
  matches.push({ id: id++, group: "L", home: "Engeland", away: "Ghana",    date: "23 jun", result: null });
  matches.push({ id: id++, group: "L", home: "Panama",   away: "Kroatië",  date: "24 jun", result: null });
  matches.push({ id: id++, group: "L", home: "Panama",   away: "Engeland", date: "27 jun", result: null });
  matches.push({ id: id++, group: "L", home: "Kroatië",  away: "Ghana",    date: "27 jun", result: null });

  return matches;
  const KNOCKOUT_ROUNDS = ["Zestiende finale", "Achtste finale", "Kwartfinale", "Halve finale", "Finale"];

const INITIAL_KNOCKOUT_MATCHES = [
  { id: 900, round: "Zestiende finale", matchNum: 1, home: "TBD", away: "TBD", date: "28 jun", result: null },
  { id: 901, round: "Zestiende finale", matchNum: 2, home: "TBD", away: "TBD", date: "28 jun", result: null },
  { id: 902, round: "Zestiende finale", matchNum: 3, home: "TBD", away: "TBD", date: "28 jun", result: null },
  { id: 903, round: "Zestiende finale", matchNum: 4, home: "TBD", away: "TBD", date: "28 jun", result: null },
  { id: 904, round: "Zestiende finale", matchNum: 5, home: "TBD", away: "TBD", date: "29 jun", result: null },
  { id: 905, round: "Zestiende finale", matchNum: 6, home: "TBD", away: "TBD", date: "29 jun", result: null },
  { id: 906, round: "Zestiende finale", matchNum: 7, home: "TBD", away: "TBD", date: "29 jun", result: null },
  { id: 907, round: "Zestiende finale", matchNum: 8, home: "TBD", away: "TBD", date: "29 jun", result: null },
  { id: 908, round: "Zestiende finale", matchNum: 9, home: "TBD", away: "TBD", date: "30 jun", result: null },
  { id: 909, round: "Zestiende finale", matchNum: 10, home: "TBD", away: "TBD", date: "30 jun", result: null },
  { id: 910, round: "Zestiende finale", matchNum: 11, home: "TBD", away: "TBD", date: "30 jun", result: null },
  { id: 911, round: "Zestiende finale", matchNum: 12, home: "TBD", away: "TBD", date: "30 jun", result: null },
  { id: 912, round: "Zestiende finale", matchNum: 13, home: "TBD", away: "TBD", date: "1 jul", result: null },
  { id: 913, round: "Zestiende finale", matchNum: 14, home: "TBD", away: "TBD", date: "1 jul", result: null },
  { id: 914, round: "Zestiende finale", matchNum: 15, home: "TBD", away: "TBD", date: "1 jul", result: null },
  { id: 915, round: "Zestiende finale", matchNum: 16, home: "TBD", away: "TBD", date: "1 jul", result: null },
  { id: 916, round: "Zestiende finale", matchNum: 17, home: "TBD", away: "TBD", date: "2 jul", result: null },
  { id: 917, round: "Zestiende finale", matchNum: 18, home: "TBD", away: "TBD", date: "2 jul", result: null },
  { id: 918, round: "Zestiende finale", matchNum: 19, home: "TBD", away: "TBD", date: "2 jul", result: null },
  { id: 919, round: "Zestiende finale", matchNum: 20, home: "TBD", away: "TBD", date: "2 jul", result: null },
  { id: 920, round: "Zestiende finale", matchNum: 21, home: "TBD", away: "TBD", date: "3 jul", result: null },
  { id: 921, round: "Zestiende finale", matchNum: 22, home: "TBD", away: "TBD", date: "3 jul", result: null },
  { id: 922, round: "Zestiende finale", matchNum: 23, home: "TBD", away: "TBD", date: "3 jul", result: null },
  { id: 923, round: "Zestiende finale", matchNum: 24, home: "TBD", away: "TBD", date: "3 jul", result: null },
  { id: 924, round: "Zestiende finale", matchNum: 25, home: "TBD", away: "TBD", date: "4 jul", result: null },
  { id: 925, round: "Zestiende finale", matchNum: 26, home: "TBD", away: "TBD", date: "4 jul", result: null },
  { id: 926, round: "Zestiende finale", matchNum: 27, home: "TBD", away: "TBD", date: "4 jul", result: null },
  { id: 927, round: "Zestiende finale", matchNum: 28, home: "TBD", away: "TBD", date: "4 jul", result: null },
  { id: 928, round: "Zestiende finale", matchNum: 29, home: "TBD", away: "TBD", date: "5 jul", result: null },
  { id: 929, round: "Zestiende finale", matchNum: 30, home: "TBD", away: "TBD", date: "5 jul", result: null },
  { id: 930, round: "Zestiende finale", matchNum: 31, home: "TBD", away: "TBD", date: "5 jul", result: null },
  { id: 931, round: "Zestiende finale", matchNum: 32, home: "TBD", away: "TBD", date: "5 jul", result: null },
  { id: 1001, round: "Achtste finale", matchNum: 1, home: "TBD", away: "TBD", date: "7 jul", result: null },
  { id: 1002, round: "Achtste finale", matchNum: 2, home: "TBD", away: "TBD", date: "7 jul", result: null },
  { id: 1003, round: "Achtste finale", matchNum: 3, home: "TBD", away: "TBD", date: "7 jul", result: null },
  { id: 1004, round: "Achtste finale", matchNum: 4, home: "TBD", away: "TBD", date: "7 jul", result: null },
  { id: 1005, round: "Achtste finale", matchNum: 5, home: "TBD", away: "TBD", date: "8 jul", result: null },
  { id: 1006, round: "Achtste finale", matchNum: 6, home: "TBD", away: "TBD", date: "8 jul", result: null },
  { id: 1007, round: "Achtste finale", matchNum: 7, home: "TBD", away: "TBD", date: "8 jul", result: null },
  { id: 1008, round: "Achtste finale", matchNum: 8, home: "TBD", away: "TBD", date: "8 jul", result: null },
  { id: 1009, round: "Achtste finale", matchNum: 9, home: "TBD", away: "TBD", date: "9 jul", result: null },
  { id: 1010, round: "Achtste finale", matchNum: 10, home: "TBD", away: "TBD", date: "9 jul", result: null },
  { id: 1011, round: "Achtste finale", matchNum: 11, home: "TBD", away: "TBD", date: "9 jul", result: null },
  { id: 1012, round: "Achtste finale", matchNum: 12, home: "TBD", away: "TBD", date: "9 jul", result: null },
  { id: 1013, round: "Achtste finale", matchNum: 13, home: "TBD", away: "TBD", date: "10 jul", result: null },
  { id: 1014, round: "Achtste finale", matchNum: 14, home: "TBD", away: "TBD", date: "10 jul", result: null },
  { id: 1015, round: "Achtste finale", matchNum: 15, home: "TBD", away: "TBD", date: "10 jul", result: null },
  { id: 1016, round: "Achtste finale", matchNum: 16, home: "TBD", away: "TBD", date: "10 jul", result: null },
  { id: 1017, round: "Kwartfinale", matchNum: 1, home: "TBD", away: "TBD", date: "12 jul", result: null },
  { id: 1018, round: "Kwartfinale", matchNum: 2, home: "TBD", away: "TBD", date: "12 jul", result: null },
  { id: 1019, round: "Kwartfinale", matchNum: 3, home: "TBD", away: "TBD", date: "12 jul", result: null },
  { id: 1020, round: "Kwartfinale", matchNum: 4, home: "TBD", away: "TBD", date: "12 jul", result: null },
  { id: 1021, round: "Kwartfinale", matchNum: 5, home: "TBD", away: "TBD", date: "13 jul", result: null },
  { id: 1022, round: "Kwartfinale", matchNum: 6, home: "TBD", away: "TBD", date: "13 jul", result: null },
  { id: 1023, round: "Kwartfinale", matchNum: 7, home: "TBD", away: "TBD", date: "13 jul", result: null },
  { id: 1024, round: "Kwartfinale", matchNum: 8, home: "TBD", away: "TBD", date: "13 jul", result: null },
  { id: 1025, round: "Halve finale", matchNum: 1, home: "TBD", away: "TBD", date: "15 jul", result: null },
  { id: 1026, round: "Halve finale", matchNum: 2, home: "TBD", away: "TBD", date: "15 jul", result: null },
  { id: 1027, round: "Halve finale", matchNum: 3, home: "TBD", away: "TBD", date: "16 jul", result: null },
  { id: 1028, round: "Halve finale", matchNum: 4, home: "TBD", away: "TBD", date: "16 jul", result: null },
  { id: 1030, round: "Finale", matchNum: 1, home: "TBD", away: "TBD", date: "18 jul", result: null },
  { id: 1029, round: "Finale", matchNum: 2, home: "TBD", away: "TBD", date: "19 jul", result: null },
];

const INITIAL_MATCHES = generateMatches();

const TOP_SCORERS_OPTIONS = [
  "Kylian Mbappé", "Erling Haaland", "Harry Kane", "Vinicius Jr",
  "Lionel Messi", "Cristiano Ronaldo", "Lamine Yamal", "Bukayo Saka",
  "Jude Bellingham", "Rúben Neves", "Romelu Lukaku", "Timo Werner",
  "Memphis Depay", "Darwin Núñez", "Raheem Sterling",
  "Andere speler...",
];

const FLAG_EMOJI = {
  "Mexico": "🇲🇽", "Zuid-Korea": "🇰🇷", "Zuid-Afrika": "🇿🇦", "Tsjechië": "🇨🇿",
  "Canada": "🇨🇦", "Zwitserland": "🇨🇭", "Qatar": "🇶🇦", "Bosnië-Herzegovina": "🇧🇦",
  "Brazilië": "🇧🇷", "Marokko": "🇲🇦", "Schotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Haïti": "🇭🇹",
  "USA": "🇺🇸", "Paraguay": "🇵🇾", "Australië": "🇦🇺", "Turkije": "🇹🇷",
  "Duitsland": "🇩🇪", "Curaçao": "🇨🇼", "Ivoorkust": "🇨🇮", "Ecuador": "🇪🇨",
  "Nederland": "🇳🇱", "Japan": "🇯🇵", "Tunesië": "🇹🇳", "Zweden": "🇸🇪",
  "België": "🇧🇪", "Egypte": "🇪🇬", "Iran": "🇮🇷", "Nieuw-Zeeland": "🇳🇿",
  "Spanje": "🇪🇸", "Kaapverdië": "🇨🇻", "Saoedi-Arabië": "🇸🇦", "Uruguay": "🇺🇾",
  "Frankrijk": "🇫🇷", "Senegal": "🇸🇳", "Noorwegen": "🇳🇴", "Irak": "🇮🇶",
  "Argentinië": "🇦🇷", "Algerije": "🇩🇿", "Oostenrijk": "🇦🇹", "Jordanië": "🇯🇴",
  "Portugal": "🇵🇹", "Colombia": "🇨🇴", "Oezbekistan": "🇺🇿", "Congo DR": "🇨🇩",
  "Engeland": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Kroatië": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦",
  
};
function calcPoints(player, matches) {
  let pts = 0;
  const details = [];
  matches.forEach((m) => {
    if (!m.result) return;
    const pred = player.predictions?.[m.id];
    if (!pred) return;
    const [rh, ra] = m.result.split("-").map(Number);
    const [ph, pa] = pred.split("-").map(Number);
    if (rh === ph && ra === pa) {
      pts += 3;
      details.push({ match: `${m.home} vs ${m.away}`, pts: 3, reason: "Correcte uitslag ✅" });
    } else {
      const rWin = rh > ra ? "home" : ra > rh ? "away" : "draw";
      const pWin = ph > pa ? "home" : pa > ph ? "away" : "draw";
      if (rWin === pWin) {
        pts += 1;
        details.push({ match: `${m.home} vs ${m.away}`, pts: 1, reason: "Juiste winnaar 👍" });
      }
    }
  });
  return { pts, details };
}

function getPredScore(pred, result) {
  if (!pred || !result) return null;
  const [rh, ra] = result.split("-").map(Number);
  const [ph, pa] = pred.split("-").map(Number);
  if (rh === ph && ra === pa) return "exact";
  const rWin = rh > ra ? "home" : ra > rh ? "away" : "draw";
  const pWin = ph > pa ? "home" : pa > ph ? "away" : "draw";
  if (rWin === pWin) return "winner";
  return "wrong";
}

function useFirebaseDoc(docPath, defaultValue) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const r = doc(db, docPath);
    const unsub = onSnapshot(r, (snap) => {
      if (snap.exists()) { setData(snap.data()); } else { setData(defaultValue); }
      setLoading(false);
    }, (err) => { console.error("Firebase error:", err); setLoading(false); });
    return () => unsub();
  }, [docPath]);
  async function save(newData) { await setDoc(doc(db, docPath), newData, { merge: true }); }
  return { data, loading, save };
}
export default function App() {

  const { data: sharedData, loading, save: saveShared } = useFirebaseDoc("wk/shared", {
    matches: INITIAL_MATCHES, knockoutMatches: INITIAL_KNOCKOUT_MATCHES, topScorerGoals: {}, globalLock: false,
  });
  const { data: playersData, loading: loadingPlayers, save: savePlayers } = useFirebaseDoc("wk/players", { list: [] });

  const players = playersData?.list || [];
  const matches = sharedData?.matches || INITIAL_MATCHES;
  const knockoutMatches = sharedData?.knockoutMatches || INITIAL_KNOCKOUT_MATCHES;
  const topScorerGoals = sharedData?.topScorerGoals || {};
  const globalLock = sharedData?.globalLock || false;

  const [view, setView] = useState("home");
  const [activePlayer, setActivePlayer] = useState(null);
  const [activeGroup, setActiveGroup] = useState("A");
  const [adminMode, setAdminMode] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [notification, setNotification] = useState(null);

  function notify(msg, type = "success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  }

  async function setPlayers(updaterOrValue) {
    const newList = typeof updaterOrValue === "function" ? updaterOrValue(players) : updaterOrValue;
    await savePlayers({ list: newList });
  }
  async function setMatches(updaterOrValue) {
    const newMatches = typeof updaterOrValue === "function" ? updaterOrValue(matches) : updaterOrValue;
    await saveShared({ ...sharedData, matches: newMatches });
  }
  async function setKnockoutMatches(updaterOrValue) {
    const newMatches = typeof updaterOrValue === "function" ? updaterOrValue(knockoutMatches) : updaterOrValue;
    await saveShared({ ...sharedData, knockoutMatches: newMatches });
  }
  async function setTopScorerGoals(updaterOrValue) {
    const newGoals = typeof updaterOrValue === "function" ? updaterOrValue(topScorerGoals) : updaterOrValue;
    await saveShared({ ...sharedData, topScorerGoals: newGoals });
  }
  async function setGlobalLock(val) { await saveShared({ ...sharedData, globalLock: val }); }

  function getRanking() {
    return players.map((p) => {
      const { pts, details } = calcPoints(p, matches);
      let scorerPts = 0;
      if (p.topScorer && topScorerGoals[p.topScorer]) scorerPts = topScorerGoals[p.topScorer];
      return { ...p, pts: pts + scorerPts, matchPts: pts, scorerPts, details };
    }).sort((a, b) => b.pts - a.pts);
  }

  if (loading || loadingPlayers) return (
    <div style={styles.app}>
      <StarBg />
      <div style={styles.loadingScreen}>
        <div style={styles.loadingTrophy}>🏆</div>
        <div style={styles.loadingTitle}>WK Lanckbeen</div>
        <div style={styles.loadingText}>Verbinden met database...</div>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <StarBg />
      {notification && (
        <div style={{ ...styles.notification, background: notification.type === "error" ? "#e74c3c" : "#27ae60" }}>
          {notification.msg}
        </div>
      )}
      <Header view={view} setView={setView} adminMode={adminMode} setAdminMode={setAdminMode}
        showAdminLogin={showAdminLogin} setShowAdminLogin={setShowAdminLogin}
        adminPass={adminPass} setAdminPass={setAdminPass} notify={notify} players={players} globalLock={globalLock} />
      <main style={styles.main}>
        {view === "home" && <HomeView setView={setView} players={players} getRanking={getRanking} globalLock={globalLock} />}
        {view === "register" && <RegisterView players={players} setPlayers={setPlayers} setView={setView} setActivePlayer={setActivePlayer} notify={notify} />}
        {view === "predict" && <PredictView players={players} matches={matches} activePlayer={activePlayer} setActivePlayer={setActivePlayer} activeGroup={activeGroup} setActiveGroup={setActiveGroup} setPlayers={setPlayers} notify={notify} globalLock={globalLock} />}
        {view === "knockout" && <KnockoutView players={players} knockoutMatches={knockoutMatches} activePlayer={activePlayer} setActivePlayer={setActivePlayer} setPlayers={setPlayers} notify={notify} globalLock={globalLock} />}
        {view === "overzicht" && <OverzichtView players={players} matches={matches} activeGroup={activeGroup} setActiveGroup={setActiveGroup} />}
        {view === "ranking" && <RankingView getRanking={getRanking} topScorerGoals={topScorerGoals} />}
        {view === "admin" && adminMode && <AdminView matches={matches} setMatches={setMatches} players={players} topScorerGoals={topScorerGoals} setTopScorerGoals={setTopScorerGoals} notify={notify} globalLock={globalLock} setGlobalLock={setGlobalLock} knockoutMatches={knockoutMatches} setKnockoutMatches={setKnockoutMatches} />}
      </main>
    </div>
  );
}

function Header({ view, setView, adminMode, setAdminMode, showAdminLogin, setShowAdminLogin, adminPass, setAdminPass, notify, players, globalLock }) {
  function tryAdmin() {
    if (adminPass === "wk2026") { setAdminMode(true); setShowAdminLogin(false); setAdminPass(""); notify("Welkom, Tom! 🔐"); }
    else notify("Fout wachtwoord!", "error");
  }
  return (
    <header style={styles.header}>
      <div style={styles.headerTop}>
        <div style={styles.logo}>
          <span style={styles.trophy}>🏆</span>
          <div>
            <div style={styles.logoTitle}>WK Lanckbeen</div>
            <div style={styles.logoSub}>Pronostiek 2026 · FIFA World Cup</div>
          </div>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.playerCount}>👥 {players.length}/15</span>
          {adminMode ? (
            <button style={styles.adminBadge} onClick={() => { setAdminMode(false); notify("Admin uitgelogd"); }}>🔐 Tom</button>
          ) : (
            <button style={styles.adminBtn} onClick={() => setShowAdminLogin(!showAdminLogin)}>⚙️</button>
          )}
        </div>
      </div>
      {showAdminLogin && !adminMode && (
        <div style={styles.adminLogin}>
          <input style={styles.adminInput} type="password" placeholder="Wachtwoord (enkel voor Tom)" value={adminPass}
            onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === "Enter" && tryAdmin()} />
          <button style={styles.adminLoginBtn} onClick={tryAdmin}>Inloggen</button>
        </div>
      )}
      {globalLock && <div style={styles.globalLockBanner}>🔒 Ingave geblokkeerd door Tom — voorspellingen kunnen niet worden gewijzigd</div>}
      <nav style={styles.nav}>
        {[
          { key: "home", label: "🏠 Home" },
          { key: "register", label: "✍️ Registreer" },
          { key: "predict", label: "⚽ Mijn voorspellingen" },
          { key: "knockout", label: "🏆 Knock-out" },
          { key: "overzicht", label: "👁️ Overzicht" },
          { key: "ranking", label: "🥇 Ranking" },
          ...(adminMode ? [{ key: "admin", label: "🔧 Admin" }] : []),
        ].map(({ key, label }) => (
          <button key={key} style={{ ...styles.navBtn, ...(view === key ? styles.navBtnActive : {}) }} onClick={() => setView(key)}>{label}</button>
        ))}
      </nav>
    </header>
  );
}

function HomeView({ setView, players, getRanking, globalLock }) {
  const ranking = getRanking();
  const leader = ranking[0];
  return (
    <div style={styles.homeView}>
      <div style={styles.heroCard}>
        <div style={styles.heroEmojis}>🇺🇸🇨🇦🇲🇽</div>
        <h1 style={styles.heroTitle}>WK 2026 Pronostiek</h1>
        <p style={styles.heroSub}>Wie voorspelt het beste? Strijd mee voor de eeuwige roem bij Lanckbeen!</p>
        <div style={styles.heroDates}>📅 11 juni – 19 juli 2026 · 48 landen · 104 wedstrijden</div>
      </div>
      <div style={styles.homeGrid}>
        <div style={styles.homeCard} onClick={() => setView("register")}><div style={styles.homeCardIcon}>✍️</div><div style={styles.homeCardTitle}>Registreer</div><div style={styles.homeCardSub}>Voeg je naam & foto toe</div></div>
        <div style={styles.homeCard} onClick={() => setView("predict")}><div style={styles.homeCardIcon}>⚽</div><div style={styles.homeCardTitle}>Mijn voorspellingen</div><div style={styles.homeCardSub}>Vul jouw uitslagen in</div></div>
        <div style={styles.homeCard} onClick={() => setView("overzicht")}><div style={styles.homeCardIcon}>👁️</div><div style={styles.homeCardTitle}>Overzicht</div><div style={styles.homeCardSub}>Zie ieders pronostieken</div></div>
        <div style={{ ...styles.homeCard, gridColumn: "1 / -1" }} onClick={() => setView("ranking")}><div style={styles.homeCardIcon}>🥇</div><div style={styles.homeCardTitle}>Ranking</div><div style={styles.homeCardSub}>Bekijk de tussenstand</div></div>
      </div>
      {leader && (
        <div style={styles.leaderBox}>
          <div style={styles.leaderLabel}>👑 Huidige leider</div>
          <div style={styles.leaderName}>{leader.name}</div>
          <div style={styles.leaderPts}>{leader.pts} punten</div>
        </div>
      )}
      <div style={styles.rulesBox}>
        <div style={styles.rulesTitle}>📋 Puntensysteem</div>
        <div style={styles.rule}><span style={styles.rulePts}>+3</span> Correcte uitslag</div>
        <div style={styles.rule}><span style={styles.rulePts}>+1</span> Juiste winnaar of gelijkspel</div>
        <div style={styles.rule}><span style={styles.rulePts}>+1</span> Topscorer scoort een doelpunt</div>
        {globalLock && <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(231,76,60,0.15)", border: "1px solid #e74c3c", borderRadius: 10, fontSize: 13, color: "#e74c3c", fontWeight: 700 }}>🚫 Tom heeft alle ingave geblokkeerd.</div>}
      </div>
    </div>
  );
}

function RegisterView({ players, setPlayers, setView, setActivePlayer, notify }) {
  const [name, setName] = useState("");
  const [topScorer, setTopScorer] = useState("");
  const [customScorer, setCustomScorer] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    const n = name.trim();
    if (!n) { notify("Vul je naam in!", "error"); return; }
    const scorer = topScorer === "Andere speler..." ? customScorer.trim() : topScorer;
    if (!scorer) { notify("Kies een topscorer!", "error"); return; }
    setSaving(true);
    if (editId !== null) {
      await setPlayers(ps => ps.map(p => p.id === editId ? { ...p, name: n, topScorer: scorer, photo: photo || p.photo } : p));
      notify(`${n} bijgewerkt! ✅`); setEditId(null);
    } else {
      if (players.length >= 15) { notify("Maximum 15 spelers bereikt!", "error"); setSaving(false); return; }
      if (players.find(p => p.name.toLowerCase() === n.toLowerCase())) { notify("Naam bestaat al!", "error"); setSaving(false); return; }
      await setPlayers(ps => [...ps, { id: Date.now(), name: n, topScorer: scorer, photo, predictions: {} }]);
      notify(`${n} geregistreerd! 🎉`);
    }
    setName(""); setTopScorer(""); setCustomScorer(""); setPhoto(null); setSaving(false);
  }

  function startEdit(p) {
    setEditId(p.id); setName(p.name);
    if (TOP_SCORERS_OPTIONS.includes(p.topScorer)) { setTopScorer(p.topScorer); setCustomScorer(""); }
    else { setTopScorer("Andere speler..."); setCustomScorer(p.topScorer); }
    setPhoto(p.photo || null);
  }

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>✍️ Deelnemers registreren</h2>
      <div style={styles.registerForm}>
        <div style={styles.photoArea} onClick={() => fileRef.current.click()}>
          {photo ? <img src={photo} alt="foto" style={styles.photoPreview} /> : <div style={styles.photoPlaceholder}>📷<br/><small>Voeg foto toe</small></div>}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
        </div>
        <input style={styles.input} placeholder="Jouw naam" value={name} onChange={e => setName(e.target.value)} />
        <select style={styles.select} value={topScorer} onChange={e => setTopScorer(e.target.value)}>
          <option value="">⚽ Kies jouw topscorer</option>
          {TOP_SCORERS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {topScorer === "Andere speler..." && <input style={styles.input} placeholder="Naam topscorer" value={customScorer} onChange={e => setCustomScorer(e.target.value)} />}
        <button style={{ ...styles.btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={handleSubmit} disabled={saving}>
          {saving ? "⏳ Opslaan..." : editId !== null ? "✏️ Bijwerken" : "➕ Registreer"}
        </button>
        {editId !== null && <button style={styles.btnSecondary} onClick={() => { setEditId(null); setName(""); setTopScorer(""); setCustomScorer(""); setPhoto(null); }}>Annuleer</button>}
      </div>
      <div style={styles.playerCount2}>{players.length}/15 deelnemers</div>
      <div style={styles.playerGrid}>
        {players.map((p, i) => (
          <div key={p.id} style={styles.playerCard}>
            <div style={styles.playerCardRank}>#{i + 1}</div>
            {p.photo ? <img src={p.photo} alt={p.name} style={styles.playerPhoto} /> : <div style={styles.playerPhotoPlaceholder}>👤</div>}
            <div style={styles.playerCardName}>{p.name}</div>
            <div style={styles.playerCardScorer}>⚽ {p.topScorer}</div>
            <div style={styles.playerCardBtns}>
              <button style={styles.btnSmall} onClick={() => startEdit(p)}>✏️ Edit</button>
              <button style={{ ...styles.btnSmall, background: "#27ae60" }} onClick={() => { setActivePlayer(p.id); setView("predict"); }}>⚽ Voorspel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

}
function PredictView({ players, matches, activePlayer, setActivePlayer, activeGroup, setActiveGroup, setPlayers, notify, globalLock }) {
  const player = players.find(p => p.id === activePlayer) || players[0];
  const [pendingPreds, setPendingPreds] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { setPendingPreds(player?.predictions || {}); }, [activePlayer, player?.id]);

  const groups = Object.keys(WK_GROUPS);
  const groupMatches = matches.filter(m => m.group === activeGroup);

  function setPred(matchId, val) { setPendingPreds(prev => ({ ...prev, [matchId]: val })); }

  async function savePreds() {
    if (!player) return;
    if (globalLock) { notify("Ingave is geblokkeerd door Tom! 🔒", "error"); return; }
    setSaving(true);
    const merged = { ...player.predictions };
    Object.entries(pendingPreds).forEach(([mid, val]) => {
      const m = matches.find(x => x.id === parseInt(mid));
      if (m && !m.result) merged[mid] = val;
    });
    await setPlayers(ps => ps.map(p => p.id === player.id ? { ...p, predictions: merged } : p));
    notify("Pronostieken opgeslagen! 💾"); setSaving(false);
  }

  if (!player) return <div style={styles.section}><h2 style={styles.sectionTitle}>⚽ Pronostieken</h2><p style={styles.empty}>Eerst registreren!</p></div>;

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>⚽ Mijn voorspellingen</h2>
      <div style={styles.playerSelector}>
        {players.map(p => (
          <button key={p.id} style={{ ...styles.playerSelectorBtn, ...(p.id === player.id ? styles.playerSelectorBtnActive : {}) }} onClick={() => setActivePlayer(p.id)}>
            {p.photo ? <img src={p.photo} alt={p.name} style={styles.selectorPhoto} /> : "👤"}<span>{p.name}</span>
          </button>
        ))}
      </div>
      <div style={styles.lockInfoBox}>🔒 Vergrendeld na uitslag · ✏️ Wijzigen mag tot de match gespeeld is</div>
      {globalLock && <div style={styles.globalLockBox}>🚫 <b>Tom heeft alle ingave geblokkeerd.</b></div>}
      <div style={styles.groupTabs}>
        {groups.map(g => {
          const done = matches.filter(m => m.group === g).filter(m => { const pred = pendingPreds[m.id]; return pred && pred.includes("-") && pred.split("-")[0] !== "" && pred.split("-")[1] !== ""; }).length;
          return <button key={g} style={{ ...styles.groupTab, ...(g === activeGroup ? styles.groupTabActive : {}) }} onClick={() => setActiveGroup(g)}>Poule {g}<span style={styles.groupTabCount}>{done}/6</span></button>;
        })}
      </div>
      <div style={styles.matchList}>
        <div style={styles.groupHeader}>🏟️ Poule {activeGroup} — {WK_GROUPS[activeGroup].teams.map(t => `${FLAG_EMOJI[t] || ""} ${t}`).join(" · ")}</div>
        {groupMatches.map(m => {
          const pred = pendingPreds[m.id] || "";
          const isLocked = !!m.result || globalLock;
          const hasPred = pred && pred.includes("-") && pred.split("-")[0] !== "" && pred.split("-")[1] !== "";
          const score = m.result && hasPred ? getPredScore(pred, m.result) : null;
          const scoreColor = score === "exact" ? "#27ae60" : score === "winner" ? "#f39c12" : score === "wrong" ? "#e74c3c" : null;
          return (
            <div key={m.id} style={{ ...styles.matchCard, ...(m.result ? styles.matchCardLocked : hasPred ? styles.matchCardDone : {}), borderLeft: scoreColor ? `4px solid ${scoreColor}` : undefined }}>
              <div style={styles.matchTopRow}>
                <span style={styles.matchDate}>📅 {m.date}</span>
                {m.result && <span style={styles.lockBadge}>🔒 Vergrendeld</span>}
                {!m.result && globalLock && <span style={styles.lockBadgeGlobal}>🚫 Geblokkeerd</span>}
                {!m.result && !globalLock && hasPred && <span style={styles.editableBadge}>✏️ Wijzigen mag nog</span>}
              </div>
              <div style={styles.matchTeams}>
                <span style={styles.teamName}>{FLAG_EMOJI[m.home] || ""} {m.home}</span>
                <div style={styles.scoreInput}>
                  {isLocked ? (
                    <div style={styles.lockedPredDisplay}><span style={{ ...styles.lockedScore, color: scoreColor || "#7f8c8d" }}>{hasPred ? pred : "—"}</span></div>
                  ) : (
                    <>
                      <input type="number" min="0" max="20" style={styles.scoreBox} value={pred.split("-")[0] ?? ""} onChange={e => { const parts = pred.split("-"); setPred(m.id, `${e.target.value}-${parts[1] ?? ""}`); }} />
                      <span style={styles.scoreDash}>—</span>
                      <input type="number" min="0" max="20" style={styles.scoreBox} value={pred.split("-")[1] ?? ""} onChange={e => { const parts = pred.split("-"); setPred(m.id, `${parts[0] ?? ""}-${e.target.value}`); }} />
                    </>
                  )}
                </div>
                <span style={{ ...styles.teamName, textAlign: "right" }}>{m.away} {FLAG_EMOJI[m.away] || ""}</span>
              </div>
              {m.result && (
                <div style={styles.resultRow}>
                  <span style={styles.resultBadge}>✅ Officiële uitslag: <b>{m.result}</b></span>
                  {score === "exact" && <span style={styles.scoreBadgeExact}>+3 🎯 Raak!</span>}
                  {score === "winner" && <span style={styles.scoreBadgeWinner}>+1 👍 Winnaar</span>}
                  {score === "wrong" && hasPred && <span style={styles.scoreBadgeWrong}>0 pts ❌</span>}
                  {!hasPred && <span style={styles.scoreBadgeWrong}>Niet ingevuld</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button style={{ ...styles.btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={savePreds} disabled={saving}>{saving ? "⏳ Opslaan..." : "💾 Bewaar voorspellingen"}</button>
    </div>
  );
}

function KnockoutView({ players, knockoutMatches, activePlayer, setActivePlayer, setPlayers, notify, globalLock }) {
  const player = players.find(p => p.id === activePlayer) || players[0];
  const [pendingPreds, setPendingPreds] = useState({});
  const [activeRound, setActiveRound] = useState("Zestiende finale");
  const [saving, setSaving] = useState(false);
  const roundIcons = { "Zestiende finale": "⚔️", "Achtste finale": "⚔️", "Kwartfinale": "🥊", "Halve finale": "🔥", "Finale": "🏆" };

  useEffect(() => { setPendingPreds(player?.knockoutPredictions || {}); }, [activePlayer, player?.id]);

  function setPred(matchId, val) { setPendingPreds(prev => ({ ...prev, [matchId]: val })); }

  async function savePreds() {
    if (!player) return;
    if (globalLock) { notify("Ingave is geblokkeerd door Tom! 🔒", "error"); return; }
    setSaving(true);
    const merged = { ...(player.knockoutPredictions || {}) };
    Object.entries(pendingPreds).forEach(([mid, val]) => {
      const m = knockoutMatches.find(x => x.id === parseInt(mid));
      if (m && !m.result && m.home !== "TBD") merged[mid] = val;
    });
    await setPlayers(ps => ps.map(p => p.id === player.id ? { ...p, knockoutPredictions: merged } : p));
    notify("Knock-out pronostieken opgeslagen! 💾"); setSaving(false);
  }

  if (!player) return <div style={styles.section}><h2 style={styles.sectionTitle}>🏆 Knock-out fase</h2><p style={styles.empty}>Eerst registreren!</p></div>;

  const roundMatches = knockoutMatches.filter(m => m.round === activeRound);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🏆 Knock-out fase</h2>
      <div style={styles.playerSelector}>
        {players.map(p => (
          <button key={p.id} style={{ ...styles.playerSelectorBtn, ...(p.id === player.id ? styles.playerSelectorBtnActive : {}) }} onClick={() => setActivePlayer(p.id)}>
            {p.photo ? <img src={p.photo} alt={p.name} style={styles.selectorPhoto} /> : "👤"}<span>{p.name}</span>
          </button>
        ))}
      </div>
      {globalLock && <div style={styles.globalLockBox}>🚫 <b>Tom heeft alle ingave geblokkeerd.</b></div>}
      <div style={styles.groupTabs}>
        {KNOCKOUT_ROUNDS.map(r => <button key={r} style={{ ...styles.groupTab, ...(r === activeRound ? styles.groupTabActive : {}) }} onClick={() => setActiveRound(r)}>{roundIcons[r]} {r}</button>)}
      </div>
      <div style={styles.matchList}>
        <div style={styles.groupHeader}>{roundIcons[activeRound]} {activeRound}</div>
        {roundMatches.map(m => {
          const pred = pendingPreds[m.id] || "";
          const isTBD = m.home === "TBD" || m.away === "TBD";
          const isLocked = !!m.result || globalLock || isTBD;
          const hasPred = pred && pred.includes("-") && pred.split("-")[0] !== "" && pred.split("-")[1] !== "";
          const score = m.result && hasPred ? getPredScore(pred, m.result) : null;
          const scoreColor = score === "exact" ? "#27ae60" : score === "winner" ? "#f39c12" : score === "wrong" ? "#e74c3c" : null;
          return (
            <div key={m.id} style={{ ...styles.matchCard, ...(m.result ? styles.matchCardLocked : hasPred ? styles.matchCardDone : {}), borderLeft: scoreColor ? `4px solid ${scoreColor}` : undefined }}>
              <div style={styles.matchTopRow}>
                <span style={styles.matchDate}>📅 {m.date} · Match {m.matchNum}</span>
                {isTBD && <span style={{ ...styles.lockBadge, color: "#f39c12", border: "1px solid #f39c12", background: "rgba(243,156,18,0.1)" }}>⏳ Ploegen nog niet bekend</span>}
                {m.result && <span style={styles.lockBadge}>🔒 Vergrendeld</span>}
                {!m.result && !isTBD && !globalLock && hasPred && <span style={styles.editableBadge}>✏️ Wijzigen mag nog</span>}
              </div>
              <div style={styles.matchTeams}>
                <span style={styles.teamName}>{FLAG_EMOJI[m.home] || ""} {m.home}</span>
                <div style={styles.scoreInput}>
                  {isLocked ? (
                    <div style={styles.lockedPredDisplay}><span style={{ ...styles.lockedScore, color: scoreColor || (isTBD ? "#7f8c8d" : "white") }}>{isTBD ? "? — ?" : hasPred ? pred : "—"}</span></div>
                  ) : (
                    <>
                      <input type="number" min="0" max="20" style={styles.scoreBox} value={pred.split("-")[0] ?? ""} onChange={e => { const parts = pred.split("-"); setPred(m.id, `${e.target.value}-${parts[1] ?? ""}`); }} />
                      <span style={styles.scoreDash}>—</span>
                      <input type="number" min="0" max="20" style={styles.scoreBox} value={pred.split("-")[1] ?? ""} onChange={e => { const parts = pred.split("-"); setPred(m.id, `${parts[0] ?? ""}-${e.target.value}`); }} />
                    </>
                  )}
                </div>
                <span style={{ ...styles.teamName, textAlign: "right" }}>{m.away} {FLAG_EMOJI[m.away] || ""}</span>
              </div>
              {m.result && (
                <div style={styles.resultRow}>
                  <span style={styles.resultBadge}>✅ Officiële uitslag: <b>{m.result}</b></span>
                  {score === "exact" && <span style={styles.scoreBadgeExact}>+3 🎯 Raak!</span>}
                  {score === "winner" && <span style={styles.scoreBadgeWinner}>+1 👍 Winnaar</span>}
                  {score === "wrong" && hasPred && <span style={styles.scoreBadgeWrong}>0 pts ❌</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button style={{ ...styles.btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={savePreds} disabled={saving}>{saving ? "⏳ Opslaan..." : "💾 Bewaar knock-out voorspellingen"}</button>
    </div>
  );
}

function OverzichtView({ players, matches, activeGroup, setActiveGroup }) {
  const groups = Object.keys(WK_GROUPS);
  const groupMatches = matches.filter(m => m.group === activeGroup);
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>👁️ Overzicht — Ieders pronostieken</h2>
      <div style={styles.overzichtInfo}>Hier zie je de voorspellingen van alle deelnemers per wedstrijd.</div>
      <div style={styles.groupTabs}>
        {groups.map(g => <button key={g} style={{ ...styles.groupTab, ...(g === activeGroup ? styles.groupTabActive : {}) }} onClick={() => setActiveGroup(g)}>Poule {g}</button>)}
      </div>
      <div style={styles.matchList}>
        <div style={styles.groupHeader}>🏟️ Poule {activeGroup} — {WK_GROUPS[activeGroup].teams.map(t => `${FLAG_EMOJI[t] || ""} ${t}`).join(" · ")}</div>
        {groupMatches.map(m => {
          const isPlayed = !!m.result;
          return (
            <div key={m.id} style={{ ...styles.overzichtMatchCard, ...(isPlayed ? styles.matchCardLocked : {}) }}>
              <div style={styles.matchTopRow}>
                <span style={styles.matchDate}>📅 {m.date}</span>
                {isPlayed ? <span style={styles.playedBadge}>✅ Uitslag: <b>{m.result}</b></span> : <span style={styles.openBadge}>⏳ Nog te spelen</span>}
              </div>
              <div style={styles.overzichtMatchTitle}>
                <span>{FLAG_EMOJI[m.home] || ""} <b>{m.home}</b></span>
                <span style={styles.vsText}>vs</span>
                <span><b>{m.away}</b> {FLAG_EMOJI[m.away] || ""}</span>
              </div>
              {players.length === 0 ? <div style={styles.noPredText}>Nog geen deelnemers.</div> : (
                <div style={styles.predsGrid}>
                  {players.map(p => {
                    const pred = p.predictions?.[m.id];
                    const hasPred = pred && pred.includes("-") && pred.split("-")[0] !== "" && pred.split("-")[1] !== "";
                    const score = isPlayed && hasPred ? getPredScore(pred, m.result) : null;
                    const bg = score === "exact" ? "rgba(39,174,96,0.2)" : score === "winner" ? "rgba(243,156,18,0.2)" : score === "wrong" ? "rgba(231,76,60,0.1)" : "rgba(255,255,255,0.05)";
                    const border = score === "exact" ? "#27ae60" : score === "winner" ? "#f39c12" : score === "wrong" ? "#e74c3c" : "rgba(255,255,255,0.1)";
                    return (
                      <div key={p.id} style={{ ...styles.predChip, background: bg, border: `1px solid ${border}` }}>
                        <div style={styles.predChipTop}>
                          {p.photo ? <img src={p.photo} alt={p.name} style={styles.predChipPhoto} /> : <span style={styles.predChipAvatar}>👤</span>}
                          <span style={styles.predChipName}>{p.name}</span>
                        </div>
                        <div style={styles.predChipScore}>
                          {hasPred ? (
                            <><span style={{ fontWeight: 800, fontSize: 18, color: score === "exact" ? "#27ae60" : score === "winner" ? "#f39c12" : "white" }}>{pred}</span>
                            {score === "exact" && <span style={styles.miniScore}>🎯 +3</span>}
                            {score === "winner" && <span style={styles.miniScore}>👍 +1</span>}
                            {score === "wrong" && <span style={{ ...styles.miniScore, color: "#e74c3c" }}>❌ 0</span>}</>
                          ) : <span style={{ color: "#7f8c8d", fontSize: 13 }}>Niet ingevuld</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RankingView({ getRanking, topScorerGoals }) {
  const ranking = getRanking();
  const medals = ["🥇", "🥈", "🥉"];
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🏆 Ranking</h2>
      {ranking.length === 0 && <p style={styles.empty}>Nog geen deelnemers geregistreerd.</p>}
      <div style={styles.rankingList}>
        {ranking.map((p, i) => (
          <div key={p.id}>
            <div style={{ ...styles.rankCard, ...(i === 0 ? styles.rankCardFirst : i === 1 ? styles.rankCardSecond : i === 2 ? styles.rankCardThird : {}), cursor: "pointer" }} onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
              <div style={styles.rankPos}>{medals[i] || `${i + 1}`}</div>
              {p.photo ? <img src={p.photo} alt={p.name} style={styles.rankPhoto} /> : <div style={styles.rankPhotoPlaceholder}>👤</div>}
              <div style={styles.rankInfo}>
                <div style={styles.rankName}>{p.name}</div>
                <div style={styles.rankSub}>⚽ {p.topScorer}</div>
                <div style={styles.rankSub}>🎯 Wedstrijden: {p.matchPts}pts · ⚽ Scorer: {p.scorerPts}pts</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={styles.rankPts}>{p.pts}<span style={styles.rankPtsSub}>pts</span></div>
                <div style={{ fontSize: 12, color: "#7f8c8d" }}>{expanded === p.id ? "▲" : "▼"}</div>
              </div>
            </div>
            {expanded === p.id && p.details.length > 0 && (
              <div style={styles.detailsBox}>
                {p.details.map((d, j) => (
                  <div key={j} style={styles.detailRow}>
                    <span style={styles.detailMatch}>{d.match}</span>
                    <span style={styles.detailReason}>{d.reason}</span>
                    <span style={styles.detailPts}>+{d.pts}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminView({ matches, setMatches, players, topScorerGoals, setTopScorerGoals, notify, globalLock, setGlobalLock, knockoutMatches, setKnockoutMatches }) {
  const [selGroup, setSelGroup] = useState("A");
  const [activeAdminTab, setActiveAdminTab] = useState("groep");
  const [activeKnockoutRound, setActiveKnockoutRound] = useState("Zestiende finale");
  const [results, setResults] = useState({});
  const [knockoutResults, setKnockoutResults] = useState({});
  const [knockoutTeams, setKnockoutTeams] = useState({});
  const [scorerInput, setScorerInput] = useState("");
  const [scorerGoalCount, setScorerGoalCount] = useState("");
  const [saving, setSaving] = useState(false);
  const groups = Object.keys(WK_GROUPS);
  const groupMatches = matches.filter(m => m.group === selGroup);
  const allScorers = [...new Set(players.map(p => p.topScorer))].filter(Boolean);

  useEffect(() => {
    const init = {};
    matches.forEach(m => { if (m.result) init[m.id] = m.result; });
    setResults(init);
    const kinit = {}, tinit = {};
    knockoutMatches.forEach(m => {
      if (m.result) kinit[m.id] = m.result;
      tinit[`${m.id}_home`] = m.home !== "TBD" ? m.home : "";
      tinit[`${m.id}_away`] = m.away !== "TBD" ? m.away : "";
    });
    setKnockoutResults(kinit); setKnockoutTeams(tinit);
  }, [matches, knockoutMatches]);

  async function saveResults() {
    setSaving(true);
    await setMatches(prev => prev.map(m => results[m.id] !== undefined ? { ...m, result: results[m.id] || null } : m));
    notify("Uitslagen opgeslagen! ✅"); setSaving(false);
  }

  async function saveKnockout() {
    setSaving(true);
    await setKnockoutMatches(prev => prev.map(m => ({
      ...m,
      home: knockoutTeams[`${m.id}_home`] || m.home || "TBD",
      away: knockoutTeams[`${m.id}_away`] || m.away || "TBD",
      result: knockoutResults[m.id] || null,
    })));
    notify("Knock-out wedstrijden opgeslagen! ✅"); setSaving(false);
  }

  async function saveGoals() {
    if (!scorerInput || !scorerGoalCount) { notify("Vul speler en doelpunten in!", "error"); return; }
    await setTopScorerGoals(prev => ({ ...prev, [scorerInput]: parseInt(scorerGoalCount) || 0 }));
    notify(`${scorerInput}: ${scorerGoalCount} doelpunt(en) opgeslagen! ⚽`);
    setScorerInput(""); setScorerGoalCount("");
  }

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🔧 Admin — Tom's beheer</h2>
      <div style={{ ...styles.adminNote, background: globalLock ? "rgba(231,76,60,0.15)" : "rgba(39,174,96,0.1)", border: `1px solid ${globalLock ? "#e74c3c" : "#27ae60"}`, color: globalLock ? "#e74c3c" : "#27ae60" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{globalLock ? "🚫 Ingave is momenteel GEBLOKKEERD" : "✅ Ingave is momenteel OPEN"}</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{globalLock ? "Deelnemers kunnen geen scores meer invullen." : "Deelnemers kunnen scores vrij invullen."}</div>
          </div>
          <button style={{ background: globalLock ? "#27ae60" : "#e74c3c", border: "none", color: "white", padding: "12px 22px", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}
            onClick={async () => { const next = !globalLock; await setGlobalLock(next); notify(next ? "🔒 Ingave geblokkeerd!" : "✅ Ingave terug opengesteld!", next ? "error" : "success"); }}>
            {globalLock ? "🔓 Ingave openstellen" : "🔒 Ingave blokkeren"}
          </button>
        </div>
      </div>
      <div style={styles.groupTabs}>
        <button style={{ ...styles.groupTab, ...(activeAdminTab === "groep" ? styles.groupTabActive : {}) }} onClick={() => setActiveAdminTab("groep")}>⚽ Groepsfase</button>
        <button style={{ ...styles.groupTab, ...(activeAdminTab === "knockout" ? styles.groupTabActive : {}) }} onClick={() => setActiveAdminTab("knockout")}>🏆 Knock-out</button>
        <button style={{ ...styles.groupTab, ...(activeAdminTab === "scorer" ? styles.groupTabActive : {}) }} onClick={() => setActiveAdminTab("scorer")}>🥅 Topscorer</button>
      </div>
      {activeAdminTab === "groep" && (
        <>
          <div style={styles.adminNote}>⚠️ Voer de officiële uitslagen in na elke gespeelde wedstrijd.</div>
          <div style={styles.groupTabs}>{groups.map(g => <button key={g} style={{ ...styles.groupTab, ...(g === selGroup ? styles.groupTabActive : {}) }} onClick={() => setSelGroup(g)}>Poule {g}</button>)}</div>
          <div style={styles.matchList}>
            <div style={styles.groupHeader}>🏟️ Poule {selGroup}</div>
            {groupMatches.map(m => (
              <div key={m.id} style={styles.adminMatchCard}>
                <div style={styles.adminMatchTeams}><span>{FLAG_EMOJI[m.home] || ""} {m.home} vs {m.away} {FLAG_EMOJI[m.away] || ""}</span><span style={styles.matchDateSmall}>📅 {m.date}</span></div>
                <div style={styles.adminScoreRow}>
                  <input style={styles.adminScoreBox} type="number" min="0" max="20" placeholder="T" value={results[m.id]?.split("-")[0] ?? ""} onChange={e => { const cur = results[m.id] || "-"; const p = cur.split("-"); setResults(prev => ({ ...prev, [m.id]: `${e.target.value}-${p[1] ?? ""}` })); }} />
                  <span style={{ color: "#f39c12", fontWeight: "bold" }}>—</span>
                  <input style={styles.adminScoreBox} type="number" min="0" max="20" placeholder="T" value={results[m.id]?.split("-")[1] ?? ""} onChange={e => { const cur = results[m.id] || "-"; const p = cur.split("-"); setResults(prev => ({ ...prev, [m.id]: `${p[0] ?? ""}-${e.target.value}` })); }} />
                  {m.result && <span style={styles.savedBadge}>✅ {m.result}</span>}
                </div>
              </div>
            ))}
          </div>
          <button style={{ ...styles.btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={saveResults} disabled={saving}>{saving ? "⏳ Opslaan..." : "💾 Bewaar uitslagen"}</button>
        </>
      )}
      {activeAdminTab === "knockout" && (
        <>
          <div style={styles.adminNote}>⚠️ Vul de ploegnamen in zodra ze bekend zijn. Vul daarna de uitslag in na elke wedstrijd.</div>
          <div style={styles.groupTabs}>{KNOCKOUT_ROUNDS.map(r => <button key={r} style={{ ...styles.groupTab, ...(r === activeKnockoutRound ? styles.groupTabActive : {}) }} onClick={() => setActiveKnockoutRound(r)}>{r}</button>)}</div>
          <div style={styles.matchList}>
            <div style={styles.groupHeader}>🏆 {activeKnockoutRound}</div>
            {knockoutMatches.filter(m => m.round === activeKnockoutRound).map(m => (
              <div key={m.id} style={styles.adminMatchCard}>
                <div style={styles.matchDateSmall}>📅 {m.date} · Match {m.matchNum}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
                  <input style={{ ...styles.input, flex: 1, minWidth: 110, padding: "8px 10px", fontSize: 13 }} placeholder="Thuisploeg" value={knockoutTeams[`${m.id}_home`] || ""} onChange={e => setKnockoutTeams(prev => ({ ...prev, [`${m.id}_home`]: e.target.value }))} />
                  <span style={{ color: "#f39c12", fontWeight: 900 }}>vs</span>
                  <input style={{ ...styles.input, flex: 1, minWidth: 110, padding: "8px 10px", fontSize: 13 }} placeholder="Uitploeg" value={knockoutTeams[`${m.id}_away`] || ""} onChange={e => setKnockoutTeams(prev => ({ ...prev, [`${m.id}_away`]: e.target.value }))} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                  <span style={{ fontSize: 13, color: "#bdc3c7" }}>Uitslag:</span>
                  <input style={styles.adminScoreBox} type="number" min="0" max="20" placeholder="T" value={knockoutResults[m.id]?.split("-")[0] ?? ""} onChange={e => { const cur = knockoutResults[m.id] || "-"; const p = cur.split("-"); setKnockoutResults(prev => ({ ...prev, [m.id]: `${e.target.value}-${p[1] ?? ""}` })); }} />
                  <span style={{ color: "#f39c12", fontWeight: "bold" }}>—</span>
                  <input style={styles.adminScoreBox} type="number" min="0" max="20" placeholder="T" value={knockoutResults[m.id]?.split("-")[1] ?? ""} onChange={e => { const cur = knockoutResults[m.id] || "-"; const p = cur.split("-"); setKnockoutResults(prev => ({ ...prev, [m.id]: `${p[0] ?? ""}-${e.target.value}` })); }} />
                  {m.result && <span style={styles.savedBadge}>✅ {m.result}</span>}
                </div>
              </div>
            ))}
          </div>
          <button style={{ ...styles.btnPrimary, opacity: saving ? 0.6 : 1 }} onClick={saveKnockout} disabled={saving}>{saving ? "⏳ Opslaan..." : "💾 Bewaar knock-out wedstrijden"}</button>
        </>
      )}
      {activeAdminTab === "scorer" && (
        <div style={styles.scorerAdmin}>
          <h3 style={styles.scorerAdminTitle}>⚽ Topscorer doelpunten</h3>
          <div style={styles.scorerRow}>
            <select style={styles.select} value={scorerInput} onChange={e => setScorerInput(e.target.value)}>
              <option value="">Selecteer speler</option>
              {allScorers.map(s => <option key={s} value={s}>{s} — {topScorerGoals[s] || 0} ⚽</option>)}
            </select>
            <input style={{ ...styles.input, width: "80px" }} type="number" min="0" placeholder="Goals" value={scorerGoalCount} onChange={e => setScorerGoalCount(e.target.value)} />
            <button style={styles.btnPrimary} onClick={saveGoals}>Opslaan</button>
          </div>
          <div style={styles.scorerOverview}>
            {allScorers.map(s => <div key={s} style={styles.scorerChip}>⚽ {s}: <b>{topScorerGoals[s] || 0}</b> goals</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
function StarBg() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, delay: Math.random() * 4,
  }));
  return (
    <div style={styles.starBg}>
      {stars.map(s => (
        <div key={s.id} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: "50%", background: "rgba(255,255,255,0.6)", animation: `twinkle ${2 + s.delay}s infinite alternate` }} />
      ))}
      <style>{`
        @keyframes twinkle { from { opacity: 0.2; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a1628; }
        ::-webkit-scrollbar-thumb { background: #f39c12; border-radius: 3px; }
        input[type=number]::-webkit-inner-spin-button { opacity: 1; }
      `}</style>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "linear-gradient(135deg, #0a1628 0%, #1a2c4e 50%, #0d2137 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#ecf0f1", position: "relative", overflowX: "hidden" },
  starBg: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 },
  loadingScreen: { position: "fixed", inset: 0, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 },
  loadingTrophy: { fontSize: 64, animation: "bounce 1.2s infinite" },
  loadingTitle: { fontSize: 28, fontWeight: 900, color: "#f39c12" },
  loadingText: { color: "#7f8c8d", fontSize: 14 },
  header: { position: "relative", zIndex: 10, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", borderBottom: "2px solid #f39c12", padding: "12px 16px 0" },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  trophy: { fontSize: 36 },
  logoTitle: { fontSize: 22, fontWeight: 800, color: "#f39c12", letterSpacing: 1 },
  logoSub: { fontSize: 11, color: "#bdc3c7", letterSpacing: 2, textTransform: "uppercase" },
  headerRight: { display: "flex", alignItems: "center", gap: 8 },
  playerCount: { fontSize: 13, background: "rgba(243,156,18,0.2)", padding: "4px 10px", borderRadius: 20, border: "1px solid #f39c12", color: "#f39c12" },
  adminBtn: { background: "transparent", border: "1px solid #7f8c8d", color: "#bdc3c7", padding: "4px 10px", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  adminBadge: { background: "#e74c3c", border: "none", color: "white", padding: "4px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 },
  adminLogin: { display: "flex", gap: 8, padding: "8px 0", animation: "slideIn 0.3s ease" },
  adminInput: { flex: 1, background: "rgba(255,255,255,0.1)", border: "1px solid #f39c12", color: "white", padding: "8px 12px", borderRadius: 8, fontSize: 14 },
  adminLoginBtn: { background: "#f39c12", border: "none", color: "#0a1628", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  globalLockBanner: { background: "#e74c3c", color: "white", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 700 },
  nav: { display: "flex", gap: 4, overflowX: "auto", paddingBottom: 0 },
  navBtn: { background: "transparent", border: "none", color: "#bdc3c7", padding: "10px 14px", cursor: "pointer", fontSize: 13, borderBottom: "3px solid transparent", whiteSpace: "nowrap", transition: "all 0.2s" },
  navBtnActive: { color: "#f39c12", borderBottom: "3px solid #f39c12", fontWeight: 700 },
  main: { position: "relative", zIndex: 5, maxWidth: 860, margin: "0 auto", padding: "20px 16px" },
  notification: { position: "fixed", top: 20, right: 20, zIndex: 1000, padding: "12px 20px", borderRadius: 10, fontWeight: 700, animation: "slideIn 0.3s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" },
  homeView: { display: "flex", flexDirection: "column", gap: 20 },
  heroCard: { background: "linear-gradient(135deg, rgba(243,156,18,0.15), rgba(231,76,60,0.1))", border: "2px solid #f39c12", borderRadius: 20, padding: "32px 24px", textAlign: "center" },
  heroEmojis: { fontSize: 40, marginBottom: 8 },
  heroTitle: { fontSize: 32, fontWeight: 900, color: "#f39c12", margin: "0 0 8px", textShadow: "0 2px 20px rgba(243,156,18,0.5)" },
  heroSub: { color: "#bdc3c7", fontSize: 16, marginBottom: 12 },
  heroDates: { display: "inline-block", background: "rgba(243,156,18,0.2)", padding: "6px 16px", borderRadius: 20, fontSize: 13, color: "#f39c12", border: "1px solid rgba(243,156,18,0.4)" },
  homeGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 },
  homeCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 12px", textAlign: "center", cursor: "pointer" },
  homeCardIcon: { fontSize: 32, marginBottom: 8 },
  homeCardTitle: { fontWeight: 700, color: "#f39c12", marginBottom: 4 },
  homeCardSub: { fontSize: 12, color: "#7f8c8d" },
  leaderBox: { background: "linear-gradient(135deg, rgba(243,156,18,0.2), rgba(255,215,0,0.1))", border: "2px solid #f39c12", borderRadius: 16, padding: "16px 24px", textAlign: "center" },
  leaderLabel: { fontSize: 12, color: "#f39c12", textTransform: "uppercase", letterSpacing: 2 },
  leaderName: { fontSize: 28, fontWeight: 900, color: "white" },
  leaderPts: { fontSize: 16, color: "#f39c12" },
  rulesBox: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px" },
  rulesTitle: { fontWeight: 700, color: "#f39c12", marginBottom: 12 },
  rule: { display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 14, color: "#bdc3c7" },
  rulePts: { background: "#f39c12", color: "#0a1628", fontWeight: 900, padding: "2px 10px", borderRadius: 20, minWidth: 36, textAlign: "center" },
  section: { display: "flex", flexDirection: "column", gap: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 800, color: "#f39c12", borderBottom: "2px solid rgba(243,156,18,0.3)", paddingBottom: 12 },
  empty: { color: "#7f8c8d", textAlign: "center", padding: 40, fontSize: 16 },
  registerForm: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 12 },
  photoArea: { width: 100, height: 100, borderRadius: "50%", border: "2px dashed #f39c12", cursor: "pointer", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center", background: "rgba(243,156,18,0.05)" },
  photoPreview: { width: "100%", height: "100%", objectFit: "cover" },
  photoPlaceholder: { color: "#f39c12", textAlign: "center", fontSize: 28 },
  input: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "12px 16px", borderRadius: 10, fontSize: 15, outline: "none" },
  select: { background: "#1a2c4e", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "12px 16px", borderRadius: 10, fontSize: 15, outline: "none" },
  btnPrimary: { background: "linear-gradient(135deg, #f39c12, #e67e22)", border: "none", color: "#0a1628", padding: "14px 24px", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" },
  btnSecondary: { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "12px 20px", borderRadius: 12, fontSize: 14, cursor: "pointer" },
  playerCount2: { textAlign: "center", color: "#f39c12", fontWeight: 700, fontSize: 18 },
  playerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 },
  playerCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16, textAlign: "center", position: "relative" },
  playerCardRank: { position: "absolute", top: 8, right: 10, color: "#f39c12", fontWeight: 700, fontSize: 12 },
  playerPhoto: { width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "2px solid #f39c12", marginBottom: 8 },
  playerPhotoPlaceholder: { width: 64, height: 64, borderRadius: "50%", background: "rgba(243,156,18,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 8px" },
  playerCardName: { fontWeight: 700, fontSize: 14, color: "white", marginBottom: 4 },
  playerCardScorer: { fontSize: 11, color: "#f39c12", marginBottom: 10 },
  playerCardBtns: { display: "flex", gap: 6 },
  btnSmall: { flex: 1, background: "#e74c3c", border: "none", color: "white", padding: "6px 8px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 700 },
  playerSelector: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 },
  playerSelectorBtn: { display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "8px 12px", borderRadius: 20, cursor: "pointer", whiteSpace: "nowrap", fontSize: 13 },
  playerSelectorBtnActive: { background: "rgba(243,156,18,0.2)", border: "1px solid #f39c12", color: "#f39c12", fontWeight: 700 },
  selectorPhoto: { width: 24, height: 24, borderRadius: "50%", objectFit: "cover" },
  lockInfoBox: { background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#e74c3c" },
  globalLockBox: { background: "rgba(231,76,60,0.15)", border: "2px solid #e74c3c", borderRadius: 12, padding: "14px 18px", fontSize: 14, color: "#e74c3c" },
  groupTabs: { display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4, flexWrap: "wrap" },
  groupTab: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#bdc3c7", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 },
  groupTabActive: { background: "rgba(243,156,18,0.2)", border: "1px solid #f39c12", color: "#f39c12", fontWeight: 700 },
  groupTabCount: { background: "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 10, fontSize: 11 },
  matchList: { display: "flex", flexDirection: "column", gap: 12 },
  groupHeader: { background: "rgba(243,156,18,0.1)", border: "1px solid rgba(243,156,18,0.3)", borderRadius: 12, padding: "12px 16px", color: "#f39c12", fontWeight: 700, fontSize: 14 },
  lockedCount: { color: "#e74c3c", fontWeight: 400 },
  matchCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 },
  matchCardDone: { border: "1px solid rgba(39,174,96,0.3)", background: "rgba(39,174,96,0.04)" },
  matchCardLocked: { background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)" },
  matchTopRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  matchDate: { fontSize: 11, color: "#7f8c8d" },
  lockBadge: { fontSize: 11, background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "2px 8px", borderRadius: 8 },
  lockBadgeGlobal: { fontSize: 11, background: "rgba(155,89,182,0.15)", border: "1px solid rgba(155,89,182,0.5)", color: "#9b59b6", padding: "2px 8px", borderRadius: 8 },
  editableBadge: { fontSize: 11, background: "rgba(52,152,219,0.15)", border: "1px solid rgba(52,152,219,0.4)", color: "#3498db", padding: "2px 8px", borderRadius: 8 },
  matchTeams: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  teamName: { flex: 1, fontSize: 14, fontWeight: 600, color: "white" },
  scoreInput: { display: "flex", alignItems: "center", gap: 6 },
  scoreBox: { width: 48, textAlign: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "8px 4px", borderRadius: 8, fontSize: 18, fontWeight: 700, outline: "none" },
  scoreDash: { color: "#f39c12", fontWeight: 900, fontSize: 18 },
  lockedPredDisplay: { display: "flex", alignItems: "center", justifyContent: "center", minWidth: 80 },
  lockedScore: { fontSize: 22, fontWeight: 900, letterSpacing: 2 },
  resultRow: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 6 },
  resultBadge: { fontSize: 12, color: "#27ae60" },
  scoreBadgeExact: { fontSize: 12, background: "rgba(39,174,96,0.2)", border: "1px solid #27ae60", color: "#27ae60", padding: "2px 8px", borderRadius: 8, fontWeight: 700 },
  scoreBadgeWinner: { fontSize: 12, background: "rgba(243,156,18,0.2)", border: "1px solid #f39c12", color: "#f39c12", padding: "2px 8px", borderRadius: 8, fontWeight: 700 },
  scoreBadgeWrong: { fontSize: 12, background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)", color: "#e74c3c", padding: "2px 8px", borderRadius: 8 },
  overzichtInfo: { background: "rgba(52,152,219,0.08)", border: "1px solid rgba(52,152,219,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#3498db" },
  overzichtMatchCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 },
  overzichtMatchTitle: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 16, fontWeight: 700, color: "white", marginBottom: 14 },
  vsText: { color: "#7f8c8d", fontWeight: 400, fontSize: 13 },
  playedBadge: { fontSize: 12, background: "rgba(39,174,96,0.15)", border: "1px solid #27ae60", color: "#27ae60", padding: "2px 8px", borderRadius: 8 },
  openBadge: { fontSize: 12, background: "rgba(243,156,18,0.1)", border: "1px solid rgba(243,156,18,0.4)", color: "#f39c12", padding: "2px 8px", borderRadius: 8 },
  predsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8 },
  predChip: { borderRadius: 12, padding: "10px 12px" },
  predChipTop: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 },
  predChipPhoto: { width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.2)" },
  predChipAvatar: { fontSize: 18 },
  predChipName: { fontSize: 12, fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  predChipScore: { display: "flex", alignItems: "center", gap: 6 },
  miniScore: { fontSize: 11, color: "#27ae60", fontWeight: 700 },
  noPredText: { color: "#7f8c8d", fontSize: 13, textAlign: "center", padding: 16 },
  rankingList: { display: "flex", flexDirection: "column", gap: 8 },
  rankCard: { display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 18px" },
  rankCardFirst: { background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(243,156,18,0.1))", border: "2px solid #f39c12" },
  rankCardSecond: { background: "rgba(192,192,192,0.08)", border: "1px solid rgba(192,192,192,0.4)" },
  rankCardThird: { background: "rgba(205,127,50,0.08)", border: "1px solid rgba(205,127,50,0.4)" },
  rankPos: { fontSize: 28, minWidth: 40, textAlign: "center" },
  rankPhoto: { width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid #f39c12" },
  rankPhotoPlaceholder: { width: 56, height: 56, borderRadius: "50%", background: "rgba(243,156,18,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 },
  rankInfo: { flex: 1 },
  rankName: { fontWeight: 800, fontSize: 18, color: "white" },
  rankSub: { fontSize: 12, color: "#7f8c8d", marginTop: 2 },
  rankPts: { fontSize: 32, fontWeight: 900, color: "#f39c12", display: "block" },
  rankPtsSub: { fontSize: 12, color: "#7f8c8d", fontWeight: 400 },
  detailsBox: { background: "rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px", padding: "12px 20px", display: "flex", flexDirection: "column", gap: 6, marginTop: -4, border: "1px solid rgba(255,255,255,0.06)", borderTop: "none" },
  detailRow: { display: "flex", alignItems: "center", gap: 10, fontSize: 13 },
  detailMatch: { flex: 1, color: "#bdc3c7" },
  detailReason: { color: "#7f8c8d", fontSize: 12 },
  detailPts: { color: "#f39c12", fontWeight: 700, minWidth: 30, textAlign: "right" },
  adminNote: { background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.4)", borderRadius: 10, padding: "10px 16px", color: "#e74c3c", fontSize: 13, lineHeight: 1.6 },
  adminMatchCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 14 },
  adminMatchTeams: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "white", fontWeight: 600 },
  matchDateSmall: { fontSize: 11, color: "#7f8c8d", fontWeight: 400 },
  adminScoreRow: { display: "flex", alignItems: "center", gap: 10 },
  adminScoreBox: { width: 60, textAlign: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "8px 4px", borderRadius: 8, fontSize: 20, fontWeight: 700, outline: "none" },
  savedBadge: { background: "rgba(39,174,96,0.2)", border: "1px solid #27ae60", color: "#27ae60", padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700 },
  scorerAdmin: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20 },
  scorerAdminTitle: { color: "#f39c12", fontWeight: 700, marginBottom: 14, fontSize: 18 },
  scorerRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  scorerOverview: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 },
  scorerChip: { background: "rgba(243,156,18,0.15)", border: "1px solid rgba(243,156,18,0.3)", padding: "6px 12px", borderRadius: 20, fontSize: 13, color: "#f39c12" },
};


