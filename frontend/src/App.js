import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import API from './api';
import './App.css';

const App = () => {
  const [arduino, setArduino] = useState([])
  const [earth, setEarth] = useState([])
  const [humidity, setHumidty] = useState([])
  const [temp, setTemp] = useState([])
  const [counting, setCounting] = useState(0)

  const loadData = async () => {
    console.log("load data again")
    const arduinoResult = await API.get('/arduino')
    setArduino(arduinoResult.data.data)
    const dhtResult = await API.get('/dht')
    const humidList = []
    const tempList = []
    dhtResult.data.data.map(item => {
      humidList.push(item.humidity)
      tempList.push(item.temperature)
    })
    setHumidty(humidList)
    setTemp(tempList)
    const earthSensor = await API.get('/earth')
    const earthList = earthSensor.data.data.map(item => (1 - item.earth_value / 1024))
    setEarth(earthList)
  }


  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setCounting(counting + 1)
      loadData()
    }, 120000)
  }, [counting])


  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <div className="header-container">Anti-Flood House System</div>
      </div>
      <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: 20, marginBottom: 50 }}>
        <div className='btn-container'>
          <div className="text-container" style={{ marginRight: 20 }}>Rainning Status :</div>
          <div className='btn-style' style={{ backgroundColor: arduino.length > 0 && arduino[0].status === 0 ? '#EA4129' : '#4CEA29' }}>
            {arduino.length > 0 && arduino[0].status === 0 ? "Off" : "On"}
          </div>
        </div>
        {/*
        <div className='btn-container'>
          <div className="text-container" style={{ marginRight: 20 }}>Humidity Status :</div>
          <div className='btn-style' style={{ backgroundColor: true ? '#EA4129' : '#4CEA29' }}>
            {true ? "High" : "Low"}
          </div>
        </div>
        */}
        <Line
          data={{
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [
              {
                data: humidity.length > 0 ? humidity : [],
                label: "Humidity",
                borderColor: "#3e95cd",
                fill: false
              },
              {
                data: temp.length > 0 ? temp : [],
                label: "Temperature",
                borderColor: "#8e5ea2",
                fill: false
              },
            ]
          }}
        />
        <Line
          data={{
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [
              {
                data: earth.length > 0 ? earth.earth_value : [],
                label: "Soil Moisture",
                borderColor: "#3e95cd",
                fill: false
              },
            ]
          }}
        />
      </div>

    </div>
  );
}

export default App;
