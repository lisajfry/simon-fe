import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

const KegiatanDetail = () => {
    const { iku2kegiatan_id } = useParams();
    const [iku2kegiatan, setIku2kegiatan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIku2kegiatanDetail();
    }, [iku2kegiatan_id]);

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error fetching nama mahasiswa:", error);
            return null;
        }
    };

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchIku2kegiatanDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku2kegiatan/${iku2kegiatan_id}`);
            const iku2kegiatanData = response.data;

            const namaMahasiswa = await fetchNamaMahasiswa(iku2kegiatanData.NIM);
            const namaDosen = await fetchNamaDosen(iku2kegiatanData.NIDN);

            setIku2kegiatan({ ...iku2kegiatanData, nama_mahasiswa: namaMahasiswa, nama_dosen: namaDosen });
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 2 Kegiatan detail:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Col>
            <Card>
                <CardBody>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        Detail Kegiatan Mahasiswa
                    </CardTitle>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <th>NIM</th>
                                <td>{iku2kegiatan.NIM}</td>
                            </tr>
                            <tr>
                                <th>Nama Mahasiswa</th>
                                <td>{iku2kegiatan.nama_mahasiswa}</td>
                            </tr>
                            <tr>
                                <th>Dosen Pembimbing</th>
                                <td>{iku2kegiatan.NIDN} - {iku2kegiatan.nama_dosen}</td>
                            </tr>
                            <tr>
                                <th>Semester</th>
                                <td>{iku2kegiatan.semester} - {iku2kegiatan.semester}</td>
                            </tr>
                            <tr>
                                <th>Tahun</th>
                                <td>{iku2kegiatan.tahun} - {iku2kegiatan.tahun}</td>
                            </tr>
                            <tr>
                                <th>Aktivitas</th>
                                <td>{iku2kegiatan.aktivitas}</td>
                            </tr>
                            <tr>
                                <th>Tempat Kegiatan</th>
                                <td>{iku2kegiatan.tempat_kegiatan}</td>
                            </tr>
                            <tr>
                                <th>SKS</th>
                                <td>{iku2kegiatan.sks}</td>
                            </tr>
                            <tr>
                                <th>Tanggal Mulai </th>
                                <td>{iku2kegiatan.tgl_mulai_kegiatan}</td>
                            </tr>
                            <tr>
                                <th>Tanggal Selesai</th>
                                <td>{iku2kegiatan.tgl_selesai_kegiatan}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Link to={`/update/iku2/${iku2kegiatan.iku2kegiatan_id}`}>
                            <Button outline color="info" size="sm"><FaEdit /></Button>
                        </Link>
                        <Link to="/iku3membimbinglist">
                            <Button color="primary" size="sm">Back to List</Button>
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default KegiatanDetail;
