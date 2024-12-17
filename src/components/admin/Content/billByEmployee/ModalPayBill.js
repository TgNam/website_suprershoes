
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalAddVoucher from './ModalAddVoucher';
import { useSelector, useDispatch } from 'react-redux';
import { MdPayment, MdPayments } from "react-icons/md";
import { Formik } from 'formik';
import * as yup from 'yup';
import { getCities, getDistricts, getWards } from "../../../../Service/ApiProvincesService";
import { CodeBillByEmployee, fetchPostsBillSuccess } from '../../../../redux/action/billByEmployeeAction';
import { postPayBillByEmployeeAction } from '../../../../redux/action/billByEmployeeAction'
import ModalPayMoney from './ModalPayMoney';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
const ModalPayBill = ({ codeBill, setCodeBill }) => {
    const dispatch = useDispatch();
    const SHIPPING_PRICE = Number(30000);
    const { billByCode } = useSelector((state) => state.codeBill);
    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);//Danh sách sản phẩm trong hóa đơn
    const { voucherDetai } = useSelector((state) => state.voucherBill);
    const pay = useSelector((state) => state.payBillOrder.listPayBillOrder);//Thanh toán hóa đơn
    const [totalMerchandise, setTotalMerchandise] = useState(0);//Tổng tiền hàng đã mua
    const [priceDiscount, setPriceDiscount] = useState(0);//Giảm giá
    const [totalAmount, setTotalAmount] = useState(0);//Tổng tiền hàng đã bao gồm giảm giá
    const [totalPaid, setTotalPaid] = useState("");// Khách thanh toán
    const [show, setShow] = useState(false);//Mở ModalPayMoney

    const address = useSelector((state) => state.address.address);// địa chỉ kèm theo tên và số điện thoại của khách hàng
    const [idAccount, setIdAccount] = useState("");
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    const [delivery, setDelivery] = useState(false);//Giao hàng
    const [postpaid, setPostpaid] = useState(false);//Chức năng thanh toán sau
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState(null);
    function findAddressDetail(address) {
        if (address) {
            // Tách chuỗi thành một mảng các phần tử
            const addressParts = address.split(", ");

            // Lấy các phần tử từ đầu đến trước 4 phần tử cuối cùng
            const resultParts = addressParts.slice(0, -4);

            // Kết hợp lại thành chuỗi
            const resultAddress = resultParts.join(", ");

            return resultAddress ? resultAddress : "";
        }
    }
    useEffect(() => {
        if (delivery) {
            setFormData({
                name: address?.nameAccount || '',
                phoneNumber: address?.phoneNumber || '',
                city: address?.codeCity || '',
                district: address?.codeDistrict || '',
                ward: address?.codeWard || '',
                address: findAddressDetail(address?.address || ''),
                note: ''
            });

            setValidationSchema(yup.object().shape({
                name: yup.string()
                    .required('Tên là bắt buộc')
                    .min(2, 'Tên phải chứa ít nhất 2 ký tự')
                    .max(50, 'Tên không được vượt quá 50 ký tự')
                    .matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên không được chứa số hoặc ký tự đặc biệt'),
                phoneNumber: yup
                    .string()
                    .required('Số điện thoại là bắt buộc')
                    .test('isValidPhone', 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số', (value) =>
                        /^0[0-9]{9,10}$/.test(value)
                    )
                    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
                    .max(11, 'Số điện thoại không được quá 11 chữ số'),
                city: yup.string().required('Tỉnh/Thành phố là bắt buộc'),
                district: yup.string().required('Quận/Huyện là bắt buộc'),
                ward: yup.string().required('Phường/Xã là bắt buộc'),
                addressDetail: yup.string().required('Địa chỉ chi tiết là bắt buộc').min(2, 'Địa chỉ chi tiết phải chứa ít nhất 2 ký tự').max(100, 'Địa chỉ chi tiết không được vượt quá 100 ký tự'),
                note: yup.string()
                    .max(255, 'Ghi chú không được vượt quá 255 ký tự')
            }));
        } else {
            setFormData({});
            setValidationSchema(null);
        }
    }, [delivery, address]);


    const handleFormikChange = (values) => {
        setFormData(values);
    };

    //Dữ liệu thanh toán hóa đơn
    useEffect(() => {
        //Tính tổng tiền hàng
        let total = 0;
        listBillDetailOrder.forEach((item) => {
            total += item.priceDiscount * item.quantityBillDetail;
        });
        setTotalMerchandise(total);
    }, [listBillDetailOrder, totalMerchandise, voucherDetai]);

    useEffect(() => {
        //Tính tiền giảm giá
        let discount = voucherDetai?.value || 0;
        let maximumDiscount = voucherDetai?.maximumDiscount || 0;
        let sale = 0;
        if (delivery) {
            sale = (totalMerchandise + SHIPPING_PRICE) * (discount / 100)
        } else {
            sale = totalMerchandise * (discount / 100)
        }
        if (maximumDiscount <= sale) {
            setPriceDiscount(maximumDiscount)
        } else {
            setPriceDiscount(sale)
        }

    }, [totalMerchandise, voucherDetai, delivery]);

    useEffect(() => {
        //tính tổng tiền bao gồm giảm giá
        if (delivery) {
            setTotalAmount((totalMerchandise + SHIPPING_PRICE) - priceDiscount)
        } else {
            setTotalAmount(totalMerchandise - priceDiscount)
        }

    }, [priceDiscount, voucherDetai, totalMerchandise, delivery]);
    useEffect(() => {
        // Tính tổng amount trong mảng pay
        if (pay && pay.length > 0) { // Sửa lại thành length
            const total = pay.reduce((sum, payment) => sum + payment.amount, 0);
            setTotalPaid(total);
        } else {
            setTotalPaid("");
        }
    }, [show, pay, listBillDetailOrder]);

    // Hàm làm tròn và định dạng số
    const formatCurrency = (value) => {
        if (!value) return 0;
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value) || 0;
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //Dữ liệu người dùng, địa chỉ
    useEffect(() => {
        setIdAccount(address?.idAccount || "");
    }, [address]);

    useEffect(() => {
        if (address) {
            setSelectedCity(address?.codeCity || '');
            setSelectedDistrict(address?.codeDistrict || '');
            setSelectedWard(address?.codeWard || '');
        }
    }, [address]);

    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
        });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity).then((data) => {
                setDistricts(data);
                setWards([]); // Reset wards when city changes
            });
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict).then((data) => {
                setWards(data);
            });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    function findByCode(code, data) {
        const result = data.find(item => String(item.code) === String(code));
        return result ? result.name_with_type : "";
    }

    const handlePayBill = async () => {
        if (!postpaid) {
            if (totalAmount > totalPaid) {
                // Nếu thất bại
                swal("Vui lòng thanh toán đủ số tiền hóa đơn!", {
                    icon: "error",
                });
                return;
            }
        }
        const cityName = findByCode(formData.city, cities);
        const districtName = findByCode(formData.district, districts);
        const wardName = findByCode(formData.ward, wards);
        const fullAddress = `${formData.address}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;
        swal({
            title: "Bạn có muốn thanh toán hóa đơn?",
            text: `Thanh toán hóa đơn ${codeBill}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (will) => {
            if (will) {
                // Gửi yêu cầu thanh toán
                const isSuccess = await dispatch(
                    postPayBillByEmployeeAction(
                        codeBill,
                        delivery,
                        totalPaid < totalAmount ? postpaid : false,
                        voucherDetai?.codeVoucher || '',
                        address?.idAccount || '',
                        formData?.name || '',
                        formData?.phoneNumber || '',
                        fullAddress || '',
                        formData?.note || ''
                    )
                );

                if (isSuccess) {
                    // Nếu thành công
                    swal("Thanh toán thành công!", {
                        icon: "success",
                    });
                    setCodeBill(""); // Reset mã hóa đơn
                } else {
                    // Nếu thất bại
                    swal("Thanh toán thất bại!", {
                        icon: "error",
                    });
                }
            } else {
                // Người dùng hủy thanh toán
                swal("Hủy thanh toán!", {
                    icon: "info",
                });
            }
        });
    }
    return (
        <>
            <div className='pay-money'>
                <div>
                    <div className='title'>
                        <h5>Thanh toán hóa đơn</h5>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-6 mt-5'>
                        {delivery &&
                            <Formik
                                initialValues={{
                                    name: address?.nameAccount || '',
                                    phoneNumber: address?.phoneNumber || '',
                                    city: address?.codeCity || '',
                                    district: address?.codeDistrict || '',
                                    ward: address?.codeWard || '',
                                    address: findAddressDetail(address?.address || ''),
                                    note: ''
                                }}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên người nhận:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleFormikChange(values);
                                                }}
                                                onBlur={handleBlur}
                                                isInvalid={touched.name && !!errors.name}
                                                placeholder="Tên người nhận"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Số điện thoại:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleFormikChange(values);
                                                }}
                                                onBlur={handleBlur}
                                                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                                placeholder="Số điện thoại"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phoneNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className="row">
                                            <Form.Group className="mb-3 col">
                                                <Form.Label>Thành phố</Form.Label>
                                                <Form.Select
                                                    name="city"
                                                    value={values.city}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setSelectedCity(e.target.value);
                                                        setFieldValue("district", "");
                                                        setFieldValue("ward", "");
                                                        handleFormikChange(values);
                                                    }}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.city && !!errors.city}
                                                >
                                                    <option value="">Tỉnh/Thành phố</option>
                                                    {cities.map((city) => (
                                                        <option key={city.code} value={city.code}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.city}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col">
                                                <Form.Label>Quận/Huyện</Form.Label>
                                                <Form.Select
                                                    name="district"
                                                    value={values.district}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setSelectedDistrict(e.target.value);
                                                        setFieldValue("ward", "");
                                                        handleFormikChange(values);
                                                    }}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.district && !!errors.district}
                                                    disabled={!selectedCity}
                                                >
                                                    <option value="">Quận/Huyện</option>
                                                    {districts.map((district) => (
                                                        <option key={district.code} value={district.code}>
                                                            {district.name_with_type}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.district}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col">
                                                <Form.Label>Phường/Xã</Form.Label>
                                                <Form.Select
                                                    name="ward"
                                                    value={values.ward}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setSelectedWard(e.target.value);
                                                        handleFormikChange(values);
                                                    }}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.ward && !!errors.ward}
                                                    disabled={!selectedDistrict}
                                                >
                                                    <option value="">Phường/Xã</option>
                                                    {wards.map((ward) => (
                                                        <option key={ward.code} value={ward.code}>
                                                            {ward.name_with_type}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.ward}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Địa chỉ chi tiết:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={values.address}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleFormikChange(values);
                                                }}
                                                onBlur={handleBlur}
                                                isInvalid={touched.address && !!errors.address}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Ghi chú:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5} placeholder='Ghi chú'
                                                name="note"
                                                value={values.note}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleFormikChange(values);
                                                }}
                                                onBlur={handleBlur}
                                                isInvalid={touched.note && !!errors.note}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.note}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Formik>
                        }
                    </div>
                    <div className='col-6'>
                        <h5><MdPayments /> Thông tin thanh toán</h5>
                        <hr />
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Mã giảm giá: </h6>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    value={voucherDetai?.codeVoucher || ''}
                                    readOnly
                                />
                            </Form.Group>
                            <ModalAddVoucher idAccount={idAccount} totalMerchandise={totalMerchandise} />
                        </div>
                        <div className='d-flex justify-content-start mb-3'>

                            {delivery && totalPaid < totalAmount && (
                                <>
                                    <h6 className='pt-2'>Trả sau: </h6>
                                    <Form>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            className='m-2 ms-5'
                                            defaultChecked={postpaid}
                                            onChange={(e) => setPostpaid(e.target.checked)}
                                        />
                                    </Form>
                                </>
                            )}

                        </div>
                        <div className='d-flex justify-content-start mb-3'>
                            <h6 className='pt-2'>Giao hàng: </h6>
                            <Form>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    className='m-2 ms-5'
                                    defaultChecked={delivery}
                                    onChange={(e) => {
                                        setDelivery(e.target.checked)
                                        setPostpaid(false)
                                    }}
                                />
                            </Form>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Khách thanh toán: </h6>
                            <Button style={{ width: '100px' }} onClick={() => setShow(true)}><MdPayment /></Button>

                            <h6 className='pt-2'>{formatCurrency(totalPaid)} VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Tiền hàng: </h6>
                            <h6 className='pt-2'>{formatCurrency(totalMerchandise)} VND </h6>
                        </div>
                        {delivery &&
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='pt-2'>Phí giao hàng: </h6>
                                <h6 className='pt-2'>{formatCurrency(SHIPPING_PRICE)} VND </h6>
                            </div>
                        }
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Giảm giá: </h6>
                            <h6 className='pt-2'>- {formatCurrency(priceDiscount)} VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h5 className='pt-2'>Tổng tiền: </h5>
                            <h5 className='pt-2' style={{ color: 'red' }}>{formatCurrency(totalAmount)} VND </h5>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <Button style={{ width: '30%' }} onClick={handlePayBill}>Xác nhận thanh toán</Button>
                        </div>
                    </div>
                </div>
            </div>
            {show && (<ModalPayMoney
                show={show}
                setShow={setShow}
                totalAmount={totalAmount}
                totalPaid={totalPaid}
                setTotalPaid={setTotalPaid}
                codeBill={codeBill}
            />)}
        </>
    )
}
export default ModalPayBill;