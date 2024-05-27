import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Iku3Context from './Iku3Context';

const Iku3praktisiList = () => {
    const [iku3praktisiList, setIku3praktisiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const {totalDataIku3Praktisi} = useContext (Iku3Context);
    
    useEffect(() => {
        fetchIku3praktisiList();
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

    const fetchIku3praktisiList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku3praktisi');
            const iku3praktisiListWithNama = await Promise.all(response.data.map(async (iku3praktisi) => {
                const namaDosen = await fetchNamaDosen(iku3praktisi.NIDN);
                return { ...iku3praktisi, nama_dosen: namaDosen };
            }));
            setIku3praktisiList(iku3praktisiListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 3 Praktisi.");
            setLoading(false);
            console.error('Error fetching IKU 3 Praktisi list:', error);
        }
    };

    const deleteIku3praktisi = async (iku3praktisi_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku3praktisi/${iku3praktisi_id}`);
                fetchIku3praktisiList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < iku3praktisiList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = iku3praktisiList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Col>
        <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku3praktisi">
                    <button type="submit" className="btn btn-primary">Input</button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {}</p>
                    </div>
                <div style={{ textAlign: 'center' }}>
                <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    TABEL DOSEN BEKERJA SEBAGAI PRAKTISI DI INSTANSI PRAKTISI
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
                                <th>Instansi Praktisi</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku3praktisiList.map((iku3praktisi, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku3praktisi.NIDN}</td>
                                    <td>{iku3praktisi.nama_dosen}</td>
                                    <td>
                                        <a href={`http://localhost:8080/uploads/${iku3praktisi.surat_sk}`} target="_blank" rel="noopener noreferrer">
                                            <AiOutlineFilePdf /> {/* Gunakan ikon di sini */}
                                        </a>
                                    </td>
                                    <td>{iku3praktisi.instansi_praktisi}</td>
                                    <td>{iku3praktisi.tgl_mulai_praktisi}</td>
                                    <td>{iku3praktisi.tgl_selesai_praktisi}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link to={`/update/iku3praktisi/${iku3praktisi.iku3praktisi_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku3praktisi(iku3praktisi.iku3praktisi_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku3praktisiList.length} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku3praktisiList;
