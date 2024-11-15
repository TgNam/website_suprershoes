import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaHome, FaEnvelope, FaPhone, FaPrint, FaGem } from 'react-icons/fa';

export default function FooterHome() {
  
  return (
    <footer className="bg-light text-center text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <button className="me-4 text-reset" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaFacebook />
          </button>
          <button className="me-4 text-reset" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaTwitter />
          </button>
          <button className="me-4 text-reset" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaGoogle />
          </button>
          <button className="me-4 text-reset" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaInstagram />
          </button>
        </div>

      </section>

      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaGem className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">Angular</a>
              </p>
              <p>
                <a href="#!" className="text-reset">React</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Vue</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Laravel</a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">Pricing</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Settings</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Help</a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FaHome className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <FaEnvelope className="me-3" />
                info@example.com
              </p>
              <p>
                <FaPhone className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <FaPrint className="me-3" /> + 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
