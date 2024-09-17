import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postCreateNewUser } from '../../../../../Service/ApiService';
import { useDispatch } from 'react-redux'
import { fetchAllUser } from '../../../../../redux/action/userAction'
import './ModalCreateUser.scss'
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
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        className="rounded-circle mt-5"
                                        width="150px"
                                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                        alt="profile"
                                    />
                                </div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Thêm người dùng</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="labels">Tên của người dùng</label>
                                            <input type="text" className="form-control" placeholder="Tên người dùng" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Họ của người dùng</label>
                                            <input type="text" className="form-control" placeholder="Họ của người dùng" />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label className="labels">Số điện thoại của người dùng</label>
                                            <input type="text" className="form-control" placeholder="Số điện thoại" />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="labels">Địa chỉ email của người dùng</label>
                                            <input type="email" className="form-control" placeholder="NguyenVanA@gmail.com" />
                                        </div>

                                        <div className="col-md-12">
                                            <label className="labels">Nhập mã xác nhận của email</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Nhập mã xác nhận" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label className="labels">Country</label>
                                            <input type="text" className="form-control" placeholder="country" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">State/Region</label>
                                            <input type="text" className="form-control" placeholder="state" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center experience">
                                        <span>Edit Experience</span>
                                        <span className="border px-3 p-1 add-experience">
                                            <i className="fa fa-plus"></i>&nbsp;Experience
                                        </span>
                                    </div>
                                    <br />
                                    <div className="col-md-12">
                                        <label className="labels">Experience in Designing</label>
                                        <input type="text" className="form-control" placeholder="experience" />
                                    </div>
                                    <br />
                                    <div className="col-md-12">
                                        <label className="labels">Additional Details</label>
                                        <input type="text" className="form-control" placeholder="additional details" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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