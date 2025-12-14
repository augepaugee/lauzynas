# Firebase Configuration Instructions

## How to Configure Firebase

1. Copy the values from your Firebase project console
2. Replace the placeholder values in App.js with your actual Firebase configuration

## Firebase Config Location
File: `mobile-app/App.js`
Lines: ~9-17

## Example Configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Getting Your Firebase Config

1. Go to https://console.firebase.google.com/
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll to "Your apps" section
6. Click on your web app or create a new one
7. Copy the configuration values

## Security Note
⚠️ Never commit real Firebase credentials to public repositories!
