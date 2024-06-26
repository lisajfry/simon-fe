import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Col, Table, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const YearList = () => {
    const [years, setYears] = useState([]);
    const [newYear, setNewYear] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getYears();
    }, []);

    const getYears = async () => {
        try {
            const response = await axios.get("http://localhost:8080/years");
            setYears(response.data);
        } catch (error) {
            console.error("Error fetching years:", error);
            setError("Error fetching years");
        }
    }

    const addYear = async () => {
        try {
            setError(null); // Reset error state
            const response = await axios.post("http://localhost:8080/years", { tahun: newYear });
            console.log(response.data); // Optional: log the response for debugging
            setNewYear(''); // Clear the input field after adding year
            getYears(); // Refresh the list of years
        } catch (error) {
            console.error("Error adding year:", error);
            setError("Error adding year");
        }
    }

    const deleteYear = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this year?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/years/${id}`);
                getYears();
            } catch (error) {
                console.error("Error deleting year:", error);
                setError("Error deleting year");
            }
        }
    }

    return (
        <div>
            <Col>
                <Card style={{ marginTop: '10px' }}>
                    <div>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-card-text me-2"> </i>
                            Year List
                        </CardTitle>
                    </div>
                    <CardBody className="">
                        {error && <Alert color="danger">{error}</Alert>}
                        <Form>
                            <FormGroup row>
                                <Label for="newYear" sm={2}>New Year</Label>
                                <Col sm={6}>
                                    <Input type="text" name="newYear" id="newYear" value={newYear} onChange={(e) => setNewYear(e.target.value)} placeholder="Enter new year" />
                                </Col>
                                <Col sm={2}>
                                    <Button color="primary" size="sm" onClick={addYear}><FaPlus /> Add Year</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Year</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {years.map((year, index) => (
                                    <tr key={year.id}>
                                        <td>{index + 1}</td>
                                        <td>{year.tahun}</td>
                                        <td>
                                            <Link to={`/years/${year.id}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteYear(year.id)}><FaTrash /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}

export default YearList;
