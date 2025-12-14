import './App.css';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, query, orderByKey, limitToLast } from 'firebase/database';

// Firebase configuration - should match mobile app
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

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!database) {
      console.log('Firebase is not configured');
      return;
    }

    const sensorDataRef = ref(database, 'sensorData');
    const recentDataQuery = query(sensorDataRef, orderByKey(), limitToLast(10));

    const unsubscribe = onValue(recentDataQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIsConnected(true);
        const dataArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setSensorData(dataArray.reverse());
        if (dataArray.length > 0) {
          setLatestData(dataArray[0]);
        }
      } else {
        setIsConnected(false);
      }
    }, (error) => {
      console.error('Error reading from Firebase:', error);
      setIsConnected(false);
    });

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sensor Data Dashboard</h1>
        <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '● Connected to Firebase' : '○ Not Connected'}
        </div>
      </header>

      <div className="container">
        {!database ? (
          <div className="warning">
            <h2>⚠️ Firebase Not Configured</h2>
            <p>Please update the firebaseConfig in src/App.js with your Firebase credentials.</p>
          </div>
        ) : !isConnected ? (
          <div className="info">
            <h2>Waiting for Data...</h2>
            <p>No sensor data received yet. Start the mobile app and send some data!</p>
          </div>
        ) : (
          <>
            <div className="latest-data">
              <h2>Latest Sensor Reading</h2>
              {latestData && (
                <div className="data-grid">
                  <div className="sensor-card">
                    <h3>Accelerometer</h3>
                    <div className="sensor-values">
                      <p><strong>X:</strong> {latestData.accelerometer.x.toFixed(4)}</p>
                      <p><strong>Y:</strong> {latestData.accelerometer.y.toFixed(4)}</p>
                      <p><strong>Z:</strong> {latestData.accelerometer.z.toFixed(4)}</p>
                    </div>
                  </div>

                  <div className="sensor-card">
                    <h3>Gyroscope</h3>
                    <div className="sensor-values">
                      <p><strong>X:</strong> {latestData.gyroscope.x.toFixed(4)}</p>
                      <p><strong>Y:</strong> {latestData.gyroscope.y.toFixed(4)}</p>
                      <p><strong>Z:</strong> {latestData.gyroscope.z.toFixed(4)}</p>
                    </div>
                  </div>

                  <div className="sensor-card">
                    <h3>Barometer</h3>
                    <div className="sensor-values">
                      <p><strong>Pressure:</strong> {latestData.barometer.pressure.toFixed(2)} hPa</p>
                      <p><strong>Altitude:</strong> {latestData.barometer.relativeAltitude?.toFixed(2) || 'N/A'} m</p>
                    </div>
                  </div>
                </div>
              )}
              {latestData && (
                <p className="timestamp">Last updated: {formatTimestamp(latestData.timestamp)}</p>
              )}
            </div>

            <div className="history">
              <h2>Recent Data History</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Accelerometer (X, Y, Z)</th>
                      <th>Gyroscope (X, Y, Z)</th>
                      <th>Barometer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((data) => (
                      <tr key={data.id}>
                        <td>{formatTimestamp(data.timestamp)}</td>
                        <td>
                          {data.accelerometer.x.toFixed(2)}, 
                          {data.accelerometer.y.toFixed(2)}, 
                          {data.accelerometer.z.toFixed(2)}
                        </td>
                        <td>
                          {data.gyroscope.x.toFixed(2)}, 
                          {data.gyroscope.y.toFixed(2)}, 
                          {data.gyroscope.z.toFixed(2)}
                        </td>
                        <td>{data.barometer.pressure.toFixed(2)} hPa</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
