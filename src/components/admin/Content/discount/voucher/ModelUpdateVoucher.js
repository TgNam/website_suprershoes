import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {toast} from "react-toastify";
import {getVoucherById,} from "../../../../../Service/ApiVoucherService";
import {useDispatch} from "react-redux";
import {updateVoucherAction} from "../../../../../redux/action/voucherAction";
import {Link, useNavigate, useParams} from "react-router-dom";
import {InputGroup} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";

function ModelUpdateVoucher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {voucherId} = useParams();
    console.log('Voucher ID:', voucherId);


    const [voucherDetails, setVoucherDetails] = useState({
        codeVoucher: "",
        name: "",
        note: "",
        value: 0,
        quantity: 0,
        maximumDiscount: 0,
        type: "",
        minBillValue: 0,
        startAt: "",
        endAt: "",
        status: "upcoming",
        isPrivate: false,
        accountIds: [],
    });

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const res = await getVoucherById(voucherId);
                if (res && res.data) {
                    console.log('Voucher Data:', res.data);
                    setVoucherDetails(res.data);
                } else {
                    console.error('No data returned for voucher ID:', voucherId);
                    toast.error('Voucher not found or invalid response.');
                }
            } catch (error) {
                console.error('Error fetching voucher:', error);
                toast.error('Failed to fetch voucher details.');
            }
        };

        fetchVoucher();
    }, [voucherId]);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setVoucherDetails({...voucherDetails, [name]: value});
    };

    const handleUpdateVoucher = async () => {
        try {
            await dispatch(updateVoucherAction(voucherId, voucherDetails));

            toast.success('Cập nhật thành công');
            navigate('/admins/manage-voucher');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error('Đã xảy ra lỗi khi cập nhật voucher.');
            }
        }
    };

    return (
        <div className="model-update-voucher container voucher-container">
            <div className="row">
                <div className="col-lg-6">
                    <h4 className="text-center p-2">Cập nhật phiếu giảm giá</h4>
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Mã phiếu giảm giá</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="codeVoucher"
                                        value={voucherDetails?.codeVoucher || ""}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên phiếu giảm giá</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={voucherDetails?.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Kiểu giảm giá</Form.Label>
                                    <select
                                        className="form-select"
                                        name="type"
                                        value={voucherDetails?.type}
                                        onChange={handleChange}
                                    >
                                        <option value="0">Giảm theo %</option>
                                        <option value="1">Giảm theo số tiền</option>
                                    </select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá trị</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            name="value"
                                            value={voucherDetails?.value}
                                            onChange={handleChange}
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giảm giá tối đa</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            name="maximumDiscount"
                                            value={voucherDetails?.maximumDiscount}
                                            onChange={handleChange}
                                            disabled={voucherDetails.type === "1"}
                                        />
                                        <InputGroup.Text>VND</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            name="minBillValue"
                                            value={voucherDetails?.minBillValue}
                                            onChange={handleChange}
                                        />
                                        <InputGroup.Text>VND</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày bắt đầu</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="startAt"
                                        value={voucherDetails?.startAt}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày kết thúc</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="endAt"
                                        value={voucherDetails?.endAt}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={voucherDetails?.quantity}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3 mt-2">
                                    <Form.Label>Loại phiếu giảm giá</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            label="Công khai"
                                            name="isPrivate"
                                            checked={!voucherDetails?.isPrivate}
                                            onChange={() =>
                                                setVoucherDetails({...voucherDetails, isPrivate: false})
                                            }
                                            inline
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Riêng tư"
                                            name="isPrivate"
                                            checked={voucherDetails?.isPrivate}
                                            onChange={() =>
                                                setVoucherDetails({...voucherDetails, isPrivate: true})
                                            }
                                            inline
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control
                                type="text"
                                name="note"
                                value={voucherDetails?.note}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="info" onClick={handleUpdateVoucher}>
                            Cập nhật
                        </Button>{" "}
                        <Link to="/admins/manage-voucher">
                            <Button variant="secondary">
                                Quay lại
                            </Button>
                        </Link>
                    </Form>
                </div>
                <div className="model-table-product p-5 col-lg-6">
                    <div className="search-product mb-3">
                        <label htmlFor="listAccount" className="form-label">
                            Danh sách khách hàng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nameShoe"
                            placeholder="Tìm kiếm khách hàng theo tên hoặc số điện thoại...."
                        />
                    </div>
                    <div className="table-product mb-3">
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Populate with customer data */}
                            {[1, 2, 3, 4, 5].map((id) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>0987654321</td>
                                    <td>Tòa Nhà Audi số 8 Phạm Hùng</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-evenly">
                            <Pagination>
                                <Pagination.First/>
                                <Pagination.Prev/>
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Item>{2}</Pagination.Item>
                                <Pagination.Item>{3}</Pagination.Item>
                                <Pagination.Item>{4}</Pagination.Item>
                                <Pagination.Next/>
                                <Pagination.Last/>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModelUpdateVoucher;
