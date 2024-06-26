import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

const InboundContext = createContext();

export const InboundProvider = ({ children }) => {
    const [totalData, setTotalData] = useState({
    totalDataMahasiswaAktif:0,
    totalDataInbound: 0,
    persentaseInbound: 0,
  });
  
    useEffect(() => {
      getTotalData();
    }, []);
  
    const getTotalData = async () => {
      try {
        const responseMahasiswaAktif = await axios.get("http://localhost:8080/mahasiswa");
        const totalDataMahasiswaAktif = responseMahasiswaAktif.data.filter(mahasiswa => mahasiswa.keterangan === 'mahasiswa aktif').length;

        const responseInbound = await axios.get("http://localhost:8080/iku2inbound"); // Ganti URL dengan endpoint yang benar
        const totalDataInbound = responseInbound.data.length;

        const persentaseInbound = ((totalDataInbound / totalDataMahasiswaAktif) * 100).toFixed(2) + '%';

        setTotalData({ totalDataMahasiswaAktif, totalDataInbound, persentaseInbound}); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
      } catch (error) {
        console.error("Error fetching total data Kegiatan:", error);
      }
    };
    
    return (
      <InboundContext.Provider value={totalData}>
        {children}
      </InboundContext.Provider>
    );
  };
  

export default InboundContext;
