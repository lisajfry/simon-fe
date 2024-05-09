import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import PrestasiContext from './PrestasiContext';

const Iku2prestasiList = () => {
    const [iku2prestasiList, setIku2prestasiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataPrestasi } = useContext(PrestasiContext);
    const [data, setData] = useState([]);

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error while fetching nama mahasiswa:", error);
            return null;
        }
    };

    const fetchIku2prestasiList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku2prestasi');
            const iku2prestasiListWithNama = await Promise.all(response.data.map(async (iku2prestasi) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku2prestasi.NIM);
                return { ...iku2prestasi, nama_mahasiswa: namaMahasiswa };
            }));
            setIku2prestasiList(iku2prestasiListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 2 Kegiatan list:', error);
        }
    };

    const deleteIku2prestasi = async (iku2prestasi_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2prestasi/${iku2prestasi_id}`);
                fetchIku2prestasiList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    return (
        <Col>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {totalDataPrestasi}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>TABEL PRESTASI</CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>Mahasiswa Berprestasi</th>
                                <th>Nama Mahasiswa</th>
                                <th>Dosen Pembimbing</th>
                                <th>Nama Dosen</th>
                                <th>Tingkat Lomba</th>
                                <th>Prestasi</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku2prestasiList.map((iku2prestasi, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku2prestasi.NIM}</td>
                                    <td>{iku2prestasi.nama_mahasiswa}</td>
                                    <td>{iku2prestasi.NIDN}</td>
                                    <td>{iku2prestasi.nama_dosen}</td>
                                    <td>{iku2prestasi.tingkat_lomba}</td>
                                    <td>{iku2prestasi.prestasi}</td>
                                    <td>
                                        <Link to={`/update/iku2prestasi/${iku2prestasi.iku2prestasi_id}`}>
                                            <Button className="btn" outline color="info">Edit</Button>
                                        </Link>
                                        <Button className="btn" outline color="danger" onClick={() => deleteIku2prestasi(iku2prestasi.iku2prestasi_id)}>Delete</Button>
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

export default Iku2prestasiList;
