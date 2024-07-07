import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const Iku3Context = createContext();

export const Iku3Provider = ({ children }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [totalDataIku3, setTotalData] = useState({
        totalDataMahasiswaAktif: 0,
        totalDataIku3Tridharma: 0,
        totalDataIku3Praktisi: 0,
        persentaseTridharma: 0,
        persentasePraktisi: 0,
        totalBobot: 0,
        ratarataBobot: 0,
        totalCapaianIku3: 0
    });

    useEffect(() => {
        if (selectedYear) {
            getTotalData();
        }
    }, [selectedYear]);

    const getTotalData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/dosen");
            const totalDataDosen = response.data.length;

            const responseTridharma = await axios.get("http://localhost:8080/iku3tridharma", { params: { year: selectedYear } });
            const iku3tridharma = responseTridharma.data;

            const responsePraktisi = await axios.get("http://localhost:8080/iku3praktisi", { params: { year: selectedYear } });
            const iku3praktisi = responsePraktisi.data;

            const responseKegiatan = await axios.get("http://localhost:8080/iku2kegiatan", { params: { year: selectedYear } });
            const iku2kegiatan = responseKegiatan.data;

            const responseInbound = await axios.get("http://localhost:8080/iku2inbound", { params: { year: selectedYear } });
            const iku2inbound = responseInbound.data;

            const responsePrestasi = await axios.get("http://localhost:8080/iku2prestasi", { params: { year: selectedYear } });
            const iku2prestasi = responsePrestasi.data;

            const calculateBobot = (type) => {
                switch (type) {
                    case 'tridharma':
                        return 1.0;
                    case 'praktisi':
                        return 1.0;
                    case 'prestasi':
                        return 0.75;
                    case 'inbound':
                        return 0.75;
                    case 'kegiatan':
                        return 0.75;
                    default:
                        return 0;
                }
            };

            iku3tridharma.forEach(item => item.bobot = calculateBobot('tridharma'));
            iku3praktisi.forEach(item => item.bobot = calculateBobot('praktisi'));
            iku2kegiatan.forEach(item => item.bobot = calculateBobot('kegiatan'));
            iku2inbound.forEach(item => item.bobot = calculateBobot('inbound'));
            iku2prestasi.forEach(item => item.bobot = calculateBobot('prestasi'));

            // Combine all activities
            const combinedData = [...iku3tridharma, ...iku3praktisi, ...iku2kegiatan, ...iku2inbound, ...iku2prestasi];

            // Aggregate data to use the highest bobot for each lecturer
            const aggregatedData = combinedData.reduce((acc, item) => {
                const existingItem = acc.find(i => i.NIDN === item.NIDN);
                if (existingItem) {
                    if (item.bobot > existingItem.bobot) {
                        existingItem.bobot = item.bobot;
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

            const totalDataIku3Tridharma = iku3tridharma.length;
            const totalDataIku3Praktisi = iku3praktisi.length;
            const totalDataKegiatan = iku2kegiatan.length;
            const totalDataInbound = iku2inbound.length;
            const totalDataPrestasi = iku2prestasi.length;

            const totalDataIku3 = aggregatedData.length;
            const totalBobot = aggregatedData.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0).toFixed(2);
            const ratarataBobot = (totalBobot / totalDataIku3).toFixed(2);
            const totalCapaianIku3 = ((totalDataIku3 * ratarataBobot / totalDataDosen) * 100).toFixed(2);

            const persentaseTridharma = ((totalDataIku3Tridharma / totalDataDosen) * 100).toFixed(2) + '%';
            const persentasePraktisi = ((totalDataIku3Praktisi / totalDataDosen) * 100).toFixed(2) + '%';

            setTotalData({
                totalDataDosen,
                totalDataIku3Tridharma,
                totalDataIku3Praktisi,
                persentaseTridharma,
                persentasePraktisi,
                totalBobot,
                ratarataBobot,
                totalCapaianIku3: parseFloat(totalCapaianIku3) + '%' // Mengonversi ke bilangan bulat
            });
        } catch (error) {
            console.error("Error fetching total data:", error);
        }
    };

    return (
        <Iku3Context.Provider value={{ totalDataIku3, selectedYear, setSelectedYear }}>
            {children}
        </Iku3Context.Provider>
    );
};

export default Iku3Context;
