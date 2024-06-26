import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button, CardText, Row } from 'reactstrap';
import Iku4Context from './Iku4Context';
import { FaExclamationCircle } from 'react-icons/fa';



// import RespondenContext from './RespondenContext';

const Iku4List = () => {
    const [iku4List, setIku4List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {totalDataIku4} = useContext(Iku4Context);

  
    // const { totalDataResponden } = useContext(RespondenContext);
    
    useEffect(() => {
        fetchIku4List();
        console.log(typeof iku4List); // Memeriksa tipe data
        console.log(iku4List); // Memeriksa nilai aktual
    }, []);

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get('http://localhost:8080/dosen/${NIDN}');
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error saat mengambil nama dosen:", error);
            return null;
        }
    };

    const fetchIku4List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku4');
            const iku4ListWithNama = await Promise.all(response.data.map(async (iku4) => {
                const namaDosen = await fetchNamaDosen(iku4.NIDN);
                return { ...iku4, nama_dosen: namaDosen };
            }));
            setIku4List(iku4ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 4.");
            setLoading(false);
            console.error('Error saat mengambil data IKU 4:', error);
        }
    };

    const deleteIku4 = async (iku4_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete('http://localhost:8080/delete/iku4/${iku4_id}');
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
              <div>    </div>
              <div>(Dosen yang Memiliki Sertifikat Kompetensi : Jumlah Dosen dengan NIDN dan NIDK) x 60 </div>
              <div> + </div>
              <div>(Dosen dari Kalangan Praktisi Profesional : Jumlah Dosen dengan NIDN, NIDK, NUP) x 40</div>
            </CardText>
          </Card>
        </Col>

        <Col md="6" lg="6">
            <Card body className='text-center'>
              <CardText style={{ fontSize: 'Medium', color: '' }}>
                <div>Target IKU 4 = 50</div>
                <div>Persentase Capaian = %</div>
                <p></p>
                <div>Hasil = </div>
              </CardText>
            </Card>
          </Col>
        </Row>

        <div className="form-group">
                    <Link to="/addiku4">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
            <Card>

                <div>
                <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataIku4}</p>
                    </div>

                    {/* <p style={{ marginLeft: '10px' }}>Total Data: {totalDataResponden}</p> */}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>Tabel Responden</CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>NIDN/NIDK</th>
                                <th>Nama Dosen</th>
                                <th>Status</th>
                                <th>Bukti PDF</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku4List.map((iku4, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku4.NIDN}</td>
                                    <td>{iku4.nama_dosen}</td>
                                    <td>{iku4.status}</td>
                                    <td>{iku4.bukti_pdf}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <Link to={'/update/iku4/${iku4.iku4_id}'}>
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