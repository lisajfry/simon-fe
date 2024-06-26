import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const Iku7Context = createContext();


export const Iku7Provider = ({ children }) => {
  const [iku7Data, setIku7Data] = useState([]);
  const [totalCapaianiku7, settotalCapaianiku7] = useState(0);


  useEffect(() => {
    getIku7Data();
  }, []);


  const getIku7Data = async () => {
    try {
      const response = await axios.get('http://localhost:8080/iku7');
      setIku7Data(response.data);
    } catch (error) {
      console.error('Error fetching IKU7 data:', error);
    }
  };


  useEffect(() => {
    calculateAchievementPercentage();
  }, );


  const calculateAchievementPercentage = () => {
    // Your logic to calculate achievementPercentage
    // For example:
    const validDataCount = iku7Data.filter(data => parseInt(data.presentase_bobot) > 49 && data.rps).length;
    const totalData = iku7Data.length;
    const percentage = (validDataCount / totalData) * 100 || 0; // Handle division by zero
    settotalCapaianiku7(percentage.toFixed(2));
  };


  return (
    <Iku7Context.Provider value={{ iku7Data, totalCapaianiku7 }}>
      {children}
    </Iku7Context.Provider>
  );
};


