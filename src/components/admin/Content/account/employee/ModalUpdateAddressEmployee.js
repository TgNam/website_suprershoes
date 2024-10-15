// ModalCreateAddressEmployee.js
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../../../Service/ApiService";
import { useSelector, useDispatch } from 'react-redux';
import { findAddressByIdAddress, updateAddressFromAccount } from '../../../../../redux/action/addressAction';
import { Formik } from 'formik';
import * as yup from 'yup';

function ModalUpdateAddressEmployee({ showUpdateModal, idEmployee, idAddress, onSubmitSuccess }) {
    const dispatch = useDispatch();
    const addressDt = useSelector((state) => state.address.address);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        if (showUpdateModal && idAddress) {
            dispatch(findAddressByIdAddress(idAddress));
        }
    }, [showUpdateModal, idAddress, dispatch]);
    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
        });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity).then((data) => {
                setDistricts(data);
                setWards([]);
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
        const result = data.find(item => item.code === Number(code));
        return result ? result.name : "";
    }

    const handleClose = () => {
        onSubmitSuccess();
    };

    const handleSubmitUpdate = async (values, { resetForm }) => {
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);
            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}`;
            const addressUpdate = {
                idAccount: idEmployee,
                name: values.name,
                phoneNumber: values.phoneNumber,
                address: fullAddress
            };
            console.log(addressDt)
            dispatch(updateAddressFromAccount(idAddress, addressUpdate));
            resetForm();
            handleClose();
        } catch (error) {
            toast.error("Lỗi khi thêm địa chỉ. Vui lòng thử lại sau.");
        }
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Tên là bắt buộc').min(2, 'Tên phải chứa ít nhất 2 ký tự').max(50, 'Tên không được vượt quá 50 ký tự'),
        phoneNumber: yup.string().required('Số điện thoại là bắt buộc').matches(/^0[0-9]{9,10}$/, 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số'),
        city: yup.string().required('Tỉnh/Thành phố là bắt buộc'),
        district: yup.string().required('Quận/Huyện là bắt buộc'),
        ward: yup.string().required('Phường/Xã là bắt buộc'),
        addressDetail: yup.string().required('Địa chỉ chi tiết là bắt buộc').min(2, 'Địa chỉ chi tiết phải chứa ít nhất 2 ký tự').max(100, 'Địa chỉ chi tiết không được vượt quá 50 ký tự')
    });

    return (
        <Modal show={true} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật chỉ:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: addressDt?.name || '',
                        phoneNumber: addressDt?.phoneNumber || '',
                        city: '',
                        district: '',
                        ward: '',
                        addressDetail: ''
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitUpdate}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Thành phố</Form.Label>
                                <Form.Select
                                    name="city"
                                    value={values.city}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setSelectedCity(e.target.value);
                                        setFieldValue("district", ""); // Reset district when city changes
                                        setFieldValue("ward", ""); // Reset ward when city changes
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

                            <Form.Group className="mb-3">
                                <Form.Label>Quận/Huyện</Form.Label>
                                <Form.Select
                                    name="district"
                                    value={values.district}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setSelectedDistrict(e.target.value);
                                        setFieldValue("ward", ""); // Reset ward when district changes
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.district && !!errors.district}
                                    disabled={!selectedCity}
                                >
                                    <option value="">Quận/Huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.code} value={district.code}>
                                            {district.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.district}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phường/Xã</Form.Label>
                                <Form.Select
                                    name="ward"
                                    value={values.ward}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.ward && !!errors.ward}
                                    disabled={!selectedDistrict}
                                >
                                    <option value="">Phường/Xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.code} value={ward.code}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.ward}
                                </Form.Control.Feedback>
                            </Form.Group>
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
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" type="submit">
                                    Lưu
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ModalUpdateAddressEmployee;
