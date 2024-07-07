import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Iku2Context = createContext();

export const Iku2Provider = ({ children }) => {
  const [totalDataIku2, setTotalData] = useState({
    totalDataKegiatan: 0,
    totalDataInbound: 0,
    totalDataPrestasi: 0,
    totalDataMemenuhiSyarat: 0,
    totalBobot: 0,
    ratarataBobot: 0,
    totalCapaian: 0,
  });
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    if (selectedYear) {
      getTotalData();
    }
  }, [selectedYear]);

  const getTotalData = async () => {
    try {
      const [responseKegiatan, responseInbound, responsePrestasi] = await Promise.all([
        axios.get('http://localhost:8080/iku2kegiatan', { params: { year: selectedYear } }),
        axios.get('http://localhost:8080/iku2inbound', { params: { year: selectedYear } }),
        axios.get('http://localhost:8080/iku2prestasi', { params: { year: selectedYear } }),
      ]);

      const iku2kegiatan = responseKegiatan.data;
      const iku2inbound = responseInbound.data;
      const iku2prestasi = responsePrestasi.data;

      const calculateBobot = (data) => {
        const sks = parseFloat(data.sks);
        if (sks === 10) return 0.5;
        if (sks === 20) return 1.0;
        if (data.tingkat_kompetisi === 'internasional') {
          if (data.prestasi === 'juara1') return 1.0;
          if (data.prestasi === 'juara2') return 0.9;
          if (data.prestasi === 'juara3') return 0.8;
          if (data.prestasi === 'peserta') return 0.7;
        } else if (data.tingkat_kompetisi === 'nasional') {
          if (data.prestasi === 'juara1') return 0.7;
          if (data.prestasi === 'juara2') return 0.6;
          if (data.prestasi === 'juara3') return 0.5;
        } else if (data.tingkat_kompetisi === 'provinsi') {
          if (data.prestasi === 'juara1') return 0.4;
          if (data.prestasi === 'juara2') return 0.3;
          if (data.prestasi === 'juara3') return 0.2;
        }
        return sks / 20;
      };

      const totalDataKegiatan = iku2kegiatan.length;
      const totalDataInbound = iku2inbound.length;
      const totalDataPrestasi = iku2prestasi.length;

      iku2kegiatan.forEach(item => item.bobot = calculateBobot(item));
      iku2inbound.forEach(item => item.bobot = calculateBobot(item));
      iku2prestasi.forEach(item => item.bobot = calculateBobot(item));

      const totalBobotKegiatan = iku2kegiatan.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
      const totalBobotInbound = iku2inbound.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
      const totalBobotPrestasi = iku2prestasi.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);

      const totalDataMemenuhiSyarat = totalDataKegiatan + totalDataInbound + totalDataPrestasi;
      const totalBobot = (totalBobotKegiatan + totalBobotInbound + totalBobotPrestasi).toFixed(2);
      const ratarataBobot = (totalBobot / totalDataMemenuhiSyarat).toFixed(2);
      const totalCapaianIku2 = (
        ((totalDataKegiatan * ratarataBobot) / totalDataMemenuhiSyarat * 50) +
        ((totalDataInbound * ratarataBobot) / totalDataMemenuhiSyarat * 20) +
        ((totalDataPrestasi * ratarataBobot) / (totalDataMemenuhiSyarat * 2) * 30)
      ).toFixed(2);

      if (isNaN(totalCapaianIku2) || !isFinite(totalCapaianIku2)) {
        console.error('Error: Total capaian tidak valid');
      } else {
        setTotalData(prevState => ({
          ...prevState,
          totalDataKegiatan,
          totalDataInbound,
          totalDataPrestasi,
          totalDataMemenuhiSyarat,
          totalBobot,
          ratarataBobot,
          totalCapaian: parseFloat(totalCapaianIku2)
        }));
      }

    } catch (error) {
      console.error('Error fetching total data:', error);
    }
  };

  return (
    <Iku2Context.Provider value={{ totalDataIku2, selectedYear, setSelectedYear }}>
      {children}
    </Iku2Context.Provider>
  );
};

export default Iku2Provider;
