import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button, Row } from 'reactstrap';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Iku3Context from './Iku3Context';

const Iku3praktisiList = () => {
    const [iku3praktisiList, setIku3praktisiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { totalDataIku3Praktisi } = useContext(Iku3Context);

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
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
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
        <Col xs="12">
            <div className="mb-2 d-flex justify-content-end">
                <Link to="/addiku3praktisi">
                    <Button color="primary" size="sm">Input</Button>
                </Link>
            </div>
            <Card>
                <CardBody className="p-2">
                    <Row className="mb-2">
                        <Col xs="12">
                            <CardTitle tag="h6" className="border-bottom p-1 mb-1 text-center">
                                <i className="bi bi-card-text me-1" style={{ fontSize: '15px' }}></i>
                                Tabel Dosen Bekerja Sebagai Praktisi di Instansi Praktisi
                            </CardTitle>
                            <p className="m-0" style={{ fontSize: '12px' }}>Total data: {totalDataIku3Praktisi}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Table bordered striped responsive size="sm" className="mb-1">
                                <thead style={{ fontSize: '12px' }}>
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
                                <tbody style={{ fontSize: '12px' }}>
                                    {displayedData.map((iku3praktisi, index) => (
                                        <tr key={index}>
                                            <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                            <td>{iku3praktisi.NIDN}</td>
                                            <td>{iku3praktisi.nama_dosen}</td>
                                            <td>
                                                <a href={`http://localhost:8080/uploads/${iku3praktisi.surat_sk}`} target="_blank" rel="noopener noreferrer">
                                                    <AiOutlineFilePdf />
                                                </a>
                                            </td>
                                            <td>{iku3praktisi.instansi_praktisi}</td>
                                            <td>{iku3praktisi.tgl_mulai_praktisi}</td>
                                            <td>{iku3praktisi.tgl_selesai_praktisi}</td>
                                            <td>
                                                <div className="d-flex justify-content-between">
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
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="d-flex justify-content-center mt-1" >
                            <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm">Previous</Button>
                            <span className="mx-1" style={{ fontSize: '12px' }}>Page {currentPage}</span>
                            <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= iku3praktisiList.length} size="sm">Next</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku3praktisiList;
