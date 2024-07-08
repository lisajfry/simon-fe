import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

const InboundDetail = () => {
    const { iku2inbound_id } = useParams();
    const [iku2inbound, setIku2inbound] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIku2inboundDetail();
    }, [iku2inbound_id]);

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

    const fetchIku2inboundDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku2inbound/${iku2inbound_id}`);
            const iku2inboundData = response.data;

            const namaMahasiswa = await fetchNamaMahasiswa(iku2inboundData.NIM);
            const namaDosen = await fetchNamaDosen(iku2inboundData.NIDN);

            setIku2inbound({ ...iku2inboundData, nama_mahasiswa: namaMahasiswa, nama_dosen: namaDosen });
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
                        Detail Inbound Mahasiswa
                    </CardTitle>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <th>NIM</th>
                                <td>{iku2inbound.NIM}</td>
                            </tr>
                            <tr>
                                <th>Nama Mahasiswa</th>
                                <td>{iku2inbound.nama_mahasiswa}</td>
                            </tr>
                            <tr>
                                <th>Dosen Pembimbing</th>
                                <td>{iku2inbound.NIDN} - {iku2inbound.nama_dosen}</td>
                            </tr>
                            <tr>
                                <th>Semester</th>
                                <td>{iku2inbound.semester} - {iku2inbound.semester}</td>
                            </tr>
                            <tr>
                                <th>Tahun</th>
                                <td>{iku2inbound.tahun} - {iku2inbound.tahun}</td>
                            </tr>
                            <tr>
                                <th>PTN Asal</th>
                                <td>{iku2inbound.ptn_asal}</td>
                            </tr>
                            <tr>
                                <th>PTN Tempat Pertukaran</th>
                                <td>{iku2inbound.ptn_pertukaran}</td>
                            </tr>
                            <tr>
                                <th>Surat Rekomendasi</th>
                                <td>
                                    <a href={`http://localhost:8080/uploads/${iku2inbound.surat_rekomendasi}`} target="_blank" rel="noopener noreferrer">
                                        <AiOutlineFilePdf />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>SKS</th>
                                <td>{iku2inbound.sks}</td>
                            </tr>
                            <tr>
                                <th>Tanggal Mulai </th>
                                <td>{iku2inbound.tgl_mulai_inbound}</td>
                            </tr>
                            <tr>
                                <th>Tanggal Selesai</th>
                                <td>{iku2inbound.tgl_selesai_inbound}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Link to={`/update/iku2/${iku2inbound.iku2inbound_id}`}>
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

export default InboundDetail;
