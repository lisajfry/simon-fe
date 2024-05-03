import React, { useState, useContext, useEffect } from 'react';
import { Card, CardText, CardBody, CardTitle, Col, Row } from "reactstrap";
import RespondenContext from './RespondenContext';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Import icons check and times

const MinResponden = ({ totalDataLulusan }) => {
  const [totalData, setTotalData] = useState(0);
  const { totalDataResponden } = useContext(RespondenContext);

  useEffect(() => {
    // Calculate using the correct formula and update the state
    const result = totalDataLulusan / ((totalDataLulusan * Math.pow(0.025, 2)) + 1);
    setTotalData(Math.ceil(result)); // Use Math.ceil to round up to the nearest whole number
  }, [totalDataLulusan]);

  // Check if totalDataResponden meets or exceeds totalData
  const isRespondenMinimumMet = totalDataResponden >= totalData;

  return (
    <div>
      <Row>
        <Col md="6" lg="3">
          <Card body color={isRespondenMinimumMet ? "success" : "danger"} inverse>
            <CardTitle tag="h5">Responden Minimum</CardTitle>
            <CardText>
              <p style={{ marginLeft: '10px' }}>Total data lulusan: {totalDataLulusan}</p>
              <p style={{ marginLeft: '10px' }}>Responden Minimum: {totalData}</p>
              <p style={{ marginLeft: '10px' }}>Total Responden: {totalDataResponden}</p>
              {/* Menampilkan pesan "Responden Minimum Terpenuhi" atau "Responden Minimum Tidak Terpenuhi" beserta ikon */}
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', color: isRespondenMinimumMet ? '#0f0' : '#f00' }}>
                {isRespondenMinimumMet ? <FaCheck style={{ marginRight: '5px' }} /> : <FaTimes style={{ marginRight: '5px' }} />}
                {isRespondenMinimumMet ? "Responden Minimum Terpenuhi" : "Responden Minimum Tidak Terpenuhi"}
              </div>
            </CardText>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MinResponden;
