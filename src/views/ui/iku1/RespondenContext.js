import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const RespondenContext = createContext();

export const RespondenProvider = ({ children }) => {
  const [totalData, setTotalData] = useState({
    totalDataResponden: 0,
    totalDataSesuai: 0,
    totalDataTidakSesuai: 0,
    totalBobot: 0,
    ratarataBobot: 0,
    totalCapaian: 0,
    persentaseSesuai: 0,
    persentaseTidakSesuai: 0
    
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
        } else if (data.status === "belum berpendapatan" ) {
            return true;
        }
        return false;
      });

      const filteredTidakSesuai = response.data.filter((data) => {
        return !filteredIku1.includes(data);
      });

      const calculateBobot = (data) => {
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

      const totalDataSesuai = filteredIku1.length; 
      const totalDataTidakSesuai = filteredTidakSesuai.length;
      const totalBobot = filteredIku1.reduce((accumulator, currentValue) => accumulator + calculateBobot(currentValue), 0);
      const ratarataBobot = (totalBobot / totalDataSesuai);
      const totalCapaian = ((totalDataSesuai * ratarataBobot / totalDataResponden) * 100).toFixed()+ '%';

      // Calculate percentages
      const persentaseSesuai = ((totalDataSesuai / totalDataResponden) * 100).toFixed(2) + '%';
      const persentaseTidakSesuai = ((totalDataTidakSesuai / totalDataResponden) * 100).toFixed(2) + '%';

      setTotalData({ totalDataResponden, totalDataSesuai, totalDataTidakSesuai, totalBobot, persentaseSesuai, persentaseTidakSesuai, totalCapaian }); // Update state with both totalDataResponden and totalDataSesuai
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
