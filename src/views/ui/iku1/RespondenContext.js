import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


const RespondenContext = createContext();

export const RespondenProvider = ({ children }) => {
    const [totalDataResponden, setTotalDataResponden] = useState(0);
  
    useEffect(() => {
      getTotalDataResponden();
    }, []);
  
    const getTotalDataResponden = async () => {
      try {
        const response = await axios.get("http://localhost:8080/iku1"); // Ganti URL dengan endpoint yang benar
        setTotalDataResponden(response.data.length); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data responden:", error);
      }
    };
    
    return (
      <RespondenContext.Provider value={{ totalDataResponden, setTotalDataResponden }}>
        {children}
      </RespondenContext.Provider>
    );
  };
  

export default RespondenContext;
