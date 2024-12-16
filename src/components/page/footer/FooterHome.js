import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaHome, FaEnvelope, FaPhone, FaPrint, FaGem } from 'react-icons/fa';

export default function FooterHome() {
  return (
    <footer className="bg-light text-center text-muted p-4">
      <section className="d-flex justify-content-center justify-content-lg-between align-items-center border-bottom pb-4 mb-4">
        <div className="me-5 d-none d-lg-block">
          <span className="fs-5 text-dark  t fw-semibold">Kết nối với chúng tôi trên các mạng xã hội:</span>
        </div>

        <div>
          <button className="me-3 text-reset fs-4" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaFacebook />
          </button>
          <button className="me-3 text-reset fs-4" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaTwitter />
          </button>
          <button className="me-3 text-reset fs-4" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaGoogle />
          </button>
          <button className="me-3 text-reset fs-4" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaInstagram />
          </button>
        </div>
      </section>

      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase  text-dark  fw-bold mb-3">
                <FaGem className="me-2  " />
                SUPERSHOES
              </h6>
              <p className=" text-dark ">
              Sải bước tự tin - Đỉnh cao phong cách!
              </p>
            </Col>

            <Col md="3" lg="4" xl="3" className="mx-auto mb-4 text-dark ">
              <h6 className="text-uppercase text-dark fw-bold mb-3">Hỗ trợ</h6>
              <p className="mb-2">
                <a href="/Policy" className="text-reset text-decoration-none">Chính sách khách hàng</a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-reset text-decoration-none">Chính sách bảo hành</a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-reset text-decoration-none">Chính sách vận chuyển</a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-reset text-decoration-none">Chính sách đổi trả</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Chính sách bảo mật</a>
              </p>
            </Col>
            <Col md="3" lg="3" xl="3" className="mx-auto mb-4 text-dark ">
              <h6 className="text-uppercase text-dark fw-bold mb-3">Về SUPERSHOES</h6>
              <p className="mb-2">
                <a href="/about" className="text-reset text-decoration-none">Giới thiệu SUPERSHOES</a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-reset text-decoration-none">Danh sách cửa hàng</a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">Tuyển dụng</a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 text-dark ">
              <h6 className="text-uppercase text-dark fw-bold mb-3">Liên hệ</h6>
              <p className="mb-1">
                <FaHome className="me-2" />
               Cầu giấy, Hà nội, Việt Nam
              </p>
              <p className="mb-1">
                <FaEnvelope className="me-2" />
                supershoes@gmail.com
              </p>
              <p className="mb-1">
                <FaPhone className="me-2" />  +84 888 888 888
              </p>
              <p>
                <FaPrint className="me-2" />  +84 888 888 888
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
