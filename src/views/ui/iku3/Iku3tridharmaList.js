import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Iku3Context from './Iku3Context';

const Iku3tridharmaList = () => {
    const [iku3tridharmaList, setIku3tridharmaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const {totalDataIku3tridharma} = useContext (Iku3Context);
    
    
    useEffect(() => {
        fetchIku3tridharmaList();
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

    const fetchIku3tridharmaList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku3tridharma');
            const iku3tridharmaListWithNama = await Promise.all(response.data.map(async (iku3tridharma) => {
                const namaDosen = await fetchNamaDosen(iku3tridharma.NIDN);
                return { ...iku3tridharma, nama_dosen: namaDosen };
            }));
            setIku3tridharmaList(iku3tridharmaListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 3 Tridharma.");
            setLoading(false);
            console.error('Error fetching IKU 3 Tridharma list:', error);
        }
    };

    const deleteIku3tridharma = async (iku3tridharma_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku3tridharma/${iku3tridharma_id}`);
                fetchIku3tridharmaList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < iku3tridharmaList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = iku3tridharmaList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <Col>
        <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku3tridharma">
                    <button type="submit" className="btn btn-primary">Input</button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {totalDataIku3tridharma}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        TABEL DOSEN BERTRIDHARMA DI KAMPUS LAIN
                    </CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>NIDN</th>
                                <th>Nama Dosen</th>
                                <th>Surat SK</th>
                                <th>PTN Tridharma</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku3tridharmaList.map((iku3tridharma, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku3tridharma.NIDN}</td>
                                    <td>{iku3tridharma.nama_dosen}</td>
                                    <td>
                                        <a href={`http://localhost:8080/uploads/${iku3tridharma.surat_sk}`} target="_blank" rel="noopener noreferrer">
                                            <AiOutlineFilePdf /> {/* Gunakan ikon di sini */}
                                        </a>
                                    </td>
                                    <td>{iku3tridharma.ptn_tridharma}</td>
                                    <td>{iku3tridharma.tgl_mulai_tridharma}</td>
                                    <td>{iku3tridharma.tgl_selesai_tridharma}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link to={`/update/iku3tridharma/${iku3tridharma.iku3tridharma_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku3tridharma(iku3tridharma.iku3tridharma_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku3tridharmaList.length} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku3tridharmaList;
