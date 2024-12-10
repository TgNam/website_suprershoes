import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { getCities, getDistricts, getWards } from "../../../Service/ApiProvincesService";
import { useDispatch } from 'react-redux';
import { createNewAddress } from '../../../redux/action/addressAction';
import { Formik } from 'formik';
import * as yup from 'yup';
import "./EditUser.scss";

const AddAddress = ({ idCustomer, onSubmitSuccess }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    // Fetch cities
    useEffect(() => {
        getCities()
            .then((data) => setCities(data))
            .catch(() => toast.error("Lỗi khi tải danh sách thành phố."));
    }, []);

    // Fetch districts based on selected city
    useEffect(() => {
        if (selectedCity) {
            setLoadingDistricts(true);
            getDistricts(selectedCity)
                .then((data) => setDistricts(data))
                .catch(() => toast.error("Lỗi khi tải danh sách quận/huyện."))
                .finally(() => setLoadingDistricts(false));
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedCity]);

    // Fetch wards based on selected district
    useEffect(() => {
        if (selectedDistrict) {
            setLoadingWards(true);
            getWards(selectedDistrict)
                .then((data) => setWards(data))
                .catch(() => toast.error("Lỗi khi tải danh sách phường/xã."))
                .finally(() => setLoadingWards(false));
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    // Find name by code
    const findByCode = (code, data) => {
        const result = data.find((item) => String(item.code) === String(code));
        return result ? result.name_with_type : "";
    };

    // Close modal
    const handleClose = () => {
        setShow(false);
        onSubmitSuccess();
    };

    // Form submission
    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const cityName = findByCode(values.city, cities);
            const districtName = findByCode(values.district, districts);
            const wardName = findByCode(values.ward, wards);

            // Tạo địa chỉ đầy đủ
            const fullAddress = `${values.addressDetail}, ${wardName}, ${districtName}, ${cityName}, Việt Nam`;

            // Tạo đối tượng createAddress với các giá trị cần thiết
            const createAddress = {
                idAccount: idCustomer || "",
                codeCity: selectedCity || "",
                codeDistrict: selectedDistrict || "",
                codeWard: selectedWard || "",
                address: fullAddress || ""
            };
            

            dispatch(createNewAddress(createAddress));
            resetForm(); // Đặt lại form
            handleClose(); // Đóng modal sau khi thêm địa chỉ thành công
        } catch (error) {
         
        }
    };
    // Validation schema
    const validationSchema = yup.object().shape({
        city: yup.string().required('Tỉnh/Thành phố là bắt buộc'),
        district: yup.string().required('Quận/Huyện là bắt buộc'),
        ward: yup.string().required('Phường/Xã là bắt buộc'),
        addressDetail: yup.string().required('Địa chỉ chi tiết là bắt buộc').min(2, 'Địa chỉ chi tiết phải chứa ít nhất 2 ký tự').max(100, 'Địa chỉ chi tiết không được vượt quá 100 ký tự')
    });

    return (
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Thêm địa chỉ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{
                    city: '',
                    district: '',
                    ward: '',
                    addressDetail: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitCreate}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        {/* Thành phố */}
                        <Form.Group className="mb-3">
                            <Form.Label>Thành phố</Form.Label>
                            <Form.Select
                                name="city"
                                value={values.city}
                                onChange={(e) => {
                                    handleChange(e);
                                    setSelectedCity(e.target.value);
                                    setFieldValue("district", ""); // Reset district khi thay đổi thành phố
                                    setFieldValue("ward", ""); // Reset ward khi thay đổi thành phố
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

                        {/* Quận/Huyện */}
                        <Form.Group className="mb-3">
                            <Form.Label>Quận/Huyện</Form.Label>
                            <Form.Select
                                name="district"
                                value={values.district}
                                onChange={(e) => {
                                    handleChange(e);
                                    setSelectedDistrict(e.target.value);
                                    setFieldValue("ward", ""); // Reset ward khi thay đổi quận/huyện
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

                        {/* Phường/Xã */}
                        <Form.Group className="mb-3">
                            <Form.Label>Phường/Xã</Form.Label>
                            <Form.Select
                                name="ward"
                                value={values.ward}
                                onChange={(e) => {
                                    handleChange(e);
                                    setSelectedWard(e.target.value)
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

                        {/* Địa chỉ chi tiết */}
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

                        {/* Footer */}
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
};

export default AddAddress;
