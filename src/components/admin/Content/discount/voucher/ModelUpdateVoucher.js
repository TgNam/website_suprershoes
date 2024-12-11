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
import "./ModelCreateVoucher.scss";
import TableCustomer from "./TableCustomer";
import * as yup from 'yup';
import swal from 'sweetalert';

function ModelUpdateVoucher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { voucherId } = useParams();

    const [loading, setLoading] = useState(false);
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

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const validationSchema = yup.object().shape({
        quantity: yup.number()
            .typeError('Số lượng phải là số')
            .required('Số lượng là bắt buộc')
            .integer('Số lượng phải là số nguyên')
            .min(1, 'Số lượng phải ít nhất là 1')
            .max(1000, 'Số lượng không được vượt quá 1000')
            .test(
                'is-positive-integer',
                'Số lượng phải là số nguyên dương và không chứa ký tự đặc biệt',
                (value) => /^\d+$/.test(value) && value > 0
            ),

        startAt: yup.date()
            .required('Ngày bắt đầu là bắt buộc')
            .typeError('Ngày bắt đầu không hợp lệ')
            .min(new Date(), 'Ngày bắt đầu phải từ hiện tại trở đi')
            .max(new Date(2099, 0, 1), 'Ngày bắt đầu không thể lớn hơn ngày 1/1/2099'),

        endAt: yup.date()
            .required('Ngày kết thúc là bắt buộc')
            .typeError('Ngày kết thúc không hợp lệ')
            .min(yup.ref('startAt'), 'Ngày kết thúc phải sau ngày bắt đầu')
            .max(new Date(2099, 0, 1), 'Ngày kết thúc không thể lớn hơn ngày 1/1/2099'),
    });

    useEffect(() => {
        const fetchVoucher = async () => {
            setLoading(true);
            try {
                const res = await getVoucherById(voucherId);
                if (res) {
                    const formatToLocalDatetime = (dateString) => {
                        if (!dateString) return "";
                        const localDate = new Date(dateString);

                        const date = localDate.toLocaleDateString("sv-SE");
                        const time = localDate.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' });
                        return `${date}T${time}`;
                    };

                    const formattedVoucher = {
                        ...res,
                        startAt: formatToLocalDatetime(res.startAt),
                        endAt: formatToLocalDatetime(res.endAt),
                        quantity: res.quantity || "",
                    };
                    setVoucherDetails(formattedVoucher);
                    setSelectedCustomerIds(res.accountIds || []);
                } else {
                    toast.error("Voucher không tìm thấy hoặc phản hồi không hợp lệ.");
                }
            } catch (error) {
                toast.error(`Lấy chi tiết voucher thất bại: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchVoucher();
    }, [voucherId]);


    const handleChange = (event) => {
        const { name, value } = event.target;

        const updatedValue = name === "quantity" ? (value === "" ? "" : parseInt(value, 10)) : value;

        setVoucherDetails({ ...voucherDetails, [name]: value });
    };

    const handleUpdateVoucher = async () => {
        const result = await swal({
            title: "Xác nhận cập nhật?",
            text: "Bạn có chắc chắn muốn cập nhật phiếu giảm giá này?",
            icon: "warning",
            buttons: ["Hủy", "Cập nhật"],
            dangerMode: true,
        });

        if (!result) return;

        if (new Date(voucherDetails.endAt) <= new Date(voucherDetails.startAt)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu.");
            return;
        }

        const currentDate = new Date();
        const startAtDate = new Date(voucherDetails.startAt);
        const endAtDate = new Date(voucherDetails.endAt);

        let updatedStatus = voucherDetails.status;
        if (startAtDate > currentDate) {
            updatedStatus = "UPCOMING";
        } else if (startAtDate <= currentDate && endAtDate > currentDate) {
            updatedStatus = "ONGOING";
        } else {
            updatedStatus = "EXPIRED";
        }

        setLoading(true);
        try {
            const updatedVoucherDetails = {
                ...voucherDetails,
                startAt: voucherDetails.startAt ? new Date(voucherDetails.startAt).toISOString() : "",
                endAt: voucherDetails.endAt ? new Date(voucherDetails.endAt).toISOString() : "",
                quantity: voucherDetails.quantity,
                status: updatedStatus,
            };

            await dispatch(updateVoucherAction(voucherId, updatedVoucherDetails));
            toast.success("Cập nhật phiếu giảm giá thành công");
            navigate("/admins/manage-voucher");
        } catch (error) {
            toast.error("Cập nhật phiếu giảm giá thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "ONGOING":
                return "Đang diễn ra";
            case "UPCOMING":
                return "Sắp diễn ra";
            case "EXPIRED":
                return "Đã kết thúc";
            case "ENDED_EARLY":
                return "Kết thúc sớm";
            default:
                return "Không tồn tại";
        }
    };

    const isExpired = voucherDetails.status === "EXPIRED";

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
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Kiểu giảm giá</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={String(voucherDetails?.type) === "0" ? "Giảm theo %" : "Giảm theo số tiền"}
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="minBillValue"
                                            value={voucherDetails?.minBillValue ? Number(voucherDetails.minBillValue).toLocaleString("vi-VN") : ""}
                                            disabled
                                        />
                                        <InputGroup.Text>VND</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá trị</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="value"
                                            value={String(voucherDetails?.type) === "1" ? Number(voucherDetails.value).toLocaleString("vi-VN") : voucherDetails?.value}
                                            disabled
                                        />
                                        <InputGroup.Text>
                                            {String(voucherDetails?.type) === "0" ? "%" : "VND"}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Giảm giá tối đa</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="maximumDiscount"
                                            value={voucherDetails?.maximumDiscount ? Number(voucherDetails.maximumDiscount).toLocaleString("vi-VN") : ""}
                                            disabled
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
                                        value={voucherDetails.startAt || ""}
                                        onChange={handleChange}
                                        isInvalid={
                                            !voucherDetails.startAt ||
                                            new Date(voucherDetails.startAt) < new Date()
                                        }
                                    />
                                    {!voucherDetails.startAt ? (
                                        <Form.Control.Feedback type="invalid">
                                            Ngày bắt đầu là bắt buộc.
                                        </Form.Control.Feedback>
                                    ) : (
                                        new Date(voucherDetails.startAt) < new Date() && (
                                            <Form.Control.Feedback type="invalid">
                                                Ngày bắt đầu phải từ ngày hiện tại trở đi.
                                            </Form.Control.Feedback>
                                        )
                                    )}
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày kết thúc</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="endAt"
                                        value={voucherDetails.endAt || ""}
                                        onChange={handleChange}
                                        isInvalid={
                                            !voucherDetails.endAt || new Date(voucherDetails.endAt) <= new Date(voucherDetails.startAt)
                                        }

                                    />
                                    {!voucherDetails.endAt ? (
                                        <Form.Control.Feedback type="invalid">
                                            Ngày kết thúc là bắt buộc.
                                        </Form.Control.Feedback>
                                    ) : (
                                        new Date(voucherDetails.endAt) <= new Date(voucherDetails.startAt) && (
                                            <Form.Control.Feedback type="invalid">
                                                Ngày kết thúc phải sau ngày bắt đầu.
                                            </Form.Control.Feedback>
                                        )
                                    )}
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
                                        min="1"
                                        max="1000"
                                        isInvalid={
                                            !voucherDetails.quantity ||
                                            voucherDetails.quantity < 1 ||
                                            voucherDetails.quantity > 1000 ||
                                            !Number.isInteger(Number(voucherDetails.quantity))
                                        }
                                    />
                                    {!voucherDetails.quantity ? (
                                        <Form.Control.Feedback type="invalid">
                                            Số lượng là bắt buộc.
                                        </Form.Control.Feedback>
                                    ) : (
                                        (voucherDetails.quantity < 1 || voucherDetails.quantity > 1000 || !Number.isInteger(Number(voucherDetails.quantity))) && (
                                            <Form.Control.Feedback type="invalid">
                                                Số lượng phải là số nguyên dương từ 1 đến 1000.
                                            </Form.Control.Feedback>
                                        )
                                    )}
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
                                            readOnly
                                            inline
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Riêng tư"
                                            name="isPrivate"
                                            checked={voucherDetails?.isPrivate}
                                            readOnly
                                            inline
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ghi chú</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="note"
                                        value={voucherDetails?.note || ""}
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="status"
                                        value={getStatusText(voucherDetails?.status) || ""}
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Button
                            variant="info"
                            onClick={handleUpdateVoucher}
                        >
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </Button>{" "}
                        <Link to="/admins/manage-voucher">
                            <Button variant="secondary">Quay lại</Button>
                        </Link>
                    </Form>
                </div>

                <div className="model-table-product p-5 col-lg-6">
                    {voucherDetails.isPrivate ? (
                        <div>
                            <TableCustomer
                                selectedCustomerIds={selectedCustomerIds}
                                setSelectedCustomerIds={setSelectedCustomerIds}
                                showSelectedOnly={true}
                                isUpdateMode={true}
                            />
                        </div>
                    ) : (
                        <p className="text-muted">Bảng khách hàng chỉ hiển thị khi phiếu giảm giá là Riêng tư.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModelUpdateVoucher;
