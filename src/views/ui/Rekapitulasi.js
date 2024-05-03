import React from 'react';
import { Card, CardText, CardBody, CardTitle, Button, Row, Col, Table } from 'reactstrap';

const Rekapitulasi = () => {
  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">REKAPITULASI</h5>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 1</CardTitle>
            <CardText>SKOR</CardText>
            <div>
              <Button color="success">Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">IKU 2</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="danger">Belum Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 3</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="success">Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">IKU 4</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="danger">Belum Tercapai</Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 5</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="success">Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">IKU 6</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="danger">Belum Tercapai</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">IKU 7</CardTitle>
            <CardText>Skor</CardText>
            <div>
              <Button color="success">Tercapai</Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Tabel Rekapitulasi IKU
            </CardTitle>
            <CardBody className="">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Keterangan</th>
                    <th>Iku1</th>
                    <th>Iku2</th>
                    <th>Iku3</th>
                    <th>Iku4</th>
                    <th>Iku5</th>
                    <th>Iku6</th>
                    <th>Iku7</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Rekapitulasi;
