import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import {  FaDatabase } from 'react-icons/fa';
import {Card,CardText,CardTitle,Button,Row,Col,} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const Iku5 = () => {
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Bekerja', 'Wiraswasta', 'Melanjutkan Pekerjaan', 'Masih Mencari Pekerjaan'],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Capaian IKU5',
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Total',
      data: [75, 20, 50, 30],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Set warna untuk setiap bar
    },
  ]);


  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">CAPAIAN IKU5 (Hasil Kerja Dosen Digunakan Masyarakat)</h5>

            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Tahun</label>
                <select class="form-select" id="inputGroupSelect01">
                    <option selected>Pilih</option>
                    <option value="1">2022</option>
                    <option value="2">2023</option>
                </select>
            </div>

           
            <div class="input-group mb-3">
                <button class="btn btn-primary" type="button">Cari</button>
                <button class="btn btn-secondary" type="button">Reset Pencarian</button>
            </div>

            <Col md="6" lg="12">
          <Card body className="text-center"color="success" inverse>
            <CardTitle tag="h5">Pencapaian IKU5</CardTitle>
            <CardText>
              berapa persen
            </CardText>
            <div>
              <NavLink to="/rekapiku4">
              <Button color="light-success">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>

        <Col md="6" lg="12">
          <Card body className="text-center"color="light-info">
            <CardTitle tag="h5">Pengisian Data</CardTitle>
            <CardText>
            <FaDatabase style={{ color: 'black', fontWeight: 'bold', fontSize: '35px', marginRight: '10px' }}/>
            </CardText>
            <div>
              <NavLink to="/addiku5">
              <Button body color="info">Input Data</Button>
              </NavLink>
            </div>
          </Card>
        </Col>    

        <Col md="4" lg="6">
          <Card body className="text-center">
            <CardTitle tag="h5">Data Dosen</CardTitle>
            <div>
              <NavLink to="/dosenlist">
                <Button color="light-warning">Buka</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        {/* <Col md="4" lg="6">
          <Card body className="text-center">
            <CardTitle tag="h5">Dosen Praktisi</CardTitle>
            <div>
              <NavLink to="/dosenlist">
                <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col> */}
        <Col md="4" lg="6">
        <Card body className="text-center">
          <CardTitle tag="h5">Jumlah Responden</CardTitle>
         <div>
            <NavLink to="/iku5list">
              <Button color="light-warning">Buka</Button>
             </NavLink>
        </div>
        </Card>
        </Col>
        
        </Row>
      
    </div>
  );
};

export default Iku5;