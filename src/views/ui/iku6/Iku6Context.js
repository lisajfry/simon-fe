import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";


export const Iku6Context = createContext();


export const Iku6Provider = ({ children }) => {
  const [totalData, setTotalData] = useState({
    totalData: 0,
    totalCapaianiku6: 0,
  });


  useEffect(() => {
    getTotalData();
  }, []);


  const getTotalData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/iku6");
      const totalData = response.data.length;


      const calculateIKU6 = (data) => {
        const kriteriaBobot = {
          'perusahaan multinasional': 0.75,
          'perusahaan nasional berstandar tinggi, BUMN, dan/atau BUMD': 0.5,
          'perusahaan teknologi global': 1,
          'perusahaan rintisan (startup company) teknologi': 0.5,
          'organisasi nirlaba kelas dunia': 0.75,
          'institusi/organisasi multilateral': 1,
          'perguruan tinggi yang masuk dalam daftar QS200 berdasarkan bidang ilmu (QS200 by subject) perguruan tinggi luar negeri': 1,
          'perguruan tinggi yang masuk dalam daftar QS200 berdasarkan bidang ilmu (QS200 by subject) perguruan tinggi dalam negeri': 0.5,
          'instansi pemerintah': 0.3,
          'rumah sakit': 0.3,
          'lembaga riset pemerintah, swasta, nasional, maupun internasional': 0.3,
          'lembaga kebudayaan berskala nasional/bereputasi': 0.3
        };


        let totalCapaian = 0;


        data.forEach(item => {
          const bobot = kriteriaBobot[item.kriteria_mitra];
          if (bobot) {
            totalCapaian += 1 / bobot; // n * k (where k is 1) / bobot
          }
        });


        return totalCapaian.toFixed(0);
      };


      const totalCapaianiku6 = calculateIKU6(response.data);


      setTotalData({ totalData, totalCapaianiku6 });
    } catch (error) {
      console.error("Error fetching total data IKU 6:", error);
    }
  };


  return (
    <Iku6Context.Provider value={totalData}>
      {children}
    </Iku6Context.Provider>
  );
};


export default Iku6Context;
