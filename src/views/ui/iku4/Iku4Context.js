import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const Iku4Context = createContext();

export const Iku4Provider = ({ children }) => {
  const [totalDataIku4, setTotalDataIku4] = useState(0);

  useEffect(() => {
    getTotalDataIku4();
  }, []);

  const getTotalDataIku4 = async () => {
    try {
      const response = await axios.get("http://localhost:8080/iku4");
      setTotalDataIku4(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data iku 4:", error);
    }
  };
  
  return (
    <Iku4Context.Provider value={{ totalDataIku4, setTotalDataIku4 }}>
      {children}
    </Iku4Context.Provider>
  );
};

export default Iku4Context;