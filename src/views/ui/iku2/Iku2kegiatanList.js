import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import KegiatanContext from './KegiatanContext';

const Iku2kegiatanList = () => {
    const [iku2kegiatanList, setIku2kegiatanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataKegiatan } = useContext(KegiatanContext);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchIku2kegiatanList();
        // fetchNamaMahasiswa(); // Perlu dihapus karena tidak digunakan di komponen ini
        axios.get('http://localhost:8080/iku2kegiatan')
            .then(response => {
                setData(response.data.map(item => {
                    console.log('Tanggal Mulai:', new Date(item.tgl_mulai_kegiatan).toLocaleDateString());
                    console.log('Tanggal Selesai:', new Date(item.tgl_selesai_kegiatan).toLocaleDateString());
                    return {
                        ...item,
                        tgl_mulai_kegiatan: new Date(item.tgl_mulai_kegiatan).toLocaleDateString(),
                        tgl_selesai_kegiatan: new Date(item.tgl_selesai_kegiatan).toLocaleDateString()
                    };
                }));
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
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

    const fetchIku2kegiatanList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku2kegiatan');
            const iku2kegiatanListWithNama = await Promise.all(response.data.map(async (iku2kegiatan) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku2kegiatan.NIM);
                return { ...iku2kegiatan, nama_mahasiswa: namaMahasiswa };
            }));
            setIku2kegiatanList(iku2kegiatanListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 2 Kegiatan list:', error);
        }
    };

    const deleteIku2kegiatan = async (iku2kegiatan_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2kegiatan/${iku2kegiatan_id}`);
                fetchIku2kegiatanList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    return (
        <Col>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {totalDataKegiatan}</p>
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
                                <th>Aktivitas</th>
                                <th>Tempat Kegiatan</th>
                                <th>SKS</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku2kegiatanList.map((iku2kegiatan, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku2kegiatan.NIM}</td>
                                    <td>{iku2kegiatan.nama_mahasiswa}</td>
                                    <td>{iku2kegiatan.aktivitas}</td>
                                    <td>{iku2kegiatan.tempat_kegiatan}</td>
                                    <td>{iku2kegiatan.sks}</td>
                                    <td>{iku2kegiatan.tgl_mulai_kegiatan}</td>
                                    <td>{iku2kegiatan.tgl_selesai_kegiatan}</td>
                                    <td>
                                        <Link to={`/update/iku2kegiatan/${iku2kegiatan.iku2kegiatan_id}`}>
                                            <Button className="btn" outline color="info">Edit</Button>
                                        </Link>
                                        <Button className="btn" outline color="danger" onClick={() => deleteIku2kegiatan(iku2kegiatan.iku2kegiatan_id)}>Delete</Button>
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

export default Iku2kegiatanList;
