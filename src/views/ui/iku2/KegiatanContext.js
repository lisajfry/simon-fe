import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


const KegiatanContext = createContext();

export const KegiatanProvider = ({ children }) => {
    const [totalDataKegiatan, setTotalDataKegiatan] = useState(0);
  
    useEffect(() => {
      getTotalDataKegiatan();
    }, []);
  
    const getTotalDataKegiatan = async () => {
      try {
        const response = await axios.get("http://localhost:8080/iku2kegiatan"); // Ganti URL dengan endpoint yang benar
        setTotalDataKegiatan(response.data.length); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data Kegiatan:", error);
      }
    };
    
    return (
      <KegiatanContext.Provider value={{ totalDataKegiatan, setTotalDataKegiatan }}>
        {children}
      </KegiatanContext.Provider>
    );
  };
  

export default KegiatanContext;
