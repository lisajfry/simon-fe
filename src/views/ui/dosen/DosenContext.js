import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const DosenContext = createContext();

export const DosenProvider = ({ children }) => {
  const [totalDataDosen, setTotalDataDosen] = useState(0);

  useEffect(() => {
    getTotalDataDosen();
  }, []);

  const getTotalDataDosen = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dosen");
      setTotalDataDosen(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data dosen:", error);
    }
  };
  
  return (
    <DosenContext.Provider value={{ totalDataDosen, setTotalDataDosen }}>
      {children}
    </DosenContext.Provider>
  );
};

export default DosenContext;
