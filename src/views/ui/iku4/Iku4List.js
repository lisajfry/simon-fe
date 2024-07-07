import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button, CardText, Row } from 'reactstrap';
import Iku4Context from './Iku4Context';
import { FaExclamationCircle, FaFilePdf } from 'react-icons/fa';
import { useSertifikasiProfesi } from './SertifikasiProfesiContext';
import { useDosenKalanganPraktisi } from './DosenKalanganPraktisiContext';
import DosenContext from '../dosen/DosenContext';


const Iku4List = () => {
    const [iku4List, setIku4List] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataIku4 } = useContext(Iku4Context);
    const { totalDataDosen, totalDataDosenNIDK } = useContext(DosenContext);
    const { filteredIku4List: sertifikasiProfesiList, count: sertifikasiProfesiCount } = useSertifikasiProfesi();
    const { filteredIku4List: kalanganPraktisiList, count: kalanganPraktisiCount } = useDosenKalanganPraktisi();


    const totalDosen = totalDataDosen + totalDataDosenNIDK;
    const perhitungan = ((sertifikasiProfesiCount / totalDosen) * 60) + ((kalanganPraktisiCount / totalDosen) * 40);
    const buttonColor = perhitungan >= 50 ? 'success' : 'danger';
    const statusCapaian = perhitungan >= 50 ? 'Hasil Memenuhi' : 'Hasil Tidak Memenuhi';


    useEffect(() => {
        fetchIku4List();
    }, [year]); // Menambahkan year ke dependency array untuk memanggil fetchIku4List setiap kali year berubah


    const fetchNamaDosen = async (identifier, type) => {
        try {
            const response = await axios.get(`http://localhost:8080/${type}/${identifier}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error saat mengambil nama dosen:", error);
            return null;
        }
    };


    const fetchIku4List = async () => {
        setLoading(true); // Set loading menjadi true ketika memulai fetch data baru
        setError(null); // Bersihkan error saat memulai fetch data baru
        try {
            const response = await axios.get(`http://localhost:8080/iku4`, {
                params: {
                    year: year // Mengirim tahun ke backend sebagai parameter query
                }
            });
           
            const berkasMap = await fetchBerkasList();
   
            const iku4ListWithNama = await Promise.all(response.data.map(async (iku4) => {
                let namaDosen;
                if (iku4.NIDN) {
                    namaDosen = await fetchNamaDosen(iku4.NIDN, 'dosen');
                } else if (iku4.NIDK) {
                    namaDosen = await fetchNamaDosen(iku4.NIDK, 'dosenNIDK');
                }
                const namaBerkas = berkasMap[iku4.id_berkas] || 'Nama Berkas Tidak Ditemukan';


                const result = { ...iku4, nama_dosen: namaDosen, nama_berkas: namaBerkas };
                console.log('Data IKU 4 dengan nama dosen dan nama berkas:', result); // Log data setelah pemrosesan
                return result;
            }));
   
            setIku4List(iku4ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 4.");
            setLoading(false);
            console.error('Error saat mengambil data IKU 4:', error);
        }
    };


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


    const deleteIku4 = async (iku4_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku4/${iku4_id}`);
                fetchIku4List();
            } catch (error) {
                console.error("Error saat menghapus data:", error);
            }
        }
    }


    return (
        <Col>
            <Row>
                <Col md="6" lg="6">
                    <Card body className='text-center'>
                        <CardTitle tag="h5">Cara Perhitungan</CardTitle>
                        <CardText style={{ fontSize: 'small', color: '#999' }}>
                            <div>(Dosen yang Memiliki Sertifikat Kompetensi : Jumlah Dosen dengan NIDN dan NIDK) x 60 </div>
                            <div> + </div>
                            <div>(Dosen dari Kalangan Praktisi Profesional : Jumlah Dosen dengan NIDN, NIDK, NUP) x 40</div>
                            <p> </p>
                        </CardText>
                    </Card>
                </Col>


                <Col md="6" lg="6">
                    <Card body className='text-center'>
                        <CardText style={{ fontSize: 'Medium', color: '' }}>
                            <div>Target IKU 4 = 50%</div>
                            <div>Persentase Capaian = {perhitungan.toFixed(2)}%</div>
                            <p></p>
                            <div>
                                <Button color={buttonColor}>
                                    {statusCapaian}
                                </Button>
                            </div>
                        </CardText>
                    </Card>
                </Col>
            </Row>


            <Card>
                <div>
                    <p style={{ marginLeft: '10px' }}>Total data: {totalDataIku4}</p>
                </div>
                <div className="form-group">
                    <Link to="/addiku4">
                        <button type="submit" className="btn btn-primary" style={{marginLeft: '10px'}}>Tambah</button>
                    </Link>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>Tabel IKU 4</CardTitle>
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
                            {iku4List.map((iku4, index) => (
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


export default Iku4List;
