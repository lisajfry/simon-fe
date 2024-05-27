import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const DosenpraktisiContext = createContext();

export const DosenpraktisiProvider = ({ children }) => {
  const [totalDataDosenpraktisi, setTotalDataDosenpraktisi] = useState(0);

  useEffect(() => {
    getTotalDataDosenpraktisi();
  }, []);

  const getTotalDataDosenpraktisi = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dosenpraktisi");
      setTotalDataDosenpraktisi(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data dosen:", error);
    }
  };
  
  return (
    <DosenpraktisiContext.Provider value={{ totalDataDosenpraktisi, setTotalDataDosenpraktisi }}>
      {children}
    </DosenpraktisiContext.Provider>
  );
};

export default DosenpraktisiContext;