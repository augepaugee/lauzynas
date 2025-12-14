# Firebase Konfigūravimo Instrukcijos

Šis dokumentas pateikia detalias instrukcijas, kaip sukonfigūruoti Firebase projektą sistemai.

## 1. Firebase Projekto Sukūrimas

### Žingsnis 1: Eikite į Firebase Console
1. Atidarykite naršyklę ir eikite į https://console.firebase.google.com/
2. Prisijunkite su savo Google paskyra

### Žingsnis 2: Sukurkite naują projektą
1. Paspauskite "Add project" arba "Pridėti projektą"
2. Įveskite projekto pavadinimą (pvz., "lauzynas-sensor-system")
3. (Neprivaloma) Galite išjungti Google Analytics, jei jums nereikia
4. Paspauskite "Create project" ir palaukite kol projektas bus sukurtas

## 2. Realtime Database Įgalinimas

### Žingsnis 1: Eikite į Realtime Database
1. Kairėje pusėje, pasirinkite "Build" → "Realtime Database"
2. Paspauskite "Create Database"

### Žingsnis 2: Pasirinkite duomenų bazės vietą
1. Pasirinkite serverio vietą (rekomenduojama: `europe-west1` Europai)
2. Paspauskite "Next"

### Žingsnis 3: Nustatykite saugumo taisykles
1. Pradžiai pasirinkite "Start in test mode"
   - **SVARBU**: Test mode leidžia visiems skaityti ir rašyti. Tai tinka tik testavimui!
2. Paspauskite "Enable"

### Žingsnis 4: Nukopijuokite Database URL
1. Pamatysite savo duomenų bazės URL (pvz., `https://jūsų-projektas.firebaseio.com`)
2. Išsaugokite šį URL - jis reikalingas konfigūracijai

## 3. Web App Konfigūracijos Gavimas

### Žingsnis 1: Pridėkite Web App
1. Firebase Console, paspauskite krumpliaračio ikoną (⚙️) šalia "Project Overview"
2. Pasirinkite "Project settings"
3. Scroll žemyn iki "Your apps" sekcijos
4. Paspauskite web ikoną (`</>`)

### Žingsnis 2: Užregistruokite programėlę
1. Įveskite app nickname (pvz., "sensor-web-app")
2. **NEPAŽYMĖKITE** "Also set up Firebase Hosting" (nebent norite naudoti hosting)
3. Paspauskite "Register app"

### Žingsnis 3: Nukopijuokite konfigūraciją
Pamatysite tokį konfigūracijos objektą:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "jūsų-projektas.firebaseapp.com",
  databaseURL: "https://jūsų-projektas.firebaseio.com",
  projectId: "jūsų-projektas",
  storageBucket: "jūsų-projektas.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**SVARBU**: Nukopijuokite ir išsaugokite visas šias reikšmes!

## 4. Programėlių Konfigūravimas

### Mobile App Konfigūracija

1. Atidarykite failą `mobile-app/App.js`
2. Raskite šią eilutę:
```javascript
const firebaseConfig = {
```
3. Pakeiskite visas reikšmes savo Firebase projekto reikšmėmis:

```javascript
const firebaseConfig = {
  apiKey: "JŪSŲ_API_KEY_ČIA",
  authDomain: "JŪSŲ_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://JŪSŲ_PROJECT_ID.firebaseio.com",
  projectId: "JŪSŲ_PROJECT_ID",
  storageBucket: "JŪSŲ_PROJECT_ID.appspot.com",
  messagingSenderId: "JŪSŲ_SENDER_ID",
  appId: "JŪSŲ_APP_ID"
};
```

### Web App Konfigūracija

1. Atidarykite failą `web-app/src/App.js`
2. Raskite tą pačią `firebaseConfig` sekciją
3. Įdėkite **tas pačias** reikšmes kaip ir mobile app

## 5. Saugumo Taisyklių Nustatymas (Produkcijai)

**SVARBU**: Test mode yra nesaugus produkcijai!

### Bazinės Saugumo Taisyklės

1. Firebase Console, eikite į Realtime Database
2. Pasirinkite "Rules" tab
3. Pakeiskite taisykles į:

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

### Pažangesnės Saugumo Taisyklės (su autentifikacija)

Jei norite pridėti autentifikaciją:

```json
{
  "rules": {
    "sensorData": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["timestamp"]
    }
  }
}
```

## 6. Testavimas

### Patikrinkite ar konfigūracija veikia:

1. Paleiskite mobile app:
```bash
cd mobile-app
npm start
```

2. Paleiskite web app:
```bash
cd web-app
npm start
```

3. Mobile app:
   - Paspauskite "Start Accelerometer"
   - Paspauskite "Send Data to Firebase"
   - Turėtumėte pamatyti pranešimą "Data sent to Firebase successfully!"

4. Web app:
   - Turėtumėte pamatyti status "Connected to Firebase"
   - Turėtumėte pamatyti naujausius sensor duomenis

## 7. Dažniausios Problemos ir Sprendimai

### Problema: "Permission denied"
**Sprendimas**: Patikrinkite saugumo taisykles Realtime Database. Test mode turėtų leisti skaityti ir rašyti.

### Problema: "Firebase not configured"
**Sprendimas**: Įsitikinkite, kad pakeikėte visas `YOUR_...` reikšmes firebaseConfig objekte.

### Problema: "Network error"
**Sprendimas**: 
- Patikrinkite interneto ryšį
- Įsitikinkite, kad databaseURL yra teisingas
- Patikrinkite ar Firebase projektas yra aktyvus

### Problema: Duomenys nesiųsti iš mobile app
**Sprendimas**:
- Patikrinkite konsolę ar yra klaidų
- Įsitikinkite, kad Firebase konfigūracija yra teisinga
- Patikrinkite ar Realtime Database yra įgalintas

## 8. Firebase Console - Duomenų Peržiūra

Norėdami pamatyti realius duomenis Firebase:

1. Eikite į Firebase Console
2. Pasirinkite "Realtime Database"
3. Pasirinkite "Data" tab
4. Pamatysite duomenų medį su `sensorData` šaka
5. Galite išplėsti ir pamatyti visus išsaugotus sensor duomenis

## 9. Kiti Patarimai

### Environment Variables (Rekomenduojama produkcijai)

Vietoj hard-coded reikšmių, naudokite environment variables:

**Mobile App** (`mobile-app/app.config.js`):
```javascript
export default {
  expo: {
    // ... kita konfigūracija
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      // ... kiti
    }
  }
}
```

**Web App** (`.env` failas):
```
REACT_APP_FIREBASE_API_KEY=jūsų_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=jūsų_auth_domain
...
```

### Firebase Hosting (Neprivaloma)

Jei norite hostinti web app Firebase:

```bash
cd web-app
npm run build
firebase init hosting
firebase deploy
```

## Pagalba

Jei kyla problemų:
1. Patikrinkite Firebase Console "Usage" tab ar yra aktyvumo
2. Peržiūrėkite browser/app console ar yra klaidų
3. Patikrinkite Firebase dokumentaciją: https://firebase.google.com/docs

## Saugumo Patarimai

- ❌ NIEKADA nekelkite firebaseConfig su tikromis reikšmėmis į viešą GitHub repository
- ✅ Naudokite environment variables
- ✅ Nustatykite tinkamas saugumo taisykles
- ✅ Įgalinkite Firebase App Check produkcijai
- ✅ Stebėkite Firebase Usage dashboard
