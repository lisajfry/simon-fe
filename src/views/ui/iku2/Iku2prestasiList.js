import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import PrestasiContext from './PrestasiContext';
import { AiOutlineFilePdf } from 'react-icons/ai';

const Iku2prestasiList = () => {
    const [iku2prestasiList, setIku2prestasiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataPrestasi } = useContext(PrestasiContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchIku2prestasiList();
    }, []);

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error fetching nama mahasiswa:", error);
            return null;
        }
    };

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchCountries = async (countryCodes) => {
        try {
            const response = await axios.get('http://localhost:8080/countries', {
                params: {
                    codes: countryCodes.join(',')
                }
            });
            return response.data.map(country => country.name);
        } catch (error) {
            console.error("Error fetching countries:", error);
            return [];
        }
    };

    const fetchProvinces = async (provinceCodes) => {
        try {
            const response = await axios.get('http://localhost:8080/provinces', {
                params: {
                    codes: provinceCodes.join(',')
                }
            });
            return response.data.map(province => province.name);
        } catch (error) {
            console.error("Error fetching provinces:", error);
            return [];
        }
    };

    const fetchIku2prestasiList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku2prestasi');
            const iku2prestasiListWithNama = await Promise.all(response.data.map(async (iku2prestasi) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku2prestasi.NIM);
                const namaDosen = await fetchNamaDosen(iku2prestasi.NIDN);
                
                return { ...iku2prestasi, nama_mahasiswa: namaMahasiswa, nama_dosen: namaDosen };
            }));
            setIku2prestasiList(iku2prestasiListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 2 Kegiatan list:', error);
        }
    };

    const deleteIku2prestasi = async (iku2prestasi_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2prestasi/${iku2prestasi_id}`);
                fetchIku2prestasiList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < iku2prestasiList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = iku2prestasiList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Col>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku2prestasi">
                    <Button color="primary">Input</Button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px', fontSize: '14px' }}>Total data: {totalDataPrestasi}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-card-text me-2"> </i>         
                    Tabel Prestasi Mahasiswa
                </CardTitle>
                </div>
                 <CardBody className="">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama Mahasiswa</th>
                                <th>Detail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((iku2prestasi, index) => (
                                <tr key={iku2prestasi.iku2prestasi_id}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>{iku2prestasi.NIM}</td>
                                    <td>{iku2prestasi.nama_mahasiswa}</td>
                                    <td>
                                    <Link to={`/prestasidetail/${iku2prestasi.iku2prestasi_id}`}>
                                        <Button outline color="success" size="sm">Detail</Button>
                                    </Link>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            <Link to={`/editiku2prestasi/${iku2prestasi.iku2prestasi_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku2prestasi(iku2prestasi.iku2prestasi_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku2prestasiList.length} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku2prestasiList;
