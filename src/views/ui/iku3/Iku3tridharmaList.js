import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

const Iku3tridharmaList = () => {
    const [iku3tridharmaList, setIku3tridharmaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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

    return (
        <Col>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>TABEL DOSEN BERTRIDHARMA DI KAMPUS LAIN</CardTitle>
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
                                            {iku3tridharma.surat_sk}
                                        </a>
                                    </td>
                                    <td>{iku3tridharma.ptn_tridharma}</td>
                                    <td>{iku3tridharma.tgl_mulai_tridharma}</td>
                                    <td>{iku3tridharma.tgl_selesai_tridharma}</td>
                                    <td>
                                        <Link to={`/update/iku3tridharma/${iku3tridharma.iku3tridharma_id}`}>
                                            <Button className="btn" outline color="info">Edit</Button>
                                        </Link>
                                        <Button className="btn" outline color="danger" onClick={() => deleteIku3tridharma(iku3tridharma.iku3tridharma_id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku3tridharmaList;
