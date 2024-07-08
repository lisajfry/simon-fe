import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle, Button, Row, Col, Table } from 'reactstrap';
import { Iku7Context } from './iku7/Iku7Context';
import { Iku6Context } from './iku6/Iku6Context';
import { RespondenContext } from './iku1/RespondenContext';
import Iku5Context from './iku5/Iku5Context';
import DosenContext from './dosen/DosenContext'; // Pastikan path ini benar
import { useSertifikasiProfesi } from './iku4/SertifikasiProfesiContext';
import { useDosenKalanganPraktisi } from './iku4/DosenKalanganPraktisiContext';
import Iku4Context from './iku4/Iku4Context';
import { NavLink } from 'react-router-dom';
import { Iku2Context } from './iku2/Iku2Context'; // Tambahkan ini
import Iku3Context from './iku3/Iku3Context';

const Rekapitulasi = () => {
  const [rekapitulasi, setRekapitulasi] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { totalCapaianiku7 } = useContext(Iku7Context);
  const { totalCapaianiku6 } = useContext(Iku6Context);
  const { totalData } = useContext(RespondenContext);
  const { totalCapaianIku1 } = totalData;
  const { totalDataIku2 } = useContext(Iku2Context); // Tambahkan ini
  const { totalCapaian: totalCapaianIku2 } = totalDataIku2; // Tambahkan ini
  const { totalDataIku3 } = useContext(Iku3Context);
  const { totalCapaianIku3 } = totalDataIku3;
  const { totalDataIku5 } = useContext(Iku5Context);
  const { totalCapaianIku5 } = totalDataIku5;
  const { totalDataDosen, totalDataDosenNIDK } = useContext(DosenContext);
  const { filteredIku4List: sertifikasiProfesiList, count: sertifikasiProfesiCount } = useSertifikasiProfesi();
  const { filteredIku4List: kalanganPraktisiList, count: kalanganPraktisiCount } = useDosenKalanganPraktisi();
  const { totalDataIku4 } = useContext(Iku4Context);
  const totalDosen = totalDataDosen + totalDataDosenNIDK;

  const perhitungan = totalDosen > 0 ? ((sertifikasiProfesiCount / totalDosen) * 60) + ((kalanganPraktisiCount / totalDosen) * 40) : 0;
  const buttonColor = perhitungan >= 50 ? 'success' : 'danger';
  const statusCapaian = perhitungan >= 50 ? 'Hasil Memenuhi' : 'Hasil Tidak Memenuhi';
  const cardColor = perhitungan >= 50 ? 'light-success' : 'light-danger';

  useEffect(() => {
    getRekapitulasi(selectedYear);
  }, [selectedYear]);

  const getRekapitulasi = async (year) => {
    try {
      const response = await axios.get(`http://localhost:8080/rekap?tahun=${year}`);
      console.log(response.data); // Tambahkan log respons
      setRekapitulasi(response.data);
    } catch (error) {
      console.error('Error fetching data:', error); // Tambahkan log error
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <Row>
        
      </Row>
      <Row>
        <h5 className="mb-3 mt-3">REKAPITULASI</h5>
        
        <Col md="6" lg="3">
          <Card body color={totalCapaianIku1 >= 50 ? 'light-success' : 'light-danger'}>
            <CardTitle tag="h5">IKU 1</CardTitle>
            <CardText>{totalCapaianIku1}</CardText>
            <div>
              <Button color={totalCapaianIku1 >= 50 ? 'success' : 'danger'}>
                {totalCapaianIku1 >= 50 ? 'Tercapai' : 'Belum Tercapai'}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color={totalCapaianIku2 >= 50 ? 'light-success' : 'light-danger'}>
            <CardTitle tag="h5">IKU 2</CardTitle>
            <CardText>{totalCapaianIku2}%</CardText>
            <div>
              <Button color={totalCapaianIku2 >= 50 ? 'success' : 'danger'}>
                {totalCapaianIku2 >= 50 ? 'Tercapai' : 'Belum Tercapai'}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color={totalCapaianIku3 >= 50 ? 'light-success' : 'light-danger'}>
            <CardTitle tag="h5">IKU 3</CardTitle>
            <CardText>{totalCapaianIku3}%</CardText>
            <div>
              <Button color={totalCapaianIku3 >= 50 ? 'success' : 'danger'}>
                {totalCapaianIku3 >= 50 ? 'Tercapai' : 'Belum Tercapai'}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color={perhitungan >= 50 ? "light-success" : "light-danger"}>
            <CardTitle tag="h5">IKU 4</CardTitle>
            <CardText>{perhitungan.toFixed(2)}%</CardText>
            <div>
              <NavLink to="/iku4list">
                <Button color={perhitungan >= 50 ? "success" : "danger"}>
                  {perhitungan >= 50 ? "Tercapai" : "Belum Tercapai"}
                </Button>
              </NavLink>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="6" lg="3">
          <Card body color={totalCapaianIku5 >= 50 ? 'light-success' : 'light-danger'}>
            <CardTitle tag="h5">IKU 5</CardTitle>
            <CardText>{totalCapaianIku5}%</CardText>
            <div>
              <Button color={totalCapaianIku5 >= 50 ? 'success' : 'danger'}>
                {totalCapaianIku5 >= 50 ? 'Tercapai' : 'Belum Tercapai'}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color={totalCapaianiku6 >= 50 ? 'light-success' : 'light-danger'}>
            <CardTitle tag="h5">IKU 6</CardTitle>
            <CardText>{totalCapaianiku6}%</CardText>
            <div>
              <Button color={totalCapaianiku6 >= 50 ? 'success' : 'danger'}>
                {totalCapaianiku6 >= 50 ? 'Tercapai' : 'Belum Tercapai'}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color={totalCapaianiku7 >= 50 ? 'light-success' : 'light-danger'}>
            <CardTitle tag="h5">IKU 7</CardTitle>
            <CardText>{totalCapaianiku7}%</CardText>
            <div>
              <Button color={totalCapaianiku7 >= 50 ? 'success' : 'danger'}>
                {totalCapaianiku7 >= 50 ? 'Tercapai' : 'Belum Tercapai'}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Tabel Rekapitulasi IKU
            </CardTitle>
            <CardBody className="">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Indikator</th>
                    <th>Target</th>
                    <th>Capaian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>IKU 1 (Lulusan Mendapat Pekerjaan yang Layak)</td>
                    <td contentEditable="true">60%</td>
                    <td>{totalCapaianIku1}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>IKU 2 (Mahasiswa Mendapat Pengalaman di Luar Program Studi)</td>
                    <td contentEditable="true">50%</td>
                    <td>{totalCapaianIku2}%</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>IKU 3 (Dosen Berkegiatan di Luar Kampus)</td>
                    <td contentEditable="true">50%</td>
                    <td>{totalCapaianIku3}%</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>IKU 4 ()</td>
                    <td contentEditable="true">50%</td>
                    <td>{perhitungan.toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>IKU 5 (Hasil Kerja Dosen Digunakan Oleh Masyarakat Atau Mendapat Rekognisi Internasional)</td>
                    <td contentEditable="true">50%</td>
                    <td>{totalCapaianIku5}%</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>IKU 6 (Kemitraan Program Studi)</td>
                    <td contentEditable="true">50%</td>
                    <td>{totalCapaianiku6}%</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>IKU 7 (Kelas yang Kolaboratif dan Partisipatif)</td>
                    <td contentEditable="true">50%</td>
                    <td>{totalCapaianiku7}%</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Rekapitulasi;
