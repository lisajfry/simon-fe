import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';


const Iku7Valid = () => {
    const [iku7ValidData, setIku7ValidData] = useState([]);


    useEffect(() => {
        fetchIku7ValidData();
    }, []);


    const fetchIku7ValidData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            // Filter data IKU7 yang presentasenya lebih dari 50 dan telah mengupload file (RPS)
            const validData = response.data.filter(iku => parseInt(iku.presentase_bobot) > 49 && iku.rps);
            setIku7ValidData(validData);
        } catch (error) {
            console.error('Error fetching valid IKU7 data:', error);
        }
    };


    return (
        <div>
            <h3>Data IKU7 yang Valid</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kode Mata Kuliah</th>
                        <th>Nama Mata Kuliah</th>
                        <th>Tahun</th>
                        <th>Semester</th>
                        <th>Kelas</th>
                        <th>Presentase Bobot</th>
                        <th>RPS</th>
                    </tr>
                </thead>
                <tbody>
                    {iku7ValidData.map((iku, index) => (
                        <tr key={iku.iku7_id}>
                            <td>{index + 1}</td>
                            <td>{iku.kode_mk}</td>
                            <td>{iku.nama_mk}</td>
                            <td>{iku.tahun}</td>
                            <td>{iku.semester}</td>
                            <td>{iku.kelas}</td>
                            <td>{iku.presentase_bobot}</td>
                            <td>
                                {iku.rps ? (
                                    <a href={`http://localhost:8080/${iku.rps}`} target="_blank" rel="noreferrer">Lihat RPS</a>
                                ) : (
                                    "Belum diunggah"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};


export default Iku7Valid;


