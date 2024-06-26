import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';


const Iku7NotValid = () => {
    const [iku7Data, setIku7Data] = useState([]);


    useEffect(() => {
        fetchIku7NotValid();
    }, []);


    const fetchIku7NotValid = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            const filteredData = response.data.filter(data => parseInt(data.presentase_bobot) > 49 && !data.rps);
            setIku7Data(filteredData);
        } catch (error) {
            console.error('Error fetching IKU7 data:', error);
        }
    };


    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        uploadRPS(file, id);
    };


    const uploadRPS = async (file, id) => {
        const formData = new FormData();
        formData.append('file', file);


        try {
            await axios.post(`http://localhost:8080/upload/iku7/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchIku7NotValid();
        } catch (error) {
            console.error('Error uploading RPS:', error);
        }
    };


    return (
        <div>
            <h3>IKU7 - Belum Upload RPS</h3>
            <Table bordered>
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
                    {iku7Data.map((iku, index) => (
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
                                    'Uploaded'
                                ) : (
                                    <div>
                                        <Button color="danger">Belum Upload</Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};


export default Iku7NotValid;
