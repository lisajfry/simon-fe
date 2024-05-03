import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const MahasiswaContext = createContext();

export const MahasiswaProvider = ({ children }) => {
  const [totalDataMahasiswa, setTotalDataMahasiswa] = useState(0);

  useEffect(() => {
    getTotalDataMahasiswa();
  }, []);

  const getTotalDataMahasiswa = async () => {
    try {
      const response = await axios.get("http://localhost:8080/mahasiswa");
      setTotalDataMahasiswa(response.data.length); // Menggunakan response.data.length
    } catch (error) {
      console.error("Error fetching total data mahasiswa:", error);
    }
  };
  
  return (
    <MahasiswaContext.Provider value={{ totalDataMahasiswa, setTotalDataMahasiswa }}>
      {children}
    </MahasiswaContext.Provider>
  );
};

export default MahasiswaContext;
