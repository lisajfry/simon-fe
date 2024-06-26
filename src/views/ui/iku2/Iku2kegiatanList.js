import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import FontAwesome icons
import KegiatanContext from './KegiatanContext';

const Iku2kegiatanList = () => {
    const [iku2kegiatanList, setIku2kegiatanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataKegiatan } = useContext(KegiatanContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchIku2kegiatanList();
        axios.get('http://localhost:8080/iku2kegiatan')
            .then(response => {
                setData(response.data.map(item => ({
                    ...item,
                    tgl_mulai_kegiatan: new Date(item.tgl_mulai_kegiatan).toLocaleDateString(),
                    tgl_selesai_kegiatan: new Date(item.tgl_selesai_kegiatan).toLocaleDateString()
                })));
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
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
            console.error("Error fetching nama mahasiswa:", error);
            return null;
        }
    };

    const fetchIku2kegiatanList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku2kegiatan');
            const iku2kegiatanListWithNama = await Promise.all(response.data.map(async (iku2kegiatan) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku2kegiatan.NIM);
                const namaDosen = await fetchNamaDosen(iku2kegiatan.NIDN);
                return { ...iku2kegiatan, nama_mahasiswa: namaMahasiswa, nama_dosen: namaDosen };
            }));
            setIku2kegiatanList(iku2kegiatanListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 2 Kegiatan list:', error);
        }
    };

    const deleteIku2kegiatan = async (iku2kegiatan_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2kegiatan/${iku2kegiatan_id}`);
                fetchIku2kegiatanList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < iku2kegiatanList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = iku2kegiatanList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Col>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku2kegiatan">
                    <Button color="primary">Input</Button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px', fontSize: '14px' }}>Total data: {totalDataKegiatan}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-card-text me-2"> </i>         
                    Tabel Kegiatan Mahasiswa di Luar Program Studi
                </CardTitle>
                </div>
                 <CardBody className="">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Mahasiswa</th>
                                <th>Aktivitas</th>
                                <th>Tempat Kegiatan</th>
                                <th>SKS</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Dosen Pembimbing</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((iku2kegiatan, index) => (
                                <tr key={iku2kegiatan.iku2kegiatan_id}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>{iku2kegiatan.NIM} - {iku2kegiatan.nama_mahasiswa}</td>
                                    <td>{iku2kegiatan.aktivitas}</td>
                                    <td>{iku2kegiatan.tempat_kegiatan}</td>
                                    <td>{iku2kegiatan.sks}</td>
                                    <td>{iku2kegiatan.tgl_mulai_kegiatan}</td>
                                    <td>{iku2kegiatan.tgl_selesai_kegiatan}</td>
                                    <td>{iku2kegiatan.NIDN} - {iku2kegiatan.nama_dosen}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link to={`/update/iku2kegiatan/${iku2kegiatan.iku2kegiatan_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku2kegiatan(iku2kegiatan.iku2kegiatan_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku2kegiatanList.length} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku2kegiatanList;
