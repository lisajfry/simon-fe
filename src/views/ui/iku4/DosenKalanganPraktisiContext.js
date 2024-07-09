import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';


const DosenKalanganPraktisiContext = createContext();


export const DosenKalanganPraktisiProvider = ({ children }) => {
    const [iku4List, setIku4List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchIku4List();
    }, []);


    const fetchNamaDosen = async (NIDK) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDK}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error saat mengambil nama dosen:", error);
            return null;
        }
    };


    const fetchIku4List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku4');
            const iku4ListWithNama = await Promise.all(response.data.map(async (iku4) => {
                let namaDosen;
                if (iku4.NIDN) {
                    namaDosen = await fetchNamaDosen(iku4.NIDN);
                } else if (iku4.NIDK) {
                    namaDosen = await fetchNamaDosen(iku4.NIDK);
                }
                return { ...iku4, nama_dosen: namaDosen };
            }));
            setIku4List(iku4ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 4.");
            setLoading(false);
            console.error('Error saat mengambil data IKU 4:', error);
        }
    };


    const filteredIku4List = iku4List.filter(iku4 => iku4.status === "Dosen dari Kalangan Praktisi Profesional");


    return (
        <DosenKalanganPraktisiContext.Provider value={{ filteredIku4List, count: filteredIku4List.length, loading, error, fetchIku4List }}>
            {children}
        </DosenKalanganPraktisiContext.Provider>
    );
};


export const useDosenKalanganPraktisi = () => useContext(DosenKalanganPraktisiContext);


