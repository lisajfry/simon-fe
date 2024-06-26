import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Iku5Context = createContext();

export const Iku5Provider = ({ children }) => {
  // State initialization
  const [totalData, setTotalData] = useState({
    totalDataDosen: 0,
    totalDataDosenNIDK: 0,
    totalDataIku5: 0,
    totalDataKaryaIlmiah: 0,
    totalDataKaryaTerapan: 0,
    totalDataKaryaSeni: 0,
    totalBobot: 0,
    ratarataBobot: 0,
    totalCapaian: 0,
  });

  // Effect to fetch data when component mounts
  useEffect(() => {
    getTotalData();
  }, []);

  // Function to get total data for Dosen
  const getTotalDataDosen = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dosen");
      return response.data.length;
    } catch (error) {
      console.error("Error fetching total data dosen:", error);
      return 0;
    }
  };

  // Function to get total data for DosenNIDK
  const getTotalDataDosenNIDK = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dosenNIDK");
      return response.data.length;
    } catch (error) {
      console.error("Error fetching total data dosen NIDK:", error);
      return 0;
    }
  };

  // Function to calculate total data for each type of Karya
  const calculateTotalKarya = (iku5, jenisKarya) => {
    return iku5.filter(item => item.jenis_karya === jenisKarya).length;
  };

  // Function to fetch all required data
  const getTotalData = async () => {
    try {
      const totalDosen = await getTotalDataDosen();
      const totalDosenNIDK = await getTotalDataDosenNIDK();

      const responseIku5 = await axios.get("http://localhost:8080/iku5");
      const iku5 = responseIku5.data;

      // Calculate totals for different types of Karya
      const totalDataKaryaIlmiah = calculateTotalKarya(iku5, "Karya Tulis Ilmiah");
      const totalDataKaryaTerapan = calculateTotalKarya(iku5, "Karya Terapan");
      const totalDataKaryaSeni = calculateTotalKarya(iku5, "Karya Seni");

      // Calculate totalBobot, ratarataBobot, and totalCapaian
      const calculateBobot = (data) => {
        if (data.jenis_karya === "Karya Tulis Ilmiah") {
          if (data.kriteria === "buku referensi") return 0.8;
          if (data.kriteria === "jurnal internasional bereputasi") return 0.8;
          if (data.kriteria === "buku nasional/internasional yang mempunyai ISBN") return 0.8;
          if (data.kriteria === "book chapter internasional") return 0.6;
          if (data.kriteria === "jurnal nasional berbahasa inggris atau bahasa resmi PBB terindeks pada DOAJ") return 0.6;
          if (data.kriteria === "dalam bentuk monograf") return 0.6;
          if (data.kriteria === "hasil penelitian kerjasama industri termasuk penugasan dari kementerian atau LPNK yang tidak dipublikasikan") return 0.6;
          if (data.kriteria === "lainnya") return 0.4;
        } else if (data.jenis_karya === "Karya Terapan") {
          if (data.kriteria === "diterapkan/digunakan/diaplikasikan pada Dunia Usaha dan Dunia Industri atau Masyarakat pada tingkat internasional atau Nasional") return 1.0;
          if (data.kriteria === "hasil Rancangan Teknologi/Seni yang dipatenkan secara internasional") return 1.0;
          if (data.kriteria === "belum diterapkan tetapi sudah mendapatkan ijin edar atau sudah terstandarisasi") return 0.8;
          if (data.kriteria === "hasil Rancangan Teknologi/Seni yang dipatenkan secara Nasional") return 0.8;
          if (data.kriteria === "melaksanakan pengembangan hasil pendidikan dan penelitian") return 0.8;
        } else if (data.jenis_karya === "Karya Seni") {
          if (data.kriteria === "melaksanakan dan/atau menghasilkan karya seni atau kegiatan seni pada tingkat internasional") return 0.9;
          if (data.kriteria === "melaksanakan dan/atau menghasilkan karya seni atau kegiatan seni pada tingkat Nasional") return 0.7;
          if (data.kriteria === "melaksanakan penelitian di bidang seni yang dipatenkan atau dipublikasikan dalam seminar nasional") return 0.7;
          if (data.kriteria === "melaksanakan dan/atau menghasilkan karya seni atau kegiatan seni pada tingkat lokal") return 0.7;
          if (data.kriteria === "membuat rancangan karya seni atau kegiatan seni tingkat nasional") return 0.5;
          if (data.kriteria === "melaksanakan penelitian di bidang seni yang tidak dipatenkan atau dipublikasikan") return 0.5;
        }
      };

      const totalBobot = (iku5.reduce((acc, cur) => acc + (calculateBobot(cur) || 0), 0)).toFixed(2);
      const ratarataBobot = (totalBobot / iku5.length).toFixed(2);
      const totalCapaian = (((iku5.length * ratarataBobot) / (totalDosen + totalDosenNIDK) * 50)).toFixed(2);

      // Update state with the updated values
      setTotalData(prevState => ({
        ...prevState,
        totalDataIku5: iku5.length,
        totalDataKaryaIlmiah,
        totalDataKaryaTerapan,
        totalDataKaryaSeni,
        totalBobot,
        ratarataBobot,
        totalCapaian: parseFloat(totalCapaian) + '%'
      }));

    } catch (error) {
      console.error("Error fetching total data:", error);
    }
  };

  return (
    <Iku5Context.Provider value={totalData}>
      {children}
    </Iku5Context.Provider>
  );
};

export default Iku5Context;
