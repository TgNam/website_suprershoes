
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalAddVoucher from './ModalAddVoucher';
import { useSelector, useDispatch } from 'react-redux';
import { MdPayment, MdPayments } from "react-icons/md";
import { Formik } from 'formik';
import * as yup from 'yup';
import { getCities, getDistricts, getWards } from "../../../../Service/ApiProvincesService";
const ModalPayBill = () => {
    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);
    const [totalMerchandise, setTotalMerchandise] = useState(0);
    const [priceDiscount, setPriceDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [postpaid, setPostpaid] = useState(false);
    const address = useSelector((state) => state.address.address);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [delivery, setDelivery] = useState(false);

    useEffect(() => {
        let total = 0;
        listBillDetailOrder.forEach((item) => {
            const price = item.promotionPrice ? item.promotionPrice : item.productDetailPrice;
            total += price * item.quantity;
        });
        setTotalMerchandise(total);
    }, [listBillDetailOrder]);
    useEffect(() => {
        let discount = 10;
        setPriceDiscount(totalMerchandise * (discount / 100))
    }, [totalMerchandise]);
    useEffect(() => {
        setTotalAmount(totalMerchandise - priceDiscount)
    }, [priceDiscount]);
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
    const validationSchema = yup.object().shape({
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
        addressDetail: yup.string().required('Địa chỉ chi tiết là bắt buộc').min(2, 'Địa chỉ chi tiết phải chứa ít nhất 2 ký tự').max(100, 'Địa chỉ chi tiết không được vượt quá 100 ký tự')
    });

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
                                    idAccount: address?.idAccount || '',
                                    name: address?.nameAccount || '',
                                    phoneNumber: address?.phoneNumber || '',
                                    city: address?.codeCity || '',
                                    district: address?.codeDistrict || '',
                                    ward: address?.codeWard || '',
                                    addressDetail: address?.addressDetail || '',
                                    none: ''
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
                                                name="nameAccount"
                                                value={values.name}
                                                onChange={handleChange}
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
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                                placeholder="Số điện thoại"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phoneNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div class="row">
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
                                                name="addressDetail"
                                                value={values.addressDetail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.addressDetail && !!errors.addressDetail}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.addressDetail}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Ghi chú:</Form.Label>
                                            <Form.Control as="textarea" rows={5} placeholder='Ghi chú' />
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
                            <h6 className='pt-2'>Khách thanh toán: </h6>
                            <Button style={{ width: '100px' }}><MdPayment /></Button>

                            <h6 className='pt-2'>0 VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Mã giảm giá: </h6>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    readOnly
                                />
                            </Form.Group>
                            <ModalAddVoucher />
                        </div>
                        <div className='d-flex justify-content-start mb-3'>

                            {delivery &&
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
                            }
                        </div>
                        <div className='d-flex justify-content-start mb-3'>
                            <h6 className='pt-2'>Giao hàng: </h6>
                            <Form>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    className='m-2 ms-5'
                                    defaultChecked={delivery}
                                    onChange={(e) => setDelivery(e.target.checked)}
                                />
                            </Form>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Tiền hàng: </h6>
                            <h6 className='pt-2'>{totalMerchandise} VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Giảm giá: </h6>
                            <h6 className='pt-2'>- {priceDiscount} VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h5 className='pt-2'>Tổng tiền: </h5>
                            <h5 className='pt-2' style={{ color: 'red' }}>{totalAmount} VND </h5>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <Button style={{ width: '30%' }}>Xác nhận thanh toán</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ModalPayBill;