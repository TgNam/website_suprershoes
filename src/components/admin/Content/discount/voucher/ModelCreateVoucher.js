import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import TableCustomer from "./TableCustomer";
import {
    createPublicVoucher,
    createPrivateVoucher,
} from "../../../../../Service/ApiVoucherService";
import { useDispatch } from "react-redux";
import { fetchAllVoucherAction } from "../../../../../redux/action/voucherAction";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";
import { fetchEmailsByCustomerIds } from "../../../../../Service/ApiVoucherService";
import { sendEmail } from "../../../../../Service/ApiVoucherService";
import { useSelector } from "react-redux";



function ModelCreateVoucher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const customers = useSelector((state) => state.account.listAccountCusomer);

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
        const { name, value } = event.target;
        setVoucherDetails({ ...voucherDetails, [name]: value });
    };

    
    const handleCreateVoucher = async () => {
        try {
            let res;

            const generateEmailContent = ({
                companyName,
                companyAddress,
                companyPhone,
                companyEmail,
                customerName,
                voucherCode,
                discountName,
                discountValue,
                minOrderValue,
                expirationDate,
                startDate,
                websiteUrl,
                image,
            }) => {
                return `
                       Kính gửi Quý khách hàng ${customerName},<br>
                    Chúng tôi xin gửi lời cảm ơn chân thành đến Quý khách hàng đã tin tưởng và ủng hộ ${companyName} trong thời gian qua.<br>
                    Nhằm tri ân sự ủng hộ của Quý khách, chúng tôi xin trân trọng gửi tới Quý khách một Phiếu giảm giá đặc biệt với thông tin chi tiết như sau:<br>
                    • Tên chương trình: ${discountName}<br>
                    • Giá trị giảm: ${discountValue} VND<br>
                    • Giá trị đơn hàng tối thiểu: ${minOrderValue} VND<br>
                    • Ngày hết hạn: ${new Date(expirationDate).toLocaleDateString("vi-VN")}<br>
                       Quý khách có thể sử dụng mã giảm giá này cho các đơn hàng mua sắm tại ${websiteUrl} từ ${new Date(startDate).toLocaleDateString("vi-VN")} đến ${new Date(expirationDate).toLocaleDateString("vi-VN")}.<br>
                    Đừng bỏ lỡ cơ hội sở hữu những sản phẩm chất lượng với ưu đãi hấp dẫn!<br>
                    Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi qua ${companyEmail} hoặc hotline ${companyPhone}.<br>
                    Trân trọng,<br><br>${companyName}<br><br>
                    <img src="${image}" alt="Company Logo" style="width:200px;height:auto;" />
                `;
            };

            const handleSuccess = async () => {
                toast.success("Thêm thành công phiếu giảm giá");
                dispatch(fetchAllVoucherAction());
                navigate("/admins/manage-voucher");
            };

            if (voucherDetails.isPrivate) {
                res = await createPrivateVoucher({
                    ...voucherDetails,
                    accountIds: selectedCustomerIds,
                });

                if (res) {
                    await handleSuccess();
                    const emails = await fetchEmailsByCustomerIds(selectedCustomerIds);
                    if (emails && emails.length > 0) {
                        for (const email of emails) {
                            const customer = customers.find(c => c.email === email);
                            const emailContent = generateEmailContent({
                                companyName: "Công ty Super Stores",
                                companyAddress: "Vị trí nào đấy chưa xác định :D",
                                companyPhone: "0909 123 456",
                                companyEmail: "namntph33821@gmail.com",
                                customerName: customer?.name || "Quý khách",
                                voucherCode: voucherDetails.codeVoucher,
                                discountName: voucherDetails.name,
                                discountValue: voucherDetails.value,
                                minOrderValue: voucherDetails.minBillValue,
                                expirationDate: voucherDetails.endAt,
                                startDate: voucherDetails.startAt,
                                websiteUrl: "https://SuperStores.com",
                                image: "https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png", 
                            });
                            await sendEmail({
                                to: email,
                                subject: "Phiếu giảm giá đặc biệt dành cho bạn!",
                                body: emailContent,
                            });
                        }
                        toast.success("Email đã được gửi cho khách hàng");
                    } else {
                        toast.warning("Không tìm thấy email của khách hàng.");
                    }
                }
            } else {
                res = await createPublicVoucher(voucherDetails);
                if (res) {
                    await handleSuccess();
                }
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.mess || "Có lỗi xảy ra khi tạo phiếu giảm giá.";
            toast.error(errorMessage);
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
                                        setVoucherDetails({ ...voucherDetails, isPrivate: false })
                                    }
                                    inline
                                />
                                <Form.Check
                                    type="radio"
                                    label="Riêng tư"
                                    name="isPrivate"
                                    value="true"
                                    onChange={() =>
                                        setVoucherDetails({ ...voucherDetails, isPrivate: true })
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
