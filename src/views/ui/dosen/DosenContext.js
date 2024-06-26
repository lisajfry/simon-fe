import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const DosenContext = createContext();

export const DosenProvider = ({ children }) => {
  const [totalDataDosen, setTotalDataDosen] = useState(0);
  const [totalDataDosenNIDK, setTotalDataDosenNIDK] = useState(0);

  useEffect(() => {
    getTotalDataDosen();
    getTotalDataDosenNIDK();
  }, []);

  const getTotalDataDosen = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dosen");
      setTotalDataDosen(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data dosen:", error);
    }
  };

  const getTotalDataDosenNIDK = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dosenNIDK");
      setTotalDataDosenNIDK(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data dosen:", error);
    }
  };
  
  return (
    <DosenContext.Provider value={{ totalDataDosen, setTotalDataDosen, totalDataDosenNIDK, setTotalDataDosenNIDK }}>
      {children}
    </DosenContext.Provider>
  );
};

export default DosenContext;
