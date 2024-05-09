import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col } from "reactstrap";


const EditMahasiswa = () => {
    const [nama_mahasiswa, setNamaMahasiswa] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const [keterangan, setKeterangan] = useState('lulus'); // Menetapkan nilai default sesuai ENUM yang tersedia
    const navigate = useNavigate();
    const { NIM } = useParams();

    useEffect(() => {
        const fetchMahasiswa = async () => {
            if (!NIM) return; // Pemeriksaan untuk NIM
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            const mahasiswa = response.data;
            setNamaMahasiswa(mahasiswa.nama_mahasiswa);
            setAngkatan(mahasiswa.angkatan);
            setKeterangan(mahasiswa.keterangan); // Mengatur nilai keterangan dari data mahasiswa
        }
        fetchMahasiswa();
    }, [NIM]);

    const saveMahasiswa = async (e) => {
        e.preventDefault();
        if (!NIM) return; // Pemeriksaan untuk NIM
        await axios.put(`http://localhost:8080/update/mahasiswa/${NIM}`, {
            NIM: NIM,
            nama_mahasiswa: nama_mahasiswa,
            angkatan: angkatan,
            keterangan: keterangan,
        });
        navigate('/mahasiswalist');
    }

    return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
            <h2>Edit Data</h2>
            <form onSubmit={saveMahasiswa}>
                <div className="form-group">
                    <label className="label">NIM</label>
                    <input
                        type="text"
                        className="form-control"
                        value={NIM}
                        placeholder="NIM" />
                </div>
                <div className="form-group">
                    <label className="label">Nama Mahasiswa</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nama_mahasiswa}
                        onChange={(e) => setNamaMahasiswa(e.target.value)}
                        placeholder="Nama Mahasiswa" />
                </div>
                <div className="form-group">
                  <label htmlFor="angkatan">Angkatan</label>
                  <select
                    className="form-control"
                    id="angkatan"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                  >
                    <option value="">Pilih Angkatan</option>
                    <option value="TI 2020">TI 2020</option>
                    <option value="TI 2021">TI 2021</option>
                    <option value="TI 2022">TI 2022</option>
                    <option value="TI 2023">TI 2023</option>
                  </select>
                </div>
                <div className="form-group">
                    <label className="label">Keterangan</label>
                    <select
                        className="form-control"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                    >
                        <option value="">Pilih Keterangan</option>
                        <option value="lulus">Lulus</option>
                        <option value="mahasiswa aktif">Mahasiswa Aktif</option>
                    </select>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
            </Card>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default EditMahasiswa;
