import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Card, CardBody, CardTitle, Button, FormGroup, Label, Input } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';
import PrestasiContext from './PrestasiContext';

const PrestasiDetail = () => {
    const [iku2prestasiList, setIku2prestasiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { totalDataPrestasi } = useContext(PrestasiContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchIku2prestasiList();
        axios.get('http://localhost:8080/iku2prestasi')
            .then(response => {
                setData(response.data.map(item => ({
                    ...item,
                    tgl_mulai_kegiatan: new Date(item.tgl_mulai_kegiatan).toLocaleDateString(),
                    tgl_selesai_kegiatan: new Date(item.tgl_selesai_kegiatan).toLocaleDateString()
                })));
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error fetching nama mahasiswa:", error);
            return null;
        }
    };

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error fetching nama dosen:", error);
            return null;
        }
    };

    const fetchIku2prestasiList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku2prestasi');
            const iku2prestasiListWithNama = await Promise.all(response.data.map(async (iku2prestasi) => {
                const namaMahasiswa = await fetchNamaMahasiswa(iku2prestasi.NIM);
                const namaDosen = await fetchNamaDosen(iku2prestasi.NIDN);
                return { ...iku2prestasi, nama_mahasiswa: namaMahasiswa, nama_dosen: namaDosen };
            }));
            setIku2prestasiList(iku2prestasiListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 2 Kegiatan.");
            setLoading(false);
            console.error('Error fetching IKU 2 Kegiatan list:', error);
        }
    };

    const deleteIku2prestasi = async (iku2prestasi_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2prestasi/${iku2prestasi_id}`);
                fetchIku2prestasiList();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    

    const displayedData = iku2prestasiList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Col>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <Link to="/addiku2prestasi">
                    <Button color="primary">Input</Button>
                </Link>
            </div>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px', fontSize: '14px' }}>Total data: {totalDataPrestasi}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        DETAIL PRESTASI MAHASISWA
                    </CardTitle>
                </div>
                <CardBody>
                {displayedData.map((iku2prestasi, index) => (
                    <div key={iku2prestasi.iku2prestasi_id} style={{ marginBottom: '20px' }}>
                       <FormGroup>
    <Label for="no">No</Label>
    <Input type="text" readOnly value={(currentPage - 1) * itemsPerPage + index + 1} id="no" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="nim">NIM</Label>
    <Input type="text" readOnly value={iku2prestasi.NIM} id="nim" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="nidn">NIDN</Label>
    <Input type="text" readOnly value={iku2prestasi.NIDN} id="nidn" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="tingkatKompetisi">Tingkat Kompetisi</Label>
    <Input type="text" readOnly value={iku2prestasi.tingkat_kompetisi} id="tingkatKompetisi" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="jumlahPeserta">Jumlah Peserta</Label>
    <Input type="text" readOnly value={iku2prestasi.jmlh_peserta} id="jumlahPeserta" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="prestasi">Prestasi</Label>
    <Input type="text" readOnly value={iku2prestasi.prestasi} id="prestasi" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="jumlahNegara">Jumlah Negara Mengikuti</Label>
    <Input type="text" readOnly value={iku2prestasi.jmlh_negara_mengikuti} id="jumlahNegara" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="negaraMengikuti">Negara yang Mengikuti</Label>
    <Input type="text" readOnly value={iku2prestasi.negara_mengikuti ? iku2prestasi.negara_mengikuti.join(', ') : ''} id="negaraMengikuti" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="jumlahProvinsi">Jumlah Provinsi Mengikuti</Label>
    <Input type="text" readOnly value={iku2prestasi.jmlh_provinsi_mengikuti} id="jumlahProvinsi" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="provinsiMengikuti">Provinsi yang Mengikuti</Label>
    <Input type="text" readOnly value={iku2prestasi.provinsi_mengikuti ? iku2prestasi.provinsi_mengikuti.join(', ') : ''} id="provinsiMengikuti" style={{ marginLeft: '20px' }} />
</FormGroup>
<FormGroup>
    <Label for="sertifikat">Sertifikat</Label>
    <div>
        <a href={`http://localhost:8080/uploads/${iku2prestasi.sertifikat}`} target="_blank" rel="noopener noreferrer">
            <AiOutlineFilePdf /> Sertifikat
        </a>
    </div>
</FormGroup>
<FormGroup>
    <Label for="skPenugasan">SK Penugasan</Label>
    <div>
        <a href={iku2prestasi.sk_penugasan_url} target="_blank" rel="noopener noreferrer"></a>
    </div>
</FormGroup>


                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Link to={`/update/iku2/${iku2prestasi.iku2prestasi_id}`}>
                                <Button outline color="info" size="sm"><FaEdit /></Button>
                            </Link>
                            <Button outline color="danger" size="sm" onClick={() => deleteIku2prestasi(iku2prestasi.iku2prestasi_id)}><FaTrash /></Button>
                        </div>
                        <hr />
                    </div>
                ))}
            </CardBody>
            </Card>
        </Col>
    );
};

export default PrestasiDetail;
