import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

const Iku3Context = createContext();

export const Iku3Provider = ({ children }) => {
    const [totalData, setTotalData] = useState({
        totalDataMahasiswaAktif:0,
        totalDataIku3Tridharma: 0,
        totalDataIku3Praktisi: 0,
        persentaseTridharma: 0,
        persentasePraktisi: 0
    });
  
    useEffect(() => {
        getTotalData();
    }, []);

  
    const getTotalData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/dosen");
          const totalDataDosen=(response.data.length);

            const responseTridharma = await axios.get("http://localhost:8080/iku3tridharma");
            const totalDataIku3tridharma = responseTridharma.data.length;
            
            const responsePraktisi = await axios.get("http://localhost:8080/iku3praktisi");
            const totalDataIku3Praktisi = responsePraktisi.data.length;

             // Calculate percentages
            const persentaseTridharma = ((totalDataIku3tridharma / totalDataDosen) * 100).toFixed(2) + '%';
            const persentasePraktisi = ((totalDataIku3Praktisi / totalDataDosen) * 100).toFixed(2) + '%';
            
            setTotalData({ totalDataDosen, totalDataIku3tridharma, totalDataIku3Praktisi, persentasePraktisi, persentaseTridharma});
        } catch (error) {
            console.error("Error fetching total data Tridharma:", error);
        }
    };
    
    return (
        <Iku3Context.Provider value={totalData}>
            {children}
        </Iku3Context.Provider>
    );
};

export default Iku3Context;
