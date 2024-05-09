import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Col } from "reactstrap";
import KegiatanContext from '../iku2/KegiatanContext';

const PertukaranPelajarList = () => {
    const [totalDataTukarPelajar, setTotalDataTukarPelajar] = useState(0); // State untuk menyimpan total data mahasiswa dengan keterangan "lulus"
    const [iku2kegiatan, setIku2kegiatan] = useState([]);

    useEffect(() => {
        getIku2kegiatan();
    }, []);

    const getIku2kegiatan = async () => {
        try {
            const response = await axios.get("http://localhost:8080/iku2kegiatan");
            setIku2kegiatan(response.data);

            // Hitung total data mahasiswa dengan keterangan "lulus"
            const totalDataTukarPelajar = response.data.filter(iku2kegiatan => iku2kegiatan.aktivitas === 'pertukaran pelajar').length;
            setTotalDataTukarPelajar(totalDataTukarPelajar);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    return (
        <div>
            <Col>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total Data Pertukaran Pelajar: {totalDataTukarPelajar}</p> {/* Ubah totalDataMahasiswa menjadi totalDataLulus */}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Pertukaran Pelajar</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIM</th>
                                        <th>Aktivitas</th>
                                        <th>Tempat Kegiatan</th>
                                        <th>Sks</th>
                                        <th>Tanggal Mulai Kegiatan</th>
                                        <th>Tanggal Selesai Kegiatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {iku2kegiatan.filter(iku2kegiatan => iku2kegiatan.aktivitas === 'pertukaran pelajar').map((iku2kegiatan, index) => (
                                        <tr key={iku2kegiatan.NIM}>
                                            <td>{index + 1}</td>
                                            <td>{iku2kegiatan.NIM}</td>
                                            <td>{iku2kegiatan.aktivitas}</td>
                                            <td>{iku2kegiatan.tempat_kegiatan}</td>
                                            <td>{iku2kegiatan.sks}</td> 
                                            <td>{iku2kegiatan.tgl_mulai_kegiatan}</td>
                                            <td>{iku2kegiatan.tgl_selesai_kegiatan}</td>
                                            <td>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}

export default PertukaranPelajarList;
