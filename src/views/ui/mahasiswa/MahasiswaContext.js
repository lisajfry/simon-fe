import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const MahasiswaContext = createContext();

export const MahasiswaProvider = ({ children }) => {
  const [totalData, setTotalData] = useState({
    totalDataMahasiswa: 0,
    totalDataLulus: 0,
    totalDataMahasiswaAktif:0
  });

  useEffect(() => {
    getTotalData();
  }, []);

  const getTotalData = async () => {
    try {
        const response = await axios.get("http://localhost:8080/mahasiswa");
        const totalDataMahasiswa = response.data.length;
        const totalDataLulus = response.data.filter(mahasiswa => mahasiswa.keterangan === 'lulus').length;
        const totalDataMahasiswaAktif = response.data.filter(mahasiswa => mahasiswa.keterangan === 'mahasiswa aktif').length;

        // Hitung total mahasiswa untuk setiap angkatan
        const totalData2020 = response.data.filter(mhs => mhs.angkatan === 'TI 2020').length;
        const totalData2021 = response.data.filter(mhs => mhs.angkatan === 'TI 2021').length;
        const totalData2022 = response.data.filter(mhs => mhs.angkatan === 'TI 2022').length;
        const totalData2023 = response.data.filter(mhs => mhs.angkatan === 'TI 2023').length;

        setTotalData({ 
            totalDataMahasiswa, 
            totalDataLulus, 
            totalDataMahasiswaAktif,
            totalData2020,
            totalData2021,
            totalData2022,
            totalData2023
        });
    } catch (error) {
        console.error("Error fetching total data mahasiswa:", error);
    }
};


  return (
    <MahasiswaContext.Provider value={totalData}>
      {children}
    </MahasiswaContext.Provider>
  );
};

export default MahasiswaContext;
