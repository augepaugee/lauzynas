import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Accelerometer, Gyroscope, Barometer } from 'expo-sensors';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app;
let database;
try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.log('Firebase initialization error:', error);
}

export default function App() {
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [barometerData, setBarometerData] = useState({ pressure: 0, relativeAltitude: 0 });
  const [isAccelerometerActive, setIsAccelerometerActive] = useState(false);
  const [isGyroscopeActive, setIsGyroscopeActive] = useState(false);
  const [isBarometerActive, setIsBarometerActive] = useState(false);

  useEffect(() => {
    let accelerometerSubscription;
    if (isAccelerometerActive) {
      Accelerometer.setUpdateInterval(1000);
      accelerometerSubscription = Accelerometer.addListener(data => {
        setAccelerometerData(data);
      });
    }
    return () => {
      if (accelerometerSubscription) {
        accelerometerSubscription.remove();
      }
    };
  }, [isAccelerometerActive]);

  useEffect(() => {
    let gyroscopeSubscription;
    if (isGyroscopeActive) {
      Gyroscope.setUpdateInterval(1000);
      gyroscopeSubscription = Gyroscope.addListener(data => {
        setGyroscopeData(data);
      });
    }
    return () => {
      if (gyroscopeSubscription) {
        gyroscopeSubscription.remove();
      }
    };
  }, [isGyroscopeActive]);

  useEffect(() => {
    let barometerSubscription;
    if (isBarometerActive) {
      Barometer.setUpdateInterval(1000);
      barometerSubscription = Barometer.addListener(data => {
        setBarometerData(data);
      });
    }
    return () => {
      if (barometerSubscription) {
        barometerSubscription.remove();
      }
    };
  }, [isBarometerActive]);

  const toggleAccelerometer = () => {
    setIsAccelerometerActive(!isAccelerometerActive);
  };

  const toggleGyroscope = () => {
    setIsGyroscopeActive(!isGyroscopeActive);
  };

  const toggleBarometer = () => {
    setIsBarometerActive(!isBarometerActive);
  };

  const sendDataToFirebase = async () => {
    if (!database) {
      alert('Firebase is not configured. Please update firebaseConfig in App.js');
      return;
    }
    
    try {
      const sensorDataRef = ref(database, 'sensorData');
      const newDataRef = push(sensorDataRef);
      await set(newDataRef, {
        timestamp: Date.now(),
        accelerometer: accelerometerData,
        gyroscope: gyroscopeData,
        barometer: barometerData
      });
      alert('Data sent to Firebase successfully!');
    } catch (error) {
      console.error('Error sending data to Firebase:', error);
      alert('Error sending data: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sensor Data Monitor</Text>
        <StatusBar style="auto" />

        <View style={styles.sensorSection}>
          <Text style={styles.sensorTitle}>Accelerometer</Text>
          <Button
            title={isAccelerometerActive ? "Stop Accelerometer" : "Start Accelerometer"}
            onPress={toggleAccelerometer}
          />
          <Text style={styles.data}>X: {accelerometerData.x.toFixed(4)}</Text>
          <Text style={styles.data}>Y: {accelerometerData.y.toFixed(4)}</Text>
          <Text style={styles.data}>Z: {accelerometerData.z.toFixed(4)}</Text>
        </View>

        <View style={styles.sensorSection}>
          <Text style={styles.sensorTitle}>Gyroscope</Text>
          <Button
            title={isGyroscopeActive ? "Stop Gyroscope" : "Start Gyroscope"}
            onPress={toggleGyroscope}
          />
          <Text style={styles.data}>X: {gyroscopeData.x.toFixed(4)}</Text>
          <Text style={styles.data}>Y: {gyroscopeData.y.toFixed(4)}</Text>
          <Text style={styles.data}>Z: {gyroscopeData.z.toFixed(4)}</Text>
        </View>

        <View style={styles.sensorSection}>
          <Text style={styles.sensorTitle}>Barometer</Text>
          <Button
            title={isBarometerActive ? "Stop Barometer" : "Start Barometer"}
            onPress={toggleBarometer}
          />
          <Text style={styles.data}>Pressure: {barometerData.pressure.toFixed(2)} hPa</Text>
          <Text style={styles.data}>Relative Altitude: {barometerData.relativeAltitude?.toFixed(2) || 'N/A'} m</Text>
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Send Data to Firebase"
            onPress={sendDataToFirebase}
            color="#4CAF50"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  sensorSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sensorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
  },
  data: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  buttonSection: {
    marginTop: 20,
    marginBottom: 40,
  },
});
