import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postCreateNewUser } from '../../../../Service/ApiService';
import { useDispatch } from 'react-redux'
import { fetchAllAccount } from '../../../../redux/action/AccountAction'
import './ModalCreateAccount.scss'
import Form from 'react-bootstrap/Form';
const ModalCreateCustomer = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");


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
                dispatch(fetchAllAccount());
                console.log('check create user')
            } else {
                toast.error(res.data.EM);
            }
        } catch (error) {
            toast.error("An error occurred while creating the user.");
        }
    }
    const [selectedUserType, setSelectedUserType] = useState('');

    const handleChange = (event) => {
        setSelectedUserType(event.target.value);
    };
    return (
        <>
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
                                    <label className="labels">Tên của người dùng:</label>
                                    <input type="text" className="form-control" placeholder="Tên người dùng" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Số điện thoại của người dùng:</label>
                                    <input type="text" className="form-control" placeholder="Số điện thoại" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Chức vụ của người dùng:</label>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="customer"
                                            value="customer"
                                            checked={selectedUserType === 'customer'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="customer">
                                            Khách hàng
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="employee"
                                            value="employee"
                                            checked={selectedUserType === 'employee'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="employee">
                                            Nhân viên
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="manager"
                                            value="manager"
                                            checked={selectedUserType === 'manager'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="manager">
                                            Quản lý
                                        </label>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Địa chỉ email của người dùng:</label>
                                    <input type="email" className="form-control" placeholder="NguyenVanA@gmail.com" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Nhập mã xác nhận của email:</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Nhập mã xác nhận" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Gửi mã</button>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <Button variant="primary" onClick={handleSubmitCreate}>
                                        Lưu thông tin của người dùng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalCreateCustomer;