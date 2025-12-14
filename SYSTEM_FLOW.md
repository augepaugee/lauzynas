# System Flow Diagram / Sistemos Srautų Diagrama

## User Flow / Vartotojo Srautas

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SISTEMOS VEIKIMO SCHEMA                         │
└─────────────────────────────────────────────────────────────────────────┘

MOBILIOJI PROGRAMĖLĖ (Mobile App)
══════════════════════════════════

   ┌──────────────────────────┐
   │      VARTOTOJAS          │
   │    (Phone User)          │
   └────────────┬─────────────┘
                │
                │ 1. Atidaro programėlę
                ▼
   ┌──────────────────────────┐
   │   APP.JS Component       │
   │  ┌────────────────────┐  │
   │  │  UI Buttons        │  │◄─── Vartotojo veiksmai
   │  │  - Start Sensor    │  │
   │  │  - Stop Sensor     │  │
   │  │  - Send to Firebase│  │
   │  └────────────────────┘  │
   │                          │
   │  ┌────────────────────┐  │
   │  │  Expo Sensors API  │  │
   │  │  - Accelerometer   │  │◄─── 2. Aktyvuoja jutiklius
   │  │  - Gyroscope       │  │     (1Hz frequency)
   │  │  - Barometer       │  │
   │  └────────┬───────────┘  │
   │           │              │
   │           │ 3. Duomenys (x,y,z)
   │           ▼              │
   │  ┌────────────────────┐  │
   │  │  State Management  │  │
   │  │  useState hooks    │  │◄─── 4. Saugo state
   │  └────────┬───────────┘  │
   │           │              │
   │           │ 5. Vartotojas spaudžia "Send"
   │           ▼              │
   │  ┌────────────────────┐  │
   │  │  Firebase SDK      │  │
   │  │  push() & set()    │  │◄─── 6. Siunčia į Firebase
   │  └────────┬───────────┘  │
   └───────────┼──────────────┘
               │
               │ HTTPS/WSS
               │
               ▼
═══════════════════════════════════════
    FIREBASE REALTIME DATABASE
═══════════════════════════════════════

   ┌──────────────────────────┐
   │   /sensorData/           │
   │   ├─ -NXxx1/            │
   │   │  ├─ timestamp       │◄─── 7. Įrašo duomenis
   │   │  ├─ accelerometer   │
   │   │  ├─ gyroscope       │
   │   │  └─ barometer       │
   │   ├─ -NXxx2/            │
   │   └─ ...                │
   └────────────┬─────────────┘
                │
                │ WebSocket Event
                │ (Real-time)
                ▼
═══════════════════════════════════════
    INTERNETO SVETAINĖ (Web App)
═══════════════════════════════════════

   ┌──────────────────────────┐
   │   WEB BROWSER            │
   │  ┌────────────────────┐  │
   │  │  Firebase SDK      │  │
   │  │  onValue() listener│  │◄─── 8. Gauna event
   │  └────────┬───────────┘  │
   │           │              │
   │           │ 9. Nauji duomenys
   │           ▼              │
   │  ┌────────────────────┐  │
   │  │  React State       │  │
   │  │  useState          │  │◄─── 10. Atnaujina state
   │  └────────┬───────────┘  │
   │           │              │
   │           │ 11. Re-render
   │           ▼              │
   │  ┌────────────────────┐  │
   │  │  UI Components     │  │
   │  │  - Latest Data     │  │
   │  │  - Sensor Cards    │  │◄─── 12. Rodo vartotojui
   │  │  - History Table   │  │
   │  └────────────────────┘  │
   └──────────────────────────┘
                │
                │ 13. Vartotojas mato
                ▼
   ┌──────────────────────────┐
   │      VARTOTOJAS          │
   │     (Web User)           │
   └──────────────────────────┘

```

## Data Flow Sequence / Duomenų Sekos Diagrama

```
Mobile User          Mobile App       Firebase DB         Web App          Web User
─────────────       ────────────     ─────────────      ──────────       ────────────
     │                   │                 │                 │                │
     │ 1. Open app       │                 │                 │                │
     ├──────────────────>│                 │                 │                │
     │                   │                 │                 │                │
     │ 2. Start sensor   │                 │                 │                │
     ├──────────────────>│                 │                 │                │
     │                   │                 │                 │                │
     │                   │ 3. Read sensors │                 │                │
     │                   │ (1Hz)           │                 │                │
     │                   │                 │                 │                │
     │ 4. View data      │                 │                 │                │
     │<──────────────────│                 │                 │                │
     │ (x,y,z values)    │                 │                 │                │
     │                   │                 │                 │                │
     │ 5. Send to DB     │                 │                 │                │
     ├──────────────────>│                 │                 │                │
     │                   │                 │                 │                │
     │                   │ 6. push() data  │                 │                │
     │                   ├────────────────>│                 │                │
     │                   │                 │                 │                │
     │                   │ 7. Success ✓    │                 │                │
     │                   │<────────────────│                 │                │
     │                   │                 │                 │                │
     │ 8. Alert success  │                 │ 9. Event (WSS)  │                │
     │<──────────────────│                 ├────────────────>│                │
     │                   │                 │                 │                │
     │                   │                 │                 │ 10. Update UI  │
     │                   │                 │                 │                │
     │                   │                 │                 │ 11. Show data  │
     │                   │                 │                 ├───────────────>│
     │                   │                 │                 │                │
     │                   │                 │                 │ 12. View data  │
     │                   │                 │                 │ (real-time)    │
```

## Technology Stack / Technologijų Stekas

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONT-END LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐      ┌──────────────────────┐   │
│  │   MOBILE APP         │      │     WEB APP          │   │
│  │                      │      │                      │   │
│  │  React Native 0.81.5 │      │  React 19.1.0        │   │
│  │  Expo ~54.0.29       │      │  React-DOM 19.1.0    │   │
│  │  Expo Sensors 15.0.8 │      │  CSS3                │   │
│  │  Firebase 12.6.0     │      │  Firebase 12.6.0     │   │
│  └──────────────────────┘      └──────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Firebase SDK
                              │ (HTTPS/WSS)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACK-END LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                ┌──────────────────────┐                     │
│                │  FIREBASE SERVICES   │                     │
│                │                      │                     │
│                │  Realtime Database   │◄─── Data Storage   │
│                │  Authentication      │     (Optional)     │
│                │  Cloud Functions     │     (Future)       │
│                │  Hosting             │     (Optional)     │
│                └──────────────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ WebSocket Protocol
                              │ (Internal)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Database Structure:                                        │
│  {                                                          │
│    "sensorData": {                                          │
│      "-NXxx1": {                                            │
│        "timestamp": 1702556789000,                          │
│        "accelerometer": {"x": 0.12, "y": -0.56, "z": 9.81},│
│        "gyroscope": {"x": 0.001, "y": -0.003, "z": 0.005}, │
│        "barometer": {"pressure": 1013.25, "altitude": 0}   │
│      }                                                      │
│    }                                                        │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Real-time Communication Flow / Realaus Laiko Komunikacija

```
┌────────────────────┐                    ┌────────────────────┐
│   MOBILE APP       │                    │     WEB APP        │
│                    │                    │                    │
│  1. User action    │                    │  5. onValue()      │
│     ↓              │                    │     triggers       │
│  2. Collect data   │                    │     ↓              │
│     ↓              │   ┌──────────┐     │  6. Update state   │
│  3. push() ───────────>│          │     │     ↓              │
│                    │   │ Firebase │────────> 7. Re-render UI │
│  4. Success ←──────────│ Realtime │     │                    │
│     callback       │   │ Database │     │  8. User sees data │
│                    │   │          │     │                    │
└────────────────────┘   │ (< 100ms)│     └────────────────────┘
                         │ latency  │
                         └──────────┘
                              │
                              │ WebSocket (WSS)
                              │ Persistent connection
                              │ Bi-directional
                              │ Event-driven
                              ▼
                    ┌──────────────────┐
                    │  Google Cloud    │
                    │  Infrastructure  │
                    └──────────────────┘
```

## Sensor Data Flow / Jutiklių Duomenų Srautas

```
Phone Sensors              Expo API              React State           Firebase
─────────────              ────────              ───────────           ────────
┌───────────┐              ┌───────┐             ┌─────────┐          ┌──────┐
│Accelero-  │─────────────>│       │────────────>│         │─────────>│      │
│meter      │  x,y,z       │ Expo  │  setState() │ useState│ push()   │  DB  │
└───────────┘              │       │             │         │          │      │
                           │Sensors│             │  hooks  │          │      │
┌───────────┐              │       │             │         │          │      │
│Gyroscope  │─────────────>│ API   │────────────>│         │─────────>│      │
│           │  x,y,z       │       │  setState() │         │ push()   │      │
└───────────┘              │       │             │         │          │      │
                           │       │             │         │          │      │
┌───────────┐              │       │             │         │          │      │
│Barometer  │─────────────>│       │────────────>│         │─────────>│      │
│           │ pressure,alt │       │  setState() │         │ push()   │      │
└───────────┘              └───────┘             └─────────┘          └──────┘
     │                         │                      │                   │
     │ Physical                │ JavaScript           │ React             │ Cloud
     │ hardware                │ API calls            │ state mgmt        │ storage
     └─────────────────────────┴──────────────────────┴───────────────────┘
                    Update Frequency: 1 Hz (every 1 second)
```

## Legend / Legenda

```
┌──────┐
│ Box  │  = Component / Komponentas
└──────┘

  ───>   = Data flow / Duomenų srautas

  │
  ▼      = Direction / Kryptis

  ═══    = Layer boundary / Sluoksnio riba

  WSS    = WebSocket Secure
  HTTPS  = HTTP Secure
  API    = Application Programming Interface
  UI     = User Interface
  DB     = Database
```

## Time Estimates / Laiko Įvertinimai

```
Setup:      5-10 minutes (Firebase configuration)
Mobile:     15-20 minutes (to understand and customize)
Web:        10-15 minutes (to understand and customize)
Testing:    5-10 minutes (end-to-end testing)
─────────────────────────────────────────────────
Total:      35-55 minutes to get fully operational
```

## Performance Metrics / Našumo Metrika

```
Metric                    Mobile App      Web App       Firebase
─────────────────────────────────────────────────────────────────
Initial Load Time         2-3 sec         1-2 sec       N/A
Sensor Update Rate        1 Hz            N/A           N/A
Data Send Latency         N/A             N/A           50-200ms
Data Receive Latency      N/A             50-100ms      N/A
Sync Latency              N/A             < 100ms       < 100ms
Memory Usage              50-100 MB       30-50 MB      N/A
Battery Impact            Moderate        N/A           N/A
Network Usage             Minimal         Minimal       Optimized
```
