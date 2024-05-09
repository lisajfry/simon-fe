import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditIku7 = () => {
    const [Kode_MK, setKodeMK] = useState('');
    const [Nama_MK, setNamaMK] = useState('');
    const [Tahun, setTahun] = useState('');
    const [Semester, setSemester] = useState('');
    const [Kelas, setKelas] = useState('');
    const [Presentase_Bobot_Terpenuhi, setPresentaseBobotTerpenuhi] = useState('');
    const [RPS, setRPS] = useState('');
    const [Rancangan_Tugas_Dan_Evaluasi, setRancanganTugasDanEvaluasi] = useState('');
    const navigate = useNavigate();
    const { iku7_id } = useParams();

    useEffect(() => {
        const fetchIku7 = async () => {
            if (!iku7_id) return;
            try {
                const response = await axios.get('http://localhost:8080/iku7/${iku7_id}');
                const iku7Data = response.data;
                setKodeMK(iku7Data.Kode_MK);
                setNamaMK(iku7Data.Nama_MK);
                setTahun(iku7Data.Tahun);
                setSemester(iku7Data.Semester);
                setKelas(iku7Data.Kelas);
                setPresentaseBobotTerpenuhi(iku7Data.Presentase_Bobot_Terpenuhi);
                setRPS(iku7Data.RPS);
                setRancanganTugasDanEvaluasi(iku7Data.Rancangan_Tugas_Dan_Evaluasi);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchIku7();
    }, [iku7_id]);

    const AddIku7 = async (e) => {
        e.preventDefault();
        if (!iku7_id) return;
        try {
            await axios.put('http://localhost:8080/update/iku7/${iku7_id}', {
                Kode_MK,
                Nama_MK,
                Tahun,
                Semester,
                Kelas,
                Presentase_Bobot_Terpenuhi,
                RPS,
                Rancangan_Tugas_Dan_Evaluasi
            });
            navigate('/iku7list');
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={AddIku7}>
                <div className="field">
                    <label className="label">Kode MK</label>
                    <input
                        type="text"
                        className="input"
                        value={Kode_MK}
                        onChange={(e) => setKodeMK(e.target.value)}
                        placeholder="Kode MK"
                    />
                </div>
                <div className="field">
                    <label className="label">Nama MK</label>
                    <input
                        type="text"
                        className="input"
                        value={Nama_MK}
                        onChange={(e) => setNamaMK(e.target.value)}
                        placeholder="Nama MK"
                    />
                </div>
                <div className="field">
                    <label className="label">Tahun</label>
                    <input
                        type="text"
                        className="input"
                        value={Tahun}
                        onChange={(e) => setTahun(e.target.value)}
                        placeholder="Tahun"
                    />
                </div>
                <div className="field">
                    <label className="label">Semester</label>
                    <input
                        type="text"
                        className="input"
                        value={Semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="Semester"
                    />
                </div>
                <div className="field">
                    <label className="label">Kelas</label>
                    <input
                        type="text"
                        className="input"
                        value={Kelas}
                        onChange={(e) => setKelas(e.target.value)}
                        placeholder="Kelas"
                    />
                </div>
                <div className="field">
                    <label className="label">Presentase Bobot Terpenuhi</label>
                    <input
                        type="text"
                        className="input"
                        value={Presentase_Bobot_Terpenuhi}
                        onChange={(e) => setPresentaseBobotTerpenuhi(e.target.value)}
                        placeholder="Presentase Bobot Terpenuhi"
                    />
                </div>
                <div className="field">
                    <label className="label">RPS</label>
                    <input
                        type="text"
                        className="input"
                        value={RPS}
                        onChange={(e) => setRPS(e.target.value)}
                        placeholder="RPS"
                    />
                </div>
                <div className="field">
                    <label className="label">Rancangan Tugas dan Evaluasi</label>
                    <input
                        type="text"
                        className="input"
                        value={Rancangan_Tugas_Dan_Evaluasi}
                        onChange={(e) => setRancanganTugasDanEvaluasi(e.target.value)}
                        placeholder="Rancangan Tugas dan Evaluasi"
                    />
                </div>
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    );
};

export default EditIku7;