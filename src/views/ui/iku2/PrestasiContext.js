import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


const PrestasiContext = createContext();

export const PrestasiProvider = ({ children }) => {
    const [totalData, setTotalData] = useState({
      totalDataMahasiswaAktif:0,
      totalDataPrestasi: 0,
      persentasePrestasi: 0
    });
  
    useEffect(() => {
      getTotalData();
    }, []);
  
    const getTotalData = async () => {
      try {
        const responseMahasiswaAktif = await axios.get("http://localhost:8080/mahasiswa");
        const totalDataMahasiswaAktif = responseMahasiswaAktif.data.filter(mahasiswa => mahasiswa.keterangan === 'mahasiswa aktif').length;

        const responsePrestasi = await axios.get("http://localhost:8080/iku2prestasi"); // Ganti URL dengan endpoint yang benar
        const totalDataPrestasi = responsePrestasi.data.length;

        const persentasePrestasi = ((totalDataPrestasi / totalDataMahasiswaAktif) * 100).toFixed(2) + '%';

        setTotalData({ totalDataMahasiswaAktif, totalDataPrestasi, persentasePrestasi}); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data Kegiatan:", error);
      }
    };
    
    return (
      <PrestasiContext.Provider value={ totalData}>
        {children}
      </PrestasiContext.Provider>
    );
  };
  

export default PrestasiContext;
