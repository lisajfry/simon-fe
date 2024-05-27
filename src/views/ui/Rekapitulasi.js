import { Card, CardText, CardBody, CardTitle, Button, Row, Col, Table } from 'reactstrap';
import RespondenContext from './iku1/RespondenContext';
import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";

const Rekapitulasi = () => {
  const [rekapitulasi, setRekapitulasi] = useState([]);

    useEffect(() => {
        getRekapitulasi();
    }, []);

  const getRekapitulasi = async () => {
    const response = await axios.get('http://localhost:8080/rekap');
    setRekapitulasi(response.data);
}
  const {totalCapaian} = useContext(RespondenContext);
  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">REKAPITULASI</h5>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5" >IKU 1</CardTitle>
            <CardText >{totalCapaian} </CardText>
            <div>
              <Button color="success">Tercapai</Button> 
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">IKU 2</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="danger">Belum Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 3</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="success">Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">IKU 4</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="danger">Belum Tercapai</Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 5</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="success">Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">IKU 6</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="danger">Belum Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 7</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="success">Tercapai</Button>
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
                    <td>IKU 1 ( Lulusan Mendapat Pekerjaan yang Layak)</td>
                    <td contentEditable="true">60%</td>
                    <td>{totalCapaian}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>IKU 2 (Mahasiswa Mendapat Pengalaman di Luar Program Studi)</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>IKU 3 (Dosen Berkegiatan di Luar Kampus)</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>IKU 4 (Praktisi Mengajar di dalam kampus)</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>IKU 5 (Hasil Kerja Dosen Digunakan Oleh Masyarakat Atau Mendapat Rekognisi Internasional)</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>IKU 6 (Kemitraan Program Studi)</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>IKU 7 (Kelas yang Kolaboratif dan Partisipatif)</td>
                    <td></td>
                    <td></td>
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
