import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


const PrestasiContext = createContext();

export const PrestasiProvider = ({ children }) => {
    const [totalDataPrestasi, setTotalDataPrestasi] = useState(0);
  
    useEffect(() => {
      getTotalDataPrestasi();
    }, []);
  
    const getTotalDataPrestasi = async () => {
      try {
        const response = await axios.get("http://localhost:8080/iku2prestasi"); // Ganti URL dengan endpoint yang benar
        setTotalDataPrestasi(response.data.length); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data Prestasi:", error);
      }
    };
    
    return (
      <PrestasiContext.Provider value={{ totalDataPrestasi, setTotalDataPrestasi }}>
        {children}
      </PrestasiContext.Provider>
    );
  };
  

export default PrestasiContext;
