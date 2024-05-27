import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Iku2inboundList = () => {
    const [iku2inboundList, setIku2inboundList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    
    
    useEffect(() => {
        fetchIku2inboundList();
    }, []);

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error while fetching nama mahasiswa:", error);
            return null;
        }
    };

    const fetchIku2inboundList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku2inbound');
            const iku2inboundListWithNama = await Promise.all(response.data.map(async (iku2inbound) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku2inbound.NIM);
                return { ...iku2inbound, nama_mahasiswa: namaMahasiswa };
            }));
            setIku2inboundList(iku2inboundListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Inbound.");
            setLoading(false);
            console.error('Error fetching IKU 2 Inbound list:', error);
        }
    };

    const deleteIku2inbound = async (iku2inbound_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2inbound/${iku2inbound_id}`);
                fetchIku2inboundList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < iku2inboundList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = iku2inboundList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <Col>
        <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku2inbound">
                    <button type="submit" className="btn btn-primary">Input</button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        TABEL DAFTAR MAHASISWA INBOUND
                    </CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama Mahasiswa</th>
                                <th>Asal Negara</th>
                                <th>PTN Asal</th>
                                <th>Surat Rekomendasi</th>
                                <th>Sks</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku2inboundList.map((iku2inbound, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku2inbound.NIM}</td>
                                    <td>{iku2inbound.nama_mahasiswa}</td>
                                    <td>{iku2inbound.asal_negara}</td>
                                    <td>{iku2inbound.asal_ptn}</td>
                                    <td>
                                        <a href={`http://localhost:8080/uploads/${iku2inbound.surat_rekomendasi}`} target="_blank" rel="noopener noreferrer">
                                            <AiOutlineFilePdf /> {/* Gunakan ikon di sini */}
                                        </a>
                                    </td>
                                    <td>{iku2inbound.sks}</td>
                                    <td>{iku2inbound.tgl_mulai_inbound}</td>
                                    <td>{iku2inbound.tgl_selesai_inbound}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link to={`/update/iku2inbound/${iku2inbound.iku2inbound_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku2inbound(iku2inbound.iku2inbound_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku2inboundList.length} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku2inboundList;
