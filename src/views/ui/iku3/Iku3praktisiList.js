import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

const Iku3praktisiList = () => {
    const [iku3praktisiList, setIku3praktisiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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

    return (
        <Col>
        <Link to="/addiku3praktisi">
                <Button className="btn" outline color="info">Tambahkan</Button>
            </Link>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>TABEL DOSEN PRAKTISI DI KAMPUS LAIN</CardTitle>
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
                                            {iku3praktisi.surat_sk}
                                        </a>
                                    </td>
                                    <td>{iku3praktisi.instansi_praktisi}</td>
                                    <td>{iku3praktisi.tgl_mulai_praktisi}</td>
                                    <td>{iku3praktisi.tgl_selesai_praktisi}</td>
                                    <td>
                                        <Link to={`/update/iku3praktisi/${iku3praktisi.iku3praktisi_id}`}>
                                            <Button className="btn" outline color="info">Edit</Button>
                                        </Link>
                                        <Button className="btn" outline color="danger" onClick={() => deleteIku3praktisi(iku3praktisi.iku3praktisi_id)}>Delete</Button>
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

export default Iku3praktisiList;
