import React, { useState, useContext, useEffect } from 'react';

import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardText,CardBody,CardTitle,Button,Col,Row} from "reactstrap";
import { FaExclamationCircle } from 'react-icons/fa';
import LulusanContext from '../lulusan/LulusanContext';
import RespondenContext from './RespondenContext';
import MinResponden from './Minresponden';


    const Iku1Rekap = () => {
      const [iku1, setIku1] = useState([]);
      const { totalDataLulusan } = useContext(LulusanContext);
      const { totalDataResponden } = useContext(RespondenContext);

    useEffect(() => {
        getIku1();
    }, []);

    const getIku1 = async () => {
        const response = await axios.get("http://localhost:8080/iku1");
        setIku1(response.data);
        // Menambahkan properti bobot ke setiap objek data
        const dataWithBobot = response.data.map(data => ({
            ...data,
            bobot: calculateBobot(data) // Fungsi untuk menghitung bobot
        }));
        setIku1(dataWithBobot);
    }

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

    const calculateBobot = (data) => {
        // Logika perhitungan bobot sesuai dengan kondisi yang Anda tentukan
        if (data.status === "mendapat pekerjaan" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 1.0;
        } else if (data.status === "mendapat pekerjaan" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 0.7;
        } else if (data.status === "mendapat pekerjaan" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 0.8;
        } else if (data.status === "mendapat pekerjaan" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 0.5;
        } else if (data.status === "wiraswasta" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 1.2;
        } else if (data.status === "wiraswasta" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 1.0;
        } else if (data.status === "wiraswasta" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 1.0;
        } else if (data.status === "wiraswasta" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 0.8;
        } else if (data.status === "melanjutkan studi") {
            return 1;
        }
        return null;
    };

    // Perhitungan total bobot
    const totalBobot = filteredIku1.reduce((accumulator, currentValue) => accumulator + currentValue.bobot, 0);

    
    return (
        <div>
          <h5 className="mb-3 mt-3">,</h5>
          <Row>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>mendapat pekerjaan lebih dari 1.2xUMP kurang dari 6 bulan = 1.0</div>
              <div>mendapat pekerjaan kurang dari 1.2xUMP kurang dari 6 bulan = 0.7</div>
              <div>mendapat pekerjaan lebih dari 1.2xUMP antara 6 sampai 12bulan = 0.8</div>
              <div>mendapat pekerjaan kurang dari 1.2xUMP antara 6 sampai 12bulan = 0.5</div>
              
              <div>wiraswasta lebih dari 1.2xUMP kurang dari 6 bulan = 1.2</div>
              <div>wiraswasta kurang dari 1.2xUMP kurang dari 6 bulan = 1.0</div>
              <div>wiraswasta lebih dari 1.2xUMP antara 6 sampai 12bulan = 1.0</div>
              <div>wiraswasta kurang dari 1.2xUMP antara 6 sampai 12bulan = 0.8</div>
              
              <div>mahasiswa = 1</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Responden Minimum</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>jumlah responden minimum = </div>
              <div>jumlah lulusan </div>
              <div>______________ </div>
              <div>jumlah lulusan * galat(2,5%)^2 + 1</div>
              <div>
              <div>Jika tidak memenuhi jumlah responden minimum, maka pencapaian IKU 1 akan dihitung 0</div>
              </div>
            </CardText>
          </Card>
        </Col>
        </Row>
            <Col>
                <Card>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL PEMBOBOTAN IKU1</CardTitle>
                    </div>

                    <CardBody>
                        <div className='row'>
                            <p style={{ marginLeft: '10px' }}>Total data: {filteredIku1.length}</p>
                            <p style={{ marginLeft: '10px' }}>Total bobot: {totalBobot}</p>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>No Ijazah</th>
                                        <th>Nama Alumni</th>
                                        <th>Status</th>
                                        <th>Gaji</th>
                                        <th>Masa Tunggu</th>
                                        <th>Bobot</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredIku1.map((iku_1, index) => (
                                        <tr key={iku_1.iku1_id}>
                                            <td>{index + 1}</td>
                                            <td>{iku_1.no_ijazah}</td>
                                            <td>{iku_1.nama_alumni}</td>
                                            <td>{iku_1.status}</td>
                                            <td>{iku_1.gaji}</td>
                                            <td>{iku_1.masa_tunggu}</td>
                                            <td>{iku_1.bobot}</td>
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
     
      <Row>
      <MinResponden totalDataLulusan={totalDataLulusan} />
      </Row>
      
    </div>
    );
}

export default Iku1Rekap;
