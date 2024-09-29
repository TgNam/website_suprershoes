// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { getfindAccounts } from '../../../../Service/ApiAccountService'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ModalViewAccount = ({ idAccount }) => {
//     const [show, setShow] = useState(false);
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");

//     const handleClose = () => {
//         setShow(false);
//     };

//     const findAccount = async () => {
//         try {
//             const response = await getfindAccounts(idAccount);
//             console.log(response);
//             if (response && response.data) {
//                 setEmail(response.data.email);
//                 setName(response.data.name);
//             } else {
//                 toast.error('Error fetching Account details');
//             }
//         } catch (error) {
//             toast.error('Network Error');
//         }
//     };

//     useEffect(() => {
//         if (show) {
//             findAccount();
//         }
//     }, [show]);

//     return (
//         <>
//             <Button variant="success" onClick={() => setShow(true)}>View</Button>
//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 size="xl"
//                 backdrop="static"
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Customer</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Container>
//                             <Row>
//                                 <Col>
//                                     <Form.Group className="mb-3" controlId="formGroupEmail">
//                                         <Form.Label>Email address</Form.Label>
//                                         <Form.Control
//                                             type="email"
//                                             placeholder="Enter email"
//                                             value={email}
//                                             readOnly
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <Form.Group className="mb-3" controlId="formGroupName">
//                                         <Form.Label>Account Name</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter name"
//                                             value={name}
//                                             readOnly
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         </Container>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }

// export default ModalViewAccount;
