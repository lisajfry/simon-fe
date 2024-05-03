import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditIku2prestasi = () => {
    const [NIM, setNIM] = useState('');
    const [nama_mahasiswa, setNamaMahasiswa] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const [tingkat_lomba, setTingkatLomba] = useState('');
    const [prestasi, setPrestasi] = useState('');
    const navigate = useNavigate();
    const { iku2prestasi_id } = useParams();

    useEffect(() => {
        const fetchIku2prestasi = async () => {
            if (!iku2prestasi_id) return; // Pemeriksaan untuk iku2kegiatan_id
            const response = await axios.get(`http://localhost:8080/iku2prestasi/${iku2prestasi_id}`);
            const iku2prestasi = response.data;
            setNIM(iku2prestasi.NIM);
            setNamaMahasiswa(iku2prestasi.nama_mahasiswa);
            setAngkatan(iku2prestasi.angkatan);
            setTingkatLomba(iku2prestasi.tingkat_lomba);
            setPrestasi(iku2prestasi.prestasi);
           
        }
        fetchIku2prestasi();
    }, [iku2prestasi_id]);

    const saveIku2prestasi = async (e) => {
        e.preventDefault();
        if (!iku2prestasi_id) return; // Pemeriksaan untuk iku2kegiatan_id
        await axios.put(`http://localhost:8080/update/iku2prestasi/${iku2prestasi_id}`, {
            NIM: NIM,
            nama_mahasiswa: nama_mahasiswa,
            angkatan: angkatan,
            tingkat_lomba: tingkat_lomba,
            prestasi: prestasi,
          
        });
        navigate('/iku2prestasilist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveIku2prestasi}>
                <div className="field">
                    <label className="label">NIM</label>
                    <input
                        type="text"
                        className="input"
                        value={NIM}
                        onChange={(e) => setNIM(e.target.value)}
                        placeholder="NIM" />
                </div>
                <div className="field">
                    <label className="label">Nama Mahasiswa</label>
                    <input
                        type="text"
                        className="input"
                        value={nama_mahasiswa}
                        onChange={(e) => setNamaMahasiswa(e.target.value)}
                        placeholder="Nama Mahasiswa" />
                </div>
                <div className="field">
                    <label className="label">Angkatan</label>
                    <input
                        type="text"
                        className="input"
                        value={angkatan}
                        onChange={(e) => setAngkatan(e.target.value)}
                        placeholder="angkatan" />
                </div>
                <div className="field">
                    <label className="label">Tingkat Lomba</label>
                    <select
                        className="select"
                        value={tingkat_lomba}
                        onChange={(e) => setTingkatLomba(e.target.value)}
                    >
                        <option value=""></option>
                            <option value="internasional">Internasional</option>
                            <option value="nasional">Nasional</option>
                            <option value="provinsi">Provinsi</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Prestasi</label>
                    <select
                        className="select"
                        value={prestasi}
                        onChange={(e) => setPrestasi(e.target.value)}
                    >
                        <option value=""></option>
                            <option value="juara1">Juara 1</option>
                            <option value="juara2">Juara2</option>
                            <option value="juara3">Juara3</option>
                            <option value="peserta">Peserta</option>
                    </select>
                </div>
                
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditIku2prestasi;
