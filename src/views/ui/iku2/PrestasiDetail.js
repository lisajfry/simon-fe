import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

const PrestasiDetail = () => {
    const { iku2prestasi_id } = useParams();
    const [iku2prestasi, setIku2prestasi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIku2prestasiDetail();
    }, [iku2prestasi_id]);

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

    const fetchIku2prestasiDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku2prestasi/${iku2prestasi_id}`);
            const iku2prestasiData = response.data;

            const namaMahasiswa = await fetchNamaMahasiswa(iku2prestasiData.NIM);
            const namaDosen = await fetchNamaDosen(iku2prestasiData.NIDN);

            setIku2prestasi({ ...iku2prestasiData, nama_mahasiswa: namaMahasiswa, nama_dosen: namaDosen });
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
                        Detail Prestasi Mahasiswa
                    </CardTitle>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <th>NIM</th>
                                <td>{iku2prestasi.NIM}</td>
                            </tr>
                            <tr>
                                <th>Nama Mahasiswa</th>
                                <td>{iku2prestasi.nama_mahasiswa}</td>
                            </tr>
                            <tr>
                                <th>Dosen Pembimbing</th>
                                <td>{iku2prestasi.NIDN} - {iku2prestasi.nama_dosen}</td>
                            </tr>
                            <tr>
                                <th>Nama Kompetisi</th>
                                <td>{iku2prestasi.nama_kompetisi} - {iku2prestasi.nama_kompetisi}</td>
                            </tr>
                            <tr>
                                <th>Penyelenggara</th>
                                <td>{iku2prestasi.penyelenggara} - {iku2prestasi.penyelenggara}</td>
                            </tr>
                            <tr>
                                <th>Tingkat Kompetisi</th>
                                <td>{iku2prestasi.tingkat_kompetisi}</td>
                            </tr>
                            <tr>
                                <th>Jumlah Peserta</th>
                                <td>{iku2prestasi.jmlh_peserta}</td>
                            </tr>
                            <tr>
                                <th>Prestasi</th>
                                <td>{iku2prestasi.prestasi}</td>
                            </tr>
                            <tr>
                                <th>Jumlah Negara Mengikuti</th>
                                <td>{iku2prestasi.jmlh_negara_mengikuti}</td>
                            </tr>
                            <tr>
                                <th>Negara yang Mengikuti</th>
                                <td>{iku2prestasi.countries}</td>
                            </tr>
                            <tr>
                                <th>Jumlah Provinsi Mengikuti</th>
                                <td>{iku2prestasi.jmlh_provinsi_mengikuti}</td>
                            </tr>
                            <tr>
                                <th>Provinsi yang Mengikuti</th>
                                <td>{iku2prestasi.provinces}</td>
                            </tr>
                            <tr>
                                <th>Sertifikat</th>
                                <td>
                                    <a href={`http://localhost:8080/uploads/${iku2prestasi.sertifikat}`} target="_blank" rel="noopener noreferrer">
                                        <AiOutlineFilePdf />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Link to={`/update/iku2/${iku2prestasi.iku2prestasi_id}`}>
                            <Button outline color="info" size="sm"><FaEdit /></Button>
                        </Link>
                        <Link to="/iku2prestasiList">
                            <Button color="primary" size="sm">Back to List</Button>
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default PrestasiDetail;
