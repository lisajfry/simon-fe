import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditIku2kegiatan = () => {
    const [NIM, setNIM] = useState('');
    const [nama_mahasiswa, setNamaMahasiswa] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const [aktivitas, setAktivitas] = useState('');
    const [sks, setSks] = useState('');
    const navigate = useNavigate();
    const { iku2kegiatan_id } = useParams();

    useEffect(() => {
        const fetchIku2kegiatan = async () => {
            if (!iku2kegiatan_id) return; // Pemeriksaan untuk iku2kegiatan_id
            const response = await axios.get(`http://localhost:8080/iku2kegiatan/${iku2kegiatan_id}`);
            const iku2kegiatan = response.data;
            setNIM(iku2kegiatan.NIM);
            setNamaMahasiswa(iku2kegiatan.nama_mahasiswa);
            setAngkatan(iku2kegiatan.angkatan);
            setAktivitas(iku2kegiatan.aktivitas);
            setSks(iku2kegiatan.sks);
           
        }
        fetchIku2kegiatan();
    }, [iku2kegiatan_id]);

    const saveIku2kegiatan = async (e) => {
        e.preventDefault();
        if (!iku2kegiatan_id) return; // Pemeriksaan untuk iku2kegiatan_id
        await axios.put(`http://localhost:8080/update/iku2kegiatan/${iku2kegiatan_id}`, {
            NIM: NIM,
            nama_mahasiswa: nama_mahasiswa,
            angkatan: angkatan,
            aktivitas: aktivitas,
            sks: sks,
          
        });
        navigate('/iku2kegiatanlist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveIku2kegiatan}>
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
                    <label className="label">Aktivitas</label>
                    <select
                        className="select"
                        value={aktivitas}
                        onChange={(e) => setAktivitas(e.target.value)}
                    >
                        <option value=""></option>
                            <option value="magang/praktek kerja">Magang/praktek kerja</option>
                            <option value="pertukaran pelajar">Pertukaran pelajar</option>
                            <option value="proyek kemanusiaan">proyek kemanusiaan</option>
                            <option value="mengajar di sekolah">Mengajar di sekolah</option>
                            <option value="studi/proyek independen">Studi/proyek independen</option>
                            <option value="proyek di desa/kkn">Proyek di desa/kkn</option>
                            <option value="kegiatan wirausaha">Kegiatan wirausaha</option>
                            <option value="penelitian atau riset">Penelitian atau riset</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">sks</label>
                    <select
                        className="select"
                        value={sks}
                        onChange={(e) => setSks(e.target.value)}
                        placeholder="sks" />
                </div>
                
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditIku2kegiatan;
