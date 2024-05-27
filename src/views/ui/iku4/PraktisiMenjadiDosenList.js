import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

const Iku4List = () => {
    const [iku4List, setIku4List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIku4List();
    }, []);

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get('http://localhost:8080/dosen/${NIDN}');
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error saat mengambil nama dosen:", error);
            return null;
        }
    };

    const fetchIku4List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku4');
            const iku4ListWithNama = await Promise.all(response.data.map(async (iku4) => {
                const namaDosen = await fetchNamaDosen(iku4.NIDN);
                return { ...iku4, nama_dosen: namaDosen };
            }));
            setIku4List(iku4ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 4.");
            setLoading(false);
            console.error('Error saat mengambil data IKU 4:', error);
        }
    };

    const deleteIku4 = async (iku4_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete('http://localhost:8080/delete/iku4/${iku4_id}');
                fetchIku4List();
            } catch (error) {
                console.error("Error saat menghapus data:", error);
            }
        }
    };

    // Filter data based on status "Dosen Berkualifikasi S3"
    const filteredIku4List = iku4List.filter(iku4 => iku4.status === "Praktisi Menjadi Dosen");

    return (
        <Col>
            <Card>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>Tabel Praktisi Menjadi Dosen</CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>NIDN</th>
                                <th>Nama Dosen</th>
                                <th>Status</th>
                                <th>Bukti PDF</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIku4List.map((iku4, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku4.NIDN}</td>
                                    <td>{iku4.nama_dosen}</td>
                                    <td>{iku4.status}</td>
                                    <td>{iku4.bukti_pdf}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <Link to={'/update/iku4/${iku4.iku4_id}'}>
                                                <Button className="btn" outline color="info">Edit</Button>
                                            </Link>
                                            <Button className="btn" outline color="danger" onClick={() => deleteIku4(iku4.iku4_id)}>Delete</Button>
                                        </div>
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

export default Iku4List;