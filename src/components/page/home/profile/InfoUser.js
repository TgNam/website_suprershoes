import { useState, useEffect } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./user.scss";
import Table from 'react-bootstrap/Table';
import ReactLoading from "react-loading";
import { IoEyeSharp } from "react-icons/io5";

const InfoUser = () => {
    const [status, setStatus] = useState(1);
    const [profile, setProfile] = useState({});
    const [order, setOrder] = useState([]);
    const [load, setLoad] = useState(false);
    const [tmpGender, setTmpGender] = useState('Nam');
    const [infoChange, setChange] = useState({});
    const listST = ["Chờ Xác Nhận", "Đang Chuẩn Bị Hàng", "Đang Vận Chuyển", "Đã Thanh Toán", "Đã Hủy"];
    const [tmp, setTmp] = useState(listST[0]);

    // Mock API Calls for demonstration
    const getProfile = async () => {
        // Simulate fetch profile data
        setLoad(true);
        setProfile({ firstName: "John", lastName: "Doe", phone: "0123456789", address: "123 Main St", account: { email: "john.doe@example.com" }, gender: 'Nam' });
        setTmpGender('Nam');
        setLoad(false);
    };

    const getOrder = async () => {
        // Simulate fetch orders data
        setLoad(true);
        setOrder([
            {
                id: "123",
                createdDate: "2023-01-01",
                feeShip: 50000,
                orderDetails: [
                    { productDetail: { infoProduct: { name: "Product A", linkImg: "#", size: "M", color: "Red" } }, amount: 2, prices: 200000 },
                ],
            },
        ]);
        setLoad(false);
    };

    const handleChangProfile = (e) => {
        const { id, value } = e.target;
        setChange(prevState => ({ ...prevState, [id]: value }));
        if (id === "gender") setTmpGender(value);
    };

    const updateProfile = () => {
        console.log("Profile updated:", infoChange);
        // Simulate profile update logic
    };

    const clickStatus = (e) => {
        setTmp(e.target.id);
    };

    useEffect(() => {
        getProfile();
        getOrder();
    }, [tmp]);

    return (
        <div className="margin-left-right padding-bottom-3x marginTop marginBot row">
            <div className="table-responsive block-infor-left ms-2">
                <button className={status === 1 ? "buttonHead active w-100" : "buttonHead w-100"} onClick={() => setStatus(1)}>Hồ sơ của tôi</button>
                <button className={status === 2 ? "buttonHead mb-3 active w-100" : "buttonHead mb-3 w-100"} onClick={() => setStatus(2)}>Đơn đặt hàng</button>
                <button className={status === 3 ? "buttonHead mb-3 active w-100" : "buttonHead mb-3 w-100"} onClick={() => setStatus(3)}>Đơn đã mua</button>
            </div>
            <div className="table-responsive block-infor-right">
                {status === 1 ? (
                    load ? (
                        <ReactLoading type={'cylon'} color='#000' height={'33px'} width={'9%'} />
                    ) : (
                        <div>
                            <h4 className="ms-4 mb-3 mt-3 text-center">Hồ sơ của tôi</h4>
                            <div className="row mb-3 ms-3 me-3 borderr">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        className="rounded-circle mt-5"
                                        width="150px"
                                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                        alt="profile"
                                    />
                                </div>
                                <div className="field field_v1 col">
                                    <label htmlFor="firstName" className="ha-screen-reader">Họ & đệm</label>
                                    <input id="firstName" className="field__input" onChange={handleChangProfile} defaultValue={profile.firstName || ""} placeholder=" " />
                                    <span className="field__label-wrap" aria-hidden="true"><span className="field__label">Họ & đệm</span></span>
                                </div>
                                <div className="field field_v1 col">
                                    <label htmlFor="lastName" className="ha-screen-reader">Tên</label>
                                    <input id="lastName" className="field__input" onChange={handleChangProfile} defaultValue={profile.lastName || ""} placeholder=" " />
                                    <span className="field__label-wrap" aria-hidden="true"><span className="field__label">Tên</span></span>
                                </div>
                                <div className="row mb-2">
                                    <div className="field field_v1 col">
                                        <label htmlFor="phone" className="ha-screen-reader">Số điện thoại</label>
                                        <input id="phone" className="field__input" required onChange={handleChangProfile} defaultValue={profile.phone || ""} placeholder=" " />
                                        <span className="field__label-wrap" aria-hidden="true"><span className="field__label">Số điện thoại</span></span>
                                    </div>
                                    <div className="field field_v1 col">
                                        <label htmlFor="email" className="ha-screen-reader">Email</label>
                                        <input id="email" className="field__input" value={profile.account?.email || ""} placeholder=" " disabled />
                                        <span className="field__label-wrap" aria-hidden="true"><span className="field__label">Email</span></span>
                                    </div>
                                </div>
                                <div className="display-flex">
                                    <p className="mt-3 ms-2">Giới tính:</p>
                                    <input type="radio" id="gender" value="Nam" name="gender" checked={tmpGender === 'Nam'} onChange={handleChangProfile} className="me-2 mt-3 ms-5" />
                                    <label htmlFor="nam" className="mt-3">Nam</label>
                                    <input type="radio" id="gender" value="Nu" name="gender" checked={tmpGender === 'Nu'} onChange={handleChangProfile} className="me-2 ms-4 mt-3" />
                                    <label htmlFor="nu" className="mt-3">Nữ</label>
                                </div>
                                <div className="field field_v1 mb-2">
                                    <label htmlFor="address" className="ha-screen-reader">Địa chỉ</label>
                                    <input id="address" className="field__input" onChange={handleChangProfile} defaultValue={profile.address || ""} placeholder=" " />
                                    <span className="field__label-wrap" aria-hidden="true"><span className="field__label">Địa chỉ</span></span>
                                </div>
                                <div className="col-2 mt-3 mb-3 m-auto">
                                    <button className="btn btn-success w-100" onClick={updateProfile}>Cập nhật thông tin</button>
                                </div>
                                <Link className="changePass" to="/change-pass">Đổi mật khẩu</Link>
                            </div>
                        </div>
                    )
                ) : (

                    <div className="p-5">
                        <h4 className="ms-4 mb-3 mt-3 text-center">Đơn đặt hàng</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã hóa đơn</th>
                                    <th>Tên khách hàng</th>
                                    <th>Tên nhân viên</th>
                                    <th>Loại</th>
                                    <th>Ngày tạo</th>
                                    <th>Tiền giảm</th>
                                    <th>Tổng tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>HD001</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Trần Thị B</td>
                                    <td>Bán lẻ</td>
                                    <td>2023-01-01</td>
                                    <td>100,000 VND</td>
                                    <td>1,000,000 VND</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className='me-5'

                                        >
                                            <IoEyeSharp />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>HD002</td>
                                    <td>Phạm Văn C</td>
                                    <td>Nguyễn Thị D</td>
                                    <td>Bán buôn</td>
                                    <td>2023-01-02</td>
                                    <td>50,000 VND</td>
                                    <td>2,000,000 VND</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className='me-5'

                                        >
                                            <IoEyeSharp />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoUser;
