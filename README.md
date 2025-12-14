# Lauzynas - Sensor Data Monitoring System

Sistema sudaryta iš mobiliosios programėlės ir interneto svetainės, kurios bendrauja tarpusavyje per Firebase Realtime Database.

## Sistemos Komponentai

### 1. Mobilioji Programėlė (mobile-app)
- **Technologijos**: React Native su Expo
- **Jutikliai**: 
  - Akselerometras (Accelerometer)
  - Giroskopas (Gyroscope)
  - Barometras (Barometer)
- **Funkcionalumas**: Renka duomenis iš telefono jutiklių ir siunčia juos į Firebase Realtime Database

### 2. Interneto Svetainė (web-app)
- **Technologijos**: React
- **Funkcionalumas**: Rodo realiu laiku duomenis iš Firebase Realtime Database
- **Vizualizacija**: Paskutiniai jutiklių duomenys ir istorinių duomenų lentelė

### 3. Duomenų Bazė
- **Technologija**: Firebase Realtime Database
- **Funkcionalumas**: Saugo jutiklių duomenis ir užtikrina realaus laiko bendravimą tarp mobiliosios programėlės ir svetainės

## Sistemos Architektūra

```
[Mobilioji Programėlė] --> [Firebase Realtime Database] --> [Interneto Svetainė]
      (Sensors)                  (Real-time sync)              (Dashboard)
```

## Firebase Konfigūracija

### 1. Sukurkite Firebase Projektą

1. Eikite į [Firebase Console](https://console.firebase.google.com/)
2. Paspauskite "Add project" / "Pridėti projektą"
3. Įveskite projekto pavadinimą (pvz., "lauzynas")
4. Sekite instrukcijas ir sukurkite projektą

### 2. Įgalinkite Realtime Database

1. Firebase Console, eikite į "Realtime Database"
2. Paspauskite "Create Database"
3. Pasirinkite vietą (pvz., europe-west1)
4. Pradėkite su "test mode" (vėliau galite pakeisti saugumo taisykles)

### 3. Gaukite Firebase Konfigūracijos Duomenis

1. Firebase Console, eikite į Project Settings (krumpliaračio ikona)
2. Scroll žemyn iki "Your apps" sekcijos
3. Paspauskite web ikoną (</>)
4. Įveskite app nickname (pvz., "web-app")
5. Nukopijuokite firebaseConfig objektą

### 4. Konfigūruokite Programėles

#### Mobilioji Programėlė (mobile-app/App.js):
```javascript
const firebaseConfig = {
  apiKey: "JŪSŲ_API_KEY",
  authDomain: "JŪSŲ_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://JŪSŲ_PROJECT_ID.firebaseio.com",
  projectId: "JŪSŲ_PROJECT_ID",
  storageBucket: "JŪSŲ_PROJECT_ID.appspot.com",
  messagingSenderId: "JŪSŲ_MESSAGING_SENDER_ID",
  appId: "JŪSŲ_APP_ID"
};
```

#### Interneto Svetainė (web-app/src/App.js):
Naudokite tą pačią konfigūraciją kaip ir mobiliojoje programėlėje.

## Įdiegimas ir Paleidimas

### Mobiliosios Programėlės Paleidimas

```bash
cd mobile-app
npm install
npm start
```

Tada:
- Paspauskite `a` - paleisti Android emuliatoriuje
- Paspauskite `i` - paleisti iOS simuliatoriuje
- Paspauskite `w` - paleisti naršyklėje
- Nuskaitykite QR kodą su Expo Go programėle telefone

### Interneto Svetainės Paleidimas

```bash
cd web-app
npm install
npm start
```

Svetainė bus prieinama adresu http://localhost:3000

## Naudojimas

1. Paleiskite mobilią programėlę telefone arba emuliatorijuje
2. Paleiskite interneto svetainę naršyklėje
3. Mobilioje programėlėje:
   - Paspauskite mygtuką "Start Accelerometer" / "Start Gyroscope" / "Start Barometer"
   - Stebėkite jutiklių duomenis realiu laiku
   - Paspauskite "Send Data to Firebase" kad išsiųstumėte duomenis
4. Interneto svetainėje:
   - Pamatysite naujausius duomenis realiu laiku
   - Stebėkite duomenų istoriją lentelėje

## Funkcionalumas

### Mobilioji Programėlė:
- ✅ Naudoja įrenginio jutiklius (akselerometras, giroskopas, barometras)
- ✅ Rodo jutiklių duomenis realiu laiku
- ✅ Siunčia duomenis į Firebase Realtime Database
- ✅ Moderni vartotojo sąsaja

### Interneto Svetainė:
- ✅ Prisijungia prie Firebase Realtime Database
- ✅ Rodo naujausius jutiklių duomenis realiu laiku
- ✅ Vizualizuoja duomenų istoriją lentelėje
- ✅ Responsive dizainas

### Firebase:
- ✅ Realtime Database duomenų saugojimui
- ✅ Realaus laiko sincronizacija tarp programėlių
- ✅ Automatinis duomenų atnaujinimas

## Technologijos

- **Mobile**: React Native, Expo, Expo Sensors
- **Web**: React, Firebase SDK
- **Database**: Firebase Realtime Database
- **Communication**: Firebase Realtime Sync (WebSocket-based)

## Projekto Struktūra

```
lauzynas/
├── mobile-app/          # Mobilioji programėlė (React Native + Expo)
│   ├── App.js          # Pagrindinis programėlės failas su jutikliais
│   ├── package.json
│   └── ...
├── web-app/            # Interneto svetainė (React)
│   ├── src/
│   │   ├── App.js     # Pagrindinis svetainės failas
│   │   ├── App.css    # Stilių failas
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md           # Šis failas
```

## Saugumo Pastabos

**SVARBU**: Prieš naudojant produkcinėje aplinkoje:

1. Pakeiskite Firebase Realtime Database saugumo taisykles iš "test mode" į produkcinį režimą
2. Nekelkite `firebaseConfig` su tikromis reikšmėmis į viešą repository
3. Naudokite environment variables konfigūracijos duomenims

### Pavyzdys Firebase Security Rules:

```json
{
  "rules": {
    "sensorData": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp"]
    }
  }
}
```

## Reikalavimai

- Node.js 14+ ir npm
- Expo CLI (instaliuojama automatiškai)
- Firebase projektas
- Mobilusis įrenginys arba emuliautorius (Android/iOS)
- Moderni naršyklė (Chrome, Firefox, Safari, Edge)

## Licencija

MIT