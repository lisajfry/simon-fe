import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Col } from "reactstrap";
import MahasiswaContext from '../mahasiswa/MahasiswaContext';

const LulusanList = () => {
    const [totalDataLulus, setTotalDataLulus] = useState(0); // State untuk menyimpan total data mahasiswa dengan keterangan "lulus"
    const [mahasiswa, setMahasiswa] = useState([]);

    useEffect(() => {
        getMahasiswa();
    }, []);

    const getMahasiswa = async () => {
        try {
            const response = await axios.get("http://localhost:8080/mahasiswa");
            setMahasiswa(response.data);

            // Hitung total data mahasiswa dengan keterangan "lulus"
            const totalLulus = response.data.filter(mhs => mhs.keterangan === 'lulus').length;
            setTotalDataLulus(totalLulus);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    return (
        <div>
            <Col>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data lulus: {totalDataLulus}</p> {/* Ubah totalDataMahasiswa menjadi totalDataLulus */}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Mahasiswa</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIM</th>
                                        <th>Nama Mahasiswa</th>
                                        <th>Angkatan</th>
                                        <th>Keterangan</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswa.filter(mhs => mhs.keterangan === 'lulus').map((mahasiswa, index) => (
                                        <tr key={mahasiswa.NIM}>
                                            <td>{index + 1}</td>
                                            <td>{mahasiswa.NIM}</td>
                                            <td>{mahasiswa.nama_mahasiswa}</td>
                                            <td>{mahasiswa.angkatan}</td>
                                            <td>{mahasiswa.keterangan}</td> 
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

export default LulusanList;
