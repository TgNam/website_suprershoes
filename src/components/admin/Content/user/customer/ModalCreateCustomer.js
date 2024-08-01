import { IoIosAddCircleOutline } from "react-icons/io";
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postCreateNewUser } from '../../../../../Service/ApiService';
import { useDispatch } from 'react-redux'
import { fetchAllUser } from '../../../../../redux/action/userAction'

const ModalCreateUser = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setName("");
    };

    const handleShow = () => setShow(true);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreate = async () => {
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalid email");
            return;
        }

        try {
            const createUser = { email, name }
            let res = await postCreateNewUser(createUser);
            console.log("Component response:", res.data);
            if (res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                handleClose();
                dispatch(fetchAllUser());
                console.log('check create user')
            } else {
                toast.error(res.data.EM);
            }
        } catch (error) {
            toast.error("An error occurred while creating the user.");
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <IoIosAddCircleOutline /> Add new Customer
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formGroupName">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;