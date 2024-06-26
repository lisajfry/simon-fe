import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RespondenContext } from './RespondenContext';


const Iku1List = () => {
    const [iku1List, setIku1List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataResponden } = useContext(RespondenContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchIku1List();
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

    const fetchIku1List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku1');
            const iku1ListWithNama = await Promise.all(response.data.map(async (iku1) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku1.NIM);
                return { ...iku1, nama_mahasiswa: namaMahasiswa };
            }));
            setIku1List(iku1ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 1.");
            setLoading(false);
            console.error('Error fetching IKU 1 list:', error);
        }
    };

    const deleteIku1 = async (iku1_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku1/${iku1_id}`);
                fetchIku1List();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = iku1List.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(iku1List.length / itemsPerPage);

    return (
        <Col>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku1">
                    <Button color="primary">Input</Button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px', fontSize: '14px' }}>Total data: {totalDataResponden}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        TABEL RESPONDEN DATA LULUSAN
                    </CardTitle>
                </div>
                <CardBody>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama Lulusan</th>
                                <th>Status</th>
                                <th>Gaji</th>
                                <th>Masa Tunggu</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((iku1, index) => (
                                <tr key={iku1.iku1_id}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>{iku1.NIM}</td>
                                    <td>{iku1.nama_mahasiswa}</td>
                                    <td>{iku1.status}</td>
                                    <td>{iku1.gaji}</td>
                                    <td>{iku1.masa_tunggu}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link to={`/update/iku1/${iku1.iku1_id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteIku1(iku1.iku1_id)}><FaTrash /></Button>
                                        </div>
                                    </td>
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

export default Iku1List;