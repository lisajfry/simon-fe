import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaChartBar , FaFile, FaDatabase } from 'react-icons/fa';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Row,
  Col,
} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';


const Iku1 = () => {

    useEffect(() => {
        fetchTotalData();
    }, []);

    const fetchTotalData = async () => {
        try {
        const response = await axios.get('http://localhost:8080/iku7');
        fetchTotalData(response.data.length); 
        } catch (error) {
        console.error('Error fetching total data:', error);
        }
    };
    

    return (
        <div>
        <Row>
            <h5 className="mb-3 mt-3">CAPAIAN IKU7</h5>
            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Tahun</label>
                <select class="form-select" id="inputGroupSelect01">
                    <option selected>Pilih</option>
                    <option value="1">2022</option>
                    <option value="2">2023</option>
                </select>
            </div>

            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect02">Semester</label>
                <select class="form-select" id="inputGroupSelect02">
                    <option selected>Pilih</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                </select>
            </div>

            <div class="input-group mb-3">
                <button class="btn btn-primary" type="button">Cari</button>
                <button class="btn btn-secondary" type="button">Reset Pencarian</button>
            </div>



            <Col md="6" lg="4">
            <Card body className="text-center" color="light-info">
                <CardTitle tag="h5">1885 (18.57%)</CardTitle>
                <CardSubtitle tag="p">Jumlah yang memenuhi persentase dan berkas </CardSubtitle>
                <CardText></CardText>
                <div>
                <Button color="info">Selengkapnya</Button>
                </div>
            </Card>
            </Col>
            <Col md="6" lg="4">
            <Card body className="text-center">
            <CardTitle tag="h5">1981 (19.51%)</CardTitle>
            <CardSubtitle tag="p" className="small">Jumlah yang memenuhi hanya presentasenya [Aktivitas Partisipatif - Team base project lebih dari 50] </CardSubtitle>
            <div>
                <NavLink to="/iku7list">
                <Button color="light-info">Selengkapnya</Button>
                </NavLink>
            </div>
            </Card>
            </Col>
            <Col md="6" lg="4">
            <Card body className="text-center"color="secondary" inverse>
                <CardTitle tag="h5">8170 (80.40%)</CardTitle>
                <CardSubtitle tag="p" className="small">Jumlah tidak memenuhi presentasenya [Aktivitas Partisipatif - Team base project kurang dari 50] </CardSubtitle>
                <div>
                <NavLink to="/rekapiku7">
                <Button color="light">Selengkapnya</Button>
                </NavLink>
                </div>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col md="6" lg="12">
            <Card body className="text-center" color="light-success">
                <CardTitle tag="h5">10152</CardTitle>
                <CardSubtitle tag="p" className="small">Jumlah Mata Kuliah Tayang </CardSubtitle>
                <CardText></CardText>
                <div>
                <NavLink to="/iku7valid">
                <Button color="success">Selengkapnya</Button>
                </NavLink>
                </div>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col md="6" lg="12">
            <Card body className="text-center"color="light-danger">
            <CardSubtitle tag="p" className="small">Capaian dari target </CardSubtitle> 
            <CardTitle tag="h5">18.57% dari 50%</CardTitle>
                <CardText >Belum Tercapai</CardText>
            <div>
                <NavLink to="/iku7notvalid">
                <Button color="danger">Selengkapnya</Button>
                </NavLink>
            </div>
            </Card>
            </Col>
            </Row>
            <Row>
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Tabel IKU 7
            </CardTitle>
            <CardBody className="">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Kode MD</th>
                    <th>Nama MK</th>
                    <th>Tahun</th>
                    <th>Semester</th>
                    <th>Kelas</th>
                    <th>Presentase Bobot Terpenuhi</th>
                    <th>RPS</th>
                    <th>Rancangan Tugas Dan Evaluasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td></td>
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

    export default Iku1;