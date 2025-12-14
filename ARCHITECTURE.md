# Sistemos Architektūra / System Architecture

## Bendroji Schema / General Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        LAUZYNAS SISTEMA                         │
│                   Sensor Monitoring System                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   MOBILIOJI APP      │         │   WEB APLIKACIJA     │
│   (React Native)     │         │      (React)         │
│                      │         │                      │
│  ┌────────────────┐  │         │  ┌────────────────┐  │
│  │  Accelerometer │  │         │  │   Dashboard    │  │
│  │   Gyroscope    │  │         │  │   Real-time    │  │
│  │   Barometer    │  │         │  │   Display      │  │
│  └────────────────┘  │         │  └────────────────┘  │
│         │            │         │         ▲            │
│         ▼            │         │         │            │
│  ┌────────────────┐  │         │  ┌────────────────┐  │
│  │ Firebase SDK   │  │         │  │ Firebase SDK   │  │
│  └────────────────┘  │         │  └────────────────┘  │
└──────────┬───────────┘         └──────────▲───────────┘
           │                                │
           │ Write                     Read │
           │ Sensor Data                    │
           │                                │
           ▼                                │
    ┌──────────────────────────────────────────┐
    │     FIREBASE REALTIME DATABASE           │
    │                                          │
    │  /sensorData/                            │
    │    ├── -timestamp1/                      │
    │    │   ├── timestamp: 1234567890         │
    │    │   ├── accelerometer: {x,y,z}        │
    │    │   ├── gyroscope: {x,y,z}            │
    │    │   └── barometer: {pressure, alt}    │
    │    ├── -timestamp2/                      │
    │    └── ...                               │
    └──────────────────────────────────────────┘
```

## Komponentų Aprašymas / Component Description

### 1. Mobilioji Programėlė (Mobile App)

**Technologijos:**
- React Native 0.81.5
- Expo ~54.0.29
- Expo Sensors 15.0.8
- Firebase 12.6.0

**Funkcionalumas:**
- Realaus laiko jutiklių duomenų rinkimas
- Akselerometras (matuoja pagreitį x, y, z ašyse)
- Giroskopas (matuoja kampinį greitį x, y, z ašyse)
- Barometras (matuoja atmosferos slėgį ir santykinį aukštį)
- Duomenų siuntimas į Firebase Realtime Database
- Interaktyvi vartotojo sąsaja su pradėti/sustabdyti funkcijomis

**Failai:**
- `mobile-app/App.js` - Pagrindinis aplikacijos failas
- `mobile-app/package.json` - Priklausomybės
- `mobile-app/FIREBASE_CONFIG.md` - Konfigūravimo instrukcijos

### 2. Interneto Svetainė (Web Application)

**Technologijos:**
- React 19.1.0
- Firebase 12.6.0
- CSS3

**Funkcionalumas:**
- Realaus laiko duomenų rodymas iš Firebase
- Automatinis atnaujinimas kai ateina nauji duomenys
- Vizualizuoja naujausius jutiklių duomenis
- Rodo duomenų istoriją lentelėje (10 naujausių įrašų)
- Responsive dizainas (veikia mobiliuose ir desktop)

**Failai:**
- `web-app/src/App.js` - Pagrindinis aplikacijos failas
- `web-app/src/App.css` - Stilių failas
- `web-app/package.json` - Priklausomybės

### 3. Firebase Realtime Database

**Struktūra:**
```json
{
  "sensorData": {
    "-NXxxxx1": {
      "timestamp": 1702556789000,
      "accelerometer": {
        "x": 0.1234,
        "y": -0.5678,
        "z": 9.8123
      },
      "gyroscope": {
        "x": 0.0012,
        "y": -0.0034,
        "z": 0.0056
      },
      "barometer": {
        "pressure": 1013.25,
        "relativeAltitude": 0
      }
    },
    "-NXxxxx2": { ... }
  }
}
```

## Duomenų Srautai / Data Flow

### Siuntimas (Mobile → Firebase)

1. Vartotojas aktyvuoja jutiklį mobiliojoje app
2. Expo Sensors API pradeda rinkti duomenis
3. Duomenys atnaujinami kas sekundę
4. Vartotojas spaudžia "Send Data to Firebase"
5. App sukuria naują įrašą Firebase Realtime Database
6. Firebase grąžina sėkmės/klaidos pranešimą

### Gavimas (Firebase → Web)

1. Web app užsikrauna ir prisijungia prie Firebase
2. Užsiprenumeruoja `/sensorData` path su `limitToLast(10)`
3. Firebase siunčia pradinius duomenis
4. Kai mobile app siunčia naujus duomenis:
   - Firebase automatiškai siųsti event į web app
   - Web app atnaujina UI su naujais duomenimis
5. Procesas kartojasi realiu laiku

## Komunikacijos Protokolas

**Firebase Realtime Database naudoja WebSocket protokolą:**
- Prisijungimas: WSS (WebSocket Secure) per HTTPS
- Realaus laiko sincronizacija
- Automatinis reconnect jei nutrūksta ryšys
- Event-driven architecture

## Saugumo Mechanizmai

### Test Mode (Dabartinis):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Production Mode (Rekomenduojamas):
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

## Sistemos Savybės / System Properties

### Privalumai:
- ✅ Realaus laiko komunikacija (< 100ms latency)
- ✅ Automatinis duomenų sincronizavimas
- ✅ Offline support (Firebase cache)
- ✅ Scalable (Firebase infrastructure)
- ✅ Cross-platform (iOS, Android, Web)

### Apribojimai:
- Firebase Free plan: 1GB storage, 10GB/month transfer
- Realtime Database: 100 concurrent connections (free plan)
- WebSocket limit: Depends on Firebase plan

## Deployment Scenarijus

### Development:
```bash
# Mobile
cd mobile-app && npm start

# Web
cd web-app && npm start
```

### Production:

**Mobile:**
- Build APK: `cd mobile-app && expo build:android`
- Build IPA: `cd mobile-app && expo build:ios`
- Publish to stores

**Web:**
```bash
cd web-app
npm run build
# Deploy to Firebase Hosting, Netlify, Vercel, etc.
```

## Performance Metrics

### Mobile App:
- Sensor update rate: 1 Hz (1 second interval)
- Memory usage: ~50-100 MB
- Battery impact: Moderate (sensors active)

### Web App:
- Initial load: ~1-2 seconds
- Real-time update latency: <100ms
- Memory usage: ~30-50 MB

### Firebase:
- Write latency: ~50-200ms
- Read latency: ~50-100ms
- Sync latency: <100ms

## Ateities Plėtros Galimybės

1. **Autentifikacija**: Firebase Authentication
2. **Push Notifications**: Expo Notifications
3. **Data Analytics**: Firebase Analytics
4. **Offline Mode**: Firebase Persistence
5. **Data Visualization**: Charts and graphs
6. **Multiple Users**: User accounts and profiles
7. **Camera Integration**: Use expo-camera for photos
8. **Location Tracking**: GPS sensor data
9. **Export Data**: CSV/JSON download functionality
10. **Alert System**: Threshold-based alerts
