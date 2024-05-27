import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

const KegiatanContext = createContext();

export const KegiatanProvider = ({ children }) => {
    const [totalData, setTotalData] = useState({
    totalDataMahasiswaAktif:0,
    totalDataKegiatan: 0,
    totalDataPertukaranPelajar: 0,
    persentaseKegiatan: 0,
    persentasePertukaranPelajar: 0,
  });
  
    useEffect(() => {
      getTotalData();
    }, []);
  
    const getTotalData = async () => {
      try {
        const responseMahasiswaAktif = await axios.get("http://localhost:8080/mahasiswa");
        const totalDataMahasiswaAktif = responseMahasiswaAktif.data.filter(mahasiswa => mahasiswa.keterangan === 'mahasiswa aktif').length;

        const responseKegiatan = await axios.get("http://localhost:8080/iku2kegiatan"); // Ganti URL dengan endpoint yang benar
        const totalDataKegiatan = responseKegiatan.data.length;
        const totalDataPertukaranPelajar = responseKegiatan.data.filter(iku2kegiatan => iku2kegiatan.aktivitas === 'pertukaran pelajar').length;

        const persentaseKegiatan = ((totalDataKegiatan / totalDataMahasiswaAktif) * 100).toFixed(2) + '%';
        const persentasePertukaranPelajar = ((totalDataPertukaranPelajar / totalDataMahasiswaAktif) * 100).toFixed(2) + '%';

        setTotalData({ totalDataMahasiswaAktif, totalDataKegiatan, totalDataPertukaranPelajar, persentaseKegiatan, persentasePertukaranPelajar}); // Ubah cara Anda mengambil jumlah data sesuai dengan respons endpoint
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
