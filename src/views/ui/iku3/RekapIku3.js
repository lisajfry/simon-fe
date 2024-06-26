import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Table, Col, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Iku3Context from './Iku3Context';

const Iku3Rekap = () => {
    const [iku3tridharma, setIku3tridharma] = useState([]);
    const [iku3praktisi, setIku3praktisi] = useState([]);
    const [iku2prestasi, setIku2prestasi] = useState([]);
    const [iku2kegiatan, setIku2kegiatan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { rataRataBobot } = useContext(Iku3Context);

    useEffect(() => {
        getIku3tridharma();
        getIku3praktisi();
        getIku2prestasi();
        getIku2kegiatan();
    }, []);

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error while fetching nama dosen:", error);
            return null;
        }
    };

    const getIku3tridharma = async () => {
        const response = await axios.get("http://localhost:8080/iku3tridharma");
        const iku3Data = response.data;

        const iku3tridharma = await Promise.all(iku3Data.map(async (tridharma) => {
            const namaDosen = await fetchNamaDosen(tridharma.NIDN);
            const bobot = calculateBobot('tridharma');
            return { ...tridharma, nama_dosen: namaDosen, bobot, aktivitas: 'tridharma' };
        }));

        setIku3tridharma(iku3tridharma);
    };

    const getIku3praktisi = async () => {
        const response = await axios.get("http://localhost:8080/iku3praktisi");
        const iku3Data = response.data;

        const iku3praktisi = await Promise.all(iku3Data.map(async (praktisi) => {
            const namaDosen = await fetchNamaDosen(praktisi.NIDN);
            const bobot = calculateBobot('praktisi');
            return { ...praktisi, nama_dosen: namaDosen, bobot, aktivitas: 'praktisi' };
        }));

        setIku3praktisi(iku3praktisi);
    };

    const getIku2prestasi = async () => {
        const response = await axios.get("http://localhost:8080/iku2prestasi");
        const iku2Data = response.data;

        const iku2prestasi = await Promise.all(iku2Data.map(async (prestasi) => {
            const namaDosen = await fetchNamaDosen(prestasi.NIDN);
            const bobot = calculateBobot('prestasi');
            return { ...prestasi, nama_dosen: namaDosen, bobot, aktivitas: 'membimbing mahasiswa' };
        }));

        setIku2prestasi(iku2prestasi);
    };

    const getIku2kegiatan = async () => {
        const response = await axios.get("http://localhost:8080/iku2kegiatan");
        const iku2Data = response.data;

        const iku2kegiatan = await Promise.all(iku2Data.map(async (kegiatan) => {
            const namaDosen = await fetchNamaDosen(kegiatan.NIDN);
            const bobot = calculateBobot('kegiatan');
            return { ...kegiatan, nama_dosen: namaDosen, bobot, aktivitas: 'membimbing mahasiswa' };
        }));

        setIku2kegiatan(iku2kegiatan);
    };

    const calculateBobot = (type) => {
        switch (type) {
            case 'tridharma':
            case 'praktisi':
                return 1.0;
            case 'prestasi':
            case 'kegiatan':
                return 0.75;
            default:
                return 0;
        }
    };

    const combinedData = [...iku3tridharma, ...iku3praktisi, ...iku2prestasi, ...iku2kegiatan];

    const aggregatedData = combinedData.reduce((acc, item) => {
        const existingItem = acc.find(i => i.NIDN === item.NIDN);
        if (existingItem) {
            if (item.bobot > existingItem.bobot) {
                existingItem.bobot = item.bobot;
                existingItem.aktivitas = item.aktivitas;
            }
        } else {
            acc.push(item);
        }
        return acc;
    }, []);

    const totalBobot = aggregatedData.reduce((acc, currentValue) => acc + (currentValue.bobot || 0), 0).toFixed(2);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayedData = aggregatedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(aggregatedData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <Col xs="12">
            <Card>
                <CardBody>
                    <CardTitle tag="h6" className="border-bottom p-1 mb-3 text-center" style={{ fontSize: '15px' }}>
                        Tabel Pembobotan IKU3
                    </CardTitle>
                    <div className="mt-3 ">
                        <p className="m-0" style={{ fontSize: '12px' }}>Total data: {aggregatedData.length}</p>
                        <p className="m-0" style={{ fontSize: '12px' }}>Total bobot: {totalBobot}</p>
                    </div>
                    <Table bordered striped responsive size="sm">
                    <thead style={{ fontSize: '12px' }}>
                            <tr>
                                <th>No</th>
                                <th>NIDN</th>
                                <th>Nama Dosen</th>
                                <th>Kegiatan Dosen</th>
                                <th>Bobot</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '12px' }}>
                            {displayedData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item.NIDN}</td>
                                    <td>{item.nama_dosen}</td>
                                    <td>{item.aktivitas}</td>
                                    <td>{item.bobot}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} size="sm">Next</Button>
                    </div>
                    
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku3Rekap;
