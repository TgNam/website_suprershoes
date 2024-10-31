// ModalCreateAddressCustomer.js
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../../../Service/ApiProvincesService";
import { useSelector, useDispatch } from 'react-redux';
import { findAddressByIdAddress, updateAddressFromAccount } from '../../../../../redux/action/addressAction';
import { Formik } from 'formik';
import * as yup from 'yup';

function ModalUpdateAddressCustomer({ showUpdateModal, idCustomer, idAddress, onSubmitSuccess }) {
    const dispatch = useDispatch();
    const addressDt = useSelector((state) => state.address.address);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    useEffect(() => {
        if (showUpdateModal && idAddress) {
            dispatch(findAddressByIdAddress(idAddress));
        }
    }, [showUpdateModal, idAddress, dispatch]);

    useEffect(() => {
        if (addressDt) {
            setSelectedCity(addressDt?.codeCity || '');
            setSelectedDistrict(addressDt?.codeDistrict || '');
            setSelectedWard(addressDt?.codeWard || '');
        }
    }, [addressDt]);

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

    const handleClose = () => {
        onSubmitSuccess();
    };

    const handleSubmitUpdate = async (values, { resetForm }) => {
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;

            const addressUpdate = {
                idAccount: idCustomer || "",
                codeCity: selectedCity || "",
                codeDistrict: selectedDistrict || "",
                codeWard: selectedWard || "",
                address: fullAddress || ""
            };
            

            dispatch(updateAddressFromAccount(idAddress, addressUpdate));
            resetForm();
            handleClose();
        } catch (error) {
            toast.error("Lỗi khi cập nhật địa chỉ. Vui lòng thử lại sau.");
        }
    };
    function findAddressDetail(address) {
        // Tách chuỗi thành một mảng các phần tử
        const addressParts = address.split(", ");

        // Lấy các phần tử từ đầu đến trước 4 phần tử cuối cùng
        const resultParts = addressParts.slice(0, -4);

        // Kết hợp lại thành chuỗi
        const resultAddress = resultParts.join(", ");

        return resultAddress ? resultAddress : "";
    }

    const validationSchema = yup.object().shape({
        city: yup.string().required('Tỉnh/Thành phố là bắt buộc'),
        district: yup.string().required('Quận/Huyện là bắt buộc'),
        ward: yup.string().required('Phường/Xã là bắt buộc'),
        addressDetail: yup.string().required('Địa chỉ chi tiết là bắt buộc').min(2, 'Địa chỉ chi tiết phải chứa ít nhất 2 ký tự').max(100, 'Địa chỉ chi tiết không được vượt quá 100 ký tự')
    });

    return (
        <Modal show={true} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật địa chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        city: addressDt?.codeCity || '',
                        district: addressDt?.codeDistrict || '',
                        ward: addressDt?.codeWard || '',
                        addressDetail: findAddressDetail(addressDt?.address|| '') 
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitUpdate}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
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

export default ModalUpdateAddressCustomer;

