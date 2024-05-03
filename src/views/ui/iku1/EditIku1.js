import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditIku1 = () => {
    const [no_ijazah, setNoIjazah] = useState('');
    const [nama_alumni, setNamaAlumni] = useState('');
    const [status, setStatus] = useState('');
    const [gaji, setGaji] = useState('');
    const [masa_tunggu, setMasaTunggu] = useState('');
    const navigate = useNavigate();
    const { iku1_id } = useParams();

    useEffect(() => {
        const fetchIku1 = async () => {
            if (!iku1_id) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/iku1/${iku1_id}`);
            const iku1 = response.data;
            setNoIjazah(iku1.no_ijazah);
            setNamaAlumni(iku1.nama_alumni);
            setStatus(iku1.status);
            setGaji(iku1.gaji);
            setMasaTunggu(iku1.masa_tunggu);
        }
        fetchIku1();
    }, [iku1_id]);

    const saveIku1 = async (e) => {
        e.preventDefault();
        if (!iku1_id) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/iku1/${iku1_id}`, {
            no_ijazah: no_ijazah,
            nama_alumni: nama_alumni,
            status: status,
            gaji: gaji,
            masa_tunggu: masa_tunggu
        });
        navigate('/iku1list');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveIku1}>
                <div className="field">
                    <label className="label">No Ijazah</label>
                    <input
                        type="text"
                        className="input"
                        value={no_ijazah}
                        onChange={(e) => setNoIjazah(e.target.value)}
                        placeholder="No Ijazah" />
                </div>
                <div className="field">
                    <label className="label">Nama Alumni</label>
                    <input
                        type="text"
                        className="input"
                        value={nama_alumni}
                        onChange={(e) => setNamaAlumni(e.target.value)}
                        placeholder="Nama Alumni" />
                </div>
                <div className="field">
                    <label className="label">Status</label>
                    <select
                        className="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Pilih Status</option>
                        <option value="mendapat pekerjaan">Mendapat Pekerjaan</option>
                        <option value="melanjutkan studi">Melanjutkan Studi</option>
                        <option value="wiraswasta">Wiraswasta</option>
                        <option value="mencari pekerjaan">Mencari Pekerjaan</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Gaji</label>
                    <select
                        className="select"
                        value={gaji}
                        onChange={(e) => setGaji(e.target.value)}
                    >
                        <option value="">Pilih Gaji</option>
                        <option value="lebih dari 1.2xUMP">Lebih dari 1.2xUMP</option>
                        <option value="kurang dari 1.2xUMP">Kurang dari 1.2xUMP</option>
                        <option value="belum berpendapatan">Belum berpendapatan</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Masa Tunggu</label>
                    <select
                        className="select"
                        value={masa_tunggu}
                        onChange={(e) => setMasaTunggu(e.target.value)}
                    >
                        <option value="">Pilih Masa Tunggu</option>
                        <option value="kurang dari 6 bulan">Kurang dari 6 bulan</option>
                        <option value="antara 6 sampai 12bulan">Antara 6 sampai 12 bulan</option>
                    </select>
                </div>
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditIku1;
