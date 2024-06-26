import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { FaDatabase } from 'react-icons/fa';
import { Card, CardText, CardTitle, Button, Row, Col, Table } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import DosenContext from '../dosen/DosenContext'; // Pastikan path ini benar
import Iku4Context from './Iku4Context';
import { FaExclamationCircle } from 'react-icons/fa';
import { useSertifikasiProfesi } from './SertifikasiProfesiContext';
import { useDosenKalanganPraktisi } from './DosenKalanganPraktisiContext';


const Iku4 = () => {
  const { totalDataDosen, totalDataDosenNIDK } = useContext(DosenContext);
  const { filteredIku4List: sertifikasiProfesiList, count: sertifikasiProfesiCount } = useSertifikasiProfesi();
  const { filteredIku4List: kalanganPraktisiList, count: kalanganPraktisiCount } = useDosenKalanganPraktisi();

  // Lakukan perhitungan berdasarkan rumus yang diberikan
  const totalDosen = totalDataDosen + totalDataDosenNIDK;

  const perhitungan = ((sertifikasiProfesiCount / totalDosen) * 60) + ((kalanganPraktisiCount / totalDosen) * 40);

  const buttonColor = perhitungan > 50 ? 'info' : 'danger';

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
      categories: ['Bekerja', 'Wiraswasta', 'Melanjutkan Pendidikan', 'Masih Mencari Pekerjaan'],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Capaian IKU4',
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Total',
      data: [75, 20, 50, 30],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Warna untuk setiap bar
    },
  ]);

  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">CAPAIAN IKU4 (Praktisi Mengajar di Dalam Kampus)</h5>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
          <select className="form-select" id="inputGroupSelect01">
            <option selected>Pilih</option>
            <option value="1">2022</option>
            <option value="2">2023</option>
          </select>
        </div>

        <div className="group mb-3" >
                <button class="btn btn-primary" type="button">Cari</button>
                <button class="btn btn-secondary" type="button">Reset Pencarian</button>
            </div>

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
                <div>Persentase Capaian = {perhitungan.toFixed(2)}%</div>
                <p></p>
                <div>Hasil = {perhitungan.toFixed(2)}</div>
              </CardText>
            </Card>
          </Col>
        </Row>

        <Col md="10" lg="12">
          <Card body className="text" color=''>
            <CardTitle tag="h5">Data Detail IKU 4</CardTitle>
          </Card>
        </Col>

        <Row>
          <Col>
          <Col md="6" lg="12">
            <Card body className="text-center" color="light-info">
              <CardTitle tag="h5">Pengisian Data</CardTitle>
              <CardText>
                <FaDatabase style={{ color: 'black', fontWeight: 'bold', fontSize: '35px', marginRight: '10px' }} />
              </CardText>
              <div>
                <NavLink to="/addiku4">
                  <Button body color="info">Input Data</Button>
                </NavLink>
              </div>
            </Card>
          </Col>

          <Col md="10" lg="12">
            <Card body className="text-center">
              <CardTitle tag="h5">Rekapitulasi IKU 4</CardTitle>
              <div>
                <p>{perhitungan}%</p>
              </div>
              <div>
                <NavLink to="/iku4list">
                  <Button color="light-warning">Buka</Button>
                </NavLink>
              </div>
            </Card>
          </Col>
          </Col>
          <Col md="12" lg="6">
          <Card body className="text">
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Data Raw</th>
                    <th>Tautan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Dosen yang Memiliki Sertifikasi Kompetensi/Profesi</th>
                    <th>
                      <NavLink to="/sertifikasiprofesi">
                        <Button>Buka</Button>
                      </NavLink>
                    </th>
                  </tr>
                  <tr>
                    <th>Dosen dari Kalangan Praktisi Profesional</th>
                    <th>
                      <NavLink to="/dosenkalanganpraktisi">
                        <Button>Buka</Button>
                      </NavLink>
                    </th>
                  </tr>                   
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>


        </Row>

      </Row>
    </div>
  );
};

export default Iku4;