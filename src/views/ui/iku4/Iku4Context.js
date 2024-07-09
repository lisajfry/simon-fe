import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const Iku4Context = createContext();


export const Iku4Provider = ({ children }) => {
    const [totalDataIku4, setTotalDataIku4] = useState({ sertifikasiProfesi: 0, kalanganPraktisi: 0 });
    const [selectedYear, setSelectedYear] = useState('');


    const fetchDataByYear = async (year) => {
        try {
            const response = await axios.get("http://localhost:8080/iku4", {
                params: { year },
            });
            console.log("Response Data:", response.data);
            const sertifikasiProfesi = response.data.filter(item => item.category === 'sertifikasiProfesi');
            const kalanganPraktisi = response.data.filter(item => item.category === 'kalanganPraktisi');
            setTotalDataIku4({
                sertifikasiProfesi: sertifikasiProfesi.length,
                kalanganPraktisi: kalanganPraktisi.length,
            });
        } catch (error) {
            console.error("Error fetching total data IKU 4:", error);
        }
    };


    useEffect(() => {
        fetchDataByYear(selectedYear);
    }, [selectedYear]);


    return (
        <Iku4Context.Provider value={{ totalDataIku4, selectedYear, setSelectedYear, fetchDataByYear }}>
            {children}
        </Iku4Context.Provider>
    );
};


export default Iku4Context;


