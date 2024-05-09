import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const RespondenContext = createContext();

export const RespondenProvider = ({ children }) => {
  const [totalData, setTotalData] = useState({
    totalDataResponden: 0,
    totalDataSesuai: 0,
    totalDataTidakSesuai: 0,
    totalBobot: 0,
  });

  useEffect(() => {
    getTotalData();
  }, []);

  const getTotalData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/iku1");
      const totalDataResponden = response.data.length;

      // Filter data
      const filteredIku1 = response.data.filter((data) => {
        if (data.status === "wiraswasta" || data.status === "mendapat pekerjaan" || data.status === "melanjutkan studi") {
            return true;
        } else if (data.status === "belum berpendapatan" && data.mahasiswa) {
            return true;
        }
        return false;
      });

      const filteredTidakSesuai = response.data.filter((data) => {
        return !filteredIku1.includes(data);
    });

    const calculateBobot = (data) => {
      // Logika perhitungan bobot sesuai dengan kondisi yang Anda tentukan
      if (data.status === "mendapat pekerjaan" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
          return 1.0;
      } else if (data.status === "mendapat pekerjaan" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
          return 0.7;
      } else if (data.status === "mendapat pekerjaan" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
          return 0.8;
      } else if (data.status === "mendapat pekerjaan" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
          return 0.5;
      } else if (data.status === "wiraswasta" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
          return 1.2;
      } else if (data.status === "wiraswasta" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
          return 1.0;
      } else if (data.status === "wiraswasta" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
          return 1.0;
      } else if (data.status === "wiraswasta" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
          return 0.8;
      } else if (data.status === "melanjutkan studi") {
          return 1;
      }
      return null;
  };


      const totalDataSesuai = filteredIku1.length; // Update totalDataSesuai to be the length of filteredIku1
      const totalDataTidakSesuai = filteredTidakSesuai.length;
      const totalBobot = filteredIku1.reduce((accumulator, currentValue) => accumulator + currentValue.bobot, 0);

      setTotalData({ totalDataResponden, totalDataSesuai, totalDataTidakSesuai, totalBobot }); // Update state with both totalDataResponden and totalDataSesuai
    } catch (error) {
      console.error("Error fetching total data responden:", error);
    }
  };

  return (
    <RespondenContext.Provider value={totalData}>
      {children}
    </RespondenContext.Provider>
  );
};

export default RespondenContext;
