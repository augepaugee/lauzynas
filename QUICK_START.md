# Quick Start Guide / Greito Pradžios Vadovas

Šis dokumentas padės greitai paleisti sistemą.

## Prieš Pradedant / Prerequisites

- ✅ Node.js 14+ ir npm
- ✅ Firebase paskyra (nemokama)
- ✅ Moderni naršyklė
- ✅ (Neprivaloma) Mobilusis įrenginys su Expo Go app

## 3 Žingsniai iki Veikiančios Sistemos

### 1️⃣ Firebase Konfigūracija (5 min)

1. Eikite į https://console.firebase.google.com/
2. Sukurkite naują projektą
3. Įgalinkite "Realtime Database" (pradėkite su test mode)
4. Gaukite konfigūracijos duomenis (žr. [FIREBASE_SETUP.md](FIREBASE_SETUP.md))

### 2️⃣ Aplikacijų Konfigūracija (2 min)

**Mobile App:**
```bash
# Redaguokite mobile-app/App.js
# Eilutės 9-17: Pakeiskite firebaseConfig reikšmes
```

**Web App:**
```bash
# Redaguokite web-app/src/App.js
# Eilutės 6-14: Pakeiskite firebaseConfig reikšmes
```

### 3️⃣ Paleidimas (3 min)

**Terminal 1 - Mobile App:**
```bash
cd mobile-app
npm install
npm start
```

**Terminal 2 - Web App:**
```bash
cd web-app
npm install
npm start
```

## Testavimas

### Mobile App (http://localhost:19006):
1. Paspauskite "Start Accelerometer"
2. Pamatysite judančius skaičius (x, y, z ašys)
3. Paspauskite "Send Data to Firebase"
4. Turėtumėte pamatyti: "Data sent to Firebase successfully!"

### Web App (http://localhost:3000):
1. Turėtumėte pamatyti: "● Connected to Firebase"
2. Po duomenų siuntimo iš mobile app:
3. Pasirodys naujausios jutiklių reikšmės
4. Lentelėje pasirodys duomenų istorija

## Troubleshooting

### ❌ "Firebase not configured"
**Sprendimas:** Patikrinkite ar pakeikėte visas `YOUR_...` reikšmes

### ❌ "Permission denied"
**Sprendimas:** Firebase Console → Realtime Database → Rules → Naudokite test mode

### ❌ "Network error"
**Sprendimas:** Patikrinkite internetą ir `databaseURL` tikslumą

## Video Tutorial

Žr. [FIREBASE_SETUP.md](FIREBASE_SETUP.md) detalioms instrukcijoms su screenshots.

## Pagalba

Kyla problemų? Patikrinkite:
- 📖 [README.md](README.md) - Pilna dokumentacija
- 🔧 [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase setup
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Sistemos architektūra

## Demo Video Sukūrimas

1. Paleiskite abi aplikacijas
2. Mobile app: Aktyvuokite sensor
3. Spauskite "Send Data to Firebase"
4. Web app: Stebėkite realius duomenis
5. Kartokite kelis kartus

## Next Steps

Po sėkmingo testavimo:
- [ ] Pakeiskite Firebase saugumo taisykles
- [ ] Pridėkite autentifikaciją
- [ ] Deploy į produkciją
- [ ] Pridėkite daugiau jutiklių
- [ ] Sukurkite grafikų vizualizacijas

---

**Laiko įvertinimas:**
- Firebase setup: 5 min
- Code konfigūracija: 2 min
- Įdiegimas ir paleidimas: 3 min
- **Viso: ~10 minučių**

Sėkmės! 🚀
