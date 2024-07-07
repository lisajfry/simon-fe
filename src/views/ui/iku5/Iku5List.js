import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Iku5Context } from './Iku5Context';

const Iku5List = () => {
    const [iku5List, setIku5List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { totalDataIku5 } = useContext(Iku5Context);
    // Mengambil nilai total dari context
const { totalDataIku5: { totalDataDosen, totalDataDosenNIDK,totalData,  totalDataKaryaIlmiah, totalDataKaryaTerapan, totalDataKaryaSeni, totalBobot, ratarataBobot, totalCapaianIku5 }, selectedYear } = useContext(Iku5Context);




    useEffect(() => {
        if (selectedYear !== undefined) {
            fetchIku5List();
        }
    }, [selectedYear]);

    const fetchNamaDosen = async (identifier) => {
        try {
            const responseNIDN = await axios.get(`http://localhost:8080/dosen/${identifier}`);
            if (responseNIDN.data) {
                return responseNIDN.data.nama_dosen;
            } else {
                const responseNIDK = await axios.get(`http://localhost:8080/dosenNIDK/${identifier}`);
                return responseNIDK.data.nama_dosen;
            }
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchIku5List = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/iku5', {
                params: {
                    year: selectedYear
                }
            });
            const iku5ListWithNama = await Promise.all(response.data.map(async (iku5) => {
                const namaDosen = await fetchNamaDosen(iku5.NIDN || iku5.NIDK);
                return { ...iku5, nama_dosen: namaDosen };
            }));
            setIku5List(iku5ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 5 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 5 Kegiatan list:', error);
        }
    };

    const deleteIku5 = async (iku5_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku5/${iku5_id}`);
                fetchIku5List();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < iku5List.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = iku5List.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Col xs="12">
            <div className="mb-2 d-flex justify-content-end">
                <Link to="/addiku5">
                    <Button color="primary" size="sm">Input</Button>
                </Link>
            </div>
            <Card>
                <CardBody>
                    <CardTitle tag="h6" className="border-bottom p-1 mb-1 text-center">
                        <i className="bi bi-card-text me-1" style={{ fontSize: '15px' }}></i>
                        Hasil Kerja Dosen Mendapat Rekognisi Internasional atau Digunakan Oleh Masyarakat
                    </CardTitle>
                    <p style={{ marginLeft: '10px', fontSize: '12px' }}>Total data: {totalData}</p>
                    <Table bordered striped size="sm">
                        <thead style={{ fontSize: '12px' }}>
                            <tr>
                                <th>No</th>
                                <th>NIDN/NIDK</th>
                                <th>Nama Dosen</th>
                                <th>Detail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((iku5, index) => (
                                <tr key={iku5.iku5_id}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>{iku5.NIDN || iku5.NIDK}</td>
                                    <td>{iku5.nama_dosen}</td>
                                    <td>
                                        <Link to={`/iku5detail/${iku5.iku5_id}`}>
                                            <Button outline color="success" size="sm">Detail</Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            <Link to={`/update/iku5/${iku5.iku5_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku5(iku5.iku5_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku5List.length} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku5List;
