import React from 'react';
import { Slide } from 'react-slideshow-image';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import 'react-slideshow-image/dist/styles.css';

// Import gambar untuk slide
import iku1 from '../../assets/images/img/iku1.jpg';
import iku2a from '../../assets/images/img/iku2-1.jpg';
import iku2b from '../../assets/images/img/iku2-2.jpg';
import iku3 from '../../assets/images/img/iku3.jpg';
import iku4 from '../../assets/images/img/iku4.jpg';
import iku5a from '../../assets/images/img/iku5-1.jpg';
import iku5b from '../../assets/images/img/iku5-2.jpg';
import iku5c from '../../assets/images/img/iku5-3.jpg';
import iku6 from '../../assets/images/img/iku6.jpg';
import iku7 from '../../assets/images/img/iku7.jpg';

// Array gambar untuk slide
const slideimg = [
  iku1,
  iku2a,
  iku2b,
  iku3,
  iku4,
  iku5a,
  iku5b,
  iku5c,
  iku6,
  iku7
];

const Dashboard = () => {
    return (
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%' }}> {/* Tambahkan marginLeft negatif di sini */}
              <CardBody>
                <div className='content mt-3'>
                  <Slide images={slideimg} duration={200} transitionDuration={50}>
                    {slideimg.map((image, index) => (
                      <div key={index} className="each-slide">
                        <img src={image} className="slide-img" alt={`Slide ${index}`} style={{ maxWidth: '75vw', height: '75vh', objectFit: 'contain' }} />
                      </div>
                    ))}
                  </Slide>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Dashboard;
  