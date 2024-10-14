import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import {toast} from "react-toastify";
import TableCustomer from "./TableCustomer";
import {
    createPublicVoucher,
    createPrivateVoucher,
} from "../../../../../Service/ApiVoucherService";
import {useDispatch} from "react-redux";
import {fetchAllVoucherAction} from "../../../../../redux/action/voucherAction";
import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";

function ModelCreateVoucher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const [voucherDetails, setVoucherDetails] = useState({
        codeVoucher: "",
        name: "",
        note: "",
        value: 0,
        quantity: 0,
        maximumDiscount: 0,
        type: "0",
        minBillValue: 0,
        startAt: "",
        endAt: "",
        status: "upcoming",
        isPrivate: false,
        accountIds: [],
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setVoucherDetails({...voucherDetails, [name]: value});
    };

    const handleCreateVoucher = async () => {
        try {
            let res;
            if (voucherDetails.isPrivate) {
                res = await createPrivateVoucher({
                    ...voucherDetails,
                    accountIds: selectedCustomerIds,
                });
            } else {
                res = await createPublicVoucher(voucherDetails);
            }

            if (res) {
                toast.success("Thêm thành công phiếu giảm giá");
                dispatch(fetchAllVoucherAction());
                navigate("/admins/manage-voucher");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.mess) {
                toast.error(error.response.data.mess);
            } else {
                toast.error("Có lỗi xảy ra khi tạo phiếu giảm giá.");
            }
        }
    };

    const handleReset = () => {
        setVoucherDetails({
            codeVoucher: "",
            name: "",
            note: "",
            value: 0,
            quantity: 0,
            maximumDiscount: 0,
            type: "0",
            minBillValue: 0,
            startAt: "",
            endAt: "",
            status: "upcoming",
            isPrivate: false,
            accountIds: [],
        });
        setSelectedCustomerIds([]);
    };

    return (
        <div className="model-create-voucher container voucher-container">
            <div className="row">
                <div className="col-lg-6">
                    <h4 className="text-center p-2">Thêm phiếu giảm giá</h4>
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên phiếu giảm giá</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={voucherDetails.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Kiểu giảm giá</Form.Label>
                                    <select
                                        className="form-select"
                                        name="type"
                                        value={voucherDetails.type}
                                        onChange={handleChange}
                                    >
                                        <option value="0">Giảm theo %</option>
                                        <option value="1">Giảm theo số tiền</option>
                                    </select>
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
                                        value={voucherDetails.quantity}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá trị</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="value"
                                        value={voucherDetails.value}
                                        onChange={handleChange}
                                    />
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
                                            value={voucherDetails.maximumDiscount}
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
                                            value={voucherDetails.minBillValue}
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
                                        value={voucherDetails.startAt}
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
                                        value={voucherDetails.endAt}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Loại phiếu giảm giá</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    label="Công khai"
                                    name="isPrivate"
                                    value="false"
                                    checked={!voucherDetails.isPrivate}
                                    onChange={() =>
                                        setVoucherDetails({...voucherDetails, isPrivate: false})
                                    }
                                    inline
                                />
                                <Form.Check
                                    type="radio"
                                    label="Riêng tư"
                                    name="isPrivate"
                                    value="true"
                                    onChange={() =>
                                        setVoucherDetails({...voucherDetails, isPrivate: true})
                                    }
                                    inline
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control
                                type="text"
                                name="note"
                                value={voucherDetails.note}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="info" onClick={handleCreateVoucher}>
                            Thêm mới
                        </Button> {" "}
                        <Button variant="secondary" onClick={handleReset}>
                            Làm mới
                        </Button>
                    </Form>
                </div>
                <div className="p-5 col-lg-6">
                    <TableCustomer
                        selectedCustomerIds={selectedCustomerIds}
                        setSelectedCustomerIds={setSelectedCustomerIds}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModelCreateVoucher;
