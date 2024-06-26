import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const Iku2Context = createContext();

export const Iku2Provider = ({ children }) => {
  const [totalData, setTotalData] = useState({
    totalDataMahasiswaAktif: 0,
    totalDataKegiatan: 0,
    totalDataInbound: 0,
    totalDataPrestasi: 0,
    totalDataMemenuhiSyarat: 0,
    totalBobot: 0,
    ratarataBobot: 0,
    totalCapaian: 0,
  });

  useEffect(() => {
    getTotalData();
    getMahasiswa();
  }, []);

  const getMahasiswa = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mahasiswa');
      const mahasiswa = response.data;
      const totalDataMahasiswaAktif = mahasiswa.filter(mhs => mhs.keterangan === 'mahasiswa aktif').length;
      setTotalData(prevState => ({
        ...prevState,
        totalDataMahasiswaAktif
      }));
      return mahasiswa; // Return mahasiswa data
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const getTotalData = async () => {
    try {
      // Fetch mahasiswa data inside getTotalData
      const mahasiswa = await getMahasiswa();

      const responseKegiatan = await axios.get("http://localhost:8080/iku2kegiatan");
      const iku2kegiatan = responseKegiatan.data;

      const responseInbound = await axios.get("http://localhost:8080/iku2inbound");
      const iku2inbound = responseInbound.data;

      const responsePrestasi = await axios.get("http://localhost:8080/iku2prestasi");
      const iku2prestasi = responsePrestasi.data;

      const calculateBobot = (data) => {
        const sks = parseFloat(data.sks);
        if (sks === 10) return 0.5;
        if (sks === 20) return 1.0;
        if (data.tingkat_kompetisi === "internasional") {
          if (data.prestasi === "juara1") return 1.0;
          if (data.prestasi === "juara2") return 0.9;
          if (data.prestasi === "juara3") return 0.8;
          if (data.prestasi === "peserta") return 0.7;
        } else if (data.tingkat_kompetisi === "nasional") {
          if (data.prestasi === "juara1") return 0.7;
          if (data.prestasi === "juara2") return 0.6;
          if (data.prestasi === "juara3") return 0.5;
        } else if (data.tingkat_kompetisi === "provinsi") {
          if (data.prestasi === "juara1") return 0.4;
          if (data.prestasi === "juara2") return 0.3;
          if (data.prestasi === "juara3") return 0.2;
        }
        return sks / 20;
      };

      const totalDataKegiatan = iku2kegiatan.length;
      const totalDataInbound = iku2inbound.length;
      const totalDataPrestasi = iku2prestasi.length;
      // You need to ensure `mahasiswa` is accessible here
      const totalDataMahasiswaAktif = mahasiswa.filter(mhs => mhs.keterangan === 'mahasiswa aktif').length;

      iku2kegiatan.forEach(item => item.bobot = calculateBobot(item));
      iku2inbound.forEach(item => item.bobot = calculateBobot(item));
      iku2prestasi.forEach(item => item.bobot = calculateBobot(item));

      const totalBobotKegiatan = iku2kegiatan.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
      const totalBobotInbound = iku2inbound.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
      const totalBobotPrestasi = iku2prestasi.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);

      const totalDataMemenuhiSyarat = totalDataKegiatan + totalDataInbound + totalDataPrestasi;
      const totalBobot = (totalBobotKegiatan + totalBobotInbound + totalBobotPrestasi).toFixed(2);
      const ratarataBobot = (totalBobot / totalDataMemenuhiSyarat).toFixed(2);
      const totalCapaian = (
        ((totalDataKegiatan * ratarataBobot) / totalDataMemenuhiSyarat * 50) +
        ((totalDataInbound * ratarataBobot) / totalDataMemenuhiSyarat * 20) +
        ((totalDataPrestasi * ratarataBobot) / totalDataMahasiswaAktif * 30)
      ).toFixed(2) ; // Menghapus simbol '%' di sini
      
      // Periksa apakah totalCapaian adalah NaN atau Infinity
      if (isNaN(totalCapaian) || !isFinite(totalCapaian)) {
        console.error("Error: Total capaian tidak valid");
        // Atau lakukan penanganan kesalahan sesuai kebutuhan Anda
      } else {
        setTotalData(prevState => ({
          ...prevState,
          totalDataKegiatan,
          totalDataInbound,
          totalDataPrestasi,
          totalDataMemenuhiSyarat,
          totalBobot,
          ratarataBobot,
          totalCapaian: parseFloat(totalCapaian) + '%'// Mengonversi ke bilangan bulat
        }));
      }
      
    } catch (error) {
      console.error("Error fetching total data:", error);
    }
  };

  return (
    <Iku2Context.Provider value={totalData}>
      {children}
    </Iku2Context.Provider>
  );
};

export default Iku2Context;
