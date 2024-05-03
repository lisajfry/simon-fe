import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


const Iku3Context = createContext();

export const Iku3Provider = ({ children }) => {
    const [totalDataIku3, setTotalDataIku3] = useState(0);
  
    useEffect(() => {
      getTotalDataIku3();
    }, []);
  
    const getTotalDataIku3 = async () => {
      try {
        const response = await axios.get("http://localhost:8080/iku3"); // Ganti URL dengan endpoint yang benar
        setTotalDataIku3(response.data.length); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data responden:", error);
      }
    };
    
    return (
      <Iku3Context.Provider value={{ totalDataIku3, setTotalDataIku3 }}>
        {children}
      </Iku3Context.Provider>
    );
  };
  

export default Iku3Context;
