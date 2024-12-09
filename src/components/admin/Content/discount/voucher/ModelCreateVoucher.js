import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import TableCustomer from "./TableCustomer";
import {
    createPrivateVoucher,
    createPublicVoucher,
    fetchEmailsByCustomerIds,
    sendEmail,
} from "../../../../../Service/ApiVoucherService";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVoucherAction } from "../../../../../redux/action/voucherAction";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ModelCreateVoucher.scss";
import * as yup from 'yup';


function ModelCreateVoucher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customers = useSelector((state) => state.account.listAccountCusomer);

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const [voucherDetails, setVoucherDetails] = useState({
        name: "",
        note: "",
        value: "",
        quantity: "",
        maximumDiscount: "",
        minBillValue: "",
        startAt: null,
        endAt: null,
        type: "0",
        status: "upcoming",
        isPrivate: false,
        accountIds: [],
    });

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Tên phiếu giảm giá là bắt buộc')
            .trim()
            .strict(true)
            .test(
                'is-not-only-whitespace',
                'Tên phiếu giảm giá là bắt buộc',
                (value) => value && value.trim().length > 0
            )
            .matches(/^[A-Za-zÀ-ỹ0-9\s]+$/, 'Tên không được chứa ký tự đặc biệt')
            .max(255, 'Tên không được vượt quá 255 ký tự'),
        type: yup.string()
            .required('Loại phiếu giảm giá là bắt buộc'),
        quantity: yup.number()
            .required('Số lượng là bắt buộc')
            .integer('Số lượng phải là số nguyên')
            .min(1, 'Số lượng phải là ít nhất 1')
            .max(1000, 'Số lượng không được vượt quá 1000')
            .test(
                'is-positive-integer',
                'Số lượng phải là số nguyên dương và không chứa ký tự đặc biệt',
                (value) => Number.isInteger(value) && value > 0
            ),

        value: yup.number()
            .required('Giá trị là bắt buộc.')
            .when('type', {
                is: '0',
                then: yup.number()
                    .min(1, 'Giá trị phải từ 1%')
                    .max(99, 'Giá trị không được vượt quá 99%'),
                otherwise: yup.number()
                    .min(1000, 'Giá trị phải từ 1,000 VND')
                    .max(2000000, 'Giá trị không được vượt quá 2,000,000 VND')
                    .test(
                        'value-less-than-minBillValue',
                        'Giá trị không được lớn hơn giá trị đơn hàng tối thiểu',
                        function (value) {
                            const { minBillValue } = this.parent;
                            return value <= minBillValue;
                        }
                    )
            }),

        maximumDiscount: yup.number()
            .required('Giảm giá tối đa là bắt buộc.')
            .min(1000, 'Giảm giá tối đa phải lớn hơn 1,000 VND')
            .max(2000000, 'Giảm giá tối đa không được vượt quá 2,000,000 VND')
            .test(
                'maximumDiscount-less-than-minBillValue',
                'Giảm giá tối đa không được lớn hơn giá trị đơn hàng tối thiểu',
                function (value) {
                    const { minBillValue } = this.parent;
                    return value <= minBillValue;
                }
            ),

        minBillValue: yup.number()
            .required('Giá trị là bắt buộc.')
            .min(0.01, 'Giá trị phải từ 0.01 VND.')
            .max(10000000, 'Giá trị không được vượt quá 10,000,000 VND.')
            .typeError('Giá trị không hợp lệ, vui lòng nhập số.'),

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


    const handleChange = (event) => {
        const { name, value } = event.target;

        let formattedValue = value;

        if (name === "value" && voucherDetails.type === "1") {
            const numberValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
            formattedValue = numberValue.toLocaleString("vi-VN");
            if (numberValue > voucherDetails.minBillValue) {
                toast.error('Giá trị giảm không được lớn hơn giá trị đơn hàng tối thiểu.');
                return;
            }
            setVoucherDetails({
                ...voucherDetails,
                [name]: numberValue,
                [`${name}Display`]: formattedValue
            });
        } else if (name === "value" && voucherDetails.type === "0") {
            if (/^\d*$/.test(value)) {
                setVoucherDetails({
                    ...voucherDetails,
                    [name]: value
                });
            }
        } else if (name === "maximumDiscount") {
            const numberValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
            formattedValue = numberValue.toLocaleString("vi-VN");
            if (numberValue > voucherDetails.minBillValue) {
                toast.error('Giảm giá tối đa không được lớn hơn giá trị đơn hàng tối thiểu.');
                return;
            }
            setVoucherDetails({
                ...voucherDetails,
                [name]: numberValue,
                [`${name}Display`]: formattedValue
            });
        } else if (name === "minBillValue") {
            const numberValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
            formattedValue = numberValue.toLocaleString("vi-VN");
            setVoucherDetails({
                ...voucherDetails,
                [name]: numberValue,
                [`${name}Display`]: formattedValue
            });
        } else if (name === "name" || name === "note") {
            setVoucherDetails({
                ...voucherDetails,
                [name]: value.trimStart()
            });
        } else {
            setVoucherDetails({
                ...voucherDetails,
                [name]: formattedValue
            });
        }
    }
        ;

    const handleTypeChange = (e) => {
        const newType = e.target.value;

        setVoucherDetails((prevState) => ({
            ...prevState,
            type: newType,
            maximumDiscount: newType === "1" ? "" : prevState.maximumDiscount,
            value: "",
        }));
    };

    const handleCreateVoucher = async () => {
        try {
            let res;

            const generateEmailContent = ({
                companyName,
                companyPhone,
                companyEmail,
                customerName,
                discountName,
                discountValue,
                minOrderValue,
                expirationDate,
                startDate,
                websiteUrl,
                image,
                type,
            }) => {
                const discountUnit = type === "0" ? "%" : "VND";
                return `
                    Kính gửi Quý khách hàng ${customerName},<br>
                    Chúng tôi xin gửi lời cảm ơn chân thành đến Quý khách hàng đã tin tưởng và ủng hộ ${companyName} trong thời gian qua.<br>
                    Nhằm tri ân sự ủng hộ của Quý khách, chúng tôi xin trân trọng gửi tới Quý khách một Phiếu giảm giá đặc biệt với thông tin chi tiết như sau:<br>
                    • Tên chương trình: ${discountName}<br>
                    • Giá trị giảm: ${discountValue} ${discountUnit}<br>
                    • Giá trị đơn hàng tối thiểu: ${minOrderValue} VND<br>
                    • Ngày hết hạn: ${new Date(expirationDate).toLocaleDateString("vi-VN")}<br>
                    Quý khách có thể sử dụng mã giảm giá này cho các đơn hàng mua sắm tại ${websiteUrl} từ ${new Date(startDate).toLocaleDateString("vi-VN")} đến ${new Date(expirationDate).toLocaleDateString("vi-VN")}.<br>
                    Đừng bỏ lỡ cơ hội sở hữu những sản phẩm chất lượng với ưu đãi hấp dẫn!<br>
                    Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi qua ${companyEmail} hoặc hotline ${companyPhone}.<br>
                    
                    Trân trọng,<br><br>${companyName}<br><br>
                    <img src="${image}" alt="Company Logo" style="width:200px;height:auto;" />`;
            };

            const handleSuccess = async () => {
                toast.success("Thêm thành công phiếu giảm giá");
                dispatch(fetchAllVoucherAction());
                navigate("/admins/manage-voucher");
                console.log("Voucher created successfully:", voucherDetails); // Log voucher details
            };

            const updatedVoucherDetails = {
                ...voucherDetails,
                value: voucherDetails.type === "1" ? parseFloat(voucherDetails.value.toString().replace(/[^\d]/g, "")) : voucherDetails.value,
                maximumDiscount: parseFloat(voucherDetails.maximumDiscount.toString().replace(/[^\d]/g, "")),
                minBillValue: parseFloat(voucherDetails.minBillValue.toString().replace(/[^\d]/g, "")),
                startAt: voucherDetails.startAt ? new Date(voucherDetails.startAt).toISOString() : "",
                endAt: voucherDetails.endAt ? new Date(voucherDetails.endAt).toISOString() : "",
            };

            if (voucherDetails.isPrivate) {
                res = await createPrivateVoucher({
                    ...voucherDetails,
                    accountIds: selectedCustomerIds,
                });

                if (res) {
                    console.log("Response from private voucher creation:", res); // Log response
                    await handleSuccess();
                    const emails = await fetchEmailsByCustomerIds(selectedCustomerIds);
                    if (emails && emails.length > 0) {
                        for (const email of emails) {
                            const customer = customers.find(c => c.email === email);
                            const emailContent = generateEmailContent({
                                companyName: "SuperShoes",
                                companyPhone: "0909 123 456",
                                companyEmail: "namntph33821@gmail.com",
                                customerName: customer?.name || "thân mến",
                                voucherCode: voucherDetails.codeVoucher,
                                discountName: voucherDetails.name,
                                discountValue: voucherDetails.value,
                                minOrderValue: voucherDetails.minBillValue,
                                expirationDate: voucherDetails.endAt,
                                startDate: voucherDetails.startAt,
                                websiteUrl: "https://SuperShoes.com",
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
                res = await createPublicVoucher(updatedVoucherDetails);
                if (res) {
                    console.log("Response from public voucher creation:", res); // Log response
                    await handleSuccess();
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo phiếu giảm giá.");
            console.error("Error while creating voucher:", error); // Log error
        }
    };


    const handleReset = () => {
        setVoucherDetails({
            name: "",
            note: "",
            value: "",
            quantity: "",
            maximumDiscount: "",
            minBillValue: "",
            startAt: "",
            endAt: "",
            type: "0",
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
                                    <Form.Label><span className="text-danger">*</span> Tên phiếu giảm
                                        giá</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={voucherDetails.name}
                                        onChange={handleChange}
                                        isInvalid={
                                            !voucherDetails.name ||
                                            voucherDetails.name.length > 255 ||
                                            /^[\s]*$/.test(voucherDetails.name) ||
                                            !/^[A-Za-zÀ-ỹ0-9\s]+$/.test(voucherDetails.name)
                                        }
                                    />
                                    {!voucherDetails.name || /^[\s]*$/.test(voucherDetails.name) ? (
                                        <Form.Control.Feedback type="invalid">
                                            Tên phiếu giảm giá là bắt buộc.
                                        </Form.Control.Feedback>
                                    ) : voucherDetails.name.length > 255 ? (
                                        <Form.Control.Feedback type="invalid">
                                            Tên không được vượt quá 255 ký tự.
                                        </Form.Control.Feedback>
                                    ) : !/^[A-Za-zÀ-ỹ0-9\s]+$/.test(voucherDetails.name) && (
                                        <Form.Control.Feedback type="invalid">
                                            Tên không được chứa ký tự đặc biệt.
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={voucherDetails.quantity}
                                        onChange={handleChange}
                                        min="0"
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
                                        (voucherDetails.quantity < 1 && (
                                            <Form.Control.Feedback type="invalid">
                                                Số lượng phải là số nguyên dương từ 1.
                                            </Form.Control.Feedback>
                                        )) ||
                                        (voucherDetails.quantity > 1000 && (
                                            <Form.Control.Feedback type="invalid">
                                                Số lượng không được vượt quá 1000.
                                            </Form.Control.Feedback>
                                        )) ||
                                        (!Number.isInteger(Number(voucherDetails.quantity)) && (
                                            <Form.Control.Feedback type="invalid">
                                                Số lượng phải là số nguyên.
                                            </Form.Control.Feedback>
                                        ))
                                    )}
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Kiểu giảm giá</Form.Label>
                                    <select
                                        className="form-select"
                                        name="type"
                                        value={voucherDetails.type}
                                        onChange={handleTypeChange}
                                    >
                                        <option value="0">Giảm theo %</option>
                                        {/* <option value="1">Giảm theo số tiền</option> */}
                                    </select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Giá trị đơn hàng tối thiểu</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="minBillValue"
                                            value={voucherDetails.minBillValue ? Number(voucherDetails.minBillValue).toLocaleString("vi-VN") : ""}
                                            onChange={handleChange}
                                            isInvalid={
                                                !voucherDetails.minBillValue ||
                                                parseFloat(voucherDetails.minBillValue) < 1000 ||
                                                parseFloat(voucherDetails.minBillValue) > 10000000
                                            }
                                        />
                                        <InputGroup.Text>VND</InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {!voucherDetails.minBillValue
                                                ? "Giá trị đơn hàng tối thiểu là bắt buộc."
                                                : parseFloat(voucherDetails.minBillValue) < 1000
                                                    ? "Giá trị đơn hàng tối thiểu phải từ 1,000 VND."
                                                    : parseFloat(voucherDetails.minBillValue) > 10000000
                                                        ? "Giá trị đơn hàng tối thiểu không được vượt quá 10,000,000 VND."
                                                        : ""}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Giá trị</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="value"
                                            value={voucherDetails.type === '1' ? Number(voucherDetails.value).toLocaleString("vi-VN") : voucherDetails.value}
                                            onChange={handleChange}
                                            isInvalid={
                                                !voucherDetails.value ||
                                                (voucherDetails.type === '1' && (voucherDetails.value < 1 || voucherDetails.value > 2000000 || voucherDetails.value > voucherDetails.minBillValue)) ||
                                                (voucherDetails.type === '0' && (voucherDetails.value < 1 || voucherDetails.value > 99)) ||
                                                (voucherDetails.type === '0' && !/^\d+$/.test(voucherDetails.value)) ||
                                                (voucherDetails.type === '1' && !/^\d+(\.\d{1,2})?$/.test(voucherDetails.value))
                                            }
                                        />
                                        <InputGroup.Text>
                                            {String(voucherDetails.type) === "0" ? "%" : "VND"}
                                        </InputGroup.Text>
                                        {!voucherDetails.value ? (
                                            <Form.Control.Feedback type="invalid">
                                                Giá trị là bắt buộc.
                                            </Form.Control.Feedback>
                                        ) : (
                                            <>
                                                {voucherDetails.type === '1' && voucherDetails.value < 1 && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Giá trị phải từ 1 VND.
                                                    </Form.Control.Feedback>
                                                )}
                                                {voucherDetails.type === '1' && voucherDetails.value > 2000000 && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Giá trị không được vượt quá 2,000,000 VND.
                                                    </Form.Control.Feedback>
                                                )}
                                                {voucherDetails.type === '1' && voucherDetails.value > voucherDetails.minBillValue && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Giá trị không được lớn hơn giá trị đơn hàng tối thiểu.
                                                    </Form.Control.Feedback>
                                                )}
                                                {voucherDetails.type === '0' && voucherDetails.value < 1 && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Giá trị phải từ 1%.
                                                    </Form.Control.Feedback>
                                                )}
                                                {voucherDetails.type === '0' && voucherDetails.value > 99 && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Giá trị không được vượt quá 99%.
                                                    </Form.Control.Feedback>
                                                )}
                                                {voucherDetails.type === '0' && !/^\d+$/.test(voucherDetails.value) && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Giá trị không được chứa khoảng trắng hoặc ký tự đặc biệt.
                                                    </Form.Control.Feedback>
                                                )}
                                            </>
                                        )}

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
                                            value={voucherDetails.maximumDiscount ? Number(voucherDetails.maximumDiscount).toLocaleString("vi-VN") : ""}
                                            onChange={handleChange}
                                            disabled={voucherDetails.type === "1"}
                                            isInvalid={
                                                voucherDetails.type !== "1" && (
                                                    !voucherDetails.maximumDiscount ||
                                                    parseFloat(voucherDetails.maximumDiscount) < 1 ||
                                                    parseFloat(voucherDetails.maximumDiscount) > 2000000 ||
                                                    parseFloat(voucherDetails.maximumDiscount) > parseFloat(voucherDetails.minBillValue)
                                                )
                                            }
                                        />
                                        <InputGroup.Text>VND</InputGroup.Text>
                                        {voucherDetails.type !== "1" && (
                                            <Form.Control.Feedback type="invalid">
                                                {!voucherDetails.maximumDiscount || parseFloat(voucherDetails.maximumDiscount) < 1
                                                    ? "Giảm giá tối đa phải lớn hơn 0."
                                                    : parseFloat(voucherDetails.maximumDiscount) > 2000000
                                                        ? "Giảm giá tối đa không được vượt quá 2,000,000 VND."
                                                        : parseFloat(voucherDetails.maximumDiscount) > parseFloat(voucherDetails.minBillValue)
                                                            ? "Giảm giá tối đa không được lớn hơn giá trị đơn hàng tối thiểu."
                                                            : ""}
                                            </Form.Control.Feedback>
                                        )}
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Ngày bắt đầu</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="startAt"
                                        value={voucherDetails.startAt}
                                        onChange={handleChange}
                                        isInvalid={!voucherDetails.startAt || new Date(voucherDetails.startAt) < new Date()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ngày bắt đầu là bắt buộc và phải từ ngày hiện tại trở đi.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Ngày kết thúc</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="endAt"
                                        value={voucherDetails.endAt}
                                        onChange={handleChange}
                                        isInvalid={!voucherDetails.endAt || new Date(voucherDetails.endAt) <= new Date(voucherDetails.startAt)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ngày kết thúc là bắt buộc và phải sau ngày bắt đầu.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><span className="text-danger">*</span> Loại phiếu giảm giá</Form.Label>
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
                                            checked={voucherDetails.isPrivate}
                                            onChange={() =>
                                                setVoucherDetails({ ...voucherDetails, isPrivate: true })
                                            }
                                            inline
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ghi chú</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="note"
                                        value={voucherDetails.note}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>


                        <Button variant="info" onClick={handleCreateVoucher}>
                            Thêm mới
                        </Button> {" "}
                        <Button variant="secondary" onClick={handleReset}>
                            Làm mới
                        </Button>
                    </Form>
                </div>


                <div className="p-5 col-lg-6">
                    {voucherDetails.isPrivate ? (
                        <TableCustomer
                            selectedCustomerIds={selectedCustomerIds}
                            setSelectedCustomerIds={setSelectedCustomerIds}
                            isDisabled={!voucherDetails.isPrivate}
                        />
                    ) : (
                        <p className="text-muted">Bảng khách hàng chỉ hiển thị khi phiếu giảm giá là Riêng tư.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModelCreateVoucher;
