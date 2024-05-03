import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const LulusanContext = createContext();

export const LulusanProvider = ({ children }) => {
  const [totalDataLulusan, setTotalDataLulusan] = useState(0);

  useEffect(() => {
    getTotalDataLulusan();
  }, []);

  const getTotalDataLulusan = async () => {
    try {
      const response = await axios.get("http://localhost:8080/lulusan");
      setTotalDataLulusan(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data lulusan:", error);
    }
  };
  
  return (
    <LulusanContext.Provider value={{ totalDataLulusan, setTotalDataLulusan }}>
      {children}
    </LulusanContext.Provider>
  );
};

export default LulusanContext;
