import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { getVoucherById } from "../../../../../Service/ApiVoucherService";
import { useDispatch } from "react-redux";
import { updateVoucherAction } from "../../../../../redux/action/voucherAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";import TableCustomer from "./TableCustomer";

function ModelUpdateVoucher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { voucherId } = useParams(); // Get voucher ID from URL

    const [loading, setLoading] = useState(false); // Add loading state
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

    // State for selected customer IDs in the TableCustomer component
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    useEffect(() => {
        const fetchVoucher = async () => {
            setLoading(true); // Show loading indicator
            try {
                const res = await getVoucherById(voucherId);
                if (res) {
                    console.log("Fetched Voucher Data:", res);
                    const formattedVoucher = {
                        ...res,
                        startAt: res.startAt ? new Date(res.startAt).toISOString().slice(0, 16) : "",
                        endAt: res.endAt ? new Date(res.endAt).toISOString().slice(0, 16) : "",
                    };
                    setVoucherDetails(formattedVoucher);
                    setSelectedCustomerIds(res.accountIds || []); // Set selected customer IDs if the voucher is private
                } else {
                    toast.error("Voucher không tìm thấy hoặc phản hồi không hợp lệ.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết voucher:", error);
                toast.error(`Lấy chi tiết voucher thất bại: ${error.message}`);
            } finally {
                setLoading(false); // Hide loading indicator
            }
        };
        fetchVoucher();
    }, [voucherId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVoucherDetails({ ...voucherDetails, [name]: value });
    };

    const handleUpdateVoucher = async () => {
        setLoading(true); // Disable update button during submission
        try {
            // Attach selectedCustomerIds to voucherDetails if it's a private voucher
            const updatedVoucherDetails = {
                ...voucherDetails,
                accountIds: voucherDetails.isPrivate ? selectedCustomerIds : [],
            };
            await dispatch(updateVoucherAction(voucherId, updatedVoucherDetails));
            toast.success("Cập nhật voucher thành công");
            navigate("/admins/manage-voucher"); // Navigate back to manage vouchers page
        } catch (error) {
            const errorMessage = error?.response?.data?.mess || "Cập nhật voucher thất bại.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
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
                                        value={voucherDetails?.name || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Kiểu giảm giá</Form.Label>
                                    <Form.Select
                                        name="type"
                                        value={voucherDetails?.type || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="0">Giảm theo %</option>
                                        <option value="1">Giảm theo số tiền</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá trị giảm</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            name="value"
                                            value={voucherDetails?.value || ""}
                                            onChange={handleChange}
                                        />
                                        <InputGroup.Text>
                                            {voucherDetails.type === "0" ? "%" : "VND"}
                                        </InputGroup.Text>
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
                                            value={voucherDetails?.maximumDiscount || ""}
                                            onChange={handleChange}
                                            disabled={voucherDetails?.type === "1"}
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
                                            value={voucherDetails?.minBillValue || ""}
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
                                        value={voucherDetails?.startAt || ""}
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
                                        value={voucherDetails?.endAt || ""}
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
                                        value={voucherDetails?.quantity || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3 mt-2">
                                    <Form.Label>Loại Phiếu giảm giá</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            label="Công Khai"
                                            name="isPrivate"
                                            checked={!voucherDetails?.isPrivate}
                                            onChange={() => setVoucherDetails({ ...voucherDetails, isPrivate: false })}
                                            inline
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Riêng Tư"
                                            name="isPrivate"
                                            checked={voucherDetails?.isPrivate}
                                            onChange={() => setVoucherDetails({ ...voucherDetails, isPrivate: true })}
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
                                value={voucherDetails?.note || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="info" onClick={handleUpdateVoucher} disabled={loading}>
                            {loading ? "Đang cập nhật..." : "Cập Nhật"}
                        </Button>{" "}
                        <Link to="/admins/manage-voucher">
                            <Button variant="secondary">Quay Lại</Button>
                        </Link>
                    </Form>
                </div>

                {/* Bảng khách hàng liên quan */}
                <div className="model-table-product p-5 col-lg-6">
                    <TableCustomer
                        selectedCustomerIds={selectedCustomerIds}
                        setSelectedCustomerIds={setSelectedCustomerIds}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModelUpdateVoucher;
