import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardGroup,
    Button,
    Col,
  } from "reactstrap";

  const Iku1Sesuai = () => {
    const [iku1, setIku1] = useState([]);

    useEffect(() => {
        getIku1();
        fetchNamaMahasiswa();
    }, []);

    

    const getIku1 = async () => {
        const response = await axios.get("http://localhost:8080/iku1");
        const iku1Data = response.data;
    
        // Fetch nama mahasiswa for each iku1
        const iku1WithMahasiswa = await Promise.all(iku1Data.map(async (iku1) => {
            const namaMahasiswa = await fetchNamaMahasiswa(iku1.NIM);
            return { ...iku1, nama_mahasiswa: namaMahasiswa };
        }));
    
        setIku1(iku1WithMahasiswa);
    }
    

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
        return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error while fetching nama mahasiswa:", error);
        return null;
        }
    };

    const deleteIku1 = async (iku1_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
          await axios.delete(`http://localhost:8080/delete/iku1/${iku1_id}`);
          getIku1();
        }
    }

    const totalData = iku1.length;

    // Filter data based on criteria
    const filteredIku1 = iku1.filter((data) => {
        if (data.status === "wiraswasta" || data.status === "mendapat pekerjaan" || data.status === "melanjutkan studi") {
            return true;
        } else if (data.status === "belum berpendapatan" && data.mahasiswa) {
            return true;
        }
        return false;
    });

    return (
        <div>
            <Col>
            <Card>
            <div style={{textAlign: 'center'}}>
                <CardTitle>TABEL IKU1  SESUAI</CardTitle>
            </div>

            <CardBody>
                <div className='row'>
                    <p style={{ marginLeft: '10px' }}>Total data: {filteredIku1.length}</p>
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama Lulusan</th>
                                <th>Status</th>
                                <th>Gaji</th>
                                <th>Masa Tunggu</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIku1.map((iku_1, index) => (
                                <tr key={iku_1.iku1_id}>
                                    <td>{index + 1}</td>
                                    <td>{iku_1.NIM}</td>
                                    <td>{iku_1.nama_mahasiswa}</td>
                                    <td>{iku_1.status}</td>
                                    <td>{iku_1.gaji}</td>
                                    <td>{iku_1.masa_tunggu}</td>
                                    <td>
                                        <Link to={`/update/iku1/${iku_1.iku1_id}`}>
                                            <Button className="btn" outline color="info">Edit</Button>
                                        </Link>
                                        <Button className="btn" outline color="danger" onClick={() => deleteIku1(iku_1.iku1_id)}>Delete</Button>
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

export default Iku1Sesuai;