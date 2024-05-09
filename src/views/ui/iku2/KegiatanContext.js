import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


const KegiatanContext = createContext();

export const KegiatanProvider = ({ children }) => {
    const [totalData, setTotalData] = useState({
    totalDataKegiatan: 0,
    totalDataPertukaranPelajar: 0
  });
  
    useEffect(() => {
      getTotalData();
    }, []);
  
    const getTotalData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/iku2kegiatan"); // Ganti URL dengan endpoint yang benar
        const totalDataKegiatan = response.data.length;
        const totalDataPertukaranPelajar = response.data.filter(iku2kegiatan => iku2kegiatan.aktivitas === 'pertukaran pelajar').length;
        setTotalData({ totalDataKegiatan, totalDataPertukaranPelajar}); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data Kegiatan:", error);
      }
    };
    
    return (
      <KegiatanContext.Provider value={totalData}>
        {children}
      </KegiatanContext.Provider>
    );
  };
  

export default KegiatanContext;
