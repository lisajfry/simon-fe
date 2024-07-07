import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button, CardText, Row } from 'reactstrap';
import { FaFilePdf } from 'react-icons/fa';
import { useSertifikasiProfesi } from './SertifikasiProfesiContext';
import DosenContext from '../dosen/DosenContext';


const SertifikasiProfesiList = () => {
    const [sertifikasiProfesiList, setSertifikasiProfesiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { filteredIku4List, count } = useSertifikasiProfesi();
    const { totalDataDosen, totalDataDosenNIDK } = useContext(DosenContext);


    const totalDosen = totalDataDosen + totalDataDosenNIDK;
    const perhitungan = ((count / totalDosen) * 60); // Perhitungan persentase
    const buttonColor = perhitungan >= 50 ? 'success' : 'danger';
    const statusCapaian = perhitungan >= 50 ? 'Hasil Memenuhi' : 'Hasil Tidak Memenuhi';


    useEffect(() => {
        const fetchBerkasList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/berkassertifikasi');
                const berkasMap = response.data.reduce((acc, berkas) => {
                    acc[berkas.id_berkas] = berkas.nama_berkas;
                    return acc;
                }, {});
                return berkasMap;
            } catch (error) {
                console.error('Error saat mengambil data berkas:', error);
                return {};
            }
        };


        const fetchNamaDosen = async (identifier, type) => {
            try {
                const response = await axios.get(`http://localhost:8080/${type}/${identifier}`);
                return response.data.nama_dosen;
            } catch (error) {
                console.error("Error saat mengambil nama dosen:", error);
                return null;
            }
        };


        const fetchSertifikasiProfesiList = async () => {
            try {
                const berkasMap = await fetchBerkasList();
                const sertifikasiProfesiListWithNama = await Promise.all(filteredIku4List.map(async (iku4) => {
                    let namaDosen;
                    if (iku4.NIDN) {
                        namaDosen = await fetchNamaDosen(iku4.NIDN, 'dosen');
                    } else if (iku4.NIDK) {
                        namaDosen = await fetchNamaDosen(iku4.NIDK, 'dosenNIDK');
                    }
                    const namaBerkas = berkasMap[iku4.id_berkas] || 'Nama Berkas Tidak Ditemukan';
                    return { ...iku4, nama_dosen: namaDosen, nama_berkas: namaBerkas };
                }));
                setSertifikasiProfesiList(sertifikasiProfesiListWithNama);
                setLoading(false);
            } catch (error) {
                setError("Terjadi kesalahan saat mengambil data Sertifikasi Profesi.");
                setLoading(false);
                console.error('Error saat mengambil data Sertifikasi Profesi:', error);
            }
        };


        fetchSertifikasiProfesiList();
    }, [filteredIku4List]);


    const deleteIku4 = async (iku4_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku4/${iku4_id}`);
                setSertifikasiProfesiList(sertifikasiProfesiList.filter(item => item.iku4_id !== iku4_id));
            } catch (error) {
                console.error("Error saat menghapus data:", error);
            }
        }
    };


    return (
        <Col>


            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {count}</p>
                </div>
                <div className="form-group">
                    <Link to="/addiku4">
                        <button type="submit" className="btn btn-primary">Tambah</button>
                    </Link>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>Tabel Dosen yang Memiliki Sertifikasi</CardTitle>
                </div>
               
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIDN/NIDK</th>
                                <th>Nama Dosen</th>
                                <th>Tipe Berkas</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Bukti PDF</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sertifikasiProfesiList.map((iku4, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku4.NIDN || iku4.NIDK}</td>
                                    <td>{iku4.nama_dosen}</td>
                                    <td>{iku4.nama_berkas}</td>
                                    <td>{iku4.tanggal}</td>
                                    <td>{iku4.status}</td>
                                    <td>
                                        {iku4.bukti_pdf && (
                                            <a href={iku4.bukti_pdf} target="_blank" rel="noopener noreferrer">
                                                <FaFilePdf size={20} color="red" />
                                            </a>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <Link to={`/update/iku4/${iku4.iku4_id}`}>
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


export default SertifikasiProfesiList;


