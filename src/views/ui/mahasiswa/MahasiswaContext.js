import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const MahasiswaContext = createContext();

export const MahasiswaProvider = ({ children }) => {
  const [totalData, setTotalData] = useState({
    totalDataMahasiswa: 0,
    totalDataLulus: 0
  });

  useEffect(() => {
    getTotalData();
  }, []);

  const getTotalData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/mahasiswa");
      const totalDataMahasiswa = response.data.length;
      const totalDataLulus = response.data.filter(mahasiswa => mahasiswa.keterangan === 'lulus').length;
      setTotalData({ totalDataMahasiswa, totalDataLulus });
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
