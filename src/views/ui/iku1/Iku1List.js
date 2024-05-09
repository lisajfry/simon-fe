import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import RespondenContext from './RespondenContext';

    const Iku1List = () => {
    const [iku1List, setIku1List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataResponden } = useContext(RespondenContext);
    
    useEffect(() => {
        fetchIku1List();
        fetchNamaMahasiswa();
    console.log(typeof iku1List); // Check the data type
    console.log(iku1List); // Check the actual value
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
    }


    return (
        <Col>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {totalDataResponden}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>TABEL Responden</CardTitle>
                </div>
                    <CardBody>
                        <Table>
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
                        {iku1List.map((iku1, index) => (
                            <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{iku1.NIM}</td>
                            <td>{iku1.nama_mahasiswa}</td>
                            <td>{iku1.status}</td>
                            <td>{iku1.gaji}</td>
                            <td>{iku1.masa_tunggu}</td>
                            <td>
                                <Link to={`/update/iku1/${iku1.iku1_id}`}>
                                    <Button className="btn" outline color="info">Edit</Button>
                                </Link>
                                    <Button className="btn" outline color="danger" onClick={() => deleteIku1(iku1.iku1_id)}>Delete</Button>
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

export default Iku1List;
