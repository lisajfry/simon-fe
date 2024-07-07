import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

const Iku5Detail = () => {
    const { iku5_id } = useParams();
    const [iku5, setIku5] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIku5Detail();
    }, [iku5_id]);

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchNamaDosenNIDK = async (NIDK) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosenNIDK/${NIDK}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchIku5Detail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku5/${iku5_id}`);
            const iku5Data = response.data;
    
            // Pastikan iku5Data memiliki properti id_years yang valid
            if (!iku5Data.id) {
                throw new Error("ID years tidak ditemukan.");
            }
    
            const namaDosenNIDN = await fetchNamaDosen(iku5Data.NIDN);
            const namaDosenNIDK = await fetchNamaDosenNIDK(iku5Data.NIDK);
            const namaDosen = namaDosenNIDN || namaDosenNIDK;
    
        
    
            setIku5({ ...iku5Data, nama_dosen: namaDosen });
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 5 Detail.");
            setLoading(false);
            console.error('Error fetching IKU 5 Detail:', error);
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
                        DETAIL HASIL KERJA DOSEN DIGUNAKAN OLEH MASYARAKAT ATAU MENDAPAT REKOGNISI INTERNASIONAL
                    </CardTitle>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <th>NIDN / NIDK</th>
                                <td>{iku5.NIDN} || {iku5.NIDK}</td>
                            </tr>
                            <tr>
                                <th>Nama Dosen</th>
                                <td>{iku5.nama_dosen}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{iku5.status}</td>
                            </tr>
                            <tr>
                                <th>Jenis Karya</th>
                                <td>{iku5.jenis_karya}</td>
                            </tr>
                            <tr>
                                <th>Kategori Karya</th>
                                <td>{iku5.kategori_karya}</td>
                            </tr>
                            <tr>
                                <th>Judul Karya</th>
                                <td>{iku5.judul_karya}</td>
                            </tr>
                            <tr>
                                <th>Pendanaan</th>
                                <td>{iku5.pendanaan}</td>
                            </tr>
                            <tr> 
                                <th>Kriteria</th>
                                <td>{iku5.kriteria}</td>
                            </tr>
                            <tr>
                                <th>Bukti Pendukung</th>
                                <td>
                                    <a href={`http://localhost:8080/uploads/${iku5.bukti_pendukung}`} target="_blank" rel="noopener noreferrer">
                                        <AiOutlineFilePdf />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Tahun</th>
                                <td> {iku5.tahun}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Link to={`/update/iku5/${iku5.iku5_id}`}>
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

export default Iku5Detail;
