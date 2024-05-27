import React, { useState, useContext, useEffect } from 'react';

import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardText,CardBody,CardTitle,Button,Col,Row} from "reactstrap";
import { FaExclamationCircle } from 'react-icons/fa';



    const Iku4Rekap = () => {
      const [iku4, setIku4] = useState([]);
    //   const { totalDataLulusan } = useContext(LulusanContext);
    //   const { totalDataResponden } = useContext(RespondenContext);

    useEffect(() => {
        getIku4();
    }, []);

    const getIku4 = async () => {
        const response = await axios.get("http://localhost:8080/iku4");
        setIku4(response.data);
        // Menambahkan properti bobot ke setiap objek data
        const dataWithBobot = response.data.map(data => ({
            ...data,
            bobot: calculateBobot(data) // Fungsi untuk menghitung bobot
        }));
        setIku4(dataWithBobot);
    }

    const deleteIku4 = async (iku4_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            await axios.delete('http://localhost:8080/delete/iku4/${iku4_id}');
            getIku4();
        }
    }

    const totalData = iku4.length;
    
  
    // Filter data based on criteria
    const filteredIku4 = iku4.filter((data) => {
        if (data.status === "Dosen Berkualifikasi S3" || data.status === "Sertifikasi Kompetensi Dosen" || data.status === "PraktisiMenjadiDosen") {
            return true;
        } else if (data.status === "belum berpendapatan" && data.dosen) {
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
    const totalBobot = filteredIku4.reduce((accumulator, currentValue) => accumulator + currentValue.bobot, 0);

    
    return (
        <div>
          <h5 className="mb-3 mt-3">,</h5>
          <Row>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>p</div>
              <div>p</div>
              <div>p</div>
              <div>p</div>
              
              <div>p</div>
              <div>p</div>
              <div>p</div>
              <div>p</div>
              
              <div>p</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Responden </CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>p</div>
              <div>p</div>
              <div>p</div>
              <div>p</div>
              <div>
              <div>p</div>
              </div>
            </CardText>
          </Card>
        </Col>
        </Row>
            <Col>
                <Card>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL PEMBOBOTAN IKU4</CardTitle>
                    </div>

                    <CardBody>
                        <div className='row'>
                            <p style={{ marginLeft: '10px' }}>Total data: {filteredIku4.length}</p>
                            <p style={{ marginLeft: '10px' }}>Total bobot: {totalBobot}</p>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIDN</th>
                                        <th>Nama Dosen</th>
                                        <th>Status</th>
                                        
                                        <th>Bobot</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredIku4.map((iku_4, index) => (
                                        <tr key={iku_4.iku4_id}>
                                            <td>{index + 1}</td>
                                            <td>{iku_4.NIDN}</td>
                                            <td>{iku_4.nama_dosen}</td>
                                            <td>{iku_4.status}</td>
                                            <td>{iku_4.bobot}</td>
                                            <td>
                                                <Link to={'/update/iku4/${iku_4.iku4_id}'}>
                                                    <Button className="btn" outline color="info">Edit</Button>
                                                </Link>
                                                <Button className="btn" outline color="danger" onClick={() => deleteIku4(iku_4.iku4_id)}>Delete</Button>
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
      {/* <MinResponden totalDataLulusan={totalDataLulusan} /> */}
      </Row>
      
    </div>
    );
}

export default Iku4Rekap;