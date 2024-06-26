import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Iku3membimbingList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [totalData, setTotalData] = useState(0);

    useEffect(() => {
        fetchIku3membimbingList();
    }, []);

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchIku3membimbingList = async () => {
        try {
            const [responsePrestasi, responseKegiatan, responseInbound] = await Promise.all([
                axios.get('http://localhost:8080/iku2prestasi'),
                axios.get('http://localhost:8080/iku2kegiatan'),
                axios.get('http://localhost:8080/iku2inbound')
            ]);

            const iku2prestasiListWithNama = await mapItems(responsePrestasi.data, 'prestasi');
            const iku2kegiatanListWithNama = await mapItems(responseKegiatan.data, 'kegiatan');
            const iku2inboundListWithNama = await mapItems(responseInbound.data, 'inbound');

            const combinedData = [
                ...iku2prestasiListWithNama,
                ...iku2kegiatanListWithNama,
                ...iku2inboundListWithNama
            ];

            setData(combinedData);
            setTotalData(combinedData.length);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data.");
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const mapItems = async (items, type) => {
        return await Promise.all(items.map(async (item) => {
            const namaDosen = await fetchNamaDosen(item.NIDN);
            return { ...item, nama_dosen: namaDosen, type };
        }));
    };

    const deleteItem = async (itemId) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus item ini?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/${itemId}`);
                fetchIku3membimbingList();
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const handleNextPage = () => {
        if ((currentPage * itemsPerPage) < totalData) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Col xs="12">
            <Card>
                <CardBody>
                    <CardTitle tag="h6" className="border-bottom p-1 mb-1 text-center">
                        <i className="bi bi-card-text me-1" style={{ fontSize: '15px' }}></i>
                        Dosen Membimbing Mahasiswa Berkegiatan di Luar Program Studi
                    </CardTitle>
                    <p style={{ marginLeft: '10px', fontSize: '12px' }}>Total data: {totalData}</p>
                    <Table bordered striped size="sm">
                        <thead style={{ fontSize: '12px' }}>
                            <tr>
                                <th>No</th>
                                <th>NIDN</th>
                                <th>Nama Dosen</th>
                                <th>Detail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '12px' }}>
                            {displayedData.map((item, index) => (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item.NIDN}</td>
                                    <td>{item.nama_dosen}</td>
                                    <td>
                                        <Link to={`/${item.type}/${item.id}`}>
                                            <Button outline color="success" size="sm">Detail</Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            <Link to={`/update/${item.id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteItem(item.id)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="sm" fontSize="12px">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '12px' }}>Page {currentPage}</span>
                        <Button onClick={handleNextPage} disabled={(currentPage * itemsPerPage) >= totalData} size="sm">Next</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku3membimbingList;
